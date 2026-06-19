<?php

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Model;

class ProductSlider extends Model
{
    protected $fillable = [
        'product_id',
        'title',
        'short_desc',
        'image',
        'price'
    ];
}
