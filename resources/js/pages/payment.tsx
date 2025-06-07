import MainLayout from '@/layouts/main-layout'; // Sesuaikan path jika perlu
import { Head, useForm, usePage } from '@inertiajs/react';
import { AlertCircle, CheckCircle2, CreditCard, Landmark, Send, UploadCloud, UserCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface Venue {
  id: number;
  name: string;
}

interface Booking {
  id: number;
  total_price: number;
  event_start_date: Date;
  event_end_date: Date;
  booking_code: string;
  purpose: string;
  created_at: string;
  venue: Venue;
}

interface AuthUser {
  id: number;
  name: string;
  email: string;
}

type PaymentConfirmationPageProps = {
  booking: Booking;
  user: AuthUser;
  errors?: Partial<Record<string, string>>;
  flash?: {
    success?: string;
    error?: string;
  };
};

export default function Payment() {
  const { booking, user, errors, flash } = usePage<PaymentConfirmationPageProps>().props;

  const bookingDate = new Date(booking.created_at);

  const { data, setData, post, processing, progress, recentlySuccessful } = useForm({
    booking_id: booking.id,
    total_price: booking.total_price,
    payment_proof: null as File | null,
  });

  const [paymentProofPreview, setPaymentProofPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setData('payment_proof', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPaymentProofPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setData('payment_proof', null);
      setPaymentProofPreview(null);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(route('bookings.payment.store', booking.booking_code), {
      preserveScroll: true,
      onSuccess: () => {},
      onError: (formErrors) => {
        console.error('Payment confirmation errors:', formErrors);
      },
    });
  };

  useEffect(() => {
    if (recentlySuccessful) {
      setPaymentProofPreview(null);

      const fileInput = document.getElementById('payment_proof') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
    }
  }, [recentlySuccessful]);

  return (
    <MainLayout title="Konfirmasi Pembayaran">
      <Head>
        <title>Konfirmasi Pembayaran</title>
        <meta name="description" content={`Konfirmasi pembayaran untuk booking ID: ${booking.id}`} />
      </Head>

      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%236366f1%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%227%22%20cy%3D%227%22%20r%3D%227%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"></div>
        <div className="relative container mx-auto max-w-3xl px-4 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-medium text-blue-700 shadow-sm">
            <CreditCard className="h-5 w-5" />
            Langkah Terakhir Pembayaran
          </div>
          <h1 className="mb-3 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
            Konfirmasi <span className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-transparent">Pembayaran Anda</span>
          </h1>
          <p className="text-md mx-auto max-w-xl text-gray-600 md:text-lg">
            Silakan lakukan pembayaran dan unggah bukti transfer untuk menyelesaikan proses booking Anda.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 py-12 md:py-16">
        <div className="container mx-auto max-w-2xl px-4">
          {flash?.success && (
            <div className="mb-6 flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4 text-green-700 shadow-sm" role="alert">
              <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
              <p className="text-sm">{flash.success}</p>
            </div>
          )}
          {flash?.error && (
            <div className="mb-6 flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 shadow-sm" role="alert">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p className="text-sm">{flash.error}</p>
            </div>
          )}

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl md:p-8">
            <div className="mb-6 border-b border-gray-200 pb-6">
              <h2 className="mb-1 text-xl font-semibold text-gray-800 md:text-2xl">Detail Pembayaran</h2>
              <p className="text-sm text-gray-500">Pastikan Anda mentransfer sesuai dengan nominal yang tertera.</p>
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

            <form onSubmit={handleSubmit}></form>

            <div className="mt-3 space-y-4">
              <div className="flex flex-col rounded-lg border border-blue-100 bg-blue-50/50 p-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm font-medium text-blue-700">Total Tagihan:</p>
                <p className="text-xl font-bold text-blue-600 sm:text-2xl">
                  {new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    maximumFractionDigits: 0,
                  }).format(booking.total_price)}
                </p>
              </div>

              <div>
                <p className="mb-2 text-sm font-medium text-gray-700">Silakan transfer ke rekening berikut:</p>
                <div className="space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-gray-200 text-gray-600">
                      <Landmark className="h-4 w-4" />
                    </div>
                    <p className="text-sm font-semibold text-gray-800">Bank XYZ</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-gray-200 text-gray-600">
                      <CreditCard className="h-4 w-4" />
                    </div>
                    <p className="text-sm font-semibold text-gray-800">1234567890</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-gray-200 text-gray-600">
                      <UserCircle className="h-4 w-4" />
                    </div>
                    <p className="text-sm font-semibold text-gray-800">A/N BPKD Kabupaten Pekalongan</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-gray-200 pt-8">
              <h2 className="mb-1 text-xl font-semibold text-gray-800 md:text-2xl">Unggah Bukti Transfer</h2>
              <p className="mb-5 text-sm text-gray-500">Format file yang didukung: JPG, PNG, PDF. Ukuran maksimal: 2MB.</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="payment_proof" className="sr-only mb-1.5 block text-sm font-medium text-gray-700">
                    Pilih file bukti transfer
                  </label>
                  <div className="relative flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 px-6 pt-5 pb-6 transition-colors duration-200 hover:border-blue-500">
                    <div className="space-y-1 text-center">
                      <UploadCloud className="mx-auto h-10 w-10 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="payment_proof"
                          className="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:outline-none hover:text-blue-500"
                        >
                          <span>Unggah file</span>
                          <input
                            id="payment_proof"
                            name="payment_proof"
                            type="file"
                            className="sr-only"
                            onChange={handleFileChange}
                            accept="image/jpeg, image/png"
                          />
                        </label>
                        <p className="pl-1">atau seret dan lepas</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, PDF (MAX. 2MB)</p>
                    </div>
                  </div>
                  {errors?.payment_proof && (
                    <p className="mt-1.5 flex items-center gap-1 text-xs text-red-600">
                      <AlertCircle size={14} />
                      {errors.payment_proof}
                    </p>
                  )}
                </div>

                {paymentProofPreview && (
                  <div className="mt-4">
                    <p className="mb-2 text-sm font-medium text-gray-700">Preview Bukti Transfer:</p>
                    <div className="group relative inline-block rounded-lg border border-gray-300 p-1.5 shadow-sm">
                      <img
                        src={paymentProofPreview}
                        alt="Preview Bukti Transfer"
                        className="max-h-40 max-w-xs rounded-md object-contain md:max-h-48"
                      />
                      <div className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-600 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </div>
                )}

                {progress && (
                  <div className="mt-2">
                    <div className="mb-0.5 text-xs font-medium text-blue-700">Mengunggah: {progress.percentage}%</div>
                    <div className="h-2 w-full rounded-full bg-gray-200 shadow-inner">
                      <div className="h-2 rounded-full bg-blue-600 transition-all duration-150" style={{ width: `${progress.percentage}%` }}></div>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={processing || !data.payment_proof}
                  className={`group from-primary/80 to-secondary/80 hover:from-primary hover:to-secondary mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r px-5 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:shadow-xl focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none ${processing || !data.payment_proof ? 'cursor-not-allowed from-gray-500 to-gray-600 opacity-60 hover:from-gray-500 hover:to-gray-600' : ''}`}
                >
                  {processing ? 'Mengunggah...' : 'Konfirmasi Pembayaran'}
                  {!processing && <Send className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
