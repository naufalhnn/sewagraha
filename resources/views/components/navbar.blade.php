<nav class="fixed left-0 right-0 top-0 z-50 bg-white/90 shadow-lg transition-all duration-300">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div class="flex h-20 items-center justify-between">
						<!-- Logo Section -->
						<div class="flex items-center">
								<a href="#" class="flex items-center py-4">
										<span class="text-lg font-semibold text-gray-500">
												<img class="w-10" src="{{ asset('icons/LogoKabPekalongan.png') }}" alt="">
										</span>
								</a>
						</div>

						<!-- Desktop Navigation -->
						<div class="hidden items-center space-x-1 md:flex">
								<a href="{{ route('home') }}"
										class="nav-link {{ Route::is('home') ? 'active' : '' }} {{ Route::is('home') ? 'text-secondary' : 'text-secondary/80' }} hover:text-secondary relative px-4 py-2 text-sm font-medium transition-colors duration-200">
										Beranda
								</a>
								<a href="{{ route('about') }}"
										class="nav-link {{ Route::is('about') ? 'active' : '' }} {{ Route::is('about') ? 'text-secondary' : 'text-secondary/80' }} hover:text-secondary relative px-4 py-2 text-sm font-medium transition-colors duration-200">
										Tentang Kami
								</a>
								<a href="{{ route('venues') }}"
										class="nav-link {{ Route::is('venues') ? 'active' : '' }} {{ Route::is('venues') ? 'text-secondary' : 'text-secondary/80' }} hover:text-secondary relative px-4 py-2 text-sm font-medium transition-colors duration-200">
										Gedung
								</a>
								<a href="{{ route('contact') }}"
										class="nav-link {{ Route::is('contact') ? 'active' : '' }} {{ Route::is('contact') ? 'text-secondary' : 'text-secondary/80' }} hover:text-secondary relative px-4 py-2 text-sm font-medium transition-colors duration-200">
										Kontak
								</a>
						</div>

						<!-- User Actions -->
						<div class="hidden items-center space-x-3 md:flex">
								@if (Auth::check())
										<!-- User Dropdown (when logged in) -->
										<div class="relative">
												<button data-dropdown-toggle="userDropdown"
														class="group flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-50 hover:text-blue-600">
														<div
																class="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-xs font-medium text-white">
																{{ strtoupper(substr(Auth::user()->name, 0, 1)) }}
														</div>
														<span>Halo, {{ Auth::user()->name }}</span>
														<svg class="h-4 w-4 transition-transform duration-200" fill="none" stroke="currentColor"
																viewBox="0 0 24 24">
																<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
														</svg>
												</button>

												<div id="userDropdown"
														class="absolute right-0 mt-2 hidden w-48 scale-95 transform rounded-xl bg-white opacity-0 shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-200 ease-out">
														<div class="p-1">
																@if (Auth::user()->role == 'ADMIN')
																		<form action="{{ route('filament.admin.pages.dashboard') }}" method="GET">
																				<button type="submit"
																						class="flex w-full items-center rounded-lg px-4 py-3 text-sm text-gray-700 transition-colors duration-150 hover:bg-gray-50">
																						<svg class="mr-3 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
																										d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z">
																								</path>
																						</svg>
																						Dashboard
																				</button>
																		</form>
																		<hr class="my-1">
																@endif
																<form method="POST" action="{{ route('logout') }}" class="block">
																		@csrf
																		<button type="submit"
																				class="flex w-full items-center rounded-lg px-4 py-3 text-sm text-red-600 transition-colors duration-150 hover:bg-red-50">
																				<svg class="mr-3 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
																								d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1">
																						</path>
																				</svg>
																				Logout
																		</button>
																</form>
														</div>
												</div>
										</div>
								@else
										<!-- Auth Buttons (when not logged in) -->
										<div class="flex items-center space-x-2">
												<a href="{{ route('login') }}">
														<button
																class="flex items-center space-x-2 rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition-all duration-200 hover:scale-105 hover:bg-blue-100">
																<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
																				d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1">
																		</path>
																</svg>
																<span>Masuk</span>
														</button>
												</a>

												<a href="{{ route('register') }}">
														<button
																class="flex items-center space-x-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2 text-sm font-medium text-white shadow-md transition-all duration-200 hover:scale-105 hover:from-blue-600 hover:to-blue-700 hover:shadow-lg">
																<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
																				d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
																</svg>
																<span>Daftar</span>
														</button>
												</a>
										</div>
								@endif
						</div>

						<!-- Mobile menu button -->
						<div class="md:hidden">
								<button
										class="mobile-menu-button rounded-lg p-2 text-gray-600 transition-all duration-200 hover:bg-gray-100 hover:text-blue-600">
										<svg class="h-6 w-6 transition-transform duration-300" fill="none" stroke="currentColor"
												viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
										</svg>
								</button>
						</div>
				</div>
		</div>

		<!-- Mobile Menu -->
		<div class="mobile-menu overflow-hidden border-t border-gray-100 bg-white/95 md:hidden">
				<div id="menu-content" class="max-h-0 overflow-hidden transition-all duration-300 ease-in-out">
						<div class="space-y-1 px-4 py-3">
								<a href="{{ route('home') }}"
										class="{{ Route::is('home') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50' }} flex items-center rounded-lg px-3 py-3 text-sm font-medium transition-colors duration-200">
										<svg class="mr-3 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
														d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6">
												</path>
										</svg>
										Beranda
								</a>
								<a href="{{ route('about') }}"
										class="{{ Route::is('about') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50' }} flex items-center rounded-lg px-3 py-3 text-sm font-medium transition-colors duration-200">
										<svg class="mr-3 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
														d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
										</svg>
										Tentang Kami
								</a>
								<a href="{{ route('venues') }}"
										class="{{ Route::is('venues') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50' }} flex items-center rounded-lg px-3 py-3 text-sm font-medium transition-colors duration-200">
										<svg class="mr-3 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
														d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-6m-8 0H3m2 0h14"></path>
										</svg>
										Gedung
								</a>
								<a href="{{ route('contact') }}"
										class="{{ Route::is('contact') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50' }} flex items-center rounded-lg px-3 py-3 text-sm font-medium transition-colors duration-200">
										<svg class="mr-3 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
														d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
												</path>
										</svg>
										Kontak
								</a>

								<!-- Mobile Auth Section -->
								<div class="border-t border-gray-100 pt-4">
										@if (Auth::check())
												<div class="space-y-2">
														<div class="px-3 py-2">
																<p class="mb-3 text-sm font-medium text-gray-700">Halo, {{ Auth::user()->name }}</p>
																@if (Auth::user()->role == 'ADMIN')
																		<form action="{{ route('filament.admin.pages.dashboard') }}" method="GET" class="mb-2">
																				<button type="submit"
																						class="flex w-full items-center rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-100">
																						<svg class="mr-3 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
																										d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z">
																								</path>
																						</svg>
																						Dashboard
																				</button>
																		</form>
																@endif
																<form method="POST" action="{{ route('logout') }}">
																		@csrf
																		<button type="submit"
																				class="flex w-full items-center rounded-lg px-3 py-2 text-sm text-red-600 transition-colors duration-200 hover:bg-red-50">
																				<svg class="mr-3 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
																								d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1">
																						</path>
																				</svg>
																				Logout
																		</button>
																</form>
														</div>
												</div>
										@else
												<div class="flex flex-col space-y-2">
														<a href="{{ route('login') }}">
																<button
																		class="flex w-full items-center justify-center space-x-2 rounded-lg bg-blue-50 px-4 py-3 text-sm font-medium text-blue-600 transition-colors duration-200 hover:bg-blue-100">
																		<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
																						d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1">
																				</path>
																		</svg>
																		<span>Masuk</span>
																</button>
														</a>

														<a href="{{ route('register') }}">
																<button
																		class="flex w-full items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-3 text-sm font-medium text-white transition-colors duration-200 hover:from-blue-600 hover:to-blue-700">
																		<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
																						d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
																		</svg>
																		<span>Daftar</span>
																</button>
														</a>
												</div>
										@endif
								</div>
						</div>
				</div>
		</div>
