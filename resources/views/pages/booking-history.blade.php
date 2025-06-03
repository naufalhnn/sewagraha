@extends('layouts.home')

@section('content')
		<section class="mx-auto mt-28 max-w-4xl px-4 pb-20">
				<div class="text-primary my-5 text-center text-3xl font-bold">
						<h1>Riwayat Pemesanan</h1>
				</div>

				<div class="space-y-6">
						<div class="rounded-xl bg-white p-6 shadow-md">
								<h2 class="text-xl font-semibold text-gray-800">Gedung Serbaguna A</h2>
								<p class="text-gray-600">Tanggal Pemesanan: 10 April 2025</p>
								<p class="text-gray-600">Periode Sewa: 15 April 2025 - 16 April 2025</p>
								<p class="text-gray-600">Total Harga: <strong>Rp 2.000.000</strong> - <span class="text-red-500">Belum
												Dibayar</span></p>
								<p class="text-gray-600">Status: <span class="font-medium text-yellow-500">Pending</span></p>
								<a href="#" class="mt-3 inline-block rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
										Bayar
								</a>
						</div>

						<div class="rounded-xl bg-white p-6 shadow-md">
								<h2 class="text-xl font-semibold text-gray-800">Lapangan Futsal BPKD</h2>
								<p class="text-gray-600">Tanggal Pemesanan: 5 April 2025</p>
								<p class="text-gray-600">Periode Sewa: 8 April 2025</p>
								<p class="text-gray-600">Total Harga: <strong>Rp 500.000</strong></p>
								<p class="text-gray-600">Status: <span class="font-medium text-green-600">Disetujui</span></p>
								<a href="#" class="mt-3 inline-block rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
										Lihat Detail
								</a>
						</div>

						<div class="rounded-xl bg-white p-6 shadow-md">
								<h2 class="text-xl font-semibold text-gray-800">Gedung Kesenian</h2>
								<p class="text-gray-600">Tanggal Pemesanan: 20 Maret 2025</p>
								<p class="text-gray-600">Periode Sewa: 25 Maret 2025 - 26 Maret 2025</p>
								<p class="text-gray-600">Total Harga: <strong>Rp 1.500.000</strong></p>
								<p class="text-gray-600">Status: <span class="font-medium text-red-500">Ditolak</span></p>
								<a href="#" class="mt-3 inline-block rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
										Lihat Detail
								</a>
						</div>
				</div>
		</section>
@endsection
