@extends('layouts.home')

@section('content')
		{{-- Hero Section --}}
		<section class="mx-auto mb-20 max-w-6xl">
				<div class="flex flex-col items-center justify-between gap-10 md:flex-row">
						<div class="flex w-full flex-col gap-3 px-4 md:w-1/2 md:gap-10 md:px-0">
								<h1 class="text-2xl font-bold leading-normal text-gray-700 md:text-4xl">Rayakan Setiap Momen Spesial di Tempat
										yang Elegan
										dan Nyaman
								</h1>
								<p class="w-full text-xs font-normal leading-normal text-gray-500 md:w-4/5 md:text-sm">Anda
										sedang merencanakan
										pernikahan,
										seminar, meeting,
										pameran,
										atau acara
										spesial lainnya?
										Kami
										menyediakan gedung dengan kapasitas fleksibel, fasilitas modern dan area parkir luas dengan harga yang
										terjangkau dan paket yang dapat disesuaikan dengan kebutuhan Anda!</p>
								<div class="mt-6 flex w-full flex-col justify-between gap-2 md:w-4/5 md:flex-row">
										<form class="w-full" action="{{ route('venues') }}" method="GET">
												<button
														class="bg-primary flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg py-3 font-medium text-white shadow-xl transition duration-300 hover:bg-blue-700">Pesan
														Sekarang<span><img src="{{ asset('icons/Arrow_drop_right.svg') }}" alt="Arrow icon"></span></button>
										</form>
										<form class="w-full" action="{{ route('contact') }}" method="GET">
												<button
														class="text-primary outline-primary flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-white py-3 font-medium shadow-xl outline transition duration-300 hover:bg-blue-50">Hubungi
														Kami<span><img src="{{ asset('icons/Arrow_drop_right_blue.svg') }}" alt="Arrow icon"></span></button>
										</form>
								</div>
						</div>
						<div class="hidden md:block md:w-1/2"><img src="{{ asset('images/hero.png') }}" alt="Hero image"></div>
				</div>
		</section>

		{{-- Mengapa Kami? --}}
		<section class="mx-auto mb-20 max-w-6xl">
				<div class="flex flex-col items-center justify-between gap-10 md:flex-row">
						<div class="relative flex flex-col items-center">
								<img class="-ml-48 w-52 rounded-lg border-4 border-white shadow-lg md:-ml-40 md:w-80"
										src="{{ asset('images/image1.png') }}" alt="gambar1">
								<img class="z-10 -mt-20 ml-48 w-52 rounded-lg border-4 border-white shadow-lg md:ml-60 md:w-80"
										src="{{ asset('images/image2.png') }}" alt="gambar1">
								<img class="z-20 -ml-40 -mt-12 w-52 rounded-lg border-4 border-white shadow-lg md:-ml-64 md:-mt-28 md:w-80"
										src="{{ asset('images/image3.png') }}" alt="gambar1">
						</div>
						<div class="flex flex-col">
								<div class="text-primary my-8 text-center text-2xl font-bold md:text-left">
										<h3>Kenapa Memilih Kami?</h3>
								</div>
								<div class="px-4 md:px-0">
										<div class="my-4 flex w-full flex-col gap-1 md:w-2/3">
												<h4 class="text-xl font-semibold"><span class="font-light">01. </span>Beragam Pilihan</h4>
												<p class="ml-8 text-sm font-normal text-gray-500">Gedung untuk berbagai acara, dari pernikahan hingga
														seminar.
												</p>
										</div>
										<div class="my-4 flex w-full flex-col gap-1 md:w-2/3">
												<h4 class="text-xl font-semibold"><span class="font-light">02. </span>Harga Transparan</h4>
												<p class="ml-8 text-sm font-normal text-gray-500">Tidak ada biaya tersembunyi, harga jelas dan
														kompetitif.
												</p>
										</div>
										<div class="my-4 flex w-full flex-col gap-1 md:w-2/3">
												<h4 class="text-xl font-semibold"><span class="font-light">03. </span>Proses Cepat dan Mudah</h4>
												<p class="ml-8 text-sm font-normal text-gray-500">Sistem booking online yang praktis.
												</p>
										</div>
										<div class="my-4 flex w-full flex-col gap-1 md:w-2/3">
												<h4 class="text-xl font-semibold"><span class="font-light">04. </span>Lokasi Strategis</h4>
												<p class="ml-8 text-sm font-normal text-gray-500">Pilihan gedung di berbagai Lokasi utama.
												</p>
										</div>
								</div>
						</div>
				</div>
		</section>

		{{-- List Gedung --}}
		<section class="mx-auto mb-20 max-w-6xl">
				<div class="text-primary mx-auto mb-10 flex w-full px-4 text-center text-2xl font-bold md:w-1/4 md:px-0">
						<h3>Tempat Favorit yang Bisa Anda Pesan</h3>
				</div>
				<div>
						{{-- card --}}
						<div class="no-scrollbar flex space-x-4 overflow-x-auto p-4">
								@foreach ($venues as $venue)
										<div class="bg-secondary flex w-[250px] flex-col justify-between overflow-hidden rounded-lg p-3 shadow-lg">
												<img src="{{ Storage::url($venue->venue_images->first()->image_path) }}" alt="Gambar Card"
														class="h-48 w-full rounded-lg object-cover">
												<div class="px-3">
														<h2 class="text-left text-lg font-semibold text-gray-700">{{ $venue->name }}</h2>
												</div>
												<div class="px-3">
														<div class="mt-2 flex items-center gap-2">
																<div class="rounded-md bg-white p-1"><img class="w-2.5" src="{{ asset('icons/location.svg') }}"
																				alt="">
																</div>
																<p class="text-left text-sm text-gray-700">{{ $venue->address }}</p>
														</div>
														<div class="mt-2 flex items-center gap-2">
																<div class="rounded-md bg-white p-1"><img class="w-2.5" src="{{ asset('icons/user-regular.svg') }}"
																				alt="">
																</div>
																<p class="text-left text-sm text-gray-700">{{ $venue->capacity }} Orang</p>
														</div>
														<form action="{{ route('details', $venue->id) }}">
																@csrf
																@method('GET')
																<button type="submit"
																		class="bg-primary mt-4 cursor-pointer rounded-lg px-4 py-2 text-white transition duration-300 hover:bg-blue-700">Pesan
																		Sekarang</button>
														</form>
												</div>
										</div>
								@endforeach

						</div>
				</div>
		</section>

		{{-- Contact us --}}
		<section class="mx-auto mb-20 max-w-6xl">
				<div class="text-primary mx-auto mb-10 flex justify-center text-center text-2xl font-bold">
						<h3>Hubungi Kami</h3>
				</div>
				<div class="mx-auto flex w-full flex-col items-center justify-center gap-12 px-4 md:w-11/12 md:flex-row md:px-0">
						<div class="w-full md:w-1/2">
								<form action="#" class="text-gray-700">
										<div class="mb-4 flex flex-col">
												<label for="name">Nama:</label>
												<input class="outline-primary mt-1 h-10 w-full rounded border border-gray-300 p-2" type="text"
														id="name" name="name" required>
										</div>
										<div class="mb-4 flex flex-col">
												<label for="email">Email:</label>
												<input class="outline-primary mt-1 h-10 w-full rounded border border-gray-300 p-2" type="email"
														id="email" name="email" required>
										</div>
										<div class="mb-4 flex flex-col">
												<label for="message">Pesan:</label>
												<textarea class="outline-primary mt-1 h-40 w-full rounded border border-gray-300 p-2" id="message" name="message"
												  required></textarea>
										</div>
										<button
												class="bg-primary mt-4 cursor-pointer rounded-lg px-4 py-2 text-white transition duration-300 hover:bg-blue-700"
												type="submit">Kirim</button>
								</form>
						</div>
						<div class="w-full px-4 md:w-1/2 md:px-0">
								<div class="my-3 text-lg font-semibold">
										<p>BPKD Kabupaten Pekalongan</p>
								</div>
								<div><iframe
												src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.857698358517!2d109.58716157456408!3d-7.026007792975761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e701fecf4d9b4ed%3A0xfb3527f5801c3eea!2sBPKD%20Kabupaten%20Pekalongan!5e0!3m2!1sen!2sid!4v1740172946012!5m2!1sen!2sid"
												class="w-full md:h-60" style="border:0;" allowfullscreen="" loading="lazy"
												referrerpolicy="no-referrer-when-downgrade"></iframe></div>
								<div class="mt-6 flex flex-col gap-1">
										<div class="flex items-center gap-2">
												<img class="w-3" src="{{ asset('icons/location.svg') }}" alt="">
												<p class="text-left text-base text-gray-700">Kajen, Pekalongan</p>
										</div>
										<div class="flex items-center gap-2">
												<img class="w-3" src="{{ asset('icons/Phone.svg') }}" alt="">
												<p class="text-left text-base text-gray-700">081234567890</p>
										</div>
										<div class="flex items-center gap-2">
												<img class="w-3" src="{{ asset('icons/Email.svg') }}" alt="">
												<p class="text-left text-base text-gray-700">contact@bpkd.pekalongankab.go.id</p>
										</div>
								</div>
						</div>
				</div>
		</section>
@endsection
