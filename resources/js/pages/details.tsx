import MainLayout from '@/layouts/main-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import {
  AlertCircle,
  ArrowLeft, // Untuk tombol prev slider
  ArrowRight, // Untuk tombol next slider & link informasi pemesanan
  Building, // Untuk ikon header utama & ikon "Pesan Sekarang"
  CheckCircle, // Untuk alamat
  ClipboardEdit, // Untuk Kondisi Bangunan & preview KTP
  CreditCard, // Untuk Harga Per Hari & Tanggal (opsional)
  FileText, // Untuk Kegunaan
  Info, // Untuk Deskripsi Gedung
  MapPin, // Untuk Pesan Gedung (ikon form, alternatif untuk Megaphone)
  Phone, // Untuk Informasi Pemesanan (kontak)
  Users, // Untuk Kapasitas
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { route } from 'ziggy-js'; // Asumsi Anda menggunakan Ziggy global

// --- Definisi Interface (tetap di atas komponen) ---
interface VenueImage {
  id: number;
  image_path: string;
}
interface Purpose {
  id: number;
  name: string;
}
interface Facility {
  id: number;
  name: string;
}
interface Venue {
  id: number;
  name: string;
  address: string;
  description: string;
  capacity: number;
  base_price: number;
  building_condition: string;
  venue_images: VenueImage[];
  purposes: Purpose[];
  facilities: Facility[];
}
interface AuthUser {
  id: number;
  name: string;
  email: string;
}
type PageProps = {
  venue: Venue;
  auth: {
    user: AuthUser | null;
  };
  errors?: Partial<Record<string, string>>; // Kunci untuk menampilkan error
};
// --- Akhir Definisi Interface ---

