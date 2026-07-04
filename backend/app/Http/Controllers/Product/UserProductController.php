<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\User\Wishlist\ShowWishlistRequest;
use App\Http\Requests\Product\User\Wishlist\WishlistRequest;
use App\Models\Product\ProductWishList;
use GrahamCampbell\ResultType\Success;
use Illuminate\Http\Request;

class UserProductController extends Controller
{
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

    public function showWishlist()
    {

        $allWishlist = ProductWishList::with('product')->whereUserId(auth()->id())->get();

        if (!$allWishlist) {
            return $this->error(['You have not added any product to your wishlist yet']);
        }

        return $this->success($allWishlist, ['All wishlist retrieved successfully']);

    }
}
