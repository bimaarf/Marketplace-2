<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\CommentReplyController;
use App\Http\Controllers\OngkirController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\RattingController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::get('/product/detail/view/{slug}', [ProductController::class, 'detail']);
Route::get('/product/view', [ProductController::class, 'view']);
Route::get('/product/populer/view', [ProductController::class, 'populerGet']);
Route::get('/category/view', [CategoryController::class, 'view']);

Route::get('/province-city/view', [OngkirController::class, 'view']);
Route::post('/cek-ongkir/store', [OngkirController::class, 'cekOngkir']);
Route::get('/comment/view/{slug}', [CommentController::class, 'view']);
Route::get('/comment/reply/view/{comment_id}', [CommentReplyController::class, 'view']);
Route::get('/ratting/view/{slug}', [RattingController::class, 'view']);

Route::middleware('auth:sanctum')->group(function() {

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::middleware('role:administrator')->group(function() {
        Route::get('/notif-report/get', [AdminController::class, 'orderNotif']);
        Route::get('/order-report/get', [AdminController::class, 'orderReport']);
        Route::get('/order-process/get', [AdminController::class, 'orderProcessGet']);

        Route::post('/category/store', [CategoryController::class, 'store']);
        Route::post('/category/update/{id}', [CategoryController::class, 'update']);
        Route::post('/category/delete/{id}', [CategoryController::class, 'delete']);

        Route::post('/product/store', [ProductController::class, 'store']);
        Route::post('/product/update/{slug}', [ProductController::class, 'update']);
        Route::post('/product/delete/{slug}', [ProductController::class, 'delete']);

        Route::post('/comment/delete/{id}', [CommentController::class, 'delete']);

        Route::post('/comment/reply/store/{id}', [CommentReplyController::class, 'store']);

        Route::get('/checkout/detail/get/{username}', [AdminController::class, 'detailCheckout']);
        Route::post('/checkout/detail/process/{craeted_at}', [AdminController::class, 'checkoutProcess']);
        Route::post('/checkout/detail/confirm/{craeted_at}', [AdminController::class, 'checkoutConfirm']);
        Route::post('/checkout/detail/sending/{craeted_at}', [AdminController::class, 'checkoutSending']);
    });
    Route::middleware('role:user')->group(function() {
        Route::get('/cart/view', [CartController::class, 'view']);
        Route::post('/cart/update', [CartController::class, 'update']);
        Route::post('/cart/delete/{id}', [CartController::class, 'delete']);

        Route::post('/cart/store/{slug}', [CartController::class, 'store']);

        Route::get('/checkout/view', [CheckoutController::class, 'view']);
        Route::post('/checkout/store', [CheckoutController::class, 'store']);
        Route::post('/checkout/delete/{created_at}', [CheckoutController::class, 'delete']);
        Route::post('/checkout/finish/store/{craeted_at}', [CheckoutController::class, 'takeOrders']);
        Route::post('/comment/store/{slug}', [CommentController::class, 'store']);

        Route::post('/ratting/store/{id}', [RattingController::class, 'store']);
    });
});
