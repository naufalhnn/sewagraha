'use client';

import { Button } from '@/components/ui/button';
import { DialogTrigger } from '@/components/ui/dialog';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Eye, SquarePen, Trash } from 'lucide-react';

// Definisikan tipe data Anda
export interface Venue {
  id: number;
  name: string;
  description: string;
  address: string;
  capacity: number;
  base_price: number;
  building_condition: string;
}

// Fungsi untuk menangani pembukaan dialog dan pemilihan venue
type ActionsCellProps = {
  row: {
    original: Venue;
  };
  onDeleteClick: (venue: Venue) => void;
};

const ActionsCell: React.FC<ActionsCellProps> = ({ row, onDeleteClick }) => {
  const venue = row.original;

  return (
    <div className="flex items-center justify-center gap-1">
      <Link href={route('venues.show', venue.id)}>
        <Button size={'sm'} className="cursor-pointer bg-green-100 text-green-600 hover:bg-green-200">
          <Eye className="h-4 w-4" />
        </Button>
      </Link>
      <Link href={route('venues.edit', venue.id)}>
        <Button size={'sm'} className="cursor-pointer bg-blue-100 text-blue-600 hover:bg-blue-200">
          <SquarePen className="h-4 w-4" />
        </Button>
      </Link>
      <DialogTrigger asChild>
        <Button
          size={'sm'}
          variant="destructive"
          className="cursor-pointer bg-red-100 text-red-600 hover:bg-red-200"
          onClick={() => onDeleteClick(venue)}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </DialogTrigger>
    </div>
  );
};

export const getColumns = (onDeleteClick: (venue: Venue) => void): ColumnDef<Venue>[] => [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Nama Gedung
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'description',
    header: 'Deskripsi',
    cell: ({ row }) => <div className="line-clamp-2 max-w-[200px]">{row.original.description}</div>,
  },
  {
    accessorKey: 'address',
    header: 'Alamat',
    cell: ({ row }) => <div className="line-clamp-2 max-w-[200px]">{row.original.address}</div>,
  },
  {
    accessorKey: 'capacity',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Kapasitas
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.original.capacity} orang</div>,
  },
  {
    accessorKey: 'base_price',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Harga Dasar
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) =>
      new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      }).format(row.original.base_price),
  },
  {
    accessorKey: 'building_condition',
    header: 'Kondisi',
  },
  {
    id: 'actions',
    header: () => <div className="text-center">Aksi</div>,
    cell: (props) => <ActionsCell {...props} onDeleteClick={onDeleteClick} />,
  },
];
