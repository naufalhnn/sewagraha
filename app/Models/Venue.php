<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Venue extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'description',
        'address',
        'capacity',
        'base_price',
        'building_condition',
    ];

    public function facilities()
    {
        return $this->belongsToMany(Facility::class, 'venue_facilities');
    }

    public function purposes()
    {
        return $this->belongsToMany(Purpose::class, 'venue_purposes');
    }

    public function venueImages()
    {
        return $this->hasMany(VenueImage::class, 'venue_id', 'id');
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class, 'venue_id', 'id');
    }
}
