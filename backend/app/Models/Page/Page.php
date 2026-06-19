<?php

namespace App\Models\Page;

use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'body',
        'is_active'
    ];
}
