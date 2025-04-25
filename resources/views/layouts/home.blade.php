<!DOCTYPE html>
<html lang="en">

		<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				@vite('resources/css/app.css')
				<title>SEWAGRAHA</title>
		</head>

		<body class="font-poppins">

				@include('components.navbar')

				@yield('content')

				@include('components.footer')

				<script>
						// Add this script at the end of your body tag or in a separate JS file
						document.addEventListener('DOMContentLoaded', function() {
								// Mobile menu toggle with animation
								const mobileMenuButton = document.querySelector('.mobile-menu-button');
								const mobileMenu = document.querySelector('#menu-content');

								if (mobileMenuButton && mobileMenu) {
										mobileMenuButton.addEventListener('click', function() {
												if (mobileMenu.classList.contains('max-h-0')) {
														// Open mobile menu with animation
														mobileMenu.classList.remove('max-h-0');
														mobileMenu.classList.add('max-h-96'); // Adjust height as needed
														mobileMenuButton.querySelector('svg').classList.add('rotate-90');
														mobileMenuButton.classList.add('bg-gray-100');
												} else {
														// Close mobile menu with animation
														mobileMenu.classList.remove('max-h-96');
														mobileMenu.classList.add('max-h-0');
														mobileMenuButton.querySelector('svg').classList.remove('rotate-90');
														mobileMenuButton.classList.remove('bg-gray-100');
												}
										});
								}

								// User dropdown toggle (for desktop) with animation
								const userDropdownButton = document.querySelector('[data-dropdown-toggle]');
								const userDropdownMenu = document.querySelector('#userDropdown');

								if (userDropdownButton && userDropdownMenu) {
										// Add initial state classes for animation
										userDropdownMenu.classList.add('opacity-0', 'transform', 'transition-all', 'duration-200',
												'ease-out');

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
														userDropdownButton.querySelector('svg').classList.add('rotate-180', 'transform',
																'transition-transform', 'duration-200');
												} else {
														// Close dropdown with animation
														userDropdownMenu.classList.remove('opacity-100', 'scale-100');
														userDropdownMenu.classList.add('opacity-0', 'scale-95');
														// Rotate dropdown arrow back
														userDropdownButton.querySelector('svg').classList.remove('rotate-180');

														// Wait for animation to finish before hiding
														setTimeout(() => {
																userDropdownMenu.classList.add('hidden');
														}, 200);
												}
										});

										// Close dropdown when clicking outside
										document.addEventListener('click', function(event) {
												if (!userDropdownButton.contains(event.target) && !userDropdownMenu.contains(event.target) &&
														!userDropdownMenu.classList.contains('hidden')) {
														// Close dropdown with animation
														userDropdownMenu.classList.remove('opacity-100', 'scale-100');
														userDropdownMenu.classList.add('opacity-0', 'scale-95');
														// Rotate dropdown arrow back
														userDropdownButton.querySelector('svg').classList.remove('rotate-180');

														// Wait for animation to finish before hiding
														setTimeout(() => {
																userDropdownMenu.classList.add('hidden');
														}, 200);
												}
										});
								}

								// Add hover animation to menu items
								const menuItems = document.querySelectorAll('#userDropdown a');
								menuItems.forEach(item => {
										item.classList.add('transition-colors', 'duration-150');

										// Optional: Add subtle animation on hover
										item.addEventListener('mouseenter', function() {
												this.classList.add('transform', 'translate-x-1');
										});

										item.addEventListener('mouseleave', function() {
												this.classList.remove('transform', 'translate-x-1');
										});
								});
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
