import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Venue',
        href: '/venues',
    },
    {
        title: 'Tambah Venue',
        href: '/venues/create',
    },
];

interface Facility {
    id: number;
    name: string;
    description: string;
}

interface Purpose {
    id: number;
    name: string;
    description: string;
}

export default function CreateVenue() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        address: '',
        capacity: '',
        base_price: '',
        building_condition: '',
        facilities: [] as number[],
        purposes: [] as number[],
        images: [] as File[],
    });

    const { facilities } = usePage<{ facilities: Facility[] }>().props;
    const { purposes } = usePage<{ purposes: Purpose[] }>().props;
    const [previewImages, setPreviewImages] = useState<string[]>([]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('venues.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Venue" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1 className="text-2xl font-semibold">Tambah Venue</h1>

                <form onSubmit={submit} className="my-5 space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nama Gedung</Label>

                        <Input
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-1 block w-full"
                            required
                            autoComplete="name"
                            placeholder="Masukkan nama gedung"
                        />

                        <InputError className="mt-2" message={errors.name} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Deskripsi Gedung</Label>

                        <Input
                            id="description"
                            name="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="mt-1 block w-full"
                            required
                            autoComplete="description"
                            placeholder="Masukkan deskripsi gedung"
                        />

                        <InputError className="mt-2" message={errors.description} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="address">Alamat Gedung</Label>

                        <Input
                            id="address"
                            name="address"
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                            className="mt-1 block w-full"
                            required
                            autoComplete="address"
                            placeholder="Masukkan alamat gedung"
                        />

                        <InputError className="mt-2" message={errors.description} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="capacity">Kapasitas Gedung</Label>

                        <Input
                            id="capacity"
                            name="capacity"
                            type="number"
                            value={data.capacity}
                            onChange={(e) => setData('capacity', e.target.value)}
                            className="mt-1 block w-full"
                            required
                            autoComplete="capacity"
                            placeholder="Masukkan kapasitas gedung"
                        />

                        <InputError className="mt-2" message={errors.description} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="base_price">Harga Dasar (per hari)</Label>

                        <div className="relative mt-1">
                            <span className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2 border-r-2 pr-1.5 text-sm">Rp.</span>
                            <Input
                                id="base_price"
                                name="base_price"
                                type="number"
                                value={data.base_price}
                                onChange={(e) => setData('base_price', e.target.value)}
                                className="w-full pl-12"
                                required
                                autoComplete="base_price"
                                placeholder="Masukkan harga dasar"
                            />
                        </div>

                        <InputError className="mt-2" message={errors.description} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="purpose_id">Kegunaan</Label>
                        {purposes.map((purpose) => (
                            <div key={purpose.id} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`purpose-${purpose.id}`}
                                    checked={data.purposes.includes(purpose.id)}
                                    onCheckedChange={(checked) => {
                                        if (checked) {
                                            setData('purposes', [...data.purposes, purpose.id]);
                                        } else {
                                            setData(
                                                'purposes',
                                                data.purposes.filter((id) => id !== purpose.id),
                                            );
                                        }
                                    }}
                                />
                                <label htmlFor={`purpose-${purpose.id}`} className="text-sm">
                                    {purpose.name}
                                </label>
                            </div>
                        ))}

                        <InputError className="mt-2" message={errors.description} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="facility_id">Fasilitas</Label>
                        {facilities.map((facility) => (
                            <div key={facility.id} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`facility-${facility.id}`}
                                    checked={data.facilities.includes(facility.id)}
                                    onCheckedChange={(checked) => {
                                        if (checked) {
                                            setData('facilities', [...data.facilities, facility.id]);
                                        } else {
                                            setData(
                                                'facilities',
                                                data.facilities.filter((id) => id !== facility.id),
                                            );
                                        }
                                    }}
                                />
                                <label htmlFor={`facility-${facility.id}`} className="text-sm">
                                    {facility.name}
                                </label>
                            </div>
                        ))}

                        <InputError className="mt-2" message={errors.description} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="building_condition">Kondisi Gedung</Label>

                        <Select value={data.building_condition} onValueChange={(value) => setData('building_condition', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih kondisi gedung"></SelectValue>
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="SANGAT TERAWAT">Sangat Terawat</SelectItem>
                                <SelectItem value="TERAWAT">Terawat</SelectItem>
                                <SelectItem value="KURANG TERAWAT">Kurang Terawat</SelectItem>
                                <SelectItem value="BUTUH RENOVASI">Butuh Renovasi</SelectItem>
                            </SelectContent>
                        </Select>

                        <InputError className="mt-2" message={errors.description} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="images">Foto Gedung</Label>

                        <Input
                            id="images"
                            name="images"
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => {
                                const files = Array.from(e.target.files ?? []);
                                setData('images', files);

                                const previews = files.map((file) => URL.createObjectURL(file));
                                setPreviewImages(previews);
                            }}
                            className="mt-1 block w-full cursor-pointer"
                            required
                            autoComplete="images"
                            placeholder="Upload foto gedung"
                        />

                        <InputError className="mt-2" message={errors.description} />
                    </div>

                    <div className="mt-2 flex flex-wrap gap-4">
                        {previewImages.map((src, index) => (
                            <img key={index} src={src} alt="Foto Gedung" className="h-24 rounded object-cover" />
                        ))}
                    </div>

                    <div className="flex justify-start gap-4">
                        <Button type="submit" disabled={processing} className="cursor-pointer">
                            Tambah Gedung
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
