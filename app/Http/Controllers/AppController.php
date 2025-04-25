<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Venue;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth as FacadesAuth;

class AppController extends Controller
{
    public function index()
    {
        $venues = Venue::with(['venue_images'])->get();
        return view('pages.index', compact('venues'));
    }

    public function contact()
    {
        return view('pages.contact');
    }

    public function about()
    {
        return view('pages.about');
    }

    public function venues()
    {
        $venues = Venue::with(['venue_images'])->get();

        return view('pages.venues', compact('venues'));
    }

    public function details(string $id)
    {
        $venue = Venue::with(['venue_images'])->findOrFail($id);

        return view('pages.details', compact('venue'));
    }

    public function bookings()
    {
        if (!FacadesAuth::check()) {
            return redirect()->route('login');
        }

        dd('tes page');
    }
}
