import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Fasilitas',
        href: '/facilities',
    },
];

export default function Facilities() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Fasilitas" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1 className="text-2xl font-semibold">Fasilitas</h1>
                <div className="flex justify-start gap-4">
                    <Link href="/facilities/create" className="cursor-pointer">
                        <Button className="w-full cursor-pointer">Tambah Fasilitas</Button>
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}
