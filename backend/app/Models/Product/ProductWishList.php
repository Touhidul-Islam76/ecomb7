<?php

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Model;

class ProductWishList extends Model
{
    protected $fillable = [
        'user_id',
        'product_id',
    ];
}
