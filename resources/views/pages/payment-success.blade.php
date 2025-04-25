<!-- resources/views/success.blade.php -->
@extends('layouts.home')

@section('content')
		<div class="flex h-screen items-center justify-center">
				<div class="w-full max-w-md overflow-hidden rounded-lg bg-white shadow-lg">
						<div class="bg-green-500 p-6 text-center">
								<div class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white">
										<img class="w-12" src="{{ asset('icons/check.svg') }}" alt=""></i>
								</div>
						</div>

						<div class="p-6">
								<h1 class="mb-4 text-center text-2xl font-bold text-gray-800">Pemesanan Berhasil!</h1>

								<div class="mb-6 rounded-lg border border-green-200 bg-green-50 p-4">
										<p class="mb-2 text-gray-700">Terima kasih atas pemesanan Anda. Pembayaran telah kami terima.</p>
										<p class="mb-2 text-gray-700">Tim kami akan menghubungi Anda dalam <span class="font-bold">1 x 24 jam</span>
												melalui
												email atau telepon untuk konfirmasi lebih lanjut.</p>
								</div>

								<div class="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
										<p class="mb-2 font-bold text-gray-700">Jika ada kendala, silakan hubungi:</p>
										<ul class="text-gray-700">
												<li class="mb-2 flex items-center">
														<i class="fas fa-phone mr-2 text-blue-500"></i>
														<span>0812-3456-7890</span>
												</li>
												<li class="flex items-center">
														<i class="fas fa-envelope mr-2 text-blue-500"></i>
														<span>support@example.com</span>
												</li>
										</ul>
								</div>

								<div class="text-center">
										<a href="{{ route('home') }}"
												class="inline-block rounded-lg bg-blue-500 px-6 py-3 font-medium text-white transition duration-300 hover:bg-blue-600">
												Kembali ke Beranda
										</a>
								</div>
						</div>
				</div>
		</div>
@endsection
