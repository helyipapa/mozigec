<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MovieController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\PaymentController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('movies', MovieController::class);
Route::post('/bookings', [BookingController::class, 'store']);

// Stripe payment routes
Route::post('/payment/create-intent', [PaymentController::class, 'createPaymentIntent']);
Route::post('/payment/confirm', [PaymentController::class, 'confirmPayment']);
