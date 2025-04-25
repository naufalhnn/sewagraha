@extends('layouts.home')

@section('content')
		{{-- Daftar Gedung Section --}}
		<section class="mx-auto mb-20 max-w-6xl">
				<div class="text-primary mx-auto mb-10 flex justify-center text-center text-2xl font-bold">
						<h3>Daftar Gedung Tersedia</h3>
				</div>
				<div class="mx-auto flex w-full flex-col items-center justify-center gap-12 px-4 md:w-11/12 md:px-0">
						{{-- List Gedung --}}
						<div class="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
								@foreach ($venues as $venue)
										<div class="bg-secondary overflow-hidden rounded-lg shadow-lg">
												<img src="{{ Storage::url($venue->venue_images->first()->image_path) }}" alt="Gambar Gedung {{ $venue->name }}"
														class="h-48 w-full object-cover">
												<div class="p-4">
														<h2 class="text-left text-lg font-semibold text-gray-700">{{ $venue->name }}</h2>
														<div class="mt-2 flex items-center gap-2">
																<div class="rounded-md bg-white p-1">
																		<img class="w-2.5" src="{{ asset('icons/location.svg') }}" alt="Lokasi Icon">
																</div>
																<p class="text-left text-sm text-gray-700">{{ $venue->address }}</p>
														</div>
														<div class="mt-2 flex items-center gap-2">
																<div class="rounded-md bg-white p-1">
																		<img class="w-2.5" src="{{ asset('icons/user-regular.svg') }}" alt="Kapasitas Icon">
																</div>
																<p class="text-left text-sm text-gray-700">{{ $venue->capacity }} Orang</p>
														</div>
														<div class="mt-2 flex items-center gap-2">
																<div class="rounded-md bg-white p-1">
																		<img class="w-2.5" src="{{ asset('icons/money.svg') }}" alt="Harga Icon">
																</div>
																<p class="text-left text-sm text-gray-700">Rp {{ number_format($venue->base_price, 0, ',', '.') }} / Hari
																</p>
														</div>
														<form action="{{ route('details', $venue->id) }}" method="GET">
																@csrf
																<button type="submit"
																		class="bg-primary mt-4 w-full cursor-pointer rounded-lg px-4 py-2 text-white transition duration-300 hover:bg-blue-700">
																		Lihat Detail
																</button>
														</form>
												</div>
										</div>
								@endforeach
						</div>
				</div>
		</section>
@endsection
