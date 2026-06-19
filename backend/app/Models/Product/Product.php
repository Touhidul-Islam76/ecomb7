<?php

namespace App\Models\Product;

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
}
