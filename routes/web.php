<?php

use App\Http\Controllers\FacilityController;
use App\Http\Controllers\PurposeController;
use App\Http\Controllers\VenueController;
use App\Http\Controllers\VenueImageController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
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
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
