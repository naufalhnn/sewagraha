<?php

use App\Http\Controllers\AppController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\FacilityController;
use App\Http\Controllers\PurposeController;
use App\Http\Controllers\VenueController;
use App\Http\Controllers\VenueImageController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [AppController::class, 'index'])->name('home');
Route::get('venues', [AppController::class, 'venues'])->name('venues');
Route::get('contact', [AppController::class, 'contact'])->name('contact');
Route::get('{id}/details', [AppController::class, 'details'])->name('details');
Route::get('about', [AppController::class, 'about'])->name('about');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('history', [AppController::class, 'history'])->name('history');
    Route::get('history/{booking_code}/show', [AppController::class, 'bookingDetail'])->name('bookings.detail');
    Route::put('history/{booking_code}/cancel', [AppController::class, 'bookingCancel'])->name('bookings.cancel');

    Route::post('bookings', [AppController::class, 'bookings'])->name('bookings.store');
    Route::get('bookings/{booking_code}/payment', [AppController::class, 'payment'])->name('bookings.payment');
    Route::post('bookings/{booking_code}/store', [AppController::class, 'paymentStore'])->name('bookings.payment.store');
    Route::get('bookings/{payment_code}/success', [AppController::class, 'paymentSuccess'])->name('bookings.payment.success');
});

Route::post('bookings', [AppController::class, 'bookings'])->name('bookings.store');

Route::prefix('admin')->middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('facilities', [FacilityController::class, 'index'])->name('facilities.index');
    Route::get('facilities/create', [FacilityController::class, 'create'])->name('facilities.create');
    Route::post('facilities/store', [FacilityController::class, 'store'])->name('facilities.store');
    Route::get('facilities/{id}/edit', [FacilityController::class, 'edit'])->name('facilities.edit');
    Route::put('facilities/{id}/update', [FacilityController::class, 'update'])->name('facilities.update');
    Route::delete('facilities/{id}/delete', [FacilityController::class, 'destroy'])->name('facilities.destroy');

    Route::get('venues', [VenueController::class, 'index'])->name('venues.index');
    Route::get('venues/create', [VenueController::class, 'create'])->name('venues.create');
    Route::post('venues/store', [VenueController::class, 'store'])->name('venues.store');
    Route::get('venues/{id}/edit', [VenueController::class, 'edit'])->name('venues.edit');
    Route::put('venues/{id}/update', [VenueController::class, 'update'])->name('venues.update');
    Route::delete('venues/{id}/destroy', [VenueController::class, 'destroy'])->name('venues.destroy');
    Route::get('venues/{id}/show', [VenueController::class, 'show'])->name('venues.show');

    Route::delete('venue-images/{id}/delete', [VenueImageController::class, 'destroy'])->name('venue-images.destroy');

    Route::get('purposes', [PurposeController::class, 'index'])->name('purposes.index');
    Route::get('purposes/create', [PurposeController::class, 'create'])->name('purposes.create');
    Route::post('purposes/store', [PurposeController::class, 'store'])->name('purposes.store');
    Route::get('purposes/{id}/edit', [PurposeController::class, 'edit'])->name('purposes.edit');
    Route::put('purposes/{id}/update', [PurposeController::class, 'update'])->name('purposes.update');
    Route::delete('purposes/{id}/delete/', [PurposeController::class, 'destroy'])->name('purposes.destroy');

    Route::get('bookings', [BookingController::class, 'index'])->name('bookings.index');
    Route::get('bookings/{id}/edit', [BookingController::class, 'edit'])->name('bookings.edit');
    Route::get('bookings/{id}/show', [BookingController::class, 'show'])->name('bookings.show');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
