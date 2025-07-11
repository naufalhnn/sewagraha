import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type RegisterForm = {
  name: string;
  email: string;
  phone_number: string;
  password: string;
  password_confirmation: string;
};

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
    name: '',
    email: '',
    phone_number: '',
    password: '',
    password_confirmation: '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('register'), {
      onFinish: () => reset('password', 'password_confirmation'),
    });
  };

  return (
    <AuthLayout title="Buat akun baru" description="Masukkan data diri untuk membuat akun">
      <Head title="Daftar" />
      <form className="flex flex-col gap-6" onSubmit={submit}>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="name">Nama lengkap</Label>
            <Input
              id="name"
              type="text"
              required
              autoFocus
              tabIndex={1}
              autoComplete="name"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              disabled={processing}
              placeholder="Nama lengkap"
            />
            <InputError message={errors.name} className="mt-2" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Alamat email</Label>
            <Input
              id="email"
              type="email"
              required
              tabIndex={2}
              autoComplete="email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              disabled={processing}
              placeholder="email@example.com"
            />
            <InputError message={errors.email} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phone_number">Nomor telepon</Label>
            <Input
              id="phone_number"
              type="phone_number"
              required
              tabIndex={2}
              autoComplete="phone_number"
              value={data.phone_number}
              onChange={(e) => setData('phone_number', e.target.value)}
              disabled={processing}
              placeholder="0851xxx"
            />
            <InputError message={errors.email} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Kata sandi</Label>
            <Input
              id="password"
              type="password"
              required
              tabIndex={3}
              autoComplete="new-password"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              disabled={processing}
              placeholder="Kata sandi"
            />
            <InputError message={errors.password} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password_confirmation">Konfirmasi kata sandi</Label>
            <Input
              id="password_confirmation"
              type="password"
              required
              tabIndex={4}
              autoComplete="new-password"
              value={data.password_confirmation}
              onChange={(e) => setData('password_confirmation', e.target.value)}
              disabled={processing}
              placeholder="Konfirmasi kata sandi"
            />
            <InputError message={errors.password_confirmation} />
          </div>

          <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
            Buat akun
          </Button>
        </div>

        <div className="text-muted-foreground text-center text-sm">
          Sudah punya akun?{' '}
          <TextLink href={route('login')} tabIndex={6}>
            Masuk
          </TextLink>
        </div>
      </form>
    </AuthLayout>
  );
}
