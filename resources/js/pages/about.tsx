import MainLayout from '@/layouts/main-layout';
import { CheckCircle, Goal, Library, Sparkles, Target } from 'lucide-react';

export default function About() {
  return (
    <MainLayout title="Tentang Sewagraha">
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-32 pb-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%236366f1%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%227%22%20cy%3D%227%22%20r%3D%227%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"></div>
        <div className="relative mx-auto max-w-6xl px-4">
          <div className="text-center">
            <div className="text-primary mb-6 inline-flex items-center gap-2 rounded-full bg-blue-100 px-6 py-2 text-sm font-medium shadow-sm">
              <Library className="h-5 w-5" />
              Sewagraha BPKD Kabupaten Pekalongan
            </div>
            <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
              Tentang <span className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-transparent">Kami</span>
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-gray-600 md:text-xl">
              Mengenal Sewagraha Lebih Dekat: Platform Resmi Penyewaan Gedung Milik Pemerintah Kabupaten Pekalongan untuk Kemudahan dan Kebutuhan
              Acara Anda.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-xl md:p-12">
            <div className="absolute top-0 left-0 -mt-20 -ml-20 h-48 w-48 rounded-full bg-gradient-to-br from-blue-500/10 via-transparent to-transparent"></div>
            <div className="absolute right-0 bottom-0 -mr-16 -mb-16 h-40 w-40 rounded-full bg-gradient-to-tl from-purple-500/10 via-transparent to-transparent"></div>

            <div className="relative z-10 flex flex-col items-center gap-8 md:flex-row lg:gap-16">
              <div className="flex w-full flex-shrink-0 justify-center md:w-2/5 lg:w-1/3">
                <div className="rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 p-2 shadow-lg">
                  <img
                    src="/icons/LogoKabPekalongan.png"
                    alt="Logo Sewagraha BPKD Kabupaten Pekalongan"
                    className="h-48 w-48 rounded-lg object-contain md:h-52 md:w-52 lg:h-56 lg:w-56"
                  />
                </div>
              </div>
              <div className="w-full text-center md:w-3/5 md:text-left lg:w-2/3">
                <h2 className="mb-3 text-2xl font-bold text-gray-800 md:text-3xl">
                  Selamat Datang di <span className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-transparent">Sewagraha</span>
                </h2>
                <p className="mb-6 text-base font-medium text-gray-500">Platform Penyewaan Gedung Resmi dari BPKD Kabupaten Pekalongan.</p>
                <div className="space-y-4 text-left text-base leading-relaxed text-gray-600">
                  <p>
                    Sewagraha adalah solusi digital yang dihadirkan oleh Badan Pengelolaan Keuangan Daerah (BPKD) Kabupaten Pekalongan untuk
                    memudahkan masyarakat dalam mengakses dan menyewa gedung serbaguna milik pemerintah. Kami menyediakan fasilitas yang elegan dan
                    nyaman untuk berbagai acara Anda, mulai dari pernikahan, seminar, rapat, pameran, hingga perayaan spesial lainnya.
                  </p>
                  <p>
                    Dengan komitmen pada pelayanan prima, kami menawarkan fasilitas modern, kapasitas yang fleksibel, dan lokasi strategis. Tim
                    profesional kami siap mendampingi Anda mulai dari proses pemilihan gedung hingga kelancaran acara Anda.
                  </p>
                  <p>Nikmati kemudahan, transparansi, dan keandalan dalam setiap proses penyewaan bersama Sewagraha.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center md:mb-16">
            <div className="bg-primary/10 text-primary mb-4 inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold">
              <Target className="h-5 w-5" />
              Panduan Kami
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Visi & Misi <span className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-transparent">Sewagraha</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Mewujudkan pengelolaan aset daerah yang optimal dan memberikan pelayanan terbaik bagi masyarakat Kabupaten Pekalongan.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-xl md:p-12">
            <div className="absolute top-0 right-0 -mt-24 -mr-24 h-56 w-56 rounded-full bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent"></div>

            <div className="relative z-10 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
              <div className="rounded-xl bg-slate-50 p-6 shadow-md transition duration-300 hover:scale-[1.03] hover:shadow-lg">
                <div className="mb-4 flex items-center gap-3">
                  <div className="from-primary to-secondary rounded-lg bg-gradient-to-r p-2.5 text-white shadow-md">
                    <Goal className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 md:text-2xl">Visi Kami</h3>
                </div>
                <p className="text-base leading-relaxed text-gray-600">
                  Menjadi platform penyewaan aset daerah yang terdepan, terpercaya, dan memberikan kemudahan maksimal bagi seluruh lapisan masyarakat
                  di Kabupaten Pekalongan, serta mendukung optimalisasi Pendapatan Asli Daerah.
                </p>
              </div>

              {/* Misi */}
              <div className="rounded-xl bg-slate-50 p-6 shadow-md transition duration-300 hover:scale-[1.03] hover:shadow-lg">
                <div className="mb-4 flex items-center gap-3">
                  <div className="from-primary to-secondary rounded-lg bg-gradient-to-r p-2.5 text-white shadow-md">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 md:text-2xl">Misi Kami</h3>
                </div>
                <ul className="list-none space-y-3 text-base leading-relaxed text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="mt-1 mr-2 h-5 w-5 flex-shrink-0 text-green-500" />
                    <span>Menyediakan akses informasi yang mudah dan transparan mengenai ketersediaan dan fasilitas gedung milik daerah.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mt-1 mr-2 h-5 w-5 flex-shrink-0 text-green-500" />
                    <span>Memberikan proses penyewaan yang efisien, cepat, dan akuntabel melalui platform digital.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mt-1 mr-2 h-5 w-5 flex-shrink-0 text-green-500" />
                    <span>Menjamin kualitas fasilitas dan pelayanan prima untuk setiap acara yang diselenggarakan.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="mt-1 mr-2 h-5 w-5 flex-shrink-0 text-green-500" />
                    <span>
                      Berkontribusi pada peningkatan Pendapatan Asli Daerah (PAD) Kabupaten Pekalongan melalui pengelolaan aset yang profesional.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
