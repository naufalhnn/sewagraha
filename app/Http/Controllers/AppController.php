<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Venue;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth as FacadesAuth;
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

        return Inertia::render('details', compact('venue'));
    }

    public function bookings()
    {
        if (!FacadesAuth::check()) {
            return redirect()->route('login');
        }

        dd('tes page');
    }
}
