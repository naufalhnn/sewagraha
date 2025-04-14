<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Facility;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FacilityController extends Controller
{
    public function index()
    {
        $facilities = Facility::all();
        return Inertia::render('facilities/index', compact('facilities'));
    }

    public function create()
    {
        return Inertia::render('facilities/create');
    }

    public function store(Request $request)
    {
        $data = $request->all();
        Facility::create($data);

        return redirect()->route('facilities.index')->with('success', 'Fasilitas berhasil ditambahkan.');
    }

    public function edit(string $id)
    {
        $facility = Facility::findOrFail($id);

        return Inertia::render('facilities/edit', compact('facility'));
    }

    public function update(Request $request, string $id)
    {
        $facility = Facility::findOrFail($id);
        $data = $request->all();

        $facility->update($data);

        return redirect()->route('facilities.index')->with('success', 'Fasilitas berhasil diubah.');
    }

    public function destroy(string $id)
    {
        $facility = Facility::findOrFail($id);
        $facility->delete();

        return redirect()->route('facilities.index')->with('success', 'Fasilitas berhasil dihapus.');
    }
}
