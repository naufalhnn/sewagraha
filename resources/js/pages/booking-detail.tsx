import MainLayout from '@/layouts/main-layout';
import { Link, usePage } from '@inertiajs/react';
import { CreditCard, Landmark } from 'lucide-react';

interface Venue {
  id: number;
  name: string;
}

interface Payment {
  id: number;
  payment_code: string;
  total_price: number;
  status: string;
  paid_at: string;
}

interface User {
  id: number;
  name: string;
  email: string;
}

interface Booking {
  id: number;
  booking_code: string;
  event_start_date: string;
  event_end_date: string;
  purpose: string;
  total_price: number;
  status: string;
  created_at: string;
  venue: Venue;
  payment: Payment;
}

type BookingDetailPageProps = {
  booking: Booking;
  user: User;
};

export default function About() {
  const { booking, user } = usePage<BookingDetailPageProps>().props;

  const bookingDate = new Date(booking.created_at);

  return (
    <MainLayout title="Tentang Sewagraha">
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%236366f1%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%227%22%20cy%3D%227%22%20r%3D%227%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"></div>
        <div className="relative container mx-auto max-w-3xl px-4 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-medium text-blue-700 shadow-sm">
            <Landmark className="h-5 w-5" />
            Rincian Pemesanan
          </div>
          <h1 className="mb-3 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
            Rincian <span className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-transparent">Pemesanan</span>
          </h1>
          <p className="text-md mx-auto max-w-xl text-gray-600 md:text-lg">
            Kode Booking: {booking.booking_code}. Lihat status terkini dan kelola detail pemesanan gedung Anda.
          </p>
        </div>
      </section>

      <div className="container mx-auto max-w-2xl bg-slate-50 px-4 py-12 md:py-16">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl md:p-8">
          <div className="mb-6 border-b border-gray-200 pb-6">
            <h2 className="mb-1 text-xl font-semibold text-gray-800 md:text-2xl">Detail Pemesanan</h2>
            <p className="text-sm text-gray-500">Berikut adalah rincian lengkap pemesanan gedung Anda.</p>
          </div>

          <div className="space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <table>
              <tbody>
                <tr className="text-sm font-semibold text-gray-800">
                  <td className="px-1 py-1">Kode booking</td>
                  <td className="px-1 py-1">:</td>
                  <td className="px-1 py-1">{booking.booking_code}</td>
                </tr>
                <tr className="text-sm font-semibold text-gray-800">
                  <td className="px-1 py-1">Nama pemesan</td>
                  <td className="px-1 py-1">:</td>
                  <td className="px-1 py-1">{user.name}</td>
                </tr>
                <tr className="text-sm font-semibold text-gray-800">
                  <td className="px-1 py-1">Email</td>
                  <td className="px-1 py-1">:</td>
                  <td className="px-1 py-1">{user.email}</td>
                </tr>
                <tr className="text-sm font-semibold text-gray-800">
                  <td className="px-1 py-1">Tanggal pemesanan</td>
                  <td className="px-1 py-1">:</td>
                  <td className="px-1 py-1">
                    {bookingDate.toLocaleString('id-ID', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                </tr>
                <tr className="text-sm font-semibold text-gray-800">
                  <td className="px-1 py-1">Nama gedung</td>
                  <td className="px-1 py-1">:</td>
                  <td className="px-1 py-1">{booking.venue.name}</td>
                </tr>
                <tr className="text-sm font-semibold text-gray-800">
                  <td className="px-1 py-1">Tanggal mulai acara</td>
                  <td className="px-1 py-1">:</td>
                  <td className="px-1 py-1">
                    {new Date(booking.event_start_date).toLocaleString('id-ID', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </td>
                </tr>
                <tr className="text-sm font-semibold text-gray-800">
                  <td className="px-1 py-1">Tanggal berakhir acara</td>
                  <td className="px-1 py-1">:</td>
                  <td className="px-1 py-1">
                    {new Date(booking.event_end_date).toLocaleString('id-ID', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </td>
                </tr>
                <tr className="text-sm font-semibold text-gray-800">
                  <td className="px-1 py-1">Tujuan acara</td>
                  <td className="px-1 py-1">:</td>
                  <td className="px-1 py-1">{booking.purpose}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-12 space-y-4">
            <div className="mb-6 border-b border-gray-200 pb-6">
              <h2 className="mb-1 text-xl font-semibold text-gray-800 md:text-2xl">Informasi Pembayaran</h2>
              <p className="text-sm text-gray-500">Informasi lengkap mengenai status pembayaran Anda.</p>
            </div>
            <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm font-medium text-blue-700">Total Pembayaran:</p>
                <p className="text-xl font-bold text-blue-600 sm:text-2xl">
                  {new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    maximumFractionDigits: 0,
                  }).format(booking.total_price)}
                </p>
              </div>
              <table>
                <tbody>
                  <tr className="text-sm font-semibold text-gray-800">
                    <td className="py-1 pr-1">Status pembayaran</td>
                    <td className="py-1 pr-1">:</td>
                    <td className="py-1 pr-1">{booking.payment.status}</td>
                  </tr>
                </tbody>
                {booking.payment.status === 'PAID' && (
                  <tbody>
                    <tr className="text-sm font-semibold text-gray-800">
                      <td className="py-1 pr-1">Kode pembayaran</td>
                      <td className="py-1 pr-1"> : </td>
                      <td className="py-1 pr-1">{booking.payment.payment_code}</td>
                    </tr>
                    <tr className="text-sm font-semibold text-gray-800">
                      <td className="py-1 pr-1">Waktu pembayaran</td>
                      <td className="py-1 pr-1"> : </td>
                      <td className="py-1 pr-1">
                        {bookingDate.toLocaleString('id-ID', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                    </tr>
                  </tbody>
                )}

                {booking.payment.status === 'PENDING' && (
                  <Link
                    href={route('bookings.payment', booking.booking_code)}
                    className="group mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-orange-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
                  >
                    <CreditCard size={16} /> Lakukan Pembayaran
                  </Link>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
