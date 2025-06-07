import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import FlashMessage from '@/components/ui/flash-message';
import { ImagePreview } from '@/components/ui/image-preview';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
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

  // 3. Gunakan useEffect untuk "mendengarkan" perubahan pada prop 'bookingDetail'
  //    Ini adalah cara yang benar untuk menangani data asynchronous dari Inertia.
  useEffect(() => {
    // Jika prop bookingDetail baru saja tiba dari server...
    if (bookingDetail) {
      setSelectedBooking(bookingDetail); // ...simpan data baru tersebut ke state lokal
      setIsLoadingDetail(false); // ...dan hentikan status loading.
    }
  }, [bookingDetail]); // Effect ini akan berjalan setiap kali `bookingDetail` berubah.

  // 4. Fungsi inilah yang akan menangani semua logika saat tombol di tabel diklik
  const handleDetailClick = (bookingFromRow: Booking) => {
    // Buka dialog. Tombol di kolom sudah dibungkus <DialogTrigger>,
    // jadi ini hanya untuk memastikan jika ada kasus lain.
    // Kita set state open di sini agar lebih eksplisit.
    setIsOpen(true);
    setIsLoadingDetail(true);
    setSelectedBooking(bookingFromRow); // Tampilkan data awal yang sudah ada di baris tabel

    // Lakukan partial reload untuk mengambil data yang lebih lengkap
    router.get(
      route('bookings.index', { id: bookingFromRow.id }), // Ganti dengan nama route yang benar
      {},
      {
        preserveState: true,
        preserveScroll: true,
        only: ['bookingDetail', 'paymentProof'], // Hanya minta prop ini dari backend
        onStart: () => {
          setIsLoadingDetail(true);
        },
        onError: () => {
          // Jika gagal, hentikan loading dan mungkin tampilkan pesan error
          console.error('Gagal mengambil detail booking.');
          setIsLoadingDetail(false);
        },
      },
    );
  };

  // 5. Teruskan fungsi handleDetailClick ke definisi kolom
  //    useMemo digunakan untuk mencegah pembuatan ulang fungsi kolom pada setiap render
  const tableColumns = useMemo(() => columns(handleDetailClick), []);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Kelola Penyewaan" />
      <FlashMessage />

      {/* 6. Komponen Dialog utama yang mengontrol semua state */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Kelola Penyewaan</h1>
          </div>
          <DataTable columns={tableColumns} data={bookings} searchPlaceholder="Cari penyewaan..." />
        </div>

        {/* 7. Konten Dialog yang dinamis berdasarkan state */}
        <DialogContent className="sm:max-w-2xl">
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

              {/* Tambahkan informasi detail lainnya di sini */}
              {/* Contoh: menampilkan gambar KTP atau bukti bayar jika ada */}
            </div>
          ) : (
            <div className="py-10 text-center text-red-500">Gagal memuat data detail.</div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Tutup
            </Button>
            {/* Jika Anda butuh tombol aksi lain seperti "Setujui" atau "Tolak", letakkan di sini */}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
