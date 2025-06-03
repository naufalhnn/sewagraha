import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { Head } from '@inertiajs/react';
import { PropsWithChildren, useEffect } from 'react';
import '../../css/app.css';

interface MainLayoutProps extends PropsWithChildren {
  title?: string;
}

export default function MainLayout({ title, children }: MainLayoutProps) {
  // const { props } = usePage(); // Untuk akses shared props jika ada

  // Contoh untuk logika JavaScript yang ada di layout Blade
  // Misalnya, efek scroll navbar atau smooth scroll global
  // Ini perlu diimplementasikan ulang di sini atau di komponen terkait (Navbar)
  useEffect(() => {
    // Logika untuk smooth scroll (jika masih relevan, biasanya browser modern sudah handle)
    document.documentElement.style.scrollBehavior = 'smooth';

    // Logika lain yang bersifat global untuk layout
    // console.log('MainLayout mounted');
    // return () => {
    // console.log('MainLayout unmounted');
    // };
  }, []);

  return (
    <>
      <Head title={title || 'SEWAGRAHA'} />
      <div className="font-poppins bg-slate-50">
        <Navbar />
        <main>{children}</main>
        <Footer />
        {/* <Toaster position="top-right" /> */} {/* Contoh notifikasi */}
      </div>
    </>
  );
}
