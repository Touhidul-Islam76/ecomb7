<?php

namespace App\Models\Invoice;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    protected $fillable = [
        'user_id',
        'invoice_no',
        'total',
        'payable',
        'vat',
        'cust_detail',
        'ship_detail',
        'status',
        'payment_status'
    ];
}
