@extends('layouts.home')

@section('content')
		<section class="mx-auto mt-28 max-w-7xl px-4 pb-20">
				<!-- Header Section -->
				<div class="my-8">
						<div class="mb-6 flex items-center gap-4">
								<div class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-700">
										<svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
														d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4">
												</path>
										</svg>
								</div>
								<div>
										<h1 class="mb-1 text-2xl font-bold text-gray-800">{{ $venue->name }}</h1>
										<div class="flex items-center gap-2 text-gray-600">
												<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
																d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
														<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z">
														</path>
												</svg>
												<span class="text-base">{{ $venue->address }}</span>
										</div>
								</div>
						</div>
				</div>

				<div class="grid grid-cols-1 gap-12 lg:grid-cols-3">
						<!-- Images and Details -->
						<div class="space-y-8 lg:col-span-2">
								<!-- Image Slider -->
								<div class="relative overflow-hidden rounded-2xl bg-gray-100 shadow-xl">
										<div class="aspect-video">
												<div id="slider" class="relative h-full w-full overflow-hidden">
														<div class="slider-items flex h-full transition-transform duration-500 ease-out"
																style="width: {{ count($venue->venue_images) * 100 }}%;">
																@foreach ($venue->venue_images as $image)
																		<div class="h-full w-full flex-shrink-0" style="width: 100%;">
																				<img src="{{ asset('storage/' . $image->image_path) }}" alt="Gambar Gedung {{ $venue->name }}"
																						class="h-full w-full object-cover">
																		</div>
																@endforeach
														</div>

														<!-- Navigation Buttons -->
														@if (count($venue->venue_images) > 1)
																<button id="prevBtn"
																		class="group absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white">
																		<svg class="h-6 w-6 text-gray-700 group-hover:text-blue-600" fill="none" stroke="currentColor"
																				viewBox="0 0 24 24">
																				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
																		</svg>
																</button>
																<button id="nextBtn"
																		class="group absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white">
																		<svg class="h-6 w-6 text-gray-700 group-hover:text-blue-600" fill="none" stroke="currentColor"
																				viewBox="0 0 24 24">
																				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
																		</svg>
																</button>

																<!-- Slide Indicators -->
																<div class="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
																		@foreach ($venue->venue_images as $index => $image)
																				<button
																						class="slide-indicator h-3 w-3 rounded-full bg-white/60 transition-colors duration-200 hover:bg-white"
																						data-slide="{{ $index }}"></button>
																		@endforeach
																</div>
														@endif
												</div>
										</div>
								</div>

								<!-- Venue Details -->
								<div class="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
										<h2 class="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-800">
												<div class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
														<svg class="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
																		d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
														</svg>
												</div>
												Deskripsi Gedung
										</h2>

										<div class="space-y-6">
												<!-- Description -->
												<div class="rounded-xl bg-gray-50 p-6">
														<p class="text-lg leading-relaxed text-gray-700">{{ $venue->description }}</p>
												</div>

												<!-- Key Info Grid -->
												<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
														<!-- Capacity -->
														<div class="flex items-center gap-4 rounded-xl border border-green-100 bg-green-50 p-4">
																<div class="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500">
																		<svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
																						d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z">
																				</path>
																		</svg>
																</div>
																<div>
																		<p class="text-sm font-medium text-green-600">Kapasitas</p>
																		<p class="text-xl font-bold text-green-800">{{ $venue->capacity }} Orang</p>
																</div>
														</div>

														<!-- Price -->
														<div class="flex items-center gap-4 rounded-xl border border-blue-100 bg-blue-50 p-4">
																<div class="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500">
																		<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="h-6 w-6 text-white"
																				viewBox="0 0 24 24">
																				<text x="0" y="17" font-size="16" font-weight="bold" font-family="Arial, sans-serif">Rp</text>
																		</svg>
																</div>
																<div>
																		<p class="text-sm font-medium text-blue-600">Harga Per Hari</p>
																		<p class="text-xl font-bold text-blue-800">Rp {{ number_format($venue->base_price, 0, ',', '.') }}</p>
																</div>
														</div>
												</div>

												<!-- Purposes & Facilities -->
												<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
														<!-- Purposes -->
														<div class="rounded-xl border border-gray-200 bg-white p-6">
																<h3 class="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-800">
																		<svg class="h-5 w-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
																						d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2">
																				</path>
																		</svg>
																		Kegunaan
																</h3>
																<ul class="space-y-2">
																		@foreach ($venue->purposes as $purpose)
																				<li class="flex items-center gap-2 text-gray-700">
																						<div class="h-2 w-2 rounded-full bg-purple-500"></div>
																						{{ $purpose->name }}
																				</li>
																		@endforeach
																</ul>
														</div>

														<!-- Facilities -->
														<div class="rounded-xl border border-gray-200 bg-white p-6">
																<h3 class="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-800">
																		<svg class="h-5 w-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
																						d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4">
																				</path>
																		</svg>
																		Fasilitas
																</h3>
																<ul class="space-y-2">
																		@foreach ($venue->facilities as $facility)
																				<li class="flex items-center gap-2 text-gray-700">
																						<div class="h-2 w-2 rounded-full bg-orange-500"></div>
																						{{ $facility->name }}
																				</li>
																		@endforeach
																</ul>
														</div>
												</div>

												<!-- Building Condition -->
												<div class="rounded-xl border border-amber-200 bg-amber-50 p-6">
														<div class="flex items-center gap-3">
																<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500">
																		<svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
																						d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
																		</svg>
																</div>
																<div>
																		<p class="text-sm font-medium text-amber-600">Kondisi Bangunan</p>
																		<p class="text-lg font-semibold text-amber-800">{{ $venue->building_condition }}</p>
																</div>
														</div>
												</div>

												<!-- Contact Info -->
												<div class="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 p-6">
														<div class="flex items-start gap-3">
																<div
																		class="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
																		<svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
																						d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z">
																				</path>
																		</svg>
																</div>
																<div>
																		<p class="text-sm font-medium text-blue-600">Informasi Pemesanan</p>
																		<p class="leading-relaxed text-gray-700">
																				Untuk pemesanan jangka panjang, silahkan hubungi kami melalui nomor telepon yang tertera di halaman
																				kontak.
																		</p>
																</div>
														</div>
												</div>
										</div>
								</div>
						</div>

						<!-- Right Column - Booking Form -->
						<div class="lg:col-span-1">
								<div class="sticky top-8">
										<div class="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl">
												<div class="mb-6 text-center">
														<div
																class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-green-500 to-blue-500">
																<svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
																				d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-4h4v4m-4 0H9">
																		</path>
																</svg>
														</div>
														<h2 class="text-2xl font-bold text-gray-800">Pesan Gedung</h2>
														<p class="mt-2 text-gray-600">Isi formulir untuk melakukan pemesanan</p>
												</div>

												<form action="{{ route('bookings.store') }}" method="POST" enctype="multipart/form-data"
														class="space-y-6">
														@csrf
														<input type="hidden" name="venue_id" value="{{ $venue->id }}">
														<input type="hidden" name="user_id" value="{{ auth()->id() }}">

														<!-- Name Field -->
														<div>
																<label class="mb-2 block text-sm font-semibold text-gray-700">Nama Lengkap</label>
																@if (Auth::check())
																		<input type="text" name="name"
																				class="w-full rounded-xl border border-gray-300 p-4 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
																				value="{{ auth()->user()->name }}" required>
																@else
																		<input type="text" name="name"
																				class="w-full rounded-xl border border-gray-300 p-4 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
																				required>
																@endif
														</div>

														<!-- Email Field -->
														<div>
																<label class="mb-2 block text-sm font-semibold text-gray-700">Email</label>
																@if (Auth::check())
																		<input type="email" name="email"
																				class="w-full rounded-xl border border-gray-300 p-4 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
																				value="{{ auth()->user()->email }}" required>
																@else
																		<input type="email" name="email"
																				class="w-full rounded-xl border border-gray-300 p-4 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
																				required>
																@endif
														</div>

														<!-- Date Fields -->
														<div class="grid grid-cols-1 gap-4">
																<div>
																		<label class="mb-2 block text-sm font-semibold text-gray-700">Tanggal Mulai Acara</label>
																		<input type="date" name="event_start_date" id="event_start_date"
																				class="w-full rounded-xl border border-gray-300 p-4 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
																				required>
																</div>
																<div>
																		<label class="mb-2 block text-sm font-semibold text-gray-700">Tanggal Selesai Acara</label>
																		<input type="date" name="event_end_date" id="event_end_date"
																				class="w-full rounded-xl border border-gray-300 p-4 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
																				required>
																</div>
														</div>

														<!-- Purpose Field -->
														<div>
																<label class="mb-2 block text-sm font-semibold text-gray-700">Keperluan</label>
																<textarea name="purpose" rows="4"
																  class="w-full resize-none rounded-xl border border-gray-300 p-4 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
																  placeholder="Jelaskan keperluan acara Anda..." required></textarea>
														</div>

														<!-- Total Price -->
														<div>
																<label class="mb-2 block text-sm font-semibold text-gray-700">Total Harga</label>
																<div class="relative">
																		<input type="text" name="total_price" id="total_price"
																				class="w-full rounded-xl border border-gray-300 bg-gray-50 p-4 text-lg font-bold text-green-600"
																				readonly />
																		<div class="absolute right-4 top-1/2 -translate-y-1/2">
																				<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="h-6 w-6 text-green-600"
																						viewBox="0 0 24 24">
																						<text x="0" y="17" font-size="16" font-weight="bold" font-family="Arial, sans-serif">Rp</text>
																				</svg>
																		</div>

																</div>
														</div>

														<!-- File Upload -->
														<div>
																<label class="mb-2 block text-sm font-semibold text-gray-700">Upload KTP atau Identitas Lain</label>
																<div class="relative">
																		<input type="file" name="ktp_image" id="ktp_image" required
																				class="w-full rounded-xl border-2 border-dashed border-gray-300 p-4 transition-colors file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:font-semibold file:text-blue-700 hover:border-blue-400 hover:file:bg-blue-100">
																</div>

																<!-- Image Preview -->
																<div id="imagePreview" class="mt-4 hidden">
																		<div class="relative inline-block">
																				<img id="preview" src="#" alt="Preview"
																						class="h-32 max-w-full rounded-xl border border-gray-200 object-cover">
																				<div
																						class="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-500">
																						<svg class="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7">
																								</path>
																						</svg>
																				</div>
																		</div>
																</div>
														</div>

														<!-- Submit Button -->
														<button type="submit"
																class="w-full transform rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-blue-700 hover:to-blue-800 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
																<span class="flex items-center justify-center gap-2">
																		<svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
																						d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-4h4v4m-4 0H9">
																				</path>
																		</svg>
																		Pesan Sekarang
																</span>
														</button>
												</form>
										</div>
								</div>
						</div>
				</div>
		</section>
