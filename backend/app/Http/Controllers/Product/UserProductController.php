<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\User\cart\AddCartRequest;
use App\Http\Requests\Product\User\cart\RemoveCartRequest;
use App\Http\Requests\Product\User\Wishlist\ShowWishlistRequest;
use App\Http\Requests\Product\User\Wishlist\WishlistRequest;
use App\Models\Product\Product;
use App\Models\Product\ProductCart;
use App\Models\Product\ProductDetails;
use App\Models\Product\ProductWishList;
use GrahamCampbell\ResultType\Success;
use Illuminate\Http\Request;

class UserProductController extends Controller
{
    // add wishlist
    public function addWishlist(WishlistRequest $req)
    {
        $user = auth()->user();

        // must use $user->id(logged user), otherwise it'll recreate the samewishlist with same user and same product
        if (ProductWishList::where('user_id', $user->id)->where('product_id', $req->product_id)->exists()) {
            return $this->error(['Product already added to the wishlist']);
        }

        ProductWishList::create([
            'user_id' => $user->id,
            'product_id' => $req->product_id
        ]);

        return $this->success(null, ['Product added to the wishlist']);
    }

    // delete wishlist
    public function deleteWishlist(WishlistRequest $req)
    {
        $user = auth()->user();

        $productWishliSt = ProductWishList::where('user_id', $user->id)->where('product_id', $req->product_id)->first();

        if (!$productWishliSt) {
            return $this->error(['This product is not in your wishlist']);
        }

        // wishlist deleted
        $productWishliSt->delete();
        return $this->success(null, ['Product Successfully removed from your wishlist']);
    }

    // show wishlist
    public function showWishlist()
    {

        $allWishlist = ProductWishList::with('product')->whereUserId(auth()->id())->get();

        if (!$allWishlist) {
            return $this->error(['You have not added any product to your wishlist yet']);
        }

        return $this->success($allWishlist, ['All wishlist retrieved successfully']);
    }

    // wishlist flush
    public function flushWishlist(){
        $deletedWishlist = ProductWishList::whereUserId(auth()->id())->delete();
        if(!$deletedWishlist){
            return $this->error(['You have not added any product in your wishlist']);
        }else{
            return $this->success(null, ['All wishlist cleared successfully']);
        }
    }


    // cart index
    public function cartIndex()
    {
        $user = auth()->user();

        $carts = ProductCart::with('product')->where('user_id', $user->id)->get();

        if(!$carts){
            return $this->error(['Product not found']);
        }else{
            return $this->success($carts, ['Product in the cart retrieved successfully']);
        }
    }

    // cart add
    public function addCart(AddCartRequest $req)
    {
        $user = auth()->user();

        if (ProductCart::where('user_id', $user->id)->where('product_id', $req->product_id)->exists()) {
            return $this->error(['You already added this product in your cart.']);
        }

        $product = Product::findOrFail($req->product_id);
        $productDetails = ProductDetails::whereProductId($product->id)->get();

        $availableSize = $productDetails->pluck('size')->unique()->values();
        $availableColor = $productDetails->pluck('color')->unique()->values();


        if ($availableSize->isNotEmpty()) {
            if (!$req->filled('size')) {
                return $this->error(['Size is required']);
            }

            if (!$availableSize->contains($req->size)) {
                return $this->error(['Size not available']);
            }
        }


        if ($availableColor->isNotEmpty()) {
            if (!$req->filled('color')) {
                return $this->error(['Color is required']);
            }

            if (!$availableColor->contains($req->size)) {
                return $this->error(['Color not available']);
            }
        }


        if(!$availableSize->isNotEmpty() && !$availableColor->isNotEmpty()){
            if(!ProductDetails::whereProductId($product->id)->where('color', $req->color)->where('size', $req->size)->exists()){
                return $this->error(['color and size not available'], 400);
            }
        }


        if ($product->discount && $product->discount > 0) {
            $price = $product->discount_price;
        } else {
            $price = $product->price;
        }


        ProductCart::create([
            'user_id' => $user->id,
            'product_id' => $product->id,
            'quantity' => $req->quantity,
            'price' => $price,
            'color' => $availableColor->isNotEmpty()? $req->color : null,
            'size' => $availableSize->isNotEmpty()? $req->color : null,
        ]);

        return $this->success(null, ['Product added to your cart']);
    }

    // cart delete
    public function removeCart(RemoveCartRequest $req)
    {
        $user = auth()->user();

        if (!$cart = ProductCart::where('user_id', $user->id)->where('id', $req->cart_id)->first()) {
            return $this->error(['This Cart is not in your cartlist']);
        } else {
            $cart->delete();
        }

        return $this->success(null, ['Product successfully removed from the cart']);
    }

    // cart flush
    public function flushCart()
    {
        $deleted = ProductCart::whereUserId(auth()->id())->delete();

        if (!$deleted) {
            return $this->error(['No cart found']);
        }

        return $this->success(null, ['Cart cleared successfully']);
    }
}
