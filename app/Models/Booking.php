<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Booking extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'venue_id',
        'booking_code',
        'event_start_date',
        'event_end_date',
        'purpose',
        'total_price',
        'ktp_image_path',
        'status',
    ];

    /**
     * The "booted" method of the model.
     *
     * @return void
     */
    protected static function booted()
    {
        static::creating(function ($booking) {
            // Generate booking code jika belum ada
            if (empty($booking->booking_code)) {
                // Pastikan venue_id sudah ada di instance $booking
                // venue_id seharusnya sudah di-set sebelum event 'creating' terpanggil
                // jika $booking dibuat melalui Booking::create([... 'venue_id' => id_gedung ...])
                // atau $booking = new Booking; $booking->venue_id = id_gedung;
                if (!empty($booking->venue_id)) {
                    $booking->booking_code = self::generateUniqueBookingCode($booking->venue_id);
                } else {
                    // Fallback jika venue_id tidak ada (seharusnya tidak terjadi jika validasi benar)
                    // Atau Anda bisa throw exception di sini
                    $booking->booking_code = self::generateUniqueBookingCode(0); // Menggunakan ID 0 atau prefix default
                }
            }
        });
    }

    /**
     * Generate a unique booking code with venue ID as part of the prefix.
     *
     * @param int $venueId
     * @return string
     */
    public static function generateUniqueBookingCode(int $venueId)
    {
        $venueIdPadded = str_pad((string)$venueId, 3, '0', STR_PAD_LEFT);
        $prefix = "GD{$venueIdPadded}";

        $datePart = now()->format('Ymd');
        do {
            $randomPart = Str::upper(Str::random(5));
            $code = "{$prefix}-{$datePart}-{$randomPart}";
        } while (self::where('booking_code', $code)->exists());

        return $code;
    }

    public function venue()
    {
        return $this->belongsTo(Venue::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function payment()
    {
        return $this->belongsTo(Payment::class, 'id', 'booking_id');
    }
}
