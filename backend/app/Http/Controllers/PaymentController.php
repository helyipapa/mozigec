<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\PaymentIntent;
use Illuminate\Support\Facades\Log;

class PaymentController extends Controller
{
    public function createPaymentIntent(Request $request)
    {
        try {
            $validated = $request->validate([
                'amount' => 'required|numeric|min:1',
                'currency' => 'required|string',
                'description' => 'string|nullable'
            ]);

            Stripe::setApiKey(env('STRIPE_SECRET'));

            $paymentIntent = PaymentIntent::create([
                'amount' => $validated['amount'] * 100, // Stripe fillérekben számol
                'currency' => $validated['currency'],
                'description' => $validated['description'] ?? 'Mozijegy foglalás',
                'automatic_payment_methods' => [
                    'enabled' => true,
                ],
            ]);

            Log::info('Payment Intent created', [
                'payment_intent_id' => $paymentIntent->id,
                'amount' => $validated['amount']
            ]);

            return response()->json([
                'clientSecret' => $paymentIntent->client_secret,
                'paymentIntentId' => $paymentIntent->id
            ]);

        } catch (\Exception $e) {
            Log::error('Payment Intent creation failed', [
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function confirmPayment(Request $request)
    {
        try {
            $validated = $request->validate([
                'payment_intent_id' => 'required|string'
            ]);

            Stripe::setApiKey(env('STRIPE_SECRET'));

            $paymentIntent = PaymentIntent::retrieve($validated['payment_intent_id']);

            Log::info('Payment confirmed', [
                'payment_intent_id' => $paymentIntent->id,
                'status' => $paymentIntent->status
            ]);

            return response()->json([
                'status' => $paymentIntent->status,
                'amount' => $paymentIntent->amount / 100
            ]);

        } catch (\Exception $e) {
            Log::error('Payment confirmation failed', [
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
