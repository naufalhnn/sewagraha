import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import MainLayout from '@/layouts/main-layout'; // Sesuaikan path jika perlu
import { Head, Link, router, usePage } from '@inertiajs/react';
import {
  Archive,
  ArrowRight,
  CalendarRange,
  CheckCircle2,
  Clock,
  CreditCard,
  Eye,
  Hourglass,
  Info,
  ListChecks,
  SearchCheck,
  XCircle,
} from 'lucide-react';
import React from 'react';

type BookingStatus = 'PENDING' | 'WAITING PAYMENT' | 'VERIFYING PAYMENT' | 'CONFIRMED' | 'COMPLETED' | 'REQUEST CANCEL' | 'CANCELED' | string;

interface Venue {
  id: number;
  name: string;
}

interface Booking {
  id: number;
  booking_code: string;
  venue: Venue;
  event_start_date: string;
  event_end_date: string;
  total_price: number;
  status: BookingStatus;
  payment?: {
    status: string;
  };
  created_at: string;
}

type BookingHistoryPageProps = {
  bookings: Booking[];
};

const StatusBadge: React.FC<{ status: BookingStatus }> = ({ status }) => {
  let bgColor = 'bg-gray-100 text-gray-700 border-gray-300';
  let IconComponent = Info;

  const upperStatus = status?.toUpperCase() || 'UNKNOWN';

  switch (upperStatus) {
    case 'PENDING':
      bgColor = 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700';
      IconComponent = Clock;
      break;
    case 'WAITING PAYMENT':
      bgColor = 'bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700';
      IconComponent = Hourglass;
      break;
    case 'VERIFYING PAYMENT':
      bgColor = 'bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-900/30 dark:text-teal-300 dark:border-teal-700';
      IconComponent = SearchCheck;
      break;
    case 'CONFIRMED':
    case 'PAID':
      bgColor = 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700';
      IconComponent = CheckCircle2;
      break;
    case 'COMPLETED':
      bgColor = 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700';
      IconComponent = CheckCircle2;
      break;
    case 'REQUEST CANCEL':
    case 'CANCELED':
      bgColor = 'bg-red-100 text-red-800 border-red-300 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700';
      IconComponent = XCircle;
      break;
    default:
      IconComponent = Info;
      break;
  }

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${bgColor}`}>
      <IconComponent size={14} strokeWidth={2} />
      {status
        ?.replace('_', ' ')
        .toLowerCase()
        .replace(/\b\w/g, (l) => l.toUpperCase()) || 'Tidak Diketahui'}
    </span>
  );
};

const formatDate = (dateString: string, options?: Intl.DateTimeFormatOptions) => {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...options,
  };
  return new Date(dateString).toLocaleDateString('id-ID', defaultOptions);
};

export default function BookingHistory() {
  const { bookings } = usePage<BookingHistoryPageProps>().props;

  const handleCancelBooking = (bookingCode: string) => {
    router.put(route('bookings.cancel', bookingCode), {
      preserveScroll: true,
    });
  };

  return (
    <MainLayout title="Riwayat Pemesanan">
      <Head>
        <title>Riwayat Pemesanan</title>
        <meta name="description" content="Lihat riwayat pemesanan gedung Anda di Sewagraha." />
      </Head>

      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%236366f1%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%227%22%20cy%3D%227%22%20r%3D%227%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"></div>
        <div className="relative container mx-auto max-w-4xl px-4 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-medium text-indigo-700 shadow-sm">
            <ListChecks className="h-5 w-5" />
            Daftar Pesanan Anda
          </div>
          <h1 className="mb-3 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
            Riwayat <span className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-transparent">Pemesanan</span>
          </h1>
          <p className="text-md mx-auto max-w-xl text-gray-600 md:text-lg">
            Kelola dan lihat detail semua pemesanan gedung yang pernah Anda lakukan.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 py-12 md:py-16">
        <div className="container mx-auto max-w-5xl px-4">
          {bookings && bookings.length > 0 ? (
            <div className="space-y-6">
              {bookings.map((booking) => {
                const upperBookingStatus = booking.status?.toUpperCase();

                return (
                  <div
                    key={booking.id}
                    className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3">
                      <div className="border-b border-gray-200 p-5 md:col-span-2 md:border-r md:border-b-0 dark:border-slate-700">
                        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <Link
                            href={route('venues.show', booking.venue.id)}
                            className="text-lg font-semibold text-blue-700 hover:text-blue-800 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
                          >
                            {booking.venue.name}
                          </Link>
                          <StatusBadge status={booking.status} />
                        </div>
                        <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                          Kode Booking: <span className="font-medium text-gray-700 dark:text-gray-200">{booking.booking_code}</span>
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Dipesan pada:{' '}
                          <span className="font-medium text-gray-700 dark:text-gray-200">
                            {formatDate(booking.created_at, { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </p>
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                            <CalendarRange className="h-4 w-4 flex-shrink-0 text-indigo-500 dark:text-indigo-400" />
                            <span>
                              {formatDate(booking.event_start_date)} - {formatDate(booking.event_end_date)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col justify-between p-5">
                        <div>
                          {upperBookingStatus === 'WAITING PAYMENT' ||
                            upperBookingStatus === 'PENDING' ||
                            (booking.payment && booking.payment.status?.toUpperCase() !== 'PAID')}
                          <p
                            className={`mb-1 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium shadow-sm ${
                              upperBookingStatus === 'WAITING PAYMENT'
                                ? 'border border-orange-200 bg-orange-100 text-orange-700 dark:border-orange-700 dark:bg-orange-900/50 dark:text-orange-300'
                                : upperBookingStatus === 'VERIFYING PAYMENT'
                                  ? 'border border-teal-200 bg-teal-100 text-teal-700 dark:border-teal-700 dark:bg-teal-900/50 dark:text-teal-300'
                                  : upperBookingStatus === 'CONFIRMED' || upperBookingStatus === 'COMPLETED'
                                    ? 'border border-green-200 bg-green-100 text-green-700 dark:border-green-700 dark:bg-green-900/50 dark:text-green-300'
                                    : upperBookingStatus === 'PENDING'
                                      ? 'border border-yellow-200 bg-yellow-100 text-yellow-700 dark:border-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300'
                                      : upperBookingStatus === 'CANCELED' || upperBookingStatus === 'REJECTED'
                                        ? 'border border-red-200 bg-red-100 text-red-700 dark:border-red-700 dark:bg-red-900/50 dark:text-red-300'
                                        : 'border border-gray-200 bg-gray-100 text-gray-700 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300' // Default atau status lain
                            }`}
                          >
                            {upperBookingStatus === 'WAITING PAYMENT'
                              ? 'Menunggu Pembayaran'
                              : upperBookingStatus === 'VERIFYING PAYMENT'
                                ? 'Pembayaran Sedang Diverifikasi'
                                : upperBookingStatus === 'REQUEST CANCEL'
                                  ? 'Memproses Permintaan Pembatalan'
                                  : upperBookingStatus === 'CONFIRMED' || upperBookingStatus === 'COMPLETED'
                                    ? 'Total Pembayaran (Lunas)'
                                    : 'Total Pembayaran'}
                          </p>
                          <p
                            className={`text-xl font-bold ${
                              upperBookingStatus === 'CONFIRMED' || upperBookingStatus === 'COMPLETED' || upperBookingStatus === 'VERIFYING PAYMENT'
                                ? 'text-green-600 dark:text-green-400'
                                : upperBookingStatus === 'WAITING PAYMENT'
                                  ? 'text-orange-600 dark:text-orange-400'
                                  : 'text-gray-800 dark:text-gray-100'
                            }`}
                          >
                            {new Intl.NumberFormat('id-ID', {
                              style: 'currency',
                              currency: 'IDR',
                              maximumFractionDigits: 0,
                            }).format(booking.total_price)}
                          </p>
                        </div>
                        <div className="mt-4 space-y-2">
                          {upperBookingStatus === 'PENDING' ||
                            (upperBookingStatus === 'WAITING PAYMENT' && (
                              <Link
                                href={route('bookings.payment', booking.booking_code)}
                                className="group flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-orange-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
                              >
                                <CreditCard size={16} /> Lakukan Pembayaran
                              </Link>
                            ))}

                          {(upperBookingStatus === 'PENDING' || upperBookingStatus === 'WAITING PAYMENT') && (
                            <Dialog>
                              <DialogTrigger asChild>
                                <button className="group flex w-full items-center justify-center gap-2 rounded-lg border border-red-300 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 shadow-sm transition-colors duration-200 hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:border-red-500/50 dark:bg-slate-700 dark:text-red-400 dark:hover:bg-red-500/10">
                                  <XCircle size={16} /> Batalkan Pesanan
                                </button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Apakah Anda yakin mambatalkan pesanan?</DialogTitle>
                                  <DialogDescription>Tindakan ini tidak bisa diurungkan.</DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                  <DialogClose asChild>
                                    <Button className="cursor-pointer bg-gray-200 text-gray-700 hover:bg-gray-300">Batal</Button>
                                  </DialogClose>
                                  <Button
                                    onClick={() => handleCancelBooking(booking.booking_code)}
                                    variant={'destructive'}
                                    className="cursor-pointer"
                                  ></Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          )}

                          {(upperBookingStatus === 'VERIFYING PAYMENT' || upperBookingStatus === 'CONFIRMED') && (
                            <Dialog>
                              <DialogTrigger asChild>
                                <button className="group flex w-full items-center justify-center gap-2 rounded-lg border border-red-300 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 shadow-sm transition-colors duration-200 hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 dark:border-red-500/50 dark:bg-slate-700 dark:text-red-400 dark:hover:bg-red-500/10">
                                  <XCircle size={16} /> Ajukan Pembatalan
                                </button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Apakah Anda yakin mambatalkan pesanan?</DialogTitle>
                                  <DialogDescription>Tindakan ini tidak bisa diurungkan.</DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                  <DialogClose asChild>
                                    <Button className="cursor-pointer bg-gray-200 text-gray-700 hover:bg-gray-300">Batal</Button>
                                  </DialogClose>
                                  <Button
                                    onClick={() => handleCancelBooking(booking.booking_code)}
                                    variant={'destructive'}
                                    className="cursor-pointer"
                                  >
                                    Batalkan
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          )}

                          <Link
                            href={route('bookings.detail', booking.booking_code)}
                            className="group flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600"
                          >
                            <Eye size={16} /> Lihat Detail
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-16 text-center">
              <Archive className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500" />
              <h3 className="mt-5 text-xl font-semibold text-gray-800 dark:text-gray-100">Belum Ada Riwayat Pemesanan</h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">Anda belum pernah melakukan pemesanan gedung melalui Sewagraha.</p>
              <Link
                href={route('venues')}
                className="group mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2.5 font-medium text-white shadow-md transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-purple-700 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
              >
                Cari Gedung Sekarang
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
}
