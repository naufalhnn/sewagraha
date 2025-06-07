import { Button } from '@/components/ui/button';
import { DialogTrigger } from '@/components/ui/dialog';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

interface Venue {
  id: number;
  name: string;
  description: string;
  address: string;
  capacity: number;
  base_price: number;
  building_condition: string;
}

interface Payment {
  id: number;
  booking_id: number;
  user_id: number;
  payment_code: string;
  total_price: number;
  status: string;
  paid_at: Date | string | null;
}

interface User {
  id: number;
  name: string;
  email: string;
  phone_number: string;
}

export interface Booking {
  id: number;
  user_id: number;
  venue_id: number;
  booking_code: string;
  event_start_date: Date | string;
  event_end_date: Date | string;
  purpose: string;
  total_price: number;
  ktp_image_path: string;
  status: string;
  venue: Venue;
  payment: Payment;
  user: User;
}

export interface PaymentProof {
  id: number;
  payment_proof_image_path: string;
  uploaded_at: Date | string;
}

export const columns = (onKelolaClick: (booking: Booking) => void): ColumnDef<Booking>[] => [
  {
    accessorKey: 'user.name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-auto cursor-pointer p-0 font-medium hover:bg-transparent"
        >
          Nama User
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="max-w-[150px]">
          <div className="truncate font-medium">{row.original.user.name}</div>
        </div>
      );
    },
  },
  {
    accessorKey: 'venue.name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-auto cursor-pointer p-0 font-medium hover:bg-transparent"
        >
          Gedung
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="max-w-[200px]">
          <div className="truncate">{row.original.venue.name}</div>
        </div>
      );
    },
  },
  {
    accessorKey: 'event_start_date',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-auto cursor-pointer p-0 font-medium hover:bg-transparent"
        >
          <div className="line-clamp-2 max-w-[60px] text-center text-balance">Tanggal Mulai</div>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="max-w-[100px] text-center">
          {new Intl.DateTimeFormat('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          }).format(new Date(row.original.event_start_date))}
        </div>
      );
    },
  },
  {
    accessorKey: 'event_end_date',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-auto cursor-pointer p-0 font-medium hover:bg-transparent"
        >
          <div className="line-clamp-2 max-w-[60px] text-center text-balance">Tanggal Berakhir</div>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="max-w-[100px] text-center">
          {new Intl.DateTimeFormat('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          }).format(new Date(row.original.event_end_date))}
        </div>
      );
    },
  },
  {
    accessorKey: 'purpose',
    header: 'Tujuan',
    cell: ({ row }) => {
      return (
        <div className="max-w-[100px]">
          <div className="line-clamp-2 text-wrap text-ellipsis">{row.original.purpose}</div>
        </div>
      );
    },
  },
  {
    accessorKey: 'total_price',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-auto cursor-pointer p-0 font-medium hover:bg-transparent"
        >
          Total Biaya
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      }).format(row.original.total_price);
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status;
      const statusColors = {
        PENDING: 'bg-yellow-100 text-yellow-800',
        'WAITING PAYMENT': 'bg-sky-100 text-sky-800',
        'VERIFYING PAYMENT': 'bg-amber-100 text-amber-800',
        CONFIRMED: 'bg-green-100 text-green-800',
        'REQUEST CANCEL': 'bg-orange-100 text-orange-800',
        CANCELED: 'bg-red-100 text-red-800',
        COMPLETED: 'bg-blue-100 text-blue-800',
      };

      const statusName = {
        PENDING: 'PENDING',
        'WAITING PAYMENT': 'MENUNGGU PEMBAYARAN',
        'VERIFYING PAYMENT': 'MENUNGGU KONFIRMASI',
        CONFIRMED: 'DIKONFIRMASI',
        'REQUEST CANCEL': 'AJUKAN BATAL',
        CANCELED: 'BATAL',
        COMPLETED: 'SELESAI',
      };

      return (
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'
          }`}
        >
          {statusName[status as keyof typeof statusName] || status}
        </span>
      );
    },
  },
  {
    id: 'actions',
    header: 'Aksi',
    cell: ({ row }) => {
      const booking = row.original;
      const status = booking.status;

      if (status === 'VERIFYING PAYMENT' || status === 'REQUEST CANCEL') {
        return (
          <div className="text-center">
            <DialogTrigger asChild>
              <Button
                size={'sm'}
                variant="destructive"
                className="cursor-pointer bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                onClick={() => onKelolaClick(booking)}
              >
                Kelola
              </Button>
            </DialogTrigger>
          </div>
        );
      }

      return (
        <div className="text-center">
          <DialogTrigger asChild>
            <Button
              size="sm"
              variant="outline"
              className="h-8 cursor-pointer bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-600"
              onClick={() => onKelolaClick(booking)}
            >
              Detail
            </Button>
          </DialogTrigger>
        </div>
      );
    },
  },
];
