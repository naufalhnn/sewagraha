import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Building, UploadCloud } from 'lucide-react';
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

      <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-800 dark:text-slate-100">
              <Building className="h-6 w-6" />
              Tambah Venue Baru
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Isi detail di bawah ini untuk menambahkan gedung baru ke dalam sistem.</p>
          </div>
          <Link href={route('venues.index')}>
            <Button variant="outline">Kembali</Button>
          </Link>
        </div>

        <form onSubmit={submit} className="space-y-8">
          <div className="grid grid-cols-3 gap-8">
            <div className="space-y-8 lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Informasi Dasar</CardTitle>
                  <CardDescription>Detail utama mengenai nama, lokasi, dan deskripsi gedung.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nama Gedung</Label>
                    <Input
                      id="name"
                      value={data.name}
                      onChange={(e) => setData('name', e.target.value)}
                      placeholder="Contoh: Graha Pancasila"
                      required
                    />
                    {errors.name && <InputError message={errors.name} />}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="address">Alamat Gedung</Label>
                    <Textarea
                      id="address"
                      value={data.address}
                      onChange={(e) => setData('address', e.target.value)}
                      placeholder="Jl. Pahlawan No. 123, Pekalongan"
                      required
                    />
                    {errors.address && <InputError message={errors.address} />}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Deskripsi Singkat</Label>
                    <Textarea
                      id="description"
                      value={data.description}
                      onChange={(e) => setData('description', e.target.value)}
                      placeholder="Jelaskan keunggulan dan fitur utama gedung..."
                      required
                    />
                    {errors.description && <InputError message={errors.description} />}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Foto Gedung</CardTitle>
                  <CardDescription>Tambahkan 1 atau lebih foto gedung.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <label
                      htmlFor="images"
                      className="relative flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-white p-6 text-center transition-colors duration-200 hover:border-blue-500 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:hover:border-blue-400 dark:hover:bg-slate-700"
                    >
                      <UploadCloud className="mx-auto h-10 w-10 text-slate-400" />
                      <span className="mt-2 block text-sm font-semibold text-blue-600 dark:text-blue-400">Pilih file untuk diunggah</span>
                      <span className="mt-1 block text-xs text-slate-500 dark:text-slate-400">atau seret dan lepas</span>
                    </label>
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
                      className="mt-1 hidden w-full cursor-pointer"
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
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8 lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Spesifikasi</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="capacity">Kapasitas (Orang)</Label>
                    <Input
                      id="capacity"
                      type="number"
                      value={data.capacity}
                      onChange={(e) => setData('capacity', e.target.value)}
                      placeholder="Contoh: 500"
                      required
                    />
                    {errors.capacity && <InputError message={errors.capacity} />}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="base_price">Harga Dasar (per hari)</Label>
                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-sm text-slate-500">Rp</span>
                      <Input
                        id="base_price"
                        type="number"
                        value={data.base_price}
                        onChange={(e) => setData('base_price', e.target.value)}
                        className="pl-9"
                        placeholder="Contoh: 2500000"
                        required
                      />
                    </div>
                    {errors.base_price && <InputError message={errors.base_price} />}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="building_condition">Kondisi Gedung</Label>
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
                    {errors.building_condition && <InputError message={errors.building_condition} />}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Kategori</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="mb-2 block">Fasilitas</Label>
                    <div className="space-y-2">
                      {facilities.map((facility) => (
                        <div key={facility.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`facility-${facility.id}`}
                            checked={data.facilities.includes(facility.id)}
                            onCheckedChange={(checked) =>
                              setData('facilities', checked ? [...data.facilities, facility.id] : data.facilities.filter((id) => id !== facility.id))
                            }
                          />
                          <label
                            htmlFor={`facility-${facility.id}`}
                            className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {facility.name}
                          </label>
                        </div>
                      ))}
                    </div>
                    {errors.facilities && <InputError message={errors.facilities} className="mt-2" />}
                  </div>
                  <div className="border-t border-slate-200 pt-4 dark:border-slate-700">
                    <Label className="mb-2 block">Tipe Kegunaan</Label>
                    <div className="space-y-2">
                      {purposes.map((purpose) => (
                        <div key={purpose.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`purpose-${purpose.id}`}
                            checked={data.purposes.includes(purpose.id)}
                            onCheckedChange={(checked) =>
                              setData('purposes', checked ? [...data.purposes, purpose.id] : data.purposes.filter((id) => id !== purpose.id))
                            }
                          />
                          <label
                            htmlFor={`purpose-${purpose.id}`}
                            className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {purpose.name}
                          </label>
                        </div>
                      ))}
                    </div>
                    {errors.purposes && <InputError message={errors.purposes} className="mt-2" />}
                  </div>
                </CardContent>
              </Card>
            </div>
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
