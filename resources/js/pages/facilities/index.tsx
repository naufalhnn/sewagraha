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
import { SquarePen, Trash } from 'lucide-react';
import { MouseEventHandler, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Fasilitas',
        href: '/facilities',
    },
];

interface Facility {
    id: number;
    name: string;
    description: string;
}

export default function Facilities() {
    const { facilities } = usePage<{ facilities: Facility[] }>().props;
    const [open, setOpen] = useState(false);
    const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);

    const handleDelete: MouseEventHandler = (e) => {
        e.preventDefault();
        if (!selectedFacility) return;
        router.delete(route('facilities.destroy', selectedFacility.id), {
            onSuccess: () => setOpen(false),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Fasilitas" />
            <FlashMessage />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1 className="text-2xl font-semibold">Fasilitas</h1>
                <div className="flex justify-start gap-4">
                    <Link href="/facilities/create" className="cursor-pointer">
                        <Button className="w-full cursor-pointer">Tambah Fasilitas</Button>
                    </Link>
                </div>
                <div>
                    <table className="w-full table-auto">
                        <thead className="text-start">
                            <tr>
                                <th className="border-1 px-4 py-2">Nama Fasilitas</th>
                                <th className="border-1 px-4 py-2">Deskripsi</th>
                                <th className="w-36 border-1 px-4 py-2">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {facilities.map((facility) => (
                                <tr key={facility.id}>
                                    <td className="border-1 px-4 py-2">{facility.name}</td>
                                    <td className="border-1 px-4 py-2">{facility.description}</td>
                                    <td className="flex justify-center space-x-1 border-1 px-4 py-2 text-center">
                                        <Link href={route('facilities.edit', facility.id)} className="cursor-pointer">
                                            <Button
                                                size={'sm'}
                                                className="cursor-pointer bg-blue-100 text-sm text-blue-600 transition duration-300 hover:bg-blue-200"
                                            >
                                                <SquarePen />
                                            </Button>
                                        </Link>
                                        <Dialog open={open && selectedFacility?.id === facility.id} onOpenChange={setOpen}>
                                            <DialogTrigger asChild>
                                                <Button
                                                    size={'sm'}
                                                    className="cursor-pointer bg-red-100 text-sm text-red-600 transition duration-300 hover:bg-red-200"
                                                    onClick={() => {
                                                        setSelectedFacility(facility);
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
                                                        Apakah anda yakin ingin menghapus fasilitas <strong>{facility?.name}</strong>?
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
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
