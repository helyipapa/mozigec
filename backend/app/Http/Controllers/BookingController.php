<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\BookingConfirmation;
use Illuminate\Support\Facades\Log;

class BookingController extends Controller
{
    public function store(Request $request)
    {
        try {
            // Validate request
            $validated = $request->validate([
                'customer.name' => 'required|string',
                'customer.email' => 'required|email',
                'movie.title' => 'required|string',
                'totalPrice' => 'required|numeric',
                'bookingNumber' => 'required|integer',
                'orderMethod' => 'required|string',
                'paymentIntentId' => 'nullable|string'
            ]);

            $bookingData = $request->all();

            // Log booking data
            Log::info('New booking received:', [
                'booking_number' => $bookingData['bookingNumber'],
                'order_method' => $bookingData['orderMethod'],
                'payment_intent' => $bookingData['paymentIntentId'] ?? 'none',
                'total_price' => $bookingData['totalPrice']
            ]);

            // Send confirmation email
            Mail::to($bookingData['customer']['email'])
                ->send(new BookingConfirmation($bookingData));

            return response()->json([
                'success' => true,
                'message' => 'Foglalás sikeres! Visszaigazoló emailt küldtünk.',
                'bookingNumber' => $bookingData['bookingNumber'],
                'paymentStatus' => $bookingData['paymentIntentId'] ? 'paid' : 'pending'
            ], 201);

        } catch (\Exception $e) {
            Log::error('Booking failed:', ['error' => $e->getMessage()]);
            
            return response()->json([
                'success' => false,
                'message' => 'Hiba történt a foglalás során: ' . $e->getMessage()
            ], 500);
        }
    }
}
