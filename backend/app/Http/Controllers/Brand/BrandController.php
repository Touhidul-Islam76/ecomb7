<?php

namespace App\Http\Controllers\Brand;

use App\Http\Controllers\Controller;
use App\Models\Brand\Brand;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    public function index(){
        $brand = Brand::select('id', 'name', 'image')->get();
        return $this->success($brand);
    }
}
