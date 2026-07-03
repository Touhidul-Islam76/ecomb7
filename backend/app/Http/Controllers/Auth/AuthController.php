<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginOtpSendRequest;
use App\Http\Requests\Auth\LoginOtpVerifyRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{
    public function loginOtpSend( LoginOtpSendRequest $req ){
        $user = User::where('email', $req->email)->first();
        $otp = rand(0000,9999);

        if(!$user){
            User::create([
                'email' => $req->email,
                'otp' => $otp,
            ]);
        }

        Mail::raw('Your OTP is:'.$otp, function($msg) use($req){
            $msg->to($req->email)->subject('login otp');
        });

        return $this->success(null, ['OTP successfully sent to your email']);
    }

    public function login( LoginOtpVerifyRequest $req ){
        $user = User::where('email', $req->email)->where('otp', $req->otp)->first();
        if(!$user){
            return $this->error(['Invalid OTP'], 400);
        }

        $user->update([
            'otp' => null,
        ]);

        $accessToken = $user->createToken('authToken')->plainTextToken;

        return $this->success([
            'accessToken' => $accessToken,
        ],['Login Success']);
    }
}
