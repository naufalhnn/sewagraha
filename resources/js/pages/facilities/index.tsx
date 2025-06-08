import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { PackageX, Plus, SquarePen, Trash, Wrench } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Fasilitas',
    href: route('facilities.index'),
  },
];

interface Facility {
  id: number;
  name: string;
  description: string;
}

type FacilitiesPageProps = {
  facilities: Facility[];
};

export default function Facilities() {
  const { facilities } = usePage<FacilitiesPageProps>().props;

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [facilityToDelete, setFacilityToDelete] = useState<Facility | null>(null);

  const handleOpenDeleteDialog = (facility: Facility) => {
    setFacilityToDelete(facility);
    setIsDialogOpen(true);
  };

  const handleDelete = () => {
    if (!facilityToDelete) return;

    router.delete(route('facilities.destroy', facilityToDelete.id), {
      onSuccess: () => {
        setIsDialogOpen(false);
        setFacilityToDelete(null);
      },
      onError: (errors) => {
        console.error('Gagal menghapus:', errors);
        setIsDialogOpen(false);
      },
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Kelola Fasilitas" />
      <div className="flex h-full flex-1 flex-col gap-6 p-4">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-800 dark:text-slate-100">
              <Wrench className="h-6 w-6" />
              Kelola Fasilitas
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Tambah, ubah, atau hapus fasilitas yang tersedia untuk gedung Anda.</p>
          </div>
          <Link href={route('facilities.create')}>
            <Button className="flex w-full cursor-pointer items-center gap-2 sm:w-auto">
              <Plus size={16} /> Tambah Fasilitas
            </Button>
          </Link>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
          {facilities.length > 0 ? (
            <table className="w-full table-auto text-left">
              <thead className="border-b border-slate-200 bg-slate-50/80 text-sm font-semibold text-slate-600 uppercase dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-400">
                <tr>
                  <th className="px-6 py-2">Nama Fasilitas</th>
                  <th className="px-6 py-2">Deskripsi</th>
                  <th className="w-36 px-6 py-2 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700 dark:divide-slate-700 dark:text-slate-300">
                {facilities.map((facility) => (
                  <tr key={facility.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                    <td className="px-6 py-2 font-medium">{facility.name}</td>
                    <td className="px-6 py-2 text-sm text-slate-600 dark:text-slate-400">{facility.description}</td>
                    <td className="px-6 py-2 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Link href={route('facilities.edit', facility.id)}>
                          <Button variant="outline" size={'sm'} className="flex cursor-pointer items-center gap-1">
                            <SquarePen size={14} /> Edit
                          </Button>
                        </Link>
                        <Button
                          variant="destructive"
                          size={'sm'}
                          className="flex cursor-pointer items-center gap-1"
                          onClick={() => handleOpenDeleteDialog(facility)}
                        >
                          <Trash size={14} /> Hapus
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="py-16 text-center">
              <PackageX className="mx-auto h-16 w-16 text-slate-400" />
              <h3 className="mt-4 text-xl font-semibold text-slate-800 dark:text-slate-100">Belum Ada Fasilitas</h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Silakan tambahkan fasilitas pertama Anda.</p>
              <Link href={route('facilities.create')} className="mt-6">
                <Button className="flex items-center gap-2">
                  <Plus size={16} /> Tambah Fasilitas
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Penghapusan</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus fasilitas: <strong>{facilityToDelete?.name}</strong>? Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={'ghost'}>Batal</Button>
            </DialogClose>
            <Button variant={'destructive'} onClick={handleDelete}>
              Ya, Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
