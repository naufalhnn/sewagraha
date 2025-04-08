<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FacilityController extends Controller
{
    public function index()
    {
        return Inertia::render('facilities/index');
    }

    public function create()
    {
        return Inertia::render('facilities/create');
    }
}
