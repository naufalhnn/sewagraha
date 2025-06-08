import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type PageProps as PagePropsShared } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { ClipboardList, PackageX, Plus, SquarePen, Trash } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Kegunaan Gedung',
    href: route('purposes.index'),
  },
];

interface Purpose {
  id: number;
  name: string;
  description: string;
}

interface PurposesPageProps extends PagePropsShared {
  purposes: Purpose[];
}

export default function Purposes() {
  const { purposes } = usePage<PurposesPageProps>().props;

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPurpose, setSelectedPurpose] = useState<Purpose | null>(null);

  const handleOpenDeleteDialog = (purpose: Purpose) => {
    setSelectedPurpose(purpose);
    setIsDialogOpen(true);
  };

  const handleDelete = () => {
    if (!selectedPurpose) return;

    router.delete(route('purposes.destroy', selectedPurpose.id), {
      onSuccess: () => {
        setIsDialogOpen(false);
        setSelectedPurpose(null);
      },
      onError: (errors) => {
        console.error('Gagal menghapus:', errors);
        setIsDialogOpen(false);
      },
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Kelola Kegunaan Gedung" />

      <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4 dark:bg-slate-900/50">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-800 dark:text-slate-100">
              <ClipboardList className="h-6 w-6" />
              Kelola Kegunaan Gedung
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Atur jenis-jenis kegunaan atau acara yang dapat dilayani oleh gedung.</p>
          </div>
          <Link href={route('purposes.create')}>
            <Button className="flex w-full cursor-pointer items-center gap-2 sm:w-auto">
              <Plus size={16} /> Tambah Kegunaan
            </Button>
          </Link>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
          {purposes.length > 0 ? (
            <table className="w-full table-auto text-left">
              <thead className="border-b border-slate-200 bg-slate-50 text-sm font-semibold text-slate-600 uppercase dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-400">
                <tr>
                  <th className="px-6 py-2">Nama Kegunaan</th>
                  <th className="px-6 py-2">Deskripsi</th>
                  <th className="w-36 px-6 py-2 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700 dark:divide-slate-700 dark:text-slate-300">
                {purposes.map((purpose) => (
                  <tr key={purpose.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                    <td className="px-6 py-2 font-medium">{purpose.name}</td>
                    <td className="px-6 py-2 text-sm text-slate-600 dark:text-slate-400">{purpose.description}</td>
                    <td className="px-6 py-2 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Link href={route('purposes.edit', purpose.id)}>
                          <Button variant="outline" size={'sm'} className="flex cursor-pointer items-center gap-1">
                            <SquarePen size={14} /> Edit
                          </Button>
                        </Link>
                        <Button
                          variant="destructive"
                          size={'sm'}
                          className="flex cursor-pointer items-center gap-1"
                          onClick={() => handleOpenDeleteDialog(purpose)}
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
              <h3 className="mt-4 text-xl font-semibold text-slate-800 dark:text-slate-100">Belum Ada Data Kegunaan</h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Silakan tambahkan data kegunaan gedung pertama Anda.</p>
              <Link href={route('purposes.create')} className="mt-6">
                <Button className="flex cursor-pointer items-center gap-2">
                  <Plus size={16} /> Tambah Kegunaan
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Konfirmasi Penghapusan</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus kegunaan: <strong>{selectedPurpose?.name}</strong>? Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <Button type="button" variant={'secondary'}>
                Batal
              </Button>
            </DialogClose>
            <Button type="button" variant={'destructive'} onClick={handleDelete}>
              Ya, Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
