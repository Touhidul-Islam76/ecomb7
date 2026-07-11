<?php

namespace App\Http\Controllers\Checkout;

use App\Events\PaymentEvent;
use App\Helpers\SslCommerce;
use App\Http\Controllers\Controller;
use App\Http\Requests\Product\User\Checkout\CheckoutRequest;
use App\Models\Invoice\Invoice;
use App\Models\Invoice\InvoiceProduct;
use App\Models\Product\ProductCart;
use Illuminate\Http\Request;

class CheckoutController extends Controller
{
    public function checkout(CheckoutRequest $req)
    {

        try {

            $user = auth()->user();

            $userCart = ProductCart::where('user', $user->id)->get();
            if ($userCart->isEmpty()) {
                return $this->error(['Cart is empty'], 400);
            }

            $customerAddress = "Name:$req->name,Email:$req->email,Mobile:$req->mobile_no,City:$req->city,State:$req->state,PostCode:$req->post_code,Address:$req->address";

            $total = 0;
            foreach ($userCart as $cart) {
                $total += $cart->price * $cart->quantity;
            }

            $vat = ($total * 3) / 100;
            $payable = $total + $vat;

            $invoiceNo = 'INV-' . rand(100000, 999999) . '-' . date('Ymd') . '-' . time();

            DB::beginTransaction();

            $invoice = Invoice::create([
                'user_id' => $user->id,
                'invoice_no' => $invoiceNo,
                'total' => $total,
                'vat' => $vat,
                'payable' => $payable,
                'cust_detail' => $customerAddress,
                'ship_detail' => $customerAddress,
            ]);


            foreach ($userCart as $cart) {
                InvoiceProduct::create([
                    'invoice_id' => $invoice->id,
                    'product_id' => $cart['product_id'],
                    'quantity' => $cart['quantity'],
                    'unit_price' => $cart['price'],
                    'total_price' => $cart['price'] * $cart['quantity'],
                    'color' => $cart['color'],
                    'size' => $cart['size'],
                ]);
            }

            ProductCart::where('user_id', $user->id)->delete();

            DB::commit();
            // event(new PaymentEvent($invoice));

            $sslResponse = SslCommerce::initPayment($req, $invoice);

            return $this->success($sslResponse, ['Invoice generated successfully']);
        } catch (\Exception $e) {
            DB::rollback();
            return $this->error(['Something went wrong']);
        }
    }
}
