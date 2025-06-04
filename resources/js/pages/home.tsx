import MainLayout from '@/layouts/main-layout';
import { Link } from '@inertiajs/react';
import React from 'react';

// SVG Icons untuk section "About" dan lainnya bisa dibuat jadi komponen kecil
const BuildingIcon = () => (
  <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    ></path>
  </svg>
);
const CurrencyDollarIcon = () => (
  <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
    ></path>
  </svg>
);
const CheckCircleIcon = () => (
  <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
);
const ArrowRightIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
  </svg>
);

// Ikon untuk Contact Section (jika belum ada global)
const LocationMarkerIcon = () => (
  <svg className="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    ></path>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
  </svg>
);
const PhoneIconContact = () => (
  // Beda dari PhoneIcon di Footer
  <svg className="h-6 w-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    ></path>
  </svg>
);
const MailIcon = () => (
  <svg className="h-6 w-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    ></path>
  </svg>
);

// Anda mungkin ingin membuat komponen untuk setiap section jika terlalu panjang
// Contoh: HeroSection.tsx, AboutSection.tsx, dll.

export default function Home() {
  // Data dinamis untuk halaman ini (jika ada) akan datang dari props
  // const { someData } = usePage().props;

  const handleContactFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Logika submit form kontak (misalnya menggunakan Inertia form helper atau Axios)
    alert('Form kontak dikirim! (implementasi diperlukan)');
  };

  return (
    <MainLayout title="Sewagraha">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black"></div>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: "url('/hero_bg.jpeg')" }} // Path ke public folder
        ></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/2 h-full w-full animate-pulse rounded-full bg-gradient-to-bl from-blue-400/10 to-transparent"></div>
          <div className="absolute -bottom-1/2 -left-1/2 h-full w-full animate-pulse rounded-full bg-gradient-to-tr from-purple-400/10 to-transparent delay-1000"></div>
        </div>
        <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-20">
          <div className="max-w-5xl text-center text-white">
            <div className="mb-6 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
              <span className="text-sm font-medium">🏛️ Platform Resmi BPKD Pekalongan</span>
            </div>
            <h1 className="mb-6 text-4xl leading-tight font-bold md:text-5xl">
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">Sewagraha</span>
            </h1>
            <h2 className="mb-6 text-xl font-semibold text-blue-100 md:text-xl">Sewa Gedung Kapan Saja, Di Mana Saja.</h2>
            <p className="mx-auto mb-8 max-w-3xl text-base leading-relaxed text-gray-200 md:text-base">
              Dikelola oleh BPKD Kabupaten Pekalongan. Cek ketersediaan & ajukan sewa langsung dari rumah dengan sistem yang transparan dan
              terpercaya.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/venues" // Sesuaikan dengan route Anda
                className="group relative rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-500 px-8 py-4 font-semibold text-black transition-all duration-300 hover:from-yellow-300 hover:to-yellow-400 hover:shadow-xl"
              >
                <span className="relative z-10">Lihat Daftar Gedung</span>
                <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </Link>
              <a // Ini adalah link anchor, bisa tetap <a> atau Link jika halaman sama
                href="#cara-menyewa"
                className="rounded-xl border-2 border-white/30 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/10"
              >
                Pelajari Cara Booking
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform animate-bounce">
          <div className="flex h-10 w-6 justify-center rounded-full border-2 border-white/50">
            <div className="mt-2 h-3 w-1 animate-pulse rounded-full bg-white/70"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="tentang" className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-16 text-center">
            <div className="mb-4 inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800">Tentang Platform</div>
            <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
              Apa Itu <span className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-transparent">Sewagraha</span>?
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600">
                <BuildingIcon />
              </div>
              <h3 className="mb-4 text-xl font-bold text-gray-900">Platform Digital Resmi</h3>
              <p className="leading-relaxed text-gray-600">
                Sistem penyewaan gedung milik Pemerintah Kabupaten Pekalongan yang dikelola langsung oleh BPKD.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-green-600">
                <CurrencyDollarIcon />
              </div>
              <h3 className="mb-4 text-xl font-bold text-gray-900">Mudah & Online</h3>
              <p className="leading-relaxed text-gray-600">
                Cari, lihat ketersediaan, dan ajukan penyewaan gedung secara online tanpa harus datang ke kantor.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600">
                <CheckCircleIcon />
              </div>
              <h3 className="mb-4 text-xl font-bold text-gray-900">Transparan & Terpercaya</h3>
              <p className="leading-relaxed text-gray-600">
                Proses penyewaan yang transparan, cepat, dan terpercaya untuk berbagai kebutuhan acara Anda.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative rotate-2 transform overflow-hidden rounded-2xl shadow-2xl transition-transform duration-500 hover:rotate-0">
                    <img src="/images/image1.png" alt="Gedung 1" className="h-64 w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  <div className="relative -rotate-1 transform overflow-hidden rounded-2xl shadow-xl transition-transform duration-500 hover:rotate-0">
                    <img src="/images/image3.png" alt="Gedung 3" className="h-48 w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                </div>
                <div className="mt-8">
                  <div className="relative -rotate-2 transform overflow-hidden rounded-2xl shadow-2xl transition-transform duration-500 hover:rotate-0">
                    <img src="/images/image2.png" alt="Gedung 2" className="h-80 w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                </div>
              </div>
              <div className="absolute -right-6 -bottom-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-xl">
                <div className="text-3xl font-bold text-blue-600">20+</div>
                <div className="text-sm text-gray-600">Gedung Tersedia</div>
              </div>
            </div>
            <div>
              <div className="mb-8">
                <div className="mb-4 inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800">
                  Keunggulan Kami
                </div>
                <h3 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
                  Kenapa Memilih <span className="text-blue-600">Sewagraha</span>?
                </h3>
              </div>
              <div className="space-y-6">
                {/* Item 1 */}
                <div className="flex items-start gap-4 rounded-xl border-l-4 border-blue-500 bg-gradient-to-r from-blue-50 to-transparent p-6 transition-shadow duration-300 hover:shadow-md">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                    1
                  </div>
                  <div>
                    <h4 className="mb-2 text-xl font-bold text-gray-900">Beragam Pilihan Gedung</h4>
                    <p className="text-gray-600">
                      Gedung untuk berbagai acara, dari pernikahan, seminar, hingga acara korporat dengan fasilitas lengkap.
                    </p>
                  </div>
                </div>
                {/* Item 2 */}
                <div className="flex items-start gap-4 rounded-xl border-l-4 border-green-500 bg-gradient-to-r from-green-50 to-transparent p-6 transition-shadow duration-300 hover:shadow-md">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-sm font-bold text-white">
                    2
                  </div>
                  <div>
                    <h4 className="mb-2 text-xl font-bold text-gray-900">Harga Transparan</h4>
                    <p className="text-gray-600">Tidak ada biaya tersembunyi, harga jelas dan kompetitif dengan rincian biaya yang detail.</p>
                  </div>
                </div>
                {/* Item 3 */}
                <div className="flex items-start gap-4 rounded-xl border-l-4 border-purple-500 bg-gradient-to-r from-purple-50 to-transparent p-6 transition-shadow duration-300 hover:shadow-md">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-purple-500 text-sm font-bold text-white">
                    3
                  </div>
                  <div>
                    <h4 className="mb-2 text-xl font-bold text-gray-900">Proses Cepat dan Mudah</h4>
                    <p className="text-gray-600">Sistem booking online yang praktis dengan notifikasi real-time dan customer support 24/7.</p>
                  </div>
                </div>
                {/* Item 4 */}
                <div className="flex items-start gap-4 rounded-xl border-l-4 border-orange-500 bg-gradient-to-r from-orange-50 to-transparent p-6 transition-shadow duration-300 hover:shadow-md">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">
                    4
                  </div>
                  <div>
                    <h4 className="mb-2 text-xl font-bold text-gray-900">Lokasi Strategis</h4>
                    <p className="text-gray-600">Pilihan gedung di berbagai lokasi strategis dan mudah diakses dengan fasilitas parkir luas.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Book Section */}
      <section id="cara-menyewa" className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-16 text-center">
            <div className="mb-4 inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800">
              Panduan Booking
            </div>
            <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">Cara Menyewa Gedung</h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">Proses sederhana dalam 4 langkah untuk mewujudkan acara impian Anda</p>
          </div>
          <div className="relative">
            <div className="absolute top-1/2 right-0 left-0 hidden h-0.5 -translate-y-1/2 transform bg-gradient-to-r from-blue-200 via-green-200 to-purple-200 lg:block"></div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {/* Step 1-4 */}
              {[
                {
                  step: 1,
                  color: 'blue',
                  title: 'Telusuri dan Pilih',
                  description: 'Cari gedung sesuai kebutuhan dengan filter lokasi, tanggal, kapasitas, dan fasilitas yang diinginkan',
                },
                {
                  step: 2,
                  color: 'green',
                  title: 'Ajukan Sewa Online',
                  description: 'Isi formulir booking lengkap dan upload dokumen yang diperlukan secara digital',
                },
                {
                  step: 3,
                  color: 'orange',
                  title: 'Verifikasi & Pembayaran',
                  description: 'Tim kami verifikasi dokumen dalam 24 jam dan kirim invoice pembayaran',
                },
                {
                  step: 4,
                  color: 'purple',
                  title: 'Gunakan Sesuai Jadwal',
                  description: 'Nikmati acara Anda di gedung yang telah dipesan dengan dukungan tim on-site',
                },
              ].map((item) => (
                <div key={item.step} className="group relative text-center">
                  <div
                    className={`relative z-10 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-${item.color}-500 to-${item.color}-600 text-2xl font-bold text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}
                  >
                    {item.step}
                  </div>
                  <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl">
                    <h3 className="mb-3 text-xl font-bold text-gray-900">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-16 text-center">
            <Link
              href="/venues" // Sesuaikan dengan route
              className="from-primary/80 to-secondary/80 hover:from-primary hover:to-secondary inline-flex items-center gap-3 rounded-xl bg-gradient-to-r px-8 py-4 font-semibold text-white shadow-lg transition duration-300 hover:shadow-xl"
            >
              <span>Mulai Booking Sekarang</span>
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative overflow-hidden bg-gray-900 py-20 text-white">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{ backgroundImage: 'radial-gradient(circle at 25px 25px, white 2px, transparent 0)', backgroundSize: '50px 50px' }}
          ></div>
        </div>
        <div className="relative z-10 container mx-auto max-w-6xl px-4">
          <div className="mb-16 text-center">
            <div className="mb-4 inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
              Kontak & Lokasi
            </div>
            <h2 className="mb-6 text-4xl font-bold md:text-5xl">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Hubungi Kami</span>
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-gray-300">Tim customer service kami siap membantu Anda 24/7</p>
          </div>
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm">
              <h3 className="mb-6 text-2xl font-bold">Kirim Pesan</h3>
              <form onSubmit={handleContactFormSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-300">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-gray-400 backdrop-blur-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-gray-400 backdrop-blur-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-300">
                    Pesan
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full resize-none rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-gray-400 backdrop-blur-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="from-primary/80 to-secondary/80 hover:from-primary hover:to-secondary w-full cursor-pointer rounded-xl bg-gradient-to-r px-6 py-3 font-semibold text-white shadow-lg transition duration-300 hover:shadow-xl"
                >
                  Kirim Pesan
                </button>
              </form>
            </div>
            <div className="space-y-8">
              <div className="rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm">
                <h3 className="mb-6 text-2xl font-bold">BPKD Kabupaten Pekalongan</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20">
                      <LocationMarkerIcon />
                    </div>
                    <div>
                      <div className="font-semibold">Alamat</div>
                      <div className="text-gray-300">Kajen, Pekalongan</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/20">
                      <PhoneIconContact />
                    </div>
                    <div>
                      <div className="font-semibold">Telepon</div>
                      <div className="text-gray-300">081234567890</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20">
                      <MailIcon />
                    </div>
                    <div>
                      <div className="font-semibold">Email</div>
                      <div className="break-all text-gray-300">contact@bpkd.pekalongankab.go.id</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-white/20 bg-white/10 p-2 backdrop-blur-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.857698358517!2d109.58716157456408!3d-7.026007792975761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e701fecf4d9b4ed%3A0xfb3527f5801c3eea!2sBPKD%20Kabupaten%20Pekalongan!5e0!3m2!1sen!2sid!4v1748992803665!5m2!1sen!2sid"
                  className="h-64 w-full rounded-xl"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
          <div className="mx-auto mt-16 flex flex-col items-center justify-center gap-6 border-t border-white/20 pt-16 text-center sm:flex-row sm:gap-20 md:gap-10">
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-blue-400">20+</div>
              <div className="text-gray-300">Gedung Tersedia</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-green-400">1000+</div>
              <div className="text-gray-300">Acara Sukses</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-4xl font-bold text-yellow-400">100%</div>
              <div className="text-gray-300">Kepuasan Pelanggan</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 via-blue-800 to-slate-900 shadow-2xl">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-1/4 h-72 w-72 animate-pulse rounded-full bg-blue-400 mix-blend-multiply blur-xl filter"></div>
              <div className="absolute right-1/4 bottom-0 h-96 w-96 animate-pulse rounded-full bg-purple-400 mix-blend-multiply blur-xl filter delay-1000"></div>
            </div>
            <div className="relative z-10 px-8 py-16 text-center md:px-16">
              <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">Siap Mengadakan Acara Impian Anda?</h2>
              <p className="mx-auto mb-8 max-w-2xl text-xl text-blue-200">
                Bergabunglah dengan ribuan pelanggan yang telah mempercayakan acara mereka kepada Sewagraha
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  href="/venues" // Sesuaikan
                  className="inline-flex items-center gap-3 rounded-xl bg-white px-8 py-4 font-semibold text-slate-800 shadow-lg transition-all duration-300 hover:bg-blue-50 hover:shadow-xl hover:shadow-blue-500/25"
                >
                  <span>Mulai Sekarang</span>
                  <ArrowRightIcon />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
