<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Payment extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'booking_id',
        'user_id',
        'payment_code',
        'total_price',
        'status',
        'paid_at',
    ];

    /**
     * The "booted" method of the model.
     *
     * @return void
     */
    protected static function booted()
    {
        static::creating(function ($payment) {
            if (empty($payment->payment_code)) {
                if (!empty($payment->venue_id)) {
                    $payment->payment_code = self::generateUniquePaymentCode($payment->booking_id);
                } else {
                    $payment->payment_code = self::generateUniquePaymentCode(0);
                }
            }
        });
    }

    /**
     * Generate a unique payment code with venue ID as part of the prefix.
     *
     * @param int $venueId
     * @return string
     */
    public static function generateUniquePaymentCode(int $bookingId)
    {
        $bookingIdPadded = str_pad((string)$bookingId, 3, '0', STR_PAD_LEFT);
        $prefix = "PAY{$bookingIdPadded}";

        $datePart = now()->format('Ymd');
        do {
            $randomPart = Str::upper(Str::random(5));
            $code = "{$prefix}-{$datePart}-{$randomPart}";
        } while (self::where('payment_code', $code)->exists());

        return $code;
    }

    public function booking()
    {
        return $this->belongsTo(Booking::class, 'booking_id', 'id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
