import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Landmark, Plus } from 'lucide-react';
import { MouseEventHandler, useMemo, useState } from 'react';
import { getColumns } from './columns';
import { DataTable } from './data-table';

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
      onSuccess: () => {
        setOpen(false);
        setSelectedVenue(null);
      },
    });
  };

  const handleDeleteClick = (venue: Venue) => {
    setSelectedVenue(venue);
    setOpen(true);
  };

  const columns = useMemo(() => getColumns(handleDeleteClick), []);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Venue" />

      <Dialog open={open} onOpenChange={setOpen}>
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-800 dark:text-slate-100">
                <Landmark className="h-6 w-6" />
                Kelola Venue
              </h1>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Atur gedung yang dapat disewa oleh pengguna.</p>
            </div>
            <Link href={route('venues.create')}>
              <Button className="flex w-full cursor-pointer items-center gap-2 sm:w-auto">
                <Plus size={16} /> Tambah Venue
              </Button>
            </Link>
          </div>
          <DataTable columns={columns} data={venues} />
        </div>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Venue</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus venue <strong>{selectedVenue?.name}</strong>? Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={'ghost'}>Batal</Button>
            </DialogClose>
            <Button variant={'destructive'} onClick={handleDelete} className="cursor-pointer">
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
