<!DOCTYPE html>
<html lang="en" style="scroll-behavior: smooth">

		<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				@vite('resources/css/app.css')
				<title>SEWAGRAHA</title>
		</head>

		<body class="font-poppins bg-slate-50">

				@include('components.navbar')

				@yield('content')

				@include('components.footer')

				<script>
						// JavaScript untuk SEWAGRAHA - Optimized dari layout yang sudah ada

						document.addEventListener('DOMContentLoaded', function() {
								// ========================================
								// MOBILE MENU TOGGLE - Versi Gabungan & Optimized
								// ========================================

								const mobileMenuButton = document.querySelector('.mobile-menu-button');
								const mobileMenu = document.querySelector('#menu-content');
								const icon = mobileMenuButton?.querySelector('svg');
								let isOpen = false;

								if (mobileMenuButton && mobileMenu) {
										mobileMenuButton.addEventListener('click', function() {
												isOpen = !isOpen;

												if (isOpen) {
														// Open mobile menu with animation
														mobileMenuButton.classList.add('ring-2', 'ring-blue-500', 'ring-offset-2', 'bg-gray-100');
														mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
														mobileMenu.classList.remove('max-h-0');
														mobileMenu.classList.add('max-h-96');

														// Rotate icon
														if (icon) {
																icon.classList.add('rotate-90');
																icon.style.transform = 'rotate(90deg)';
														}
												} else {
														// Close mobile menu with animation
														mobileMenuButton.classList.remove('ring-2', 'ring-blue-500', 'ring-offset-2', 'bg-gray-100');
														mobileMenu.style.maxHeight = '0';
														mobileMenu.classList.add('max-h-0');
														mobileMenu.classList.remove('max-h-96');

														// Reset icon rotation
														if (icon) {
																icon.classList.remove('rotate-90');
																icon.style.transform = 'rotate(0deg)';
														}
												}
										});

										// Close mobile menu when clicking outside
										document.addEventListener('click', function(event) {
												if (isOpen && !mobileMenuButton.contains(event.target) && !mobileMenu.contains(event.target)) {
														isOpen = false;
														mobileMenuButton.classList.remove('ring-2', 'ring-blue-500', 'ring-offset-2', 'bg-gray-100');
														mobileMenu.style.maxHeight = '0';
														mobileMenu.classList.add('max-h-0');
														mobileMenu.classList.remove('max-h-96');

														if (icon) {
																icon.classList.remove('rotate-90');
																icon.style.transform = 'rotate(0deg)';
														}
												}
										});

										// Close mobile menu on window resize to desktop
										window.addEventListener('resize', function() {
												if (window.innerWidth >= 768 && isOpen) {
														isOpen = false;
														mobileMenuButton.classList.remove('ring-2', 'ring-blue-500', 'ring-offset-2', 'bg-gray-100');
														mobileMenu.style.maxHeight = '0';
														mobileMenu.classList.add('max-h-0');
														mobileMenu.classList.remove('max-h-96');

														if (icon) {
																icon.classList.remove('rotate-90');
																icon.style.transform = 'rotate(0deg)';
														}
												}
										});
								}

								// ========================================
								// USER DROPDOWN TOGGLE - Enhanced
								// ========================================

								const userDropdownButton = document.querySelector('[data-dropdown-toggle]');
								const userDropdownMenu = document.querySelector('#userDropdown');

								if (userDropdownButton && userDropdownMenu) {
										// Add initial state classes for animation
										userDropdownMenu.classList.add('opacity-0', 'transform', 'transition-all', 'duration-200', 'ease-out');

										userDropdownButton.addEventListener('click', function(event) {
												event.stopPropagation();

												if (userDropdownMenu.classList.contains('hidden')) {
														// Open dropdown with animation
														userDropdownMenu.classList.remove('hidden');
														// Force a reflow before adding animation classes
														void userDropdownMenu.offsetWidth;
														userDropdownMenu.classList.remove('opacity-0', 'scale-95');
														userDropdownMenu.classList.add('opacity-100', 'scale-100');

														// Rotate dropdown arrow
														const arrow = userDropdownButton.querySelector('svg');
														if (arrow) {
																arrow.classList.add('rotate-180', 'transform', 'transition-transform', 'duration-200');
														}
												} else {
														// Close dropdown with animation
														userDropdownMenu.classList.remove('opacity-100', 'scale-100');
														userDropdownMenu.classList.add('opacity-0', 'scale-95');

														// Rotate dropdown arrow back
														const arrow = userDropdownButton.querySelector('svg');
														if (arrow) {
																arrow.classList.remove('rotate-180');
														}

														// Wait for animation to finish before hiding
														setTimeout(() => {
																userDropdownMenu.classList.add('hidden');
														}, 200);
												}
										});

										// Close dropdown when clicking outside
										document.addEventListener('click', function(event) {
												if (!userDropdownButton.contains(event.target) &&
														!userDropdownMenu.contains(event.target) &&
														!userDropdownMenu.classList.contains('hidden')) {

														// Close dropdown with animation
														userDropdownMenu.classList.remove('opacity-100', 'scale-100');
														userDropdownMenu.classList.add('opacity-0', 'scale-95');

														// Rotate dropdown arrow back
														const arrow = userDropdownButton.querySelector('svg');
														if (arrow) {
																arrow.classList.remove('rotate-180');
														}

														// Wait for animation to finish before hiding
														setTimeout(() => {
																userDropdownMenu.classList.add('hidden');
														}, 200);
												}
										});

										// Close dropdown on Escape key
										document.addEventListener('keydown', function(event) {
												if (event.key === 'Escape' && !userDropdownMenu.classList.contains('hidden')) {
														userDropdownMenu.classList.remove('opacity-100', 'scale-100');
														userDropdownMenu.classList.add('opacity-0', 'scale-95');

														const arrow = userDropdownButton.querySelector('svg');
														if (arrow) {
																arrow.classList.remove('rotate-180');
														}

														setTimeout(() => {
																userDropdownMenu.classList.add('hidden');
														}, 200);
												}
										});
								}

								// ========================================
								// DROPDOWN MENU ITEMS HOVER ANIMATION - Enhanced
								// ========================================

								const menuItems = document.querySelectorAll('#userDropdown a, #userDropdown button');
								menuItems.forEach(item => {
										item.classList.add('transition-colors', 'duration-150');

										// Add subtle animation on hover
										item.addEventListener('mouseenter', function() {
												this.classList.add('transform', 'translate-x-1', 'transition-transform', 'duration-150');
										});

										item.addEventListener('mouseleave', function() {
												this.classList.remove('transform', 'translate-x-1');
										});
								});

								// ========================================
								// NAVBAR SCROLL EFFECT - New Addition
								// ========================================

								const navbar = document.querySelector('nav');
								if (navbar) {
										// Set initial transparent state
										navbar.style.backgroundColor = 'transparent';
										navbar.style.boxShadow = 'none';
										navbar.style.transition = 'background-color 0.3s ease, box-shadow 0.3s ease';

										let lastScrollY = window.scrollY;

										window.addEventListener('scroll', function() {
												const currentScrollY = window.scrollY;

												// Change background when scrolled more than 50px
												if (currentScrollY > 50) {
														// Solid white background with shadow when scrolled
														navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.80)';
														navbar.style.boxShadow = '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
														navbar.style.backdropFilter = 'blur(10px)';
												} else {
														// Transparent background at top
														navbar.style.backgroundColor = 'transparent';
														navbar.style.boxShadow = 'none';
														navbar.style.backdropFilter = 'none';
												}

												lastScrollY = currentScrollY;
										});
								}

								// ========================================
								// NAVIGATION LINKS HOVER EFFECT - New Addition
								// ========================================

								const navLinks = document.querySelectorAll('.nav-link');
								navLinks.forEach(link => {
										link.addEventListener('mouseenter', function() {
												this.style.transition = 'transform 0.2s ease';
										});

										link.addEventListener('mouseleave', function() {
												this.style.transform = 'translateY(0)';
										});
								});

								// ========================================
								// BUTTON HOVER EFFECTS - New Addition
								// ========================================

								const hoverButtons = document.querySelectorAll('.hover\\:scale-105');
								hoverButtons.forEach(button => {
										button.addEventListener('mouseenter', function() {
												this.style.transform = 'scale(1.05)';
												this.style.transition = 'transform 0.2s ease';
										});

										button.addEventListener('mouseleave', function() {
												this.style.transform = 'scale(1)';
										});
								});

								// ========================================
								// LOGO HOVER EFFECT - New Addition
								// ========================================

								const logoLink = document.querySelector('a[href*="home"] .group');
								if (logoLink) {
										const logoImg = logoLink.querySelector('img');
										const logoText = logoLink.querySelector('span');

										logoLink.addEventListener('mouseenter', function() {
												if (logoImg) {
														logoImg.style.transform = 'scale(1.1)';
														logoImg.style.transition = 'transform 0.3s ease';
												}
												if (logoText) {
														logoText.style.textShadow = '0 2px 4px rgba(37, 99, 235, 0.3)';
														logoText.style.transition = 'text-shadow 0.3s ease';
												}
										});

										logoLink.addEventListener('mouseleave', function() {
												if (logoImg) {
														logoImg.style.transform = 'scale(1)';
												}
												if (logoText) {
														logoText.style.textShadow = 'none';
												}
										});
								}

								console.log('SEWAGRAHA Navbar loaded successfully! 🚀');
						});

						// ========================================
						// SLIDER FUNCTIONALITY - Tetap seperti aslinya
						// ========================================

						document.addEventListener('DOMContentLoaded', function() {
								const slider = document.querySelector('.slider-items');
								const slides = document.querySelectorAll('.slider-items img');
								const dots = document.querySelectorAll('[data-index]');
								const prevBtn = document.getElementById('prevBtn');
								const nextBtn = document.getElementById('nextBtn');
								let currentIndex = 0;

								// Only run if slider elements exist
								if (slider && slides.length > 0) {
										// Set initial width for proper sliding
										slider.style.width = `${slides.length * 100}%`;
										slides.forEach(slide => {
												slide.style.width = `${100 / slides.length}%`;
										});

										function updateSlider() {
												slider.style.transform = `translateX(-${currentIndex * (100 / slides.length)}%)`;

												// Update dots
												dots.forEach((dot, index) => {
														dot.classList.toggle('bg-white', index === currentIndex);
														dot.classList.toggle('bg-white/50', index !== currentIndex);
												});
										}

										// Next button click
										if (nextBtn) {
												nextBtn.addEventListener('click', () => {
														currentIndex = (currentIndex + 1) % slides.length;
														updateSlider();
												});
										}

										// Previous button click
										if (prevBtn) {
												prevBtn.addEventListener('click', () => {
														currentIndex = (currentIndex - 1 + slides.length) % slides.length;
														updateSlider();
												});
										}

										// Dot navigation
										dots.forEach((dot, index) => {
												dot.addEventListener('click', () => {
														currentIndex = index;
														updateSlider();
												});
										});

										// Auto slide every 5 seconds
										setInterval(() => {
												currentIndex = (currentIndex + 1) % slides.length;
												updateSlider();
										}, 5000);
								}
						});
				</script>

				<script>
						const btn = document.querySelector("button.mobile-menu-button");
						const menu = document.querySelector("#menu-content");
						const icon = btn.querySelector("svg");
						let isOpen = false;

						btn.addEventListener("click", () => {
								isOpen = !isOpen;

								// Toggle outline dan rotasi icon
								if (isOpen) {
										btn.classList.add("ring-2", "ring-blue-500", "ring-offset-2");
										menu.style.maxHeight = menu.scrollHeight + "px";
								} else {
										btn.classList.remove("ring-2", "ring-blue-500", "ring-offset-2");
										menu.style.maxHeight = "0";
								}
						});
				</script>

				<script>
						document.addEventListener('DOMContentLoaded', function() {
								const slider = document.querySelector('.slider-items');
								const slides = document.querySelectorAll('.slider-items img');
								const dots = document.querySelectorAll('[data-index]');
								const prevBtn = document.getElementById('prevBtn');
								const nextBtn = document.getElementById('nextBtn');
								let currentIndex = 0;

								// Set initial width for proper sliding
								slider.style.width = `${slides.length * 100}%`;
								slides.forEach(slide => {
										slide.style.width = `${100 / slides.length}%`;
								});

								function updateSlider() {
										slider.style.transform = `translateX(-${currentIndex * (100 / slides.length)}%)`;

										// Update dots
										dots.forEach((dot, index) => {
												dot.classList.toggle('bg-white', index === currentIndex);
												dot.classList.toggle('bg-white/50', index !== currentIndex);
										});
								}

								// Next button click
								nextBtn.addEventListener('click', () => {
										currentIndex = (currentIndex + 1) % slides.length;
										updateSlider();
								});

								// Previous button click
								prevBtn.addEventListener('click', () => {
										currentIndex = (currentIndex - 1 + slides.length) % slides.length;
										updateSlider();
								});

								// Dot navigation
								dots.forEach((dot, index) => {
										dot.addEventListener('click', () => {
												currentIndex = index;
												updateSlider();
										});
								});

								// Auto slide every 5 seconds
								setInterval(() => {
										currentIndex = (currentIndex + 1) % slides.length;
										updateSlider();
								}, 5000);
						});
				</script>

				<script>
						const btn = document.querySelector("button.mobile-menu-button");
						const menu = document.querySelector("#menu-content");
						const icon = btn.querySelector("svg");
						let isOpen = false;

						btn.addEventListener("click", () => {
								isOpen = !isOpen;

								// Toggle outline dan rotasi icon
								if (isOpen) {
										btn.classList.add("ring-2", "ring-blue-500", "ring-offset-2");
										menu.style.maxHeight = menu.scrollHeight + "px";
								} else {
										btn.classList.remove("ring-2", "ring-blue-500", "ring-offset-2");
										menu.style.maxHeight = "0";
								}
						});
				</script>

				@stack('script')
		</body>

</html>