@endsection

@push('script')
		<script>
				document.addEventListener("DOMContentLoaded", function() {
						const startDateInput = document.getElementById("event_start_date");
						const endDateInput = document.getElementById("event_end_date");
						const totalPriceInput = document.getElementById("total_price");
						const basePrice = {{ $venue->base_price }};

						function calculateTotalPrice() {
								const startDate = new Date(startDateInput.value);
								const endDate = new Date(endDateInput.value);
								if (!isNaN(startDate) && !isNaN(endDate)) {
										let dayCount = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
										dayCount = dayCount > 0 ? dayCount + 1 : 1;
										totalPriceInput.value = "Rp " + (dayCount * basePrice).toLocaleString("id-ID");
								}
						}

						startDateInput.addEventListener("change", calculateTotalPrice);
						endDateInput.addEventListener("change", calculateTotalPrice);
				});

				// Image preview functionality
				document.getElementById('ktp_image').addEventListener('change', function(e) {
						const preview = document.getElementById('preview');
						const imagePreview = document.getElementById('imagePreview');

						if (e.target.files.length > 0) {
								preview.src = URL.createObjectURL(e.target.files[0]);
								imagePreview.classList.remove('hidden');
						} else {
								imagePreview.classList.add('hidden');
						}
				});

				// Enhanced slider functionality
				document.addEventListener("DOMContentLoaded", function() {
						const slider = document.querySelector('.slider-items');
						const slides = document.querySelectorAll('.slider-items > div');
						const prevBtn = document.getElementById('prevBtn');
						const nextBtn = document.getElementById('nextBtn');
						const indicators = document.querySelectorAll('.slide-indicator');

						if (!slider || slides.length === 0) return;

						let currentSlide = 0;
						const totalSlides = slides.length;

						function updateSlider() {
								const translateX = -(currentSlide * 100);
								slider.style.transform = `translateX(${translateX}%)`;

								// Update indicators
								indicators.forEach((indicator, index) => {
										if (index === currentSlide) {
												indicator.classList.add('bg-white');
												indicator.classList.remove('bg-white/60');
										} else {
												indicator.classList.add('bg-white/60');
												indicator.classList.remove('bg-white');
										}
								});
						}

						function nextSlide() {
								currentSlide = (currentSlide + 1) % totalSlides;
								updateSlider();
						}

						function prevSlide() {
								currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
								updateSlider();
						}

						// Only add event listeners if buttons exist
						if (prevBtn) prevBtn.addEventListener('click', prevSlide);
						if (nextBtn) nextBtn.addEventListener('click', nextSlide);

						// Indicator click functionality
						indicators.forEach((indicator, index) => {
								indicator.addEventListener('click', () => {
										currentSlide = index;
										updateSlider();
								});
						});

						// Auto-slide functionality (only if more than 1 slide)
						if (totalSlides > 1) {
								setInterval(nextSlide, 5000);
						}

						// Initialize
						updateSlider();
				});
		</script>
@endpush
