import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Venue', href: '/venues' },
    { title: 'Detail Venue', href: '#' },
];

interface Facility {
    id: number;
    name: string;
}

interface Purpose {
    id: number;
    name: string;
}

interface Image {
    id: number;
    venue_id: number;
    image_path: string;
}

interface Venue {
    id: number;
    name: string;
    description: string;
    address: string;
    capacity: number;
    base_price: number;
    building_condition: string;
    facilities: Facility[];
    purposes: Purpose[];
    venue_images: Image[];
}

export default function ShowVenue() {
    const { venue } = usePage<{
        venue: Venue;
    }>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Detail Venue - ${venue.name}`} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1 className="text-2xl font-semibold">Detail Venue: {venue.name}</h1>

                <div className="space-y-4">
                    <div className="flex flex-col space-y-2">
                        <h2 className="text-muted-foreground font-medium">Nama Gedung</h2>
                        <p className="rounded-lg p-2 outline-1 outline-gray-300">{venue.name}</p>
                    </div>

                    <div className="flex flex-col space-y-2">
                        <h2 className="text-muted-foreground font-medium">Deskripsi</h2>
                        <p className="rounded-lg p-2 outline-1 outline-gray-300">{venue.description}</p>
                    </div>

                    <div className="flex flex-col space-y-2">
                        <h2 className="text-muted-foreground font-medium">Alamat</h2>
                        <p className="rounded-lg p-2 outline-1 outline-gray-300">{venue.address}</p>
                    </div>

                    <div className="flex flex-col space-y-2">
                        <h2 className="text-muted-foreground font-medium">Kapasitas</h2>
                        <p className="rounded-lg p-2 outline-1 outline-gray-300">{venue.capacity}</p>
                    </div>

                    <div className="flex flex-col space-y-2">
                        <h2 className="text-muted-foreground font-medium">Harga Dasar</h2>
                        <p className="rounded-lg p-2 outline-1 outline-gray-300">Rp {venue.base_price.toLocaleString('id-ID')}</p>
                    </div>

                    <div className="flex flex-col space-y-2">
                        <h2 className="text-muted-foreground font-medium">Kondisi Gedung</h2>
                        <p className="rounded-lg p-2 outline-1 outline-gray-300">{venue.building_condition}</p>
                    </div>

                    <div className="flex flex-col space-y-2">
                        <h2 className="text-muted-foreground font-medium">Fasilitas</h2>
                        <ul className="ml-5 list-disc">
                            {venue.facilities.map((facility) => (
                                <li key={facility.id}>{facility.name}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col space-y-2">
                        <h2 className="text-muted-foreground font-medium">Keperluan</h2>
                        <ul className="ml-5 list-disc">
                            {venue.purposes.map((purpose) => (
                                <li key={purpose.id}>{purpose.name}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-muted-foreground font-medium">Foto Gedung</h2>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {venue.venue_images.map((img) => (
                                <img key={img.id} src={`/storage/${img.image_path}`} alt="Venue" className="h-40 w-40 rounded border object-cover" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
