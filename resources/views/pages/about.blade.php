@extends('layouts.home')

@section('content')
		{{-- About Us Section --}}
		<section class="mx-auto mb-20 max-w-6xl">
				<div class="text-primary mx-auto mb-10 flex justify-center text-center text-2xl font-bold">
						<h3>Tentang Kami</h3>
				</div>
				<div class="mx-auto flex w-full flex-col items-center justify-center gap-12 px-4 md:w-11/12 md:flex-row md:px-0">
						{{-- Logo Section --}}
						<div class="flex w-full justify-center md:w-1/2">
								<img src="{{ asset('icons/LogoKabPekalongan.png') }}" alt="Logo Sewagraha BPKD Kabupaten Pekalongan"
										class="h-64 w-64 object-contain">
						</div>

						{{-- Deskripsi Section --}}
						<div class="w-full md:w-1/2">
								<div class="text-gray-700">
										<h2 class="mb-4 text-2xl font-bold">Sewagraha BPKD Kabupaten Pekalongan</h2>
										<p class="mb-4 text-sm leading-relaxed">
												Sewagraha BPKD Kabupaten Pekalongan adalah penyedia layanan gedung serbaguna yang elegan dan nyaman untuk
												berbagai acara, mulai dari pernikahan, seminar, meeting, pameran, hingga acara spesial lainnya. Kami hadir
												untuk memastikan setiap momen berharga Anda dirayakan di tempat yang tepat.
										</p>
										<p class="mb-4 text-sm leading-relaxed">
												Dengan fasilitas modern, kapasitas fleksibel, dan lokasi strategis, kami menawarkan pengalaman tak terlupakan
												bagi setiap pelanggan. Tim kami siap membantu Anda merencanakan acara dengan sempurna, mulai dari pemilihan
												gedung hingga penyediaan fasilitas pendukung.
										</p>
										<p class="mb-4 text-sm leading-relaxed">
												Kami berkomitmen untuk memberikan layanan terbaik dengan harga transparan dan proses yang mudah. Percayakan
												acara Anda kepada kami, dan nikmati kemudahan serta kenyamanan yang kami tawarkan.
										</p>
								</div>
						</div>
				</div>
		</section>

		{{-- Visi & Misi Section --}}
		<section class="mx-auto mb-20 max-w-6xl">
				<div class="text-primary mx-auto mb-10 flex justify-center text-center text-2xl font-bold">
						<h3>Visi & Misi</h3>
				</div>
				<div class="mx-auto flex w-full flex-col items-center justify-center gap-12 px-4 md:w-11/12 md:flex-row md:px-0">
						{{-- Visi --}}
						<div class="w-full md:w-1/2">
								<div class="text-gray-700">
										<h4 class="mb-4 text-xl font-bold">Visi</h4>
										<p class="text-sm leading-relaxed">
												Menjadi penyedia gedung serbaguna terbaik di Kabupaten Pekalongan yang dikenal dengan pelayanan prima,
												fasilitas modern, dan kepuasan pelanggan.
										</p>
								</div>
						</div>

						{{-- Misi --}}
						<div class="w-full md:w-1/2">
								<div class="text-gray-700">
										<h4 class="mb-4 text-xl font-bold">Misi</h4>
										<ul class="list-inside list-disc text-sm leading-relaxed">
												<li>Menyediakan gedung serbaguna dengan fasilitas lengkap dan modern.</li>
												<li>Memberikan pelayanan terbaik dengan tim profesional yang ramah dan responsif.</li>
												<li>Menjaga transparansi harga dan kemudahan proses pemesanan.</li>
												<li>Mendukung keberhasilan acara pelanggan dengan solusi yang kreatif dan inovatif.</li>
										</ul>
								</div>
						</div>
				</div>
		</section>
@endsection
