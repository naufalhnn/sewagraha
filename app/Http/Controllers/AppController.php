<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Payment;
use App\Models\PaymentProof;
use App\Models\Venue;
use Carbon\Carbon;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AppController extends Controller
{
    public function index()
    {
        $venues = Venue::with(['venue_images'])->get();
        return Inertia::render('home', compact('venues'));
    }

    public function contact()
    {
        return Inertia::render('contact');
    }

    public function about()
    {
        return Inertia::render('about');
    }

    public function venues()
    {
        $venues = Venue::with(['venue_images'])->get();

        return Inertia::render('venues', compact('venues'));
    }

    public function details(string $id)
    {

        $venue = Venue::with(['venue_images', 'purposes', 'facilities'])->findOrFail($id);
        $unavailableBookings = Booking::where('venue_id', $id)
            ->whereIn('status', ['PENDING', 'WAITING PAYMENT', 'VERIFYING PAYMENT', 'REQUEST CANCEL',])
            ->get(['event_start_date', 'event_end_date']);

        $bookedDates = [];
        foreach ($unavailableBookings as $dates) {
            $startDate = Carbon::parse($dates->event_start_date)->copy();
            $endDate = Carbon::parse($dates->event_end_date);


            while ($startDate->lte($endDate)) {
                $bookedDates[] = $startDate->toDateString();
                $startDate->addDays();
            }
        }

        $unavailableDates = array_values(array_unique($bookedDates));

        return Inertia::render('details', compact('venue', 'unavailableDates'));
    }

    public function bookings(Request $request)
    {
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        $bookingData = [
            'user_id' => $request->user_id,
            'venue_id' => $request->venue_id,
            'event_start_date' => $request->event_start_date,
            'event_end_date' => $request->event_end_date,
            'purpose' => $request->purpose,
            'total_price' => $request->total_price,
            'status' => 'WAITING PAYMENT',
        ];

        if ($request->hasFile('ktp_image')) {
            $file = $request->file('ktp_image');
            $fileName = time() . '_' .  Auth::user()->name . '.' . $file->extension();
            $path = $file->storeAs('ktp', $fileName, 'public');
            $bookingData['ktp_image_path'] = $path;
        }

        $booking = Booking::create($bookingData);
        $bookingCode = $booking->booking_code;

        Payment::create([
            'booking_id' => $booking->id,
            'user_id' => Auth::user()->id,
            'total_price' => $request->total_price,
            'status' => 'PENDING',
        ]);

        return redirect()->route('bookings.payment', $bookingCode);
    }

    public function payment(string $bookingCode)
    {
        $booking = Booking::with(['venue'])->where('booking_code', $bookingCode)->first();
        $user = Auth::user();

        return Inertia::render('payment', compact('booking', 'user'));
    }

    public function paymentStore(Request $request, string $bookingCode)
    {
        $booking = Booking::where('booking_code', $bookingCode)->first();

        $payment = Payment::where('booking_id', $booking->id)->first();

        $payment->update([
            'status' => 'PAID',
            'paid_at' => now(),
        ]);

        $paymentProof = [
            'payment_id' => $payment->id,
            'uploaded_at' => now(),
        ];

        if ($request->hasFile('payment_proof')) {
            $file = $request->file('payment_proof');
            $fileName = $bookingCode . ' PAYMENT' . $file->extension();
            $path = $file->storeAs('payment_proof', $fileName, 'public');
            $paymentProof['payment_proof_image_path'] = $path;
        }

        PaymentProof::create($paymentProof);
        $paymentCode = $payment->payment_code;

        $booking->update([
            'status' => 'VERIFYING PAYMENT',
        ]);

        return redirect()->route('bookings.payment.success', $paymentCode);
    }

    public function paymentSuccess(string $paymentCode)
    {
        $payment_code = $paymentCode;
        return Inertia::render('payment-success', compact('payment_code'));
    }

    public function history()
    {
        $bookings = Booking::with(['venue', 'payment'])->where('user_id', Auth::user()->id)->get();

        return Inertia::render('booking-history', compact('bookings'));
    }

    public function bookingDetail(string $bookingCode)
    {
        $booking = Booking::with(['venue', 'payment'])->where('booking_code', $bookingCode)->first();
        $user = Auth::user();

        return Inertia::render('booking-detail', compact('booking', 'user'));
    }

    public function bookingCancel(string $bookingCode)
    {
        $booking = Booking::where('booking_code', $bookingCode)->first();

        if ($booking->status == 'PENDING' || $booking->status == 'WAITING PAYMENT') {
            $booking->update([
                'status' => 'CANCELED',
            ]);
        } else {
            $booking->update([
                'status' => 'REQUEST CANCEL',
            ]);
        }

        $payment = Payment::where('booking_id', $booking->id)->first();

        if ($payment->status == 'PENDING') {
            $payment->update([
                'status' => 'CANCELED'
            ]);
        } else {
            $payment->update([
                'status' => 'REQUEST CANCEL'
            ]);
        }

        return redirect()->route('history');
    }
}
