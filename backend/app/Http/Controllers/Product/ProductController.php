<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use App\Models\Product\Product;
use App\Models\Product\ProductSlider;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $products = Product::with('category', 'brand')->ProductFilter($request)->paginate(20);
        return $this->success($products);
    }

    public function show(string $slug){
        $product = Product::with('category', 'brand')->where('slug', $slug)->first();

        if(!$product){
            return $this->error(['Product not found']);
        }

        return $this->success($product);
    }

    public function productSliders(){
        $sliders = ProductSlider::with('product')->get();
        return $this->success($sliders);
    }
}
