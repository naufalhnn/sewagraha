<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class VenueImage extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'venue_id',
        'image_path',
    ];

    public function venue()
    {
        return $this->belongsTo(Venue::class);
    }
}
