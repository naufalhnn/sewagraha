import MainLayout from '@/layouts/main-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight, CheckCircle2, Info, Mail, Phone } from 'lucide-react';

type PaymentSuccessPageProps = {
  payment_code: string;
};

export default function PaymentSuccess() {
  const { payment_code } = usePage<PaymentSuccessPageProps>().props;

  return (
    <MainLayout title="Pembayaran Berhasil - Sewagraha">
      <Head>
        <title>Pembayaran Berhasil - Sewagraha</title>
        <meta name="description" content="Konfirmasi pembayaran Anda telah berhasil." />
      </Head>

      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-20 md:py-28">
        <div className="w-full max-w-md overflow-hidden rounded-xl bg-white shadow-2xl md:max-w-lg">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 text-center md:p-8">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm md:h-24 md:w-24">
              <CheckCircle2 className="h-12 w-12 text-green-500 md:h-14 md:w-14" strokeWidth={2} />
            </div>
            <h1 className="mt-5 text-2xl font-bold text-white md:text-3xl">Pemesanan Berhasil!</h1>
            <p className="mt-1 text-sm text-green-100 md:text-base">Pembayaran Anda telah kami terima dan konfirmasi.</p>
            {payment_code && (
              <p className="mt-3 rounded-md bg-green-700/50 px-3 py-1.5 text-sm font-semibold text-white backdrop-blur-sm">
                Kode Pesanan Anda: <span className="tracking-wider">{payment_code}</span>
              </p>
            )}
          </div>
          {/* Konten Detail */}
          <div className="p-6 md:p-8">
            <div className="mb-6 rounded-lg border border-green-200/70 bg-green-50/70 p-4 text-sm text-green-800 shadow-sm dark:border-green-700/50 dark:bg-green-900/20 dark:text-green-200">
              <p className="mb-1.5 font-medium">Terima kasih atas kepercayaan Anda kepada Sewagraha!</p>
              <p className="leading-relaxed">
                Tim kami akan segera menghubungi Anda dalam <strong>1 x 24 jam</strong> kerja melalui email atau nomor telepon yang terdaftar untuk
                detail dan konfirmasi lebih lanjut mengenai pemesanan Anda.
              </p>
            </div>

            <div className="rounded-lg border border-blue-200/70 bg-blue-50/70 p-4 shadow-sm dark:border-blue-700/50 dark:bg-blue-900/20">
              <div className="mb-3 flex items-center gap-2">
                <Info className="h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
                <h3 className="font-semibold text-blue-800 dark:text-blue-300">Butuh Bantuan Lebih Lanjut?</h3>
              </div>
              <p className="mb-3 text-sm text-gray-700 dark:text-gray-300">
                Jika ada pertanyaan atau memerlukan bantuan terkait pemesanan Anda, jangan ragu untuk menghubungi kami:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
                    <Phone size={16} />
                  </div>
                  <a
                    href="tel:081234567890"
                    className="text-gray-700 hover:text-blue-700 hover:underline dark:text-gray-300 dark:hover:text-blue-400"
                  >
                    0812-3456-7890
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
                    <Mail size={16} />
                  </div>
                  <a
                    href="mailto:support@sewagraha.com"
                    className="text-gray-700 hover:text-blue-700 hover:underline dark:text-gray-300 dark:hover:text-blue-400"
                  >
                    support@sewagraha.com
                  </a>
                </li>
              </ul>
            </div>

            <div className="mt-8 text-center">
              <Link
                href={route('home')}
                className="group from-primary/80 to-secondary/80 hover:from-primary hover:to-secondary inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r px-6 py-3 font-medium text-white shadow-md transition duration-300 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
              >
                Kembali ke Beranda
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
