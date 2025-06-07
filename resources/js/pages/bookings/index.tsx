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
import FlashMessage from '@/components/ui/flash-message';
import { ImagePreview } from '@/components/ui/image-preview';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { MouseEventHandler, useEffect, useMemo, useState } from 'react';
import { columns, type Booking, type PaymentProof } from './columns';
import { DataTable } from './data-table';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Kelola Penyewaan',
    href: '/bookings',
  },
];

export default function Bookings() {
  const { bookings, bookingDetail, paymentProof } = usePage<{
    bookings: Booking[];
    bookingDetail?: Booking;
    paymentProof?: PaymentProof;
  }>().props;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);

  useEffect(() => {
    if (bookingDetail) {
      setSelectedBooking(bookingDetail);
      setIsLoadingDetail(false);
    }
  }, [bookingDetail]);

  const handleDetailClick = (bookingFromRow: Booking) => {
    setIsOpen(true);
    setIsLoadingDetail(true);
    setSelectedBooking(bookingFromRow);

    router.get(
      route('bookings.index', { id: bookingFromRow.id }),
      {},
      {
        preserveState: true,
        preserveScroll: true,
        only: ['bookingDetail', 'paymentProof'],
        onStart: () => {
          setIsLoadingDetail(true);
        },
        onError: () => {
          console.error('Gagal mengambil detail booking.');
          setIsLoadingDetail(false);
        },
      },
    );
  };

  const handleStatusUpdate: MouseEventHandler = (e) => {
    e.preventDefault();

    if (selectedBooking?.status == 'VERIFYING PAYMENT') {
      const status = 'CONFIRMED';
      router.put(
        route('bookings.update', selectedBooking?.id),
        { status: status },
        {
          preserveState: true,
          preserveScroll: true,
          onSuccess: () => {
            setIsOpen(false);
          },
        },
      );
    } else if (selectedBooking?.status == 'REQUEST CANCEL') {
      const status = 'CANCELED';
      router.put(
        route('bookings.update', selectedBooking?.id),
        { status: status },
        {
          preserveState: true,
          preserveScroll: true,
          onSuccess: () => {
            setIsOpen(false);
          },
        },
      );
    }
  };

  const tableColumns = useMemo(() => columns(handleDetailClick), []);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Kelola Penyewaan" />
      <FlashMessage />

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Kelola Penyewaan</h1>
          </div>
          <DataTable columns={tableColumns} data={bookings} searchPlaceholder="Cari penyewaan..." />
        </div>

        <DialogContent className="max-h-[95vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Detail Booking: {selectedBooking?.booking_code}</DialogTitle>
            <DialogDescription>Informasi lengkap mengenai penyewaan yang dipilih.</DialogDescription>
          </DialogHeader>

          {isLoadingDetail ? (
            <div className="py-10 text-center">Memuat detail, harap tunggu...</div>
          ) : selectedBooking ? (
            <div className="grid gap-2 py-4">
              {paymentProof ? (
                <div className="space-y-2">
                  <h4 className="border-b pb-1 font-semibold">Bukti Pembayaran</h4>
                  <ImagePreview
                    src={`/storage/${paymentProof.payment_proof_image_path}`}
                    alt={`Bukti pembayaran untuk booking ${selectedBooking?.booking_code}`}
                  />
                  <p className="mt-2 text-sm text-gray-500">Diupload pada: {new Date(paymentProof.uploaded_at).toLocaleString('id-ID')}</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <h4 className="border-b pb-1 font-semibold">Bukti Pembayaran</h4>
                  <p className="text-sm text-gray-500 italic">Belum ada bukti pembayaran yang diupload.</p>
                </div>
              )}
              <p>
                <strong>Nama Penyewa:</strong> {selectedBooking.user.name}
              </p>
              <p>
                <strong>No Telepon:</strong> {selectedBooking.user.phone_number}
              </p>
              <p>
                <strong>Email:</strong> {selectedBooking.user.name}
              </p>
              <p>
                <strong>Gedung:</strong> {selectedBooking.venue.name}
              </p>
              <p>
                <strong>Status:</strong> <span className="font-semibold">{selectedBooking.status.replace('_', ' ')}</span>
              </p>
              <p>
                <strong>Total Biaya:</strong>{' '}
                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(selectedBooking.total_price)}
              </p>
            </div>
          ) : (
            <div className="py-10 text-center text-red-500">Gagal memuat data detail.</div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Tutup
            </Button>
            {selectedBooking?.status == 'PENDING' || selectedBooking?.status == 'VERIFYING PAYMENT' || selectedBooking?.status == 'REQUEST CANCEL' ? (
              <div className="flex space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="default" className="cursor-pointer bg-green-200 text-green-700 transition duration-300 hover:bg-green-300">
                      Setujui
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader className="font-bold">Setujui {selectedBooking.status}?</DialogHeader>
                    <DialogDescription>Klik konfirmasi jika ingin merubah status booking {selectedBooking.booking_code}</DialogDescription>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant={'ghost'}>Batal</Button>
                      </DialogClose>
                      <Button onClick={handleStatusUpdate} className="cursor-pointer">
                        Konfirmasi
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            ) : (
              <div></div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
