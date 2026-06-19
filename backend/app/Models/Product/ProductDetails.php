<?php

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Model;

class ProductDetails extends Model
{
    protected $fillable = [
        'product_id',
        'image1',
        'image2',
        'image3',
        'image4',
        'description',
        'color',
        'size'
    ];
}
