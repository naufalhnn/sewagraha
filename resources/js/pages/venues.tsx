import MainLayout from '@/layouts/main-layout';
import { Link, usePage } from '@inertiajs/react';
import { ArrowRight, Building, ListOrdered, MapPin, Users } from 'lucide-react';

interface VenueImages {
  id: number;
  venue_id: number;
  image_path: string;
}

interface Venues {
  id: number;
  name: string;
  description: string;
  address: string;
  capacity: number;
  base_price: number;
  building_condition: string;
  venue_images: VenueImages[];
}

export default function Vanues() {
  const { venues } = usePage<{ venues: Venues[] }>().props;

  return (
    <MainLayout title="Daftar Gedung - Sewagraha">
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-32 pb-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%236366f1%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%227%22%20cy%3D%227%22%20r%3D%227%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"></div>
        <div className="relative mx-auto max-w-6xl px-4">
          <div className="text-center">
            <div className="text-primary mb-6 inline-flex items-center gap-2 rounded-full bg-blue-100 px-6 py-2 text-sm font-medium shadow-sm">
              <ListOrdered className="h-5 w-5" />
              Daftar Gedung Tersedia
            </div>
            <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
              Pilihan <span className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-transparent">Gedung Terbaik</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-600 md:text-xl">
              Telusuri dan pilih gedung terbaik untuk kebutuhan acara Anda dari BPKD Kabupaten Pekalongan.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 md:py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {venues && venues.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
              {venues.map((venue) => (
                <div
                  key={venue.id}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:-translate-y-[2px] hover:shadow-xl"
                >
                  <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                    <img
                      src={
                        venue.venue_images && venue.venue_images.length > 0
                          ? `/storage/${venue.venue_images[0].image_path}`
                          : '/images/placeholder-gedung.jpg'
                      }
                      alt={`Gambar gedung ${venue.name}`}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.01]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                    <div className="absolute top-3 right-3 rounded-lg bg-white/90 px-3 py-1.5 text-sm font-bold text-blue-700 shadow-md backdrop-blur-sm">
                      {Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        maximumFractionDigits: 0,
                      }).format(venue.base_price)}
                      <span className="text-xs font-normal text-gray-600">/hari</span>
                    </div>
                  </div>

                  <div className="flex flex-grow flex-col p-5">
                    <h3 className="group-hover:text-primary mb-2 line-clamp-1 text-lg font-semibold text-gray-800 md:text-xl">{venue.name}</h3>

                    <div className="my-4 space-y-3 border-t border-gray-100 pt-4">
                      <div className="flex items-center gap-2.5 text-sm text-gray-600">
                        <div className="rounded-md bg-blue-100 p-2">
                          <MapPin className="h-4 w-4 flex-shrink-0 text-blue-500" />
                        </div>
                        <span className="line-clamp-2">{venue.address}</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-sm text-gray-600">
                        <div className="rounded-md bg-green-100 p-2">
                          <Users className="h-4 w-4 flex-shrink-0 text-green-500" />
                        </div>
                        <span>
                          Kapasitas: <span className="font-medium text-gray-800">{venue.capacity} Orang</span>
                        </span>
                      </div>
                    </div>

                    <div className="mt-auto">
                      <Link
                        href={route('details', venue.id)}
                        className="from-primary/80 to-secondary/80 hover:from-primary hover:to-secondary mt-2 flex w-full transform items-center justify-center gap-2 rounded-lg bg-gradient-to-r px-5 py-2.5 text-center font-medium text-white shadow-sm transition duration-300 hover:scale-[1.01] hover:shadow-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                      >
                        Lihat Detail
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/button:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <Building className="mx-auto h-16 w-16 text-gray-300" /> {/* Ikon yang lebih relevan */}
              <h3 className="mt-4 text-xl font-semibold text-gray-800">Belum Ada Gedung Tersedia</h3>
              <p className="mt-2 text-gray-500">Silakan cek kembali nanti atau hubungi kami untuk informasi lebih lanjut.</p>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
}
