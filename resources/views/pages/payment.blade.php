@extends('layouts.home')

@section('content')
		<section class="mx-auto max-w-4xl px-4 pb-20">
				<div class="text-primary my-5 text-center text-3xl font-bold">
						<h1>Konfirmasi Pembayaran</h1>
				</div>

				<div class="rounded-xl bg-white p-6 shadow-lg">
						<h2 class="mb-4 text-2xl font-semibold">Detail Pembayaran</h2>
						<p class="text-gray-700">Total Harga: <strong>Rp {{ number_format($booking->total_price, 0, ',', '.') }}</strong></p>
						<p class="text-gray-700">Silakan transfer ke rekening berikut:</p>
						<p class="font-semibold text-gray-800">Bank XYZ - 1234567890 - A/N BPKD Kabupaten Pekalongan</p>

						<form action="{{ route('payment.store', $booking->id) }}" method="POST" enctype="multipart/form-data"
								class="mt-6 space-y-4">
								@csrf
								<input type="hidden" name="booking_id" value="{{ $booking->id }}">

								<div>
										<label class="mb-1 block text-sm font-medium text-gray-700">Unggah Bukti Transfer</label>
										<input type="file" name="payment_proof" id="payment_proof" required
												class="text-stone-500 file:mr-5 file:border-[1px] file:bg-stone-50 file:px-3 file:py-1 file:text-xs file:font-medium file:text-stone-700 hover:file:cursor-pointer hover:file:bg-blue-50 hover:file:text-blue-700" />
								</div>

								<div class="form-group mb-3">
										<div id="imagePreview" class="mt-2" style="display: none">
												<img id="preview" src="#" alt="Preview" style="max-width: 300px; max-height: 300px">
										</div>
								</div>

								<button type="submit" class="w-full cursor-pointer rounded-lg bg-blue-600 py-2 text-white hover:bg-blue-700">
										Konfirmasi Pembayaran
								</button>
						</form>
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
		</script>

		<script>
				document.getElementById('payment_proof').addEventListener('change', function(e) {
						const preview = document.getElementById('preview');
						const imagePreview = document.getElementById('imagePreview');

						if (e.target.files.length > 0) {
								preview.src = URL.createObjectURL(e.target.files[0]);
								imagePreview.style.display = 'block';
						} else {
								imagePreview.style.display = 'none';
						}
				});
		</script>
@endpush
