<?php

use App\Http\Controllers\FacilityController;
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
    Route::delete('facilities/delete/{id}', [FacilityController::class, 'destroy'])->name('facilities.destroy');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
