@extends('layouts.home')

@section('content')
		{{-- Daftar Gedung Section --}}
		<section class="mx-auto mb-20 mt-28 max-w-6xl">
				<div class="text-primary mx-auto mb-10 flex flex-col justify-center gap-2 text-center">
						<h3 class="text-2xl font-bold">Daftar Gedung Tersedia</h3>
						<h5>Telusuri dan pilih gedung terbaik untuk kebutuhan Anda.</h5>
				</div>
				<div class="mx-auto flex w-full flex-col items-center justify-center gap-12 px-4 md:w-11/12 md:px-0">
						{{-- List Gedung --}}
						<div class="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
								@foreach ($venues as $venue)
										<div
												class="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
												<!-- Gambar Venue dengan Overlay -->
												<div class="relative overflow-hidden">
														<img src="{{ Storage::url($venue->venue_images->first()->image_path) }}"
																alt="Gambar Gedung {{ $venue->name }}"
																class="h-52 w-full object-cover transition-transform duration-300 group-hover:scale-105">
														<!-- Gradient Overlay -->
														<div
																class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
														</div>

														<!-- Badge Harga -->
														<div class="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 shadow-lg backdrop-blur-sm">
																<p class="text-sm font-bold text-gray-800">
																		Rp {{ number_format($venue->base_price, 0, ',', '.') }}
																		<span class="text-xs text-gray-600">/hari</span>
																</p>
														</div>
												</div>

												<!-- Konten Card -->
												<div class="p-6">
														<!-- Nama Venue -->
														<h2 class="mb-4 line-clamp-1 text-xl font-bold text-gray-800">
																{{ $venue->name }}
														</h2>

														<!-- Info Container -->
														<div class="mb-6 space-y-3">
																<!-- Alamat -->
																<div class="flex items-start gap-3">
																		<div class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50">
																				<img class="h-4 w-4" src="{{ asset('icons/location.svg') }}" alt="Lokasi Icon">
																		</div>
																		<p class="line-clamp-2 text-sm leading-relaxed text-gray-600">
																				{{ $venue->address }}
																		</p>
																</div>

																<!-- Kapasitas -->
																<div class="flex items-center gap-3">
																		<div class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-green-50">
																				<img class="h-4 w-4" src="{{ asset('icons/user-regular.svg') }}" alt="Kapasitas Icon">
																		</div>
																		<p class="text-sm text-gray-600">
																				<span class="font-semibold text-gray-800">{{ $venue->capacity }}</span> Orang
																		</p>
																</div>
														</div>

														<!-- Tombol Detail -->
														<form action="{{ route('details', $venue->id) }}" method="GET" class="w-full">
																@csrf
																<button type="submit"
																		class="w-full transform rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:from-blue-700 hover:to-blue-800 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
																		Lihat Detail
																		<span class="ml-2">→</span>
																</button>
														</form>
												</div>
										</div>
								@endforeach
						</div>

				</div>
		</section>
@endsection
