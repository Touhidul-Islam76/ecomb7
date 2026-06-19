<?php

namespace App\Models\Product;

use App\Models\Brand\Brand;
use App\Models\Category\Category;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'category_id',
        'brand_id',
        'title',
        'slug',
        'short_desc',
        'price',
        'discount_type',
        'discount',
        'discount_price',
        'stock',
        'image',
        'star',
        'remarks',
    ];

    public function category(){
        return $this->belongsTo(Category::class);
    }
    public function brand(){
        return $this->belongsTo(Brand::class);
    }

    //scope query for filtering
    public function scopeProductFilter($query, $request){
        if($request->filled('category_id')){
            $query->where('category_id', $request->category_id);
        }
        if($request->filled('brand_id')){
            $query->where('brand_id', $request->brand_id);
        }
        if($request->filled('remarks')){
            $query->where('remarks', $request->remarks);
        }
    }
}
