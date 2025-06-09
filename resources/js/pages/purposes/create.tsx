import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Kegunaan Gedung',
    href: route('purposes.index'),
  },
  {
    title: 'Tambah Kegunaan',
    href: route('purposes.create'),
  },
];

export default function CreatePurpose() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    description: '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('purposes.store'));
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Tambah Kegunaan Gedung" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <h1 className="text-2xl font-semibold">Tambah Kegunaan Gedung</h1>

        <form onSubmit={submit} className="my-5 space-y-6">
          <div className="grid gap-2">
            <Label htmlFor="name">Kegunaan Gedung</Label>

            <Input
              id="name"
              name="name"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              className="mt-1 block w-full"
              required
              autoComplete="name"
              placeholder="Masukkan kegunaan"
            />

            <InputError className="mt-2" message={errors.name} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="name">Deskripsi</Label>

            <Input
              id="description"
              name="description"
              value={data.description}
              onChange={(e) => setData('description', e.target.value)}
              className="mt-1 block w-full"
              required
              autoComplete="description"
              placeholder="Masukkan deskripsi kegunaan"
            />

            <InputError className="mt-2" message={errors.description} />
          </div>

          <div className="flex justify-start gap-4">
            <Button type="submit" disabled={processing} className="cursor-pointer">
              Tambah Fasilitas
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
