<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Facility;
use App\Models\Purpose;
use App\Models\Venue;
use App\Models\VenueImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Storage;
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
        $facilities = Facility::all();
        $purposes = Purpose::all();
        return Inertia::render('venues/create', compact('facilities', 'purposes'));
    }

    public function store(Request $request)
    {
        $venue = Venue::create([
            'name' => $request->name,
            'description' => $request->description,
            'address' => $request->address,
            'capacity' => $request->capacity,
            'base_price' => $request->base_price,
            'building_condition' => $request->building_condition,
        ]);

        $venue->facilities()->sync($request->input('facilities', []));
        $venue->purposes()->sync($request->input('purposes', []));

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('venue_images', 'public');

                VenueImage::create([
                    'venue_id' => $venue->id,
                    'image_path' => $path,
                ]);
            }
        }

        return redirect()->route('venues.index')->with('success', 'Data gedung berhasil disimpan.');
    }

    public function edit(string $id)
    {
        $venue = Venue::with(['facilities', 'purposes', 'venue_images'])->findOrFail($id);
        $facilities = Facility::all();
        $purposes = Purpose::all();

        return Inertia::render('venues/edit', compact('venue', 'facilities', 'purposes'));
    }

    public function update(Request $request, string $id)
    {
        $venue = Venue::findOrFail($id);
        $venue->update([
            'name' => $request->name,
            'description' => $request->description,
            'address' => $request->address,
            'capacity' => $request->capacity,
            'base_price' => $request->base_price,
            'building_condition' => $request->building_condition,
        ]);

        $venue->facilities()->sync($request->facilities ?? []);
        $venue->purposes()->sync($request->purposes ?? []);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('venue_images', 'public');

                $venue->venue_images()->create([
                    'image_path' => $path
                ]);
            }
        }

        return redirect()->route('venues.index')->with('success', 'Venue berhasil diperbarui.');
    }

    public function show(string $id)
    {
        $venue = Venue::with(['facilities', 'purposes', 'venue_images'])->findOrFail($id);
        $facilities = Facility::all();
        $purposes = Purpose::all();

        return Inertia::render('venues/show', compact('venue', 'facilities', 'purposes'));
    }

    public function destroy(string $id)
    {
        $venue = Venue::findOrFail($id);

        $venue->delete();

        $venue->facilities()->detach();
        $venue->purposes()->detach();

        foreach ($venue->venueImages() as $image) {
            Storage::disk('public')->delete($image->venue_images);

            $image->delete();
        }

        return redirect()->route('venues.index')->with('success' . 'Data gedung berhasil dihapus.');
    }
}
