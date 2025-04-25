<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookingController extends Controller
{
    public function index()
    {
        $bookings = Booking::with(['venue', 'payment', 'user'])->get();
        return Inertia::render('bookings/index', compact('bookings'));
    }
}