</nav>

{{-- Custom Styles - Add to your app.css or include in a separate CSS file --}}
<style>
		/* Navigation Link Animations */
		.nav-link {
				position: relative;
		}

		.nav-link::after {
				content: '';
				position: absolute;
				bottom: 0;
				left: 50%;
				width: 0;
				height: 1px;
				background: linear-gradient(90deg, #2563eb, #3b82f6);
				transition: all 0.3s ease;
				transform: translateX(-50%);
		}

		.nav-link:hover::after,
		.nav-link.active::after {
				width: 100%;
		}

		/* Button hover effects */
		.hover\:scale-105:hover {
				transform: scale(1.05);
		}

		/* Mobile menu animation enhancement */
		.mobile-menu-button:hover svg {
				transform: scale(1.1);
		}

		/* Backdrop blur enhancement */
		. {
				backdrop-filter: blur(12px);
				-webkit-backdrop-filter: blur(12px);
		}

		/* Shadow enhancement */
		.shadow-lg {
				box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
		}

		/* Gradient text for logo */
		.bg-clip-text {
				-webkit-background-clip: text;
				background-clip: text;
		}

		/* Smooth transitions for dropdown */
		.transition-all {
				transition-property: all;
				transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		}

		/* Mobile menu content styling */
		#menu-content {
				transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		}
</style>
