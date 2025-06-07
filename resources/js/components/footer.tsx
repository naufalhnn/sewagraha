import { Link, usePage } from '@inertiajs/react';

const LocationIcon = () => (
  <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const EmailIconFooter = () => (
  <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const PhoneIcon = () => (
  <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

const FacebookIcon = () => (
  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const TwitterIcon = () => (
  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
  </svg>
);

const GenericEmailIcon = () => (
  <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
    />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { url } = usePage();

  const footerLinkClasses = (routeName: string) => {
    const currentPath = url.split('?')[0];
    let routePath = '';

    try {
      routePath = route(routeName);
    } catch (error) {
      console.log(error);
      routePath = `/${routeName === 'home' ? '' : routeName}`;
    }

    const isActive = routePath === currentPath || (routeName === 'home' && currentPath === '/');
    return `${isActive ? 'text-white font-semibold' : 'text-gray-300'} group flex items-center transition-all duration-300 hover:text-white`;
  };

  const activeIndicatorClasses = (routeName: string) => {
    const currentPath = url.split('?')[0];
    let routePath = '';

    try {
      routePath = route(routeName);
    } catch (error) {
      console.log(error);
      routePath = `/${routeName === 'home' ? '' : routeName}`;
    }

    const isActive = routePath === currentPath || (routeName === 'home' && currentPath === '/');
    return `${isActive ? 'opacity-100' : 'opacity-0'} mr-3 h-2 w-2 rounded-full bg-blue-400 transition-opacity duration-300 group-hover:opacity-100`;
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 h-72 w-72 animate-pulse rounded-full bg-blue-400 mix-blend-multiply blur-xl filter"></div>
        <div className="absolute right-1/4 bottom-0 h-96 w-96 animate-pulse rounded-full bg-purple-400 mix-blend-multiply blur-xl filter delay-1000"></div>
      </div>

      <div className="relative border-b border-white/10">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-center space-x-6">
            <div className="flex items-center space-x-6">
              <img className="w-14" src="/icons/LogoKabPekalongan.png" alt="Logo BPKD" />
              <div className="h-10 border-l border-white/20"></div>
              <div className="text-white">
                <h3 className="text-xl font-bold tracking-wide">Badan Pengelolaan Keuangan Daerah</h3>
                <p className="text-sm font-medium text-blue-200">Kabupaten Pekalongan</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div className="space-y-6">
            <h4 className="relative mb-6 text-lg font-semibold text-white">
              Menu Utama
              <div className="absolute -bottom-2 left-0 h-0.5 w-12 bg-gradient-to-r from-blue-400 to-transparent"></div>
            </h4>
            <nav className="space-y-3">
              <Link href={route('home')} className={footerLinkClasses('home')}>
                <span className={activeIndicatorClasses('home')}></span>
                <span className="transition-transform duration-300 group-hover:translate-x-2">Beranda</span>
              </Link>
              <Link href={route('about')} className={footerLinkClasses('about')}>
                <span className={activeIndicatorClasses('about')}></span>
                <span className="transition-transform duration-300 group-hover:translate-x-2">Tentang Kami</span>
              </Link>
              <Link href={route('venues')} className={footerLinkClasses('venues')}>
                <span className={activeIndicatorClasses('venues')}></span>
                <span className="transition-transform duration-300 group-hover:translate-x-2">Gedung</span>
              </Link>
              <Link href={route('contact')} className={footerLinkClasses('contact')}>
                <span className={activeIndicatorClasses('contact')}></span>
                <span className="transition-transform duration-300 group-hover:translate-x-2">Kontak</span>
              </Link>
            </nav>
          </div>

          <div className="space-y-6">
            <h4 className="relative mb-6 text-lg font-semibold text-white">
              Informasi Kontak
              <div className="absolute -bottom-2 left-0 h-0.5 w-12 bg-gradient-to-r from-blue-400 to-transparent"></div>
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="rounded-lg bg-blue-500/20 p-2">
                  <LocationIcon />
                </div>
                <div>
                  <p className="text-sm leading-relaxed text-gray-300">
                    Jl. Raya Pekalongan
                    <br />
                    Kabupaten Pekalongan, Jawa Tengah
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="rounded-lg bg-blue-500/20 p-2">
                  <EmailIconFooter />
                </div>
                <p className="text-sm text-gray-300">bpkd@pekalongankab.go.id</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="rounded-lg bg-blue-500/20 p-2">
                  <PhoneIcon />
                </div>
                <p className="text-sm text-gray-300">(0285) 123456</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="relative mb-6 text-lg font-semibold text-white">
              Ikuti Kami
              <div className="absolute -bottom-2 left-0 h-0.5 w-12 bg-gradient-to-r from-blue-400 to-transparent"></div>
            </h4>
            <div className="flex flex-wrap gap-3">
              <a href="#" className="group relative">
                <div className="rounded-xl bg-blue-600 p-3 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-500/25 hover:bg-blue-500">
                  <FacebookIcon />
                </div>
                <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 transform rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Facebook
                </span>
              </a>
              <a href="#" className="group relative">
                <div className="rounded-xl bg-sky-500 p-3 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-sky-500/25 hover:bg-sky-400">
                  <TwitterIcon />
                </div>
                <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 transform rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Twitter
                </span>
              </a>
              <a href="#" className="group relative">
                <div className="rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 p-3 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-purple-500/25 hover:from-purple-500 hover:to-pink-400">
                  <InstagramIcon />
                </div>
                <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 transform rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Instagram
                </span>
              </a>
              <a href="mailto:bpkd@pekalongankab.go.id" className="group relative">
                <div className="rounded-xl bg-gray-600 p-3 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-gray-500/25 hover:bg-gray-500">
                  <GenericEmailIcon />
                </div>
                <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 transform rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Email
                </span>
              </a>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Ikuti media sosial kami untuk mendapatkan informasi terbaru dan update kegiatan BPKD Kabupaten Pekalongan.
            </p>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col items-center justify-between text-center md:flex-row">
            <div className="mb-4 text-sm text-gray-400 md:mb-0">
              <p>&copy; {currentYear} BPKD Kabupaten Pekalongan.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
