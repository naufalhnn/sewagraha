import { Button } from '@/components/ui/button';
import FlashMessage from '@/components/ui/flash-message';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { MouseEventHandler, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Kelola Penyewaan',
    href: '/bookings',
  },
];

interface Venue {
  id: number;
  name: string;
  description: string;
  address: string;
  capacity: number;
  base_price: number;
  building_condition: string;
}

interface Payment {
  id: number;
  booking_id: number;
  user_id: number;
  payment_code: string;
  total_price: number;
  status: string;
  paid_at: Date | string | null;
}

interface User {
  id: number;
  name: string;
  email: string;
}

interface Booking {
  id: number;
  user_id: number;
  venue_id: number;
  booking_code: string;
  event_start_date: Date | string;
  event_end_date: Date | string;
  purpose: string;
  total_price: number;
  ktp_image_path: string;
  status: string;
  venue: Venue;
  payment: Payment;
  user: User;
}

export default function Bookings() {
  const { bookings } = usePage<{ bookings: Booking[] }>().props;
  const [open, setOpen] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState<Booking | null>(null);

  const handleDelete: MouseEventHandler = (e) => {
    e.preventDefault();
    if (!selectedVenue) return;
    router.delete(route('bookings.destroy', selectedVenue.id), {
      onSuccess: () => setOpen(false),
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Kelola Penyewaan" />
      <FlashMessage />

      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <h1 className="text-2xl font-semibold">Kelola Penyewaan</h1>
        <div>
          <table className="w-full table-auto">
            <thead className="text-start">
              <tr>
                <th className="border-1 px-4 py-2">Nama User</th>
                <th className="border-1 px-4 py-2">Gedung</th>
                <th className="border-1 px-4 py-2">Tanggal Mulai</th>
                <th className="border-1 px-4 py-2">Tanggal Berakhir</th>
                <th className="border-1 px-4 py-2">Tujuan</th>
                <th className="border-1 px-4 py-2">Total Biaya</th>
                <th className="border-1 px-4 py-2">Status</th>
                <th className="w-36 border-1 px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length == 0 ? (
                <tr>
                  <td colSpan={7} className="border px-4 py-2 text-center font-semibold">
                    Belum ada data
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking.id} className="align-top">
                    <td className="border px-4 py-2">
                      <div className="line-clamp-2">{booking.user.name}</div>
                    </td>
                    <td className="max-w-[200px] border px-4 py-2">
                      <div className="line-clamp-2">{booking.venue.name}</div>
                    </td>
                    <td className="max-w-[200px] border px-4 py-2">
                      {new Intl.DateTimeFormat('id-ID', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      }).format(new Date(booking.event_start_date))}
                    </td>
                    <td className="border px-4 py-2">
                      {new Intl.DateTimeFormat('id-ID', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      }).format(new Date(booking.event_end_date))}
                    </td>
                    <td className="max-w-[200px] border px-4 py-2">
                      <div className="line-clamp-2">{booking.purpose}</div>
                    </td>
                    <td className="border px-4 py-2">
                      {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        minimumFractionDigits: 0,
                      }).format(booking.total_price)}
                    </td>
                    <td className="border px-4 py-2">{booking.status}</td>
                    <td className="flex min-h-[4rem] items-center justify-center gap-1 border px-4 py-2">
                      <Link href={route('bookings.show', booking.id)} className="cursor-pointer">
                        <Button size={'sm'} className="cursor-pointer bg-blue-100 text-sm text-blue-600 transition duration-300 hover:bg-blue-200">
                          Detail
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}
