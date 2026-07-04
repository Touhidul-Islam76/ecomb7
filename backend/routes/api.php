<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Brand\BrandController;
use App\Http\Controllers\Category\CategoryController;
use App\Http\Controllers\Product\ProductController;
use App\Http\Controllers\Product\UserProductController;
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

    Route::group(['middleware' => 'auth:sanctum'], function () {
        // wishlist route
        Route::group(['prefix' => 'wishlist'], function () {
            Route::post('add', [UserProductController::class, 'addWishlist'])->name('add');
            Route::post('delete', [UserProductController::class, 'deleteWishlist'])->name('delete');
            Route::get('/', [UserProductController::class, 'showWishlist']);
        });

        // cart route
        Route::group(['prefix' => 'cart'], function(){
            Route::get('/', [UserProductController::class, 'cartIndex']);
            Route::post('add', [UserProductController::class, 'addCart'])->name('add');
            Route::post('delete', [UserProductController::class, 'removeCart'])->name('delete');
            Route::post('flush', [UserProductController::class, 'flushCart'])->name('flush');
        });
    });
});
