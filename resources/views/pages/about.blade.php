@extends('layouts.home')

@section('content')
		<section class="mt-16 py-16 md:py-20">
				<div class="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
						<div class="mb-12 text-center">
								<h2 class="text-primary text-3xl font-bold tracking-tight sm:text-4xl">
										Tentang Kami
								</h2>
						</div>

						<div class="overflow-hidden rounded-xl bg-white shadow-lg">
								<div class="flex flex-col items-center gap-8 p-6 md:flex-row md:p-10 lg:gap-12">
										{{-- Logo Section --}}
										<div class="flex w-full flex-shrink-0 justify-center md:w-2/5 lg:w-1/3">
												<img src="{{ asset('icons/LogoKabPekalongan.png') }}" alt="Logo Sewagraha BPKD Kabupaten Pekalongan"
														class="h-56 w-56 rounded-lg object-contain md:h-60 md:w-60 lg:h-64 lg:w-64">
										</div>

										{{-- Deskripsi Section --}}
										<div class="w-full md:w-3/5 lg:w-2/3">
												<div class="text-slate-700">
														<h3 class="mb-4 text-2xl font-semibold text-slate-800">Sewagraha BPKD Kabupaten Pekalongan</h3>
														<div class="space-y-4 text-base leading-relaxed text-slate-600">
																<p>
																		Sewagraha BPKD Kabupaten Pekalongan adalah penyedia layanan gedung serbaguna yang elegan dan nyaman
																		untuk
																		berbagai acara, mulai dari pernikahan, seminar, meeting, pameran, hingga acara spesial lainnya. Kami
																		hadir
																		untuk memastikan setiap momen berharga Anda dirayakan di tempat yang tepat.
																</p>
																<p>
																		Dengan fasilitas modern, kapasitas fleksibel, dan lokasi strategis, kami menawarkan pengalaman tak
																		terlupakan
																		bagi setiap pelanggan. Tim kami siap membantu Anda merencanakan acara dengan sempurna, mulai dari
																		pemilihan
																		gedung hingga penyediaan fasilitas pendukung.
																</p>
																<p>
																		Kami berkomitmen untuk memberikan layanan terbaik dengan harga transparan dan proses yang mudah.
																		Percayakan
																		acara Anda kepada kami, dan nikmati kemudahan serta kenyamanan yang kami tawarkan.
																</p>
														</div>
												</div>
										</div>
								</div>
						</div>
				</div>
		</section>

		{{-- Visi & Misi Section --}}
		<section class="py-16 md:py-20">
				<div class="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
						<div class="mb-12 text-center">
								<h2 class="text-primary text-3xl font-bold tracking-tight sm:text-4xl">
										Visi & Misi
								</h2>
						</div>

						<div class="overflow-hidden rounded-xl bg-white shadow-lg">
								<div class="flex flex-col gap-8 p-6 md:flex-row md:p-10 lg:gap-12">
										{{-- Visi --}}
										<div class="w-full md:w-1/2">
												<div class="text-slate-700">
														<h4 class="mb-3 text-xl font-semibold text-slate-800 md:mb-4">Visi</h4>
														<p class="text-base leading-relaxed text-slate-600">
																Menjadi penyedia gedung serbaguna terbaik di Kabupaten Pekalongan yang dikenal dengan pelayanan prima,
																fasilitas modern, dan kepuasan pelanggan.
														</p>
												</div>
										</div>

										{{-- Misi --}}
										<div class="w-full md:w-1/2">
												<div class="text-slate-700">
														<h4 class="mb-3 text-xl font-semibold text-slate-800 md:mb-4">Misi</h4>
														<ul class="list-inside list-disc space-y-2 text-base leading-relaxed text-slate-600">
																<li>Menyediakan gedung serbaguna dengan fasilitas lengkap dan modern.</li>
																<li>Memberikan pelayanan terbaik dengan tim profesional yang ramah dan responsif.</li>
																<li>Menjaga transparansi harga dan kemudahan proses pemesanan.</li>
																<li>Mendukung keberhasilan acara pelanggan dengan solusi yang kreatif dan inovatif.</li>
														</ul>
												</div>
										</div>
								</div>
						</div>
				</div>
		</section>
@endsection
