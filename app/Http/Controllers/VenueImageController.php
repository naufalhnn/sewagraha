<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\VenueImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class VenueImageController extends Controller
{
    public function destroy(string $id)
    {
        $image = VenueImage::findOrFail($id);

        if (Storage::exists($image->image_path)) {
            Storage::delete($image->image_path);
        }

        $image->delete();

        return back()->with('success', 'Gambar berhasil dihapus.');
    }
}
