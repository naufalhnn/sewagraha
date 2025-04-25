@extends('layouts.home')

@section('content')
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
												<input class="outline-primary mt-1 h-10 w-full rounded border border-gray-300 p-2" type="text" id="name"
														name="name" required>
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
