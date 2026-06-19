<?php

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Model;

class ProductCart extends Model
{
    protected $fillable = [
        'user_id',
        'product_id',
        'size',
        'color',
        'quantity',
        'price',
    ];
}
