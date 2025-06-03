import MainLayout from '@/layouts/main-layout'; // (1) Pastikan path dan export ini benar
import { Clock, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react'; // (2) Pastikan lucide-react terinstal

export default function Contact() {
  // (3) Tambahkan handler untuk form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Di sini Anda akan menangani logika pengiriman form,
    // misalnya menggunakan Inertia.post() atau fetch/axios
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log('Form data:', data);
    // Contoh dengan Inertia:
    // Inertia.post(route('contact.store'), data, { // Pastikan route 'contact.store' ada
    //   onSuccess: () => { /* Tampilkan notifikasi sukses */ },
    //   onError: (errors) => { /* Tampilkan error validasi */ },
    // });
    alert('Pesan akan dikirim! (Implementasi backend diperlukan)');
  };

  return (
    <MainLayout title="Hubungi Kami">
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-32 pb-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%236366f1%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%227%22%20cy%3D%227%22%20r%3D%227%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"></div>
        <div className="relative mx-auto max-w-6xl px-4">
          <div className="text-center">
            <div className="text-primary mb-6 inline-flex items-center gap-2 rounded-full bg-blue-100 px-6 py-2 text-sm font-medium">
              <MessageCircle className="h-4 w-4" />
              Mari Terhubung
            </div>
            <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
              Hubungi <span className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-transparent">Kami</span>
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-gray-600">
              Kami siap membantu Anda. Kirimkan pesan atau kunjungi kantor kami untuk informasi lebih lanjut.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid items-start gap-16 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-xl">
                <div className="from-primary/10 to-secondary/10 absolute top-0 right-0 -mt-16 -mr-16 h-32 w-32 rounded-full bg-gradient-to-br"></div>
                <div className="from-primary/10 to-secondary/10 absolute bottom-0 left-0 -mb-12 -ml-12 h-24 w-24 rounded-full bg-gradient-to-tr"></div>
                <div className="relative">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="from-primary to-secondary rounded-xl bg-gradient-to-r p-3">
                      <Send className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Kirim Pesan</h2>
                      <p className="text-gray-600">Kami akan merespon dalam 24 jam</p>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-900">
                        Nama Lengkap
                      </label>
                      <input
                        className="w-full rounded-lg border border-gray-200 bg-gray-50/50 px-4 py-3 transition-all duration-200 outline-none hover:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Masukkan nama lengkap Anda"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-900">
                        Email Address
                      </label>
                      <input
                        className="w-full rounded-lg border border-gray-200 bg-gray-50/50 px-4 py-3 transition-all duration-200 outline-none hover:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                        type="email"
                        id="email"
                        name="email"
                        placeholder="nama@email.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-900">
                        Pesan
                      </label>
                      <textarea
                        className="w-full resize-none rounded-lg border border-gray-200 bg-gray-50/50 px-4 py-3 transition-all duration-200 outline-none hover:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                        id="message"
                        name="message"
                        rows={5}
                        placeholder="Tulis pesan Anda di sini..."
                        required
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="group from-primary/80 to-secondary/80 hover:from-primary hover:to-secondary flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-gradient-to-r px-6 py-4 font-semibold text-white transition duration-300 hover:shadow-lg"
                    >
                      <Send className="h-5 w-5" />
                      Kirim Pesan
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="order-1 space-y-8 lg:order-2">
              <div className="from-primary to-secondary relative overflow-hidden rounded-2xl bg-gradient-to-br p-8 text-white">
                <div className="absolute top-0 right-0 -mt-20 -mr-20 h-40 w-40 rounded-full bg-white/10"></div>
                <div className="absolute bottom-0 left-0 -mb-16 -ml-16 h-32 w-32 rounded-full bg-white/5"></div>
                <div className="relative">
                  <h3 className="mb-2 text-2xl font-bold">BPKD Kabupaten Pekalongan</h3>
                  <p className="mb-6 text-blue-100">Badan Pengelolaan Keuangan Daerah</p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-white/20 p-2 backdrop-blur-sm">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold">Alamat</p>
                        <p className="text-blue-100">Kajen, Pekalongan</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-white/20 p-2 backdrop-blur-sm">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold">Telepon</p>
                        <p className="text-blue-100">081234567890</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-white/20 p-2 backdrop-blur-sm">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold">Email</p>
                        <p className="text-blue-100">contact@bpkd.pekalongankab.go.id</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.200203365008!2d109.6349306153438!3d-6.985770994956077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e70230b61143c5f%3A0x4851c3369719e3a9!2sKantor%20Bupati%20Pekalongan!5e0!3m2!1sid!2sid!4v1622600000000!5m2!1sid!2sid" // <-- GANTI DENGAN URL EMBED GOOGLE MAPS YANG BENAR
                  className="h-80 w-full"
                  loading="lazy"
                  title="Lokasi BPKD Kabupaten Pekalongan"
                  allowFullScreen={false}
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
                <h4 className="mb-4 flex items-center gap-2 font-bold text-gray-900">
                  <div className="rounded bg-blue-100 p-1">
                    <Clock className="h-4 w-4 text-blue-600" />
                  </div>
                  Jam Operasional
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Senin - Kamis</span>
                    <span className="font-medium text-gray-900">08:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Jumat</span>
                    <span className="font-medium text-gray-900">08:00 - 11:30</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sabtu - Minggu</span>
                    <span className="font-medium text-red-500">Tutup</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
