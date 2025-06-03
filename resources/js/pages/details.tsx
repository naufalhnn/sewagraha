import MainLayout from '@/layouts/main-layout';
import { router, usePage } from '@inertiajs/react';
import {
  ArrowLeft, // Untuk tombol prev slider
  ArrowRight, // Untuk Deskripsi Gedung
  Building, // Untuk tombol next slider
  CheckCircle, // Untuk Kondisi Bangunan
  CreditCard, // Untuk tanggal
  FileText, // Untuk Informasi Pemesanan
  Info,
  MapPin,
  Megaphone, // Untuk Pesan Gedung (icon form)
  Phone,
  Users,
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

// Define interfaces for props
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
  // Remove basePrice from here since it's part of venue
};

export default function VenueShow() {
  const { venue, auth } = usePage<PageProps>().props;

  // Use venue.base_price directly and add safety check
  const basePrice = venue?.base_price || 0;

  // Form state
  const [name, setName] = useState(auth.user?.name || '');
  const [email, setEmail] = useState(auth.user?.email || '');
  const [eventStartDate, setEventStartDate] = useState('');
  const [eventEndDate, setEventEndDate] = useState('');
  const [purpose, setPurpose] = useState('');
  const [ktpImage, setKtpImage] = useState<File | null>(null);
  const [ktpPreviewUrl, setKtpPreviewUrl] = useState<string | null>(null);
  const [totalPrice, setTotalPrice] = useState(`Rp ${basePrice.toLocaleString('id-ID')}`);

  // Slider state and refs
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);

  // Calculate total price effect
  useEffect(() => {
    const calculateTotalPrice = () => {
      if (!basePrice) {
        setTotalPrice('Rp 0');
        return;
      }

      const startDate = new Date(eventStartDate);
      const endDate = new Date(eventEndDate);

      if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
        let dayCount = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        dayCount = Math.max(1, dayCount + 1);
        setTotalPrice(`Rp ${(dayCount * basePrice).toLocaleString('id-ID')}`);
      } else {
        setTotalPrice(`Rp ${basePrice.toLocaleString('id-ID')}`);
      }
    };

    calculateTotalPrice();
  }, [eventStartDate, eventEndDate, basePrice]);

  // KTP Image preview effect
  useEffect(() => {
    if (ktpImage) {
      const objectUrl = URL.createObjectURL(ktpImage);
      setKtpPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl); // Clean up
    }
    setKtpPreviewUrl(null);
  }, [ktpImage]);

  // Slider effect
  useEffect(() => {
    if (!sliderRef.current || !venue?.venue_images || venue.venue_images.length === 0) return;

    const totalSlides = venue.venue_images.length;

    // Function to update slider transform
    const updateSlider = () => {
      if (sliderRef.current) {
        const translateX = -(currentSlide * 100);
        sliderRef.current.style.transform = `translateX(${translateX}%)`;
      }
    };

    updateSlider();

    // Auto-slide functionality (only if more than 1 slide)
    if (totalSlides > 1) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      intervalRef.current = window.setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
      }, 5000); // 5 seconds
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentSlide, venue?.venue_images]); // Fixed: Include venue?.venue_images directly

  const handleNextSlide = () => {
    const imagesLength = venue?.venue_images?.length || 0;
    if (imagesLength > 0) {
      setCurrentSlide((prev) => (prev + 1) % imagesLength);
    }
  };

  const handlePrevSlide = () => {
    const imagesLength = venue?.venue_images?.length || 0;
    if (imagesLength > 0) {
      setCurrentSlide((prev) => (prev - 1 + imagesLength) % imagesLength);
    }
  };

  const handleIndicatorClick = (index: number) => {
    setCurrentSlide(index);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('venue_id', String(venue.id));
    if (auth.user?.id) {
      formData.append('user_id', String(auth.user.id));
    }
    formData.append('name', name);
    formData.append('email', email);
    formData.append('event_start_date', eventStartDate);
    formData.append('event_end_date', eventEndDate);
    formData.append('purpose', purpose);
    if (ktpImage) {
      formData.append('ktp_image', ktpImage);
    }

    router.post(route('bookings.store'), formData, {
      forceFormData: true,
      onSuccess: () => {
        alert('Booking submitted successfully!');
        // Optionally reset form or redirect
      },
      onError: (errors) => {
        console.error('Booking submission error:', errors);
        alert('Failed to submit booking. Please check console for details.');
      },
    });
  };

  // Add safety check for venue data
  if (!venue) {
    return (
      <MainLayout title="Loading...">
        <div className="flex min-h-screen items-center justify-center">
          <p>Loading venue details...</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title={`Detail Gedung - ${venue.name}`}>
      <section className="mx-auto mt-28 max-w-7xl px-4 pb-20">
        {/* Header Section */}
        <div className="my-8">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-700">
              <Building className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="mb-1 text-2xl font-bold text-gray-800">{venue.name}</h1>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-5 w-5" />
                <span className="text-base">{venue.address}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Images and Details */}
          <div className="space-y-8 lg:col-span-2">
            {/* Image Slider */}
            <div className="relative overflow-hidden rounded-2xl bg-gray-100 shadow-xl">
              <div className="aspect-video">
                <div id="slider" className="relative h-full w-full overflow-hidden">
                  <div ref={sliderRef} className="slider-items flex h-full transition-transform duration-500 ease-out">
                    {venue.venue_images?.map((image) => (
                      <div key={image.id} className="h-full w-full flex-shrink-0" style={{ width: '100%' }}>
                        <img src={`/storage/${image.image_path}`} alt={`Gambar Gedung ${venue.name}`} className="h-full w-full object-cover" />
                      </div>
                    ))}
                  </div>

                  {/* Navigation Buttons */}
                  {(venue?.venue_images?.length || 0) > 1 && (
                    <>
                      <button
                        id="prevBtn"
                        onClick={handlePrevSlide}
                        className="group absolute top-1/2 left-4 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white"
                      >
                        <ArrowLeft className="h-6 w-6 text-gray-700 group-hover:text-blue-600" />
                      </button>
                      <button
                        id="nextBtn"
                        onClick={handleNextSlide}
                        className="group absolute top-1/2 right-4 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white"
                      >
                        <ArrowRight className="h-6 w-6 text-gray-700 group-hover:text-blue-600" />
                      </button>

                      {/* Slide Indicators */}
                      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                        {venue.venue_images.map((_, index) => (
                          <button
                            key={index}
                            className={`slide-indicator h-3 w-3 rounded-full transition-colors duration-200 hover:bg-white ${
                              index === currentSlide ? 'bg-white' : 'bg-white/60'
                            }`}
                            onClick={() => handleIndicatorClick(index)}
                          ></button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Venue Details */}
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
              <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-800">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                  <Megaphone className="h-5 w-5 text-blue-600" />
                </div>
                Deskripsi Gedung
              </h2>

              <div className="space-y-6">
                {/* Description */}
                <div className="rounded-xl bg-gray-50 p-6">
                  <p className="text-lg leading-relaxed text-gray-700">{venue.description}</p>
                </div>

                {/* Key Info Grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Capacity */}
                  <div className="flex items-center gap-4 rounded-xl border border-green-100 bg-green-50 p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-600">Kapasitas</p>
                      <p className="text-xl font-bold text-green-800">{venue.capacity} Orang</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-4 rounded-xl border border-blue-100 bg-blue-50 p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500">
                      <CreditCard className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-blue-600">Harga Per Hari</p>
                      <p className="text-xl font-bold text-blue-800">Rp {venue.base_price?.toLocaleString('id-ID') || '0'}</p>
                    </div>
                  </div>
                </div>

                {/* Purposes & Facilities */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Purposes */}
                  <div className="rounded-xl border border-gray-200 bg-white p-6">
                    <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-800">
                      <FileText className="h-5 w-5 text-purple-600" />
                      Kegunaan
                    </h3>
                    <ul className="space-y-2">
                      {venue.purposes?.map((purpose) => (
                        <li key={purpose.id} className="flex items-center gap-2 text-gray-700">
                          <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                          {purpose.name}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Facilities */}
                  <div className="rounded-xl border border-gray-200 bg-white p-6">
                    <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-800">
                      <Building className="h-5 w-5 text-orange-600" />
                      Fasilitas
                    </h3>
                    <ul className="space-y-2">
                      {venue.facilities?.map((facility) => (
                        <li key={facility.id} className="flex items-center gap-2 text-gray-700">
                          <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                          {facility.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Building Condition */}
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500">
                      <Info className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-amber-600">Kondisi Bangunan</p>
                      <p className="text-lg font-semibold text-amber-800">{venue.building_condition}</p>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 p-6">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
                      <Phone className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-blue-600">Informasi Pemesanan</p>
                      <p className="leading-relaxed text-gray-700">
                        Untuk pemesanan jangka panjang, silahkan hubungi kami melalui nomor telepon yang tertera di halaman kontak.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl">
                <div className="mb-6 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-green-500 to-blue-500">
                    <Building className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Pesan Gedung</h2>
                  <p className="mt-2 text-gray-600">Isi formulir untuk melakukan pemesanan</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <input type="hidden" name="venue_id" value={venue.id} />
                  <input type="hidden" name="user_id" value={auth.user?.id || ''} />

                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-semibold text-gray-700">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full rounded-xl border border-gray-300 p-4 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-semibold text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full rounded-xl border border-gray-300 p-4 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  {/* Date Fields */}
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label htmlFor="event_start_date" className="mb-2 block text-sm font-semibold text-gray-700">
                        Tanggal Mulai Acara
                      </label>
                      <input
                        type="date"
                        id="event_start_date"
                        name="event_start_date"
                        className="w-full rounded-xl border border-gray-300 p-4 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                        value={eventStartDate}
                        onChange={(e) => setEventStartDate(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="event_end_date" className="mb-2 block text-sm font-semibold text-gray-700">
                        Tanggal Selesai Acara
                      </label>
                      <input
                        type="date"
                        id="event_end_date"
                        name="event_end_date"
                        className="w-full rounded-xl border border-gray-300 p-4 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                        value={eventEndDate}
                        onChange={(e) => setEventEndDate(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Purpose Field */}
                  <div>
                    <label htmlFor="purpose" className="mb-2 block text-sm font-semibold text-gray-700">
                      Keperluan
                    </label>
                    <textarea
                      id="purpose"
                      name="purpose"
                      rows={4}
                      className="w-full resize-none rounded-xl border border-gray-300 p-4 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                      placeholder="Jelaskan keperluan acara Anda..."
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                      required
                    ></textarea>
                  </div>

                  {/* Total Price */}
                  <div>
                    <label htmlFor="total_price" className="mb-2 block text-sm font-semibold text-gray-700">
                      Total Harga
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="total_price"
                        name="total_price"
                        className="w-full rounded-xl border border-gray-300 bg-gray-50 p-4 text-lg font-bold text-green-600"
                        value={totalPrice}
                        readOnly
                      />
                      <div className="absolute top-1/2 right-4 -translate-y-1/2">
                        {/* Adjusted for consistency with currency display in Vanues.tsx */}
                        <span className="font-bold text-green-600">Rp</span>
                      </div>
                    </div>
                  </div>

                  {/* File Upload */}
                  <div>
                    <label htmlFor="ktp_image" className="mb-2 block text-sm font-semibold text-gray-700">
                      Upload KTP atau Identitas Lain
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        id="ktp_image"
                        name="ktp_image"
                        required
                        onChange={(e) => setKtpImage(e.target.files?.[0] || null)}
                        className="w-full rounded-xl border-2 border-dashed border-gray-300 p-4 transition-colors file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:font-semibold file:text-blue-700 hover:border-blue-400 hover:file:bg-blue-100"
                      />
                    </div>

                    {/* Image Preview */}
                    {ktpPreviewUrl && (
                      <div id="imagePreview" className="mt-4">
                        <div className="relative inline-block">
                          <img
                            id="preview"
                            src={ktpPreviewUrl}
                            alt="Preview"
                            className="h-32 max-w-full rounded-xl border border-gray-200 object-cover"
                          />
                          <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-500">
                            <CheckCircle className="h-4 w-4 text-white" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full transform rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-blue-700 hover:to-blue-800 hover:shadow-xl focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Building className="h-5 w-5 text-white" />
                      Pesan Sekarang
                    </span>
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
