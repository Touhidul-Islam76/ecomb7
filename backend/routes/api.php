<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Brand\BrandController;
use App\Http\Controllers\Category\CategoryController;
use App\Http\Controllers\Product\ProductController;
use App\Http\Controllers\Product\UserProductController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::group(['prefix' => 'v1'], function () {

    // auth routes
    Route::post('login/otpSend', [AuthController::class, 'loginOtpSend']);
    Route::post('login', [AuthController::class, 'login']);


    Route::get('brands', [BrandController::class, 'index']);
    Route::get('categories', [CategoryController::class, 'index']);
    Route::get('products', [ProductController::class, 'index']);
    Route::post('products', [ProductController::class, 'show']);

    Route::group(['middleware' => 'auth:sanctum'], function () {
        // wishlist route
        Route::group(['prefix' => 'wishlist'], function () {
            Route::post('add', [UserProductController::class, 'addWishlist'])->name('add');
            Route::post('delete', [UserProductController::class, 'deleteWishlist'])->name('delete');
            Route::get('/', [UserProductController::class, 'showWishlist']);
            ROute::post('flush', [UserProductController::class, 'flushWishlist']);
        });

        // cart route
        Route::group(['prefix' => 'cart'], function () {
            Route::get('/', [UserProductController::class, 'cartIndex']);
            Route::post('add', [UserProductController::class, 'addCart'])->name('add');
            Route::post('delete', [UserProductController::class, 'removeCart'])->name('delete');
            Route::post('flush', [UserProductController::class, 'flushCart'])->name('flush');
        });
    });



    Route::group(['middleware' => 'auth:sanctum'], function () {
        Route::apiResource('users', UserController::class);
    });


    Route::get('success', function () {
        return response()->json(['message' => 'success']);
    });
    Route::get('failed', function () {
        return response()->json(['message' => 'failed']);
    });
    Route::get('canceled', function () {
        return response()->json(['message' => 'canceled']);
    });
    Route::get('ipn', function () {
        return response()->json(['message' => 'ipn']);
    });
});
