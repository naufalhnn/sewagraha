import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import FlashMessage from '@/components/ui/flash-message';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';
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
      <FlashMessage />

      <Dialog open={open} onOpenChange={setOpen}>
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
          <div className="flex flex-col justify-start gap-4">
            <h1 className="text-2xl font-semibold">Venue</h1>
            <Link href={route('venues.create')}>
              <Button className="cursor-pointer">
                <Plus /> Tambah Venue
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
