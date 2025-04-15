import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { ChangeEvent, FormEventHandler, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Venue', href: '/venues' },
    { title: 'Edit Venue', href: '#' },
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

export default function EditVenue() {
    const { venue, facilities, purposes } = usePage<{
        venue: Venue;
        facilities: Facility[];
        purposes: Purpose[];
    }>().props;

    const [previewImages, setPreviewImages] = useState<string[]>([]);

    const { data, setData, processing, errors } = useForm({
        name: venue.name,
        description: venue.description,
        address: venue.address,
        capacity: venue.capacity,
        base_price: venue.base_price,
        building_condition: venue.building_condition,
        facilities: venue.facilities.map((f) => f.id),
        purposes: venue.purposes.map((p) => p.id),
        images: [] as File[],
    });

    const handleDeleteImage = (imageId: number) => {
        if (confirm('Yakin ingin menghapus gambar ini?')) {
            router.delete(route('venue-images.destroy', imageId), {
                preserveScroll: true,
            });
        }
    };

    const handleCheckbox = (id: number, key: 'facilities' | 'purposes') => {
        setData(key, data[key].includes(id) ? data[key].filter((item) => item !== id) : [...data[key], id]);
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setData('images', files);

        const previews = files.map((file) => URL.createObjectURL(file));
        setPreviewImages(previews);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (key === 'images') {
                (value as File[]).forEach((file) => formData.append('images[]', file));
            } else if (Array.isArray(value)) {
                value.forEach((v) => formData.append(`${key}[]`, v.toString()));
            } else {
                formData.append(key, String(value));
            }
        });

        formData.append('_method', 'PUT');

        router.post(route('venues.update', venue.id), formData, {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Venue" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1 className="text-2xl font-semibold">Edit Venue</h1>

                <form onSubmit={submit} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nama Gedung</Label>
                        <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                        <InputError message={errors.name} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description">Deskripsi</Label>
                        <Input id="description" value={data.description} onChange={(e) => setData('description', e.target.value)} />
                        <InputError message={errors.description} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="address">Alamat</Label>
                        <Input id="address" value={data.address} onChange={(e) => setData('address', e.target.value)} />
                        <InputError message={errors.address} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="capacity">Kapasitas</Label>
                        <Input type="number" id="capacity" value={data.capacity} onChange={(e) => setData('capacity', Number(e.target.value))} />
                        <InputError message={errors.capacity} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="base_price">Harga Dasar</Label>
                        <div className="flex items-center gap-2">
                            <span className="bg-muted rounded px-3 text-sm">Rp</span>
                            <Input
                                type="number"
                                id="base_price"
                                value={data.base_price}
                                onChange={(e) => setData('base_price', Number(e.target.value))}
                            />
                        </div>
                        <InputError message={errors.base_price} />
                    </div>

                    <div className="grid gap-2">
                        <Label>Kondisi Gedung</Label>
                        <Select value={data.building_condition} onValueChange={(value) => setData('building_condition', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih kondisi gedung" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="SANGAT TERAWAT">Sangat Terawat</SelectItem>
                                <SelectItem value="TERAWAT">Terawat</SelectItem>
                                <SelectItem value="KURANG TERAWAT">Kurang Terawat</SelectItem>
                                <SelectItem value="BUTUH RENOVASI">Butuh Renovasi</SelectItem>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.building_condition} />
                    </div>

                    <div className="grid gap-2">
                        <Label>Fasilitas</Label>
                        {facilities.map((facility) => (
                            <label key={facility.id} className="flex items-center gap-2">
                                <Checkbox
                                    checked={data.facilities.includes(facility.id)}
                                    onCheckedChange={() => handleCheckbox(facility.id, 'facilities')}
                                />
                                {facility.name}
                            </label>
                        ))}
                        <InputError message={errors.facilities} />
                    </div>

                    <div className="grid gap-2">
                        <Label>Keperluan</Label>
                        {purposes.map((purpose) => (
                            <label key={purpose.id} className="flex items-center gap-2">
                                <Checkbox
                                    checked={data.purposes.includes(purpose.id)}
                                    onCheckedChange={() => handleCheckbox(purpose.id, 'purposes')}
                                />
                                {purpose.name}
                            </label>
                        ))}
                        <InputError message={errors.purposes} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="images">Tambah Gambar</Label>
                        <Input id="images" type="file" multiple onChange={handleImageChange} className="cursor-pointer" />
                        <div className="mt-2 flex flex-wrap gap-2">
                            {previewImages.map((src, index) => (
                                <img key={index} src={src} className="h-24 w-24 rounded object-cover" />
                            ))}
                        </div>
                        <InputError message={errors.images} />
                    </div>

                    <div className="grid gap-2">
                        <Label>Gambar Tersimpan</Label>
                        <div className="flex flex-wrap gap-2">
                            {venue.venue_images.map((img) => (
                                <div key={img.id} className="group relative">
                                    <img src={`/storage/${img.image_path}`} alt="Venue" className="h-24 w-24 rounded border object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => handleDeleteImage(img.id)}
                                        className="absolute top-1 right-1 hidden cursor-pointer rounded bg-red-600 px-2 py-1 text-xs text-white group-hover:block"
                                    >
                                        Hapus
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-start">
                        <Button type="submit" disabled={processing} className="cursor-pointer">
                            Simpan Perubahan
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
