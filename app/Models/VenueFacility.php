<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class VenueFacility extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'venue_id',
        'facility_id',
    ];
}
