<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Payment;
use App\Models\PaymentProof;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookingController extends Controller
{
    public function index(Request $request)
    {
        $bookings = Booking::with(['venue', 'payment', 'user'])->get();
        $props = [
            'bookings' => $bookings,
            'bookingDetail' => null,
            'paymentProof' => null,
        ];

        if ($request->has('id')) {
            $bookingDetail = Booking::with(['user', 'venue', 'payment'])->findOrFail($request->id);
            $paymentProof = PaymentProof::where('payment_id', $bookingDetail->payment->id)->first();
            $props['bookingDetail'] = $bookingDetail;
            $props['paymentProof'] = $paymentProof;
        }

        return Inertia::render('bookings/index', $props);
    }

    public function show(string $id)
    {
        $booking = Booking::with(['venue', 'payment'])->findOrFail($id)->get();

        return response()->json($booking);
    }

    public function update(Request $request, string $id)
    {
        $booking = Booking::findOrFail($id);
        $booking->update([
            'status' => $request->status,
        ]);

        if ($request->status == 'CANCELED') {
            $payment = Payment::where('booking_id', $booking->id)->first();
            $payment->update([
                'status' => $request->status,
            ]);
        }

        return redirect()->back()->with('success', 'Status berhasil diubah');
    }
}
