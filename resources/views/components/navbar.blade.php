<nav class="fixed left-0 right-0 top-0 z-50 mb-5 bg-white/80 backdrop-blur-md transition-all duration-300 md:mb-10">
		<div class="mx-auto max-w-6xl px-4">
				<div class="flex justify-between">
						<!-- Logo -->
						<div class="flex space-x-7">
								<div>
										<a href="#" class="flex items-center py-4">
												<span class="text-lg font-semibold text-gray-500">
														<img class="w-10" src="{{ asset('icons/LogoKabPekalongan.png') }}" alt="">
												</span>
										</a>
								</div>
						</div>

						<!-- Primary Nav -->
						<div class="hidden items-center space-x-2 md:flex">
								<a href="{{ route('home') }}"
										class="{{ Route::is('home') ? 'text-primary font-semibold' : 'text-gray-800 font-normal' }} hover:text-primary px-2 py-4 transition duration-300">
										Beranda
								</a>
								<a href="{{ route('about') }}"
										class="{{ Route::is('about') ? 'text-primary font-semibold' : 'text-gray-800 font-normal' }} hover:text-primary px-2 py-4 transition duration-300">
										Tentang Kami
								</a>
								<a href="{{ route('venues') }}"
										class="{{ Route::is('venues') ? 'text-primary font-semibold' : 'text-gray-800 font-normal' }} hover:text-primary px-2 py-4 transition duration-300">
										Gedung
								</a>
								<a href="{{ route('contact') }}"
										class="{{ Route::is('contact') ? 'text-primary font-semibold' : 'text-gray-800 font-normal' }} hover:text-primary px-2 py-4 transition duration-300">
										Kontak
								</a>
						</div>

						@if (Auth::check())
								<!-- User dropdown for logged in users -->
								<div class="hidden items-center md:flex">
										<div class="relative">
												<button data-dropdown-toggle="userDropdown"
														class="hover:text-primary flex items-center space-x-2 px-2 py-4 font-medium text-gray-800 transition duration-300">
														<span>Halo, {{ Auth::user()->name }}</span>
														<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform duration-200" fill="none"
																viewBox="0 0 24 24" stroke="currentColor">
																<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
														</svg>
												</button>
												<div id="userDropdown"
														class="ring-secondary absolute right-0 z-50 hidden w-48 overflow-hidden rounded-md bg-white shadow-lg ring-1">
														<div class="py-1">
																@if (Auth::user()->role == 'ADMIN')
																		<form action="{{ route('filament.admin.pages.dashboard') }}" method="GET">
																				<button type="submit"
																						class="hover:bg-secondary w-full px-4 py-2 text-left text-sm font-medium text-gray-700 transition duration-300">Dashboard</button>
																		</form>
																@endif
																<form method="POST" action="{{ route('logout') }}" class="block">
																		@csrf
																		<button type="submit"
																				class="hover:bg-secondary w-full px-4 py-2 text-left text-sm font-medium text-gray-700 transition duration-300">Logout</button>
																</form>
														</div>
												</div>
										</div>
								</div>
						@else
								<div class="hidden items-center space-x-1 md:flex">
										<a href="{{ route('login') }}">
												<button
														class="bg-secondary text-primary flex cursor-pointer items-center gap-2 rounded-lg px-4 py-1.5 font-medium transition duration-300 hover:bg-blue-200">
														Masuk
														<span><img class="my-auto w-5" src="{{ asset('icons/Login_square_fill.svg') }}" alt="Login icon"></span>
												</button>
										</a>
										<a href="{{ route('register') }}">
												<button
														class="bg-primary flex cursor-pointer items-center gap-2 rounded-lg px-4 py-1.5 font-medium text-white transition duration-300 hover:bg-blue-700">
														Daftar
														<span><img class="my-auto w-5" src="{{ asset('icons/Sign_in_square_fill.svg') }}"
																		alt="Register icon"></span>
												</button>
										</a>
								</div>
						@endif

						<!-- Mobile menu button -->
						<div class="flex items-center md:hidden">
								<button class="mobile-menu-button rounded-lg p-2 outline-none transition-all duration-300">
										<svg class="h-6 w-6 text-gray-500 transition-all duration-300 hover:text-blue-500" fill="none"
												stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
												<path d="M4 6h16M4 12h16M4 18h16"></path>
										</svg>
								</button>
						</div>
				</div>
		</div>

		<!-- Mobile Menu -->
		<div class="mobile-menu overflow-hidden md:hidden">
				<div id="menu-content" class="max-h-0 overflow-hidden transition-all duration-300 ease-in-out">
						<ul class="bg-white/80 backdrop-blur-md">
								<li>
										<a href="{{ route('home') }}"
												class="{{ Route::is('home') ? 'bg-blue-500 text-white' : 'text-gray-800' }} block px-3 py-4 text-sm transition duration-300 hover:bg-blue-500 hover:text-white">
												Beranda
										</a>
								</li>
								<li>
										<a href="{{ route('about') }}"
												class="{{ Route::is('about') ? 'bg-blue-500 text-white' : 'text-gray-800' }} block px-3 py-4 text-sm transition duration-300 hover:bg-blue-500 hover:text-white">
												Tentang Kami
										</a>
								</li>
								<li>
										<a href="{{ route('venues') }}"
												class="{{ Route::is('venues') ? 'bg-blue-500 text-white' : 'text-gray-800' }} block px-3 py-4 text-sm transition duration-300 hover:bg-blue-500 hover:text-white">
												Gedung
										</a>
								</li>
								<li>
										<a href="{{ route('contact') }}"
												class="{{ Route::is('contact') ? 'bg-blue-500 text-white' : 'text-gray-800' }} block px-3 py-4 text-sm transition duration-300 hover:bg-blue-500 hover:text-white">
												Kontak
										</a>
								</li>

								@if (Auth::check())
										<!-- User info and logout for mobile -->
										<li>
												<div class="px-3 py-3">
														<p class="mb-2 text-sm font-medium">Halo, {{ Auth::user()->name }}</p>
														@if (Auth::user()->role == 'ADMIN')
																<form action="{{ route('filament.admin.pages.dashboard') }}" method="GET">
																		<button type="submit"
																				class="w-full px-4 py-2 text-left text-sm text-gray-700 transition duration-300 hover:bg-gray-100">Dashboard</button>
																</form>
														@endif
														<form method="POST" action="{{ route('logout') }}" class="block">
																@csrf
																<button type="submit"
																		class="w-full px-4 py-2 text-left text-sm text-gray-700 transition duration-300 hover:bg-gray-100">Logout</button>
														</form>
												</div>
										</li>
								@else
										<li class="flex flex-row gap-1.5 px-3 py-3">
												<a href="{{ route('login') }}">
														<button
																class="bg-secondary text-primary flex transform items-center gap-2 rounded-lg px-4 py-1.5 font-medium transition duration-300 hover:scale-105 hover:bg-blue-200">
																Masuk
																<span><img class="my-auto w-5" src="{{ asset('icons/Login_square_fill.svg') }}"
																				alt="Login icon"></span>
														</button>
												</a>
												<a href="{{ route('register') }}">
														<button
																class="bg-primary flex transform items-center gap-2 rounded-lg px-4 py-1.5 font-medium text-white transition duration-300 hover:scale-105 hover:bg-blue-700">
																Daftar
																<span><img class="my-auto w-5" src="{{ asset('icons/Sign_in_square_fill.svg') }}"
																				alt="Register icon"></span>
														</button>
												</a>
										</li>
								@endif
						</ul>
				</div>
		</div>
</nav>

<div class="h-24"></div>
