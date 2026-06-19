<?php

namespace App\Models\Profile;

use Illuminate\Database\Eloquent\Model;

class CustomerProfile extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'email',
        'mobile_no',
        'city',
        'state',
        'post_code',
        'address'
    ];
}
