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
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Eye, SquarePen, Trash } from 'lucide-react';
import { MouseEventHandler, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Venue',
    href: '/venues',
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

export default function Venues() {
  const { venues } = usePage<{ venues: Venue[] }>().props;
  const [open, setOpen] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);

  const handleDelete: MouseEventHandler = (e) => {
    e.preventDefault();
    if (!selectedVenue) return;
    router.delete(route('venues.destroy', selectedVenue.id), {
      onSuccess: () => setOpen(false),
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Venue" />
      <FlashMessage />

      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <h1 className="text-2xl font-semibold">Venue</h1>
        <div className="flex justify-start gap-4">
          <Link href={route('venues.create')} className="cursor-pointer">
            <Button className="w-full cursor-pointer">Tambah Venue</Button>
          </Link>
        </div>
        <div>
          <table className="w-full table-auto">
            <thead className="text-start">
              <tr>
                <th className="border-1 px-4 py-2">Nama Gedung</th>
                <th className="border-1 px-4 py-2">Deskripsi</th>
                <th className="border-1 px-4 py-2">Alamat</th>
                <th className="border-1 px-4 py-2">Kapasitas</th>
                <th className="border-1 px-4 py-2">Harga Dasar</th>
                <th className="border-1 px-4 py-2">Kondisi</th>
                <th className="w-36 border-1 px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {venues.length == 0 ? (
                <tr>
                  <td colSpan={7} className="border px-4 py-2 text-center font-semibold">
                    Belum ada data
                  </td>
                </tr>
              ) : (
                venues.map((venue) => (
                  <tr key={venue.id} className="align-top">
                    <td className="border px-4 py-2">{venue.name}</td>
                    <td className="max-w-[200px] border px-4 py-2">
                      <div className="line-clamp-2">{venue.description}</div>
                    </td>
                    <td className="max-w-[200px] border px-4 py-2">
                      <div className="line-clamp-2">{venue.address}</div>
                    </td>
                    <td className="border px-4 py-2">{venue.capacity} orang</td>
                    <td className="border px-4 py-2">
                      {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        minimumFractionDigits: 0,
                      }).format(venue.base_price)}
                    </td>
                    <td className="border px-4 py-2">{venue.building_condition}</td>
                    <td className="flex min-h-[4rem] items-center justify-center gap-1 border px-4 py-2">
                      <Link href={route('venues.show', venue.id)} className="cursor-pointer">
                        <Button size={'sm'} className="cursor-pointer bg-green-100 text-sm text-green-600 transition duration-300 hover:bg-green-200">
                          <Eye />
                        </Button>
                      </Link>
                      <Link href={route('venues.edit', venue.id)} className="cursor-pointer">
                        <Button size={'sm'} className="cursor-pointer bg-blue-100 text-sm text-blue-600 transition duration-300 hover:bg-blue-200">
                          <SquarePen />
                        </Button>
                      </Link>
                      <Dialog open={open && selectedVenue?.id === venue.id} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                          <Button
                            size={'sm'}
                            className="cursor-pointer bg-red-100 text-sm text-red-600 transition duration-300 hover:bg-red-200"
                            onClick={() => {
                              setSelectedVenue(venue);
                              setOpen(true);
                            }}
                          >
                            <Trash />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Hapus Fasilitas</DialogTitle>
                            <DialogDescription>
                              Apakah anda yakin ingin menghapus fasilitas <strong>{venue?.name}</strong>?
                            </DialogDescription>
                          </DialogHeader>

                          <DialogFooter>
                            <DialogClose>
                              <Button variant={'ghost'} className="cursor-pointer transition duration-300">
                                Batal
                              </Button>
                            </DialogClose>
                            <Button
                              variant={'destructive'}
                              onClick={handleDelete}
                              className="cursor-pointer transition duration-300 hover:bg-red-700"
                            >
                              Hapus
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
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
