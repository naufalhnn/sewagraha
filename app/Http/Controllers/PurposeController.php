<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Purpose;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PurposeController extends Controller
{
    public function index()
    {
        $purposes = Purpose::all();
        return Inertia::render('purposes/index', compact('purposes'));
    }

    public function create()
    {
        return Inertia::render('purposes/create');
    }

    public function store(Request $request)
    {
        $purposes = $request->all();

        Purpose::create($purposes);

        return redirect()->route('purposes.index')->with('success', 'Kegunaan berhasil ditambah.');
    }

    public function edit(string $id)
    {
        $purpose = Purpose::findOrFail($id);
        return Inertia::render('purposes/edit', compact('purpose'));
    }

    public function update(Request $request, string $id)
    {
        $purpose = Purpose::findOrFail($id);
        $data = $request->all();

        $purpose->update($data);

        return redirect()->route('purposes.index')->with('success', 'Kegunaan berhasil diubah.');
    }

    public function destroY(string $id)
    {
        $purpose = Purpose::findOrFail($id);

        $purpose->delete();

        return redirect()->route('purposes.index')->with('success', 'Kegunaan berhasil dihapus.');
    }
}
