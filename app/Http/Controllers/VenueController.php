<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Venue;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VenueController extends Controller
{
    public function index()
    {
        $venues = Venue::all();

        return Inertia::render('venues/index', compact('venues'));
    }

    public function create()
    {
        return Inertia::render('venues/create');
    }
}