export default function Details() {
  const { venue, auth, errors } = usePage<PageProps>().props;

  const basePrice = venue?.base_price || 0;

  const [name, setName] = useState(auth.user?.name || '');
  const [email, setEmail] = useState(auth.user?.email || '');
  const [eventStartDate, setEventStartDate] = useState('');
  const [eventEndDate, setEventEndDate] = useState('');
  const [purpose, setPurpose] = useState('');
  const [ktpImage, setKtpImage] = useState<File | null>(null);
  const [ktpPreviewUrl, setKtpPreviewUrl] = useState<string | null>(null);
  const [totalPrice, setTotalPrice] = useState(basePrice);
  const [calculatedDays, setCalculatedDays] = useState(1);

  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const calculateTotalPriceLogic = () => {
      if (!basePrice && basePrice !== 0) {
        // Handle jika basePrice undefined atau null, tapi izinkan 0
        setTotalPrice(0);
        setCalculatedDays(1);
        return;
      }

      if (!eventStartDate || !eventEndDate) {
        setTotalPrice(basePrice);
        setCalculatedDays(1);
        return;
      }

      const startDate = new Date(eventStartDate);
      const endDate = new Date(eventEndDate);

      if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime()) && endDate >= startDate) {
        let dayCount = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        dayCount = Math.max(0, dayCount) + 1; // Hari dihitung inklusif, minimal 1 hari
        setCalculatedDays(dayCount);
        setTotalPrice(dayCount * basePrice);
      } else {
        setCalculatedDays(1);
        setTotalPrice(basePrice);
      }
    };
    calculateTotalPriceLogic();
  }, [eventStartDate, eventEndDate, basePrice]);

  useEffect(() => {
    if (ktpImage) {
      const objectUrl = URL.createObjectURL(ktpImage);
      setKtpPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
    setKtpPreviewUrl(null);
  }, [ktpImage]);

  useEffect(() => {
    if (!sliderRef.current || !venue?.venue_images || venue.venue_images.length === 0) return;
    const totalSlides = venue.venue_images.length;
    const updateSlider = () => {
      if (sliderRef.current) {
        sliderRef.current.style.transform = `translateX(-${currentSlide * 100}%)`;
      }
    };
    updateSlider();
    if (totalSlides > 1) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = window.setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
      }, 5000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentSlide, venue?.venue_images]);

  const handleNextSlide = () => {
    const imagesLength = venue?.venue_images?.length || 0;
    if (imagesLength > 0) setCurrentSlide((prev) => (prev + 1) % imagesLength);
  };
  const handlePrevSlide = () => {
    const imagesLength = venue?.venue_images?.length || 0;
    if (imagesLength > 0) setCurrentSlide((prev) => (prev - 1 + imagesLength) % imagesLength);
  };
  const handleIndicatorClick = (index: number) => setCurrentSlide(index);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('venue_id', String(venue.id));
    if (auth.user?.id) formData.append('user_id', String(auth.user.id));
    formData.append('name', name);
    formData.append('email', email);
    formData.append('event_start_date', eventStartDate);
    formData.append('event_end_date', eventEndDate);
    formData.append('purpose', purpose);
    formData.append('total_price', totalPrice.toString());
    if (ktpImage) formData.append('ktp_image', ktpImage);

    router.post(route('bookings.store'), formData, {
      forceFormData: true,
      onSuccess: () => {
        setName(auth.user?.name || '');
        setEmail(auth.user?.email || '');
        setEventStartDate('');
        setEventEndDate('');
        setPurpose('');
        setKtpImage(null);
        setKtpPreviewUrl(null);
        setCalculatedDays(1);
        setTotalPrice(basePrice);
        const fileInput = document.getElementById('ktp_image') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      },
      onError: (formErrors) => {
        // `formErrors` ini akan otomatis mengisi `props.errors`
        console.error('Booking submission error:', formErrors);
        // Tidak perlu alert di sini karena error akan ditampilkan di bawah field
      },
    });
  };

  if (!venue) {
    return (
      <MainLayout title="Memuat...">
        <div className="flex min-h-screen items-center justify-center">
          <p>Memuat detail gedung...</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title={`Detail Gedung - ${venue.name}`}>
      <Head>
        <title>{`Detail Gedung: ${venue.name} - Sewagraha`}</title>
        <meta
          name="description"
          content={venue.description ? venue.description.substring(0, 160) : `Detail informasi dan pemesanan untuk ${venue.name}`}
        />
      </Head>

      {/* Header Halaman Detail */}
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%236366f1%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%227%22%20cy%3D%227%22%20r%3D%227%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"></div>
        <div className="relative container mx-auto max-w-5xl px-4 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-medium text-blue-700 shadow-sm">
            <Building className="h-4 w-4" /> {/* Ikon header utama */}
            Detail Properti Sewagraha
          </div>
          <h1 className="mb-3 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">{venue.name}</h1>
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <MapPin className="h-5 w-5 text-blue-500" />
            <span className="text-base md:text-lg">{venue.address}</span>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-12 md:py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-6">
            {/* Kolom Kiri: Slider dan Detail Gedung */}
            <div className="space-y-8 lg:col-span-2">
              {/* Image Slider */}
              <div className="relative aspect-video overflow-hidden rounded-2xl bg-gray-200 shadow-xl">
                <div ref={sliderRef} className="slider-items flex h-full transition-transform duration-700 ease-in-out">
                  {venue.venue_images && venue.venue_images.length > 0 ? (
                    venue.venue_images.map((image, index) => (
                      <div key={image.id} className="h-full w-full flex-shrink-0" style={{ minWidth: '100%' }}>
                        <img
                          src={`/storage/${image.image_path}`}
                          alt={`Gambar ${index + 1} Gedung ${venue.name}`}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    ))
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-100">
                      <Building className="h-24 w-24 text-gray-300" />
                    </div>
                  )}
                </div>

                {(venue.venue_images?.length || 0) > 1 && (
                  <>
                    <button
                      onClick={handlePrevSlide}
                      aria-label="Previous slide"
                      className="group absolute top-1/2 left-3 z-10 -translate-y-1/2 transform rounded-full bg-white/80 p-2.5 shadow-lg backdrop-blur-sm transition hover:scale-110 hover:bg-white md:left-4"
                    >
                      <ArrowLeft className="h-5 w-5 text-gray-700 group-hover:text-blue-600 md:h-6 md:w-6" />
                    </button>
                    <button
                      onClick={handleNextSlide}
                      aria-label="Next slide"
                      className="group absolute top-1/2 right-3 z-10 -translate-y-1/2 transform rounded-full bg-white/80 p-2.5 shadow-lg backdrop-blur-sm transition hover:scale-110 hover:bg-white md:right-4"
                    >
                      <ArrowRight className="h-5 w-5 text-gray-700 group-hover:text-blue-600 md:h-6 md:w-6" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                      {venue.venue_images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => handleIndicatorClick(index)}
                          aria-label={`Go to slide ${index + 1}`}
                          className={`h-2.5 w-2.5 rounded-full ring-1 ring-white/50 transition-all duration-200 hover:bg-white ${index === currentSlide ? 'scale-125 bg-white shadow' : 'bg-white/60'}`}
                        ></button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Card Detail Gedung */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg md:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-md">
                    <Info className="h-5 w-5" /> {/* Ikon untuk Deskripsi Gedung */}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Deskripsi Gedung</h2>
                </div>
                <div className="prose prose-slate max-w-none rounded-xl bg-gray-50/70 p-4 leading-relaxed text-gray-700 md:p-6">
                  <p>{venue.description || 'Deskripsi untuk gedung ini belum tersedia.'}</p>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-6 border-t border-gray-200 pt-6 sm:grid-cols-2">
                  <div className="flex items-center gap-3 rounded-lg bg-green-50 p-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-600">
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-700">Kapasitas</p>
                      <p className="text-lg font-semibold text-green-800">{venue.capacity} Orang</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg bg-blue-50 p-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                      <CreditCard className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-blue-700">Harga Per Hari</p>
                      <p className="text-lg font-semibold text-blue-800">Rp {basePrice.toLocaleString('id-ID', { maximumFractionDigits: 0 })}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-6 border-t border-gray-200 pt-6 md:grid-cols-2">
                  <div>
                    <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-700">
                      <FileText className="h-5 w-5 text-purple-600" />
                      Kegunaan
                    </h3>
                    {venue.purposes?.length > 0 ? (
                      <ul className="space-y-1.5">
                        {venue.purposes.map((p) => (
                          <li key={p.id} className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-500"></div>
                            {p.name}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500">Info kegunaan tidak tersedia.</p>
                    )}
                  </div>
                  <div>
                    <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-700">
                      <Building className="h-5 w-5 text-orange-600" />
                      Fasilitas
                    </h3>{' '}
                    {/* Menggunakan Building untuk Fasilitas */}
                    {venue.facilities?.length > 0 ? (
                      <ul className="space-y-1.5">
                        {venue.facilities.map((f) => (
                          <li key={f.id} className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-orange-500"></div>
                            {f.name}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500">Info fasilitas tidak tersedia.</p>
                    )}
                  </div>
                </div>

                <div className="mt-8 border-t border-gray-200 pt-6">
                  <div className="flex items-center gap-3 rounded-lg bg-amber-50 p-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                      <CheckCircle className="h-5 w-5" />
                    </div>{' '}
                    {/* CheckCircle untuk Kondisi */}
                    <div>
                      <p className="text-sm font-medium text-amber-700">Kondisi Bangunan</p>
                      <p className="text-lg font-semibold text-amber-800">{venue.building_condition || 'Baik'}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-gray-200 pt-6">
                  <div className="flex items-start gap-3 rounded-lg bg-gradient-to-r from-blue-50/70 to-indigo-50/70 p-4 md:p-5">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-700">Informasi Pemesanan Lanjutan</h4>
                      <p className="mt-1 text-sm leading-relaxed text-gray-600">
                        Untuk kebutuhan khusus atau jangka panjang, hubungi kami via halaman Kontak.
                      </p>
                      <Link href={route('contact')} className="mt-2 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
                        Halaman Kontak <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-28 rounded-2xl border border-gray-200 bg-white p-6 shadow-xl md:p-8">
                <div className="mb-6 text-center">
                  <div className="from-primary to-secondary mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg md:h-16 md:w-16">
                    <ClipboardEdit className="h-7 w-7 md:h-8 md:w-8" />
                  </div>{' '}
                  <h2 className="text-xl font-bold text-gray-800 md:text-2xl">Formulir Pesan Gedung</h2>
                  <p className="mt-1.5 text-sm text-gray-500">Isi detail untuk mengajukan pemesanan.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-gray-700">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="focus:border-primary focus:ring-primary w-full rounded-lg border border-gray-300 px-4 py-2.5 shadow-sm"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    {errors?.name && (
                      <div className="mt-1 flex items-center text-xs text-red-600">
                        <AlertCircle size={14} className="mr-1" />
                        {errors.name}
                      </div>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="focus:border-primary focus:ring-primary w-full rounded-lg border border-gray-300 px-4 py-2.5 shadow-sm"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    {errors?.email && (
                      <div className="mt-1 flex items-center text-xs text-red-600">
                        <AlertCircle size={14} className="mr-1" />
                        {errors.email}
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <div>
                      <label htmlFor="event_start_date" className="mb-1.5 block text-sm font-medium text-gray-700">
                        Tanggal Mulai
                      </label>
                      <input
                        type="date"
                        id="event_start_date"
                        name="event_start_date"
                        className="focus:border-primary focus:ring-primary w-full rounded-lg border border-gray-300 px-4 py-2.5 shadow-sm"
                        value={eventStartDate}
                        onChange={(e) => setEventStartDate(e.target.value)}
                        required
                        min={new Date().toISOString().split('T')[0]}
                      />
                      {errors?.event_start_date && (
                        <div className="mt-1 flex items-center text-xs text-red-600">
                          <AlertCircle size={14} className="mr-1" />
                          {errors.event_start_date}
                        </div>
                      )}
                    </div>
                    <div>
                      <label htmlFor="event_end_date" className="mb-1.5 block text-sm font-medium text-gray-700">
                        Tanggal Selesai
                      </label>
                      <input
                        type="date"
                        id="event_end_date"
                        name="event_end_date"
                        className="focus:border-primary focus:ring-primary w-full rounded-lg border border-gray-300 px-4 py-2.5 shadow-sm"
                        value={eventEndDate}
                        onChange={(e) => setEventEndDate(e.target.value)}
                        required
                        min={eventStartDate || new Date().toISOString().split('T')[0]}
                      />
                      {errors?.event_end_date && (
                        <div className="mt-1 flex items-center text-xs text-red-600">
                          <AlertCircle size={14} className="mr-1" />
                          {errors.event_end_date}
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="purpose" className="mb-1.5 block text-sm font-medium text-gray-700">
                      Keperluan
                    </label>
                    <textarea
                      id="purpose"
                      name="purpose"
                      rows={3}
                      className="focus:border-primary focus:ring-primary w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 shadow-sm"
                      placeholder="Jelaskan keperluan acara Anda..."
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                      required
                    ></textarea>
                    {errors?.purpose && (
                      <div className="mt-1 flex items-center text-xs text-red-600">
                        <AlertCircle size={14} className="mr-1" />
                        {errors.purpose}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">Estimasi Total Harga ({calculatedDays} hari)</label>
                    <div className="rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-lg font-bold text-green-600">
                      {Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        maximumFractionDigits: 0,
                      }).format(totalPrice)}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="ktp_image" className="mb-1.5 block text-sm font-medium text-gray-700">
                      Upload KTP (Max. 2MB)
                    </label>
                    <input
                      type="file"
                      id="ktp_image"
                      name="ktp_image"
                      required
                      onChange={(e) => setKtpImage(e.target.files?.[0] || null)}
                      className="w-full text-sm text-gray-500 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:outline-none"
                      accept="image/jpeg,image/png,application/pdf"
                    />
                    {ktpPreviewUrl && (
                      <div className="group relative mt-3 h-20 w-32">
                        <img
                          src={ktpPreviewUrl}
                          alt="Preview KTP"
                          className="h-full w-full rounded-md border border-gray-300 object-cover shadow-sm"
                        />
                        <div className="absolute top-0.5 right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-600">
                          <CheckCircle className="h-3.5 w-3.5" />
                        </div>
                      </div>
                    )}
                    {errors?.ktp_image && (
                      <div className="mt-1 flex items-center text-xs text-red-600">
                        <AlertCircle size={14} className="mr-1" />
                        {errors.ktp_image}
                      </div>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="group from-primary/80 to-secondary/80 hover:from-primary hover:to-secondary flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-gradient-to-r px-5 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                  >
                    <Building className="h-5 w-5" /> Pesan Sekarang
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
