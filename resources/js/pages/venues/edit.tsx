import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type PageProps as PagePropsShared } from '@/types';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { SquarePen, Trash, UploadCloud } from 'lucide-react';
import React, { FormEventHandler, useEffect, useState } from 'react';
import { route } from 'ziggy-js';

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
  image_path: string;
}
interface Venue {
  id: number;
  name: string;
  description: string;
  address: string;
  capacity: string;
  base_price: string;
  building_condition: string;
  facilities: Pick<Facility, 'id' | 'name'>[];
  purposes: Pick<Purpose, 'id' | 'name'>[];
  venue_images: Image[];
}
interface EditVenuePageProps extends PagePropsShared {
  venue: Venue;
  facilities: Facility[];
  purposes: Purpose[];
}

export default function EditVenue() {
  const { venue, facilities, purposes, errors } = usePage<EditVenuePageProps>().props;

  const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Venue', href: route('venues.index') },
    { title: `Edit: ${venue.name}`, href: '#' },
  ];

  const { data, setData, post, processing } = useForm({
    _method: 'PUT',
    name: venue.name || '',
    description: venue.description || '',
    address: venue.address || '',
    capacity: venue.capacity || '',
    base_price: venue.base_price || '',
    building_condition: venue.building_condition || '',
    facilities: venue.facilities.map((f) => f.id) || [],
    purposes: venue.purposes.map((p) => p.id) || [],
    images: [] as File[],
  });

  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleCheckbox = (id: number, key: 'facilities' | 'purposes') => {
    setData(key, data[key].includes(id) ? data[key].filter((item) => item !== id) : [...data[key], id]);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setData('images', files);

    previewImages.forEach(URL.revokeObjectURL);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(newPreviews);
  };

  useEffect(() => () => previewImages.forEach(URL.revokeObjectURL), [previewImages]);

  const handleDeleteImage = (imageId: number) => {
    if (confirm('Yakin ingin menghapus gambar ini? Perubahan akan tersimpan permanen setelah Anda menekan tombol "Simpan Perubahan".')) {
      router.delete(route('venue-images.destroy', imageId), {
        preserveScroll: true,
      });
    }
  };

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('venues.update', venue.id));
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Edit Venue: ${venue.name}`} />

      <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-800 dark:text-slate-100">
              <SquarePen className="h-6 w-6" />
              Edit Venue
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Perbarui detail untuk gedung: <span className="font-semibold">{venue.name}</span>
            </p>
          </div>
          <Link href={route('venues.index')}>
            <Button variant="outline">Kembali</Button>
          </Link>
        </div>

        <form onSubmit={submit} className="space-y-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
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
                  <CardDescription>Tambah foto baru atau hapus foto yang sudah ada.</CardDescription>
                </CardHeader>
                <CardContent>
                  {venue.venue_images.length > 0 && (
                    <div className="mb-6">
                      <Label className="mb-2 block text-sm font-medium">Gambar Tersimpan</Label>
                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {venue.venue_images.map((img) => (
                          <div key={img.id} className="group relative aspect-square">
                            <img src={`/storage/${img.image_path}`} alt="Gambar Venue" className="h-full w-full rounded-lg object-cover shadow-md" />
                            <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                              <Button type="button" variant="destructive" size="sm" onClick={() => handleDeleteImage(img.id)}>
                                <Trash size={16} />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="grid gap-2">
                    <Label htmlFor="images">Tambah Foto Baru</Label>
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
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      className="hidden w-full text-sm text-gray-500 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {errors.images && <InputError message={errors.images} />}
                  </div>
                  {previewImages.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                      {previewImages.map((src, index) => (
                        <div key={index} className="relative aspect-square">
                          <img src={src} alt={`Preview ${index + 1}`} className="h-full w-full rounded-lg object-cover shadow-md" />
                        </div>
                      ))}
                    </div>
                  )}
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
                    <Label className="mb-3 block font-semibold">Fasilitas</Label>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                      {facilities.map((facility) => (
                        <div key={facility.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`facility-${facility.id}`}
                            checked={data.facilities.includes(facility.id)}
                            onCheckedChange={() => handleCheckbox(facility.id, 'facilities')}
                          />
                          <label htmlFor={`facility-${facility.id}`} className="text-sm leading-none">
                            {facility.name}
                          </label>
                        </div>
                      ))}
                    </div>
                    {errors.facilities && <InputError message={errors.facilities} className="mt-2" />}
                  </div>
                  <div className="border-t border-slate-200 pt-4 dark:border-slate-700">
                    <Label className="mb-3 block font-semibold">Tipe Kegunaan</Label>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                      {purposes.map((purpose) => (
                        <div key={purpose.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`purpose-${purpose.id}`}
                            checked={data.purposes.includes(purpose.id)}
                            onCheckedChange={() => handleCheckbox(purpose.id, 'purposes')}
                          />
                          <label htmlFor={`purpose-${purpose.id}`} className="text-sm leading-none">
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

          <div className="flex justify-end gap-4 border-t border-slate-200 pt-4 dark:border-slate-700">
            <Link href={route('venues.index')}>
              <Button variant="outline" type="button">
                Batal
              </Button>
            </Link>
            <Button type="submit" disabled={processing}>
              {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
