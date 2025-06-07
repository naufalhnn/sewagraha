import { User } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { History } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import '../../css/app.css';

const MenuIcon = () => (
  <svg className="h-6 w-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
  </svg>
);
const ChevronDownIcon = () => (
  <svg className="h-4 w-4 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
  </svg>
);
const DashboardIcon = () => (
  <svg className="mr-3 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    ></path>
  </svg>
);
const LogoutIcon = () => (
  <svg className="mr-3 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
    ></path>
  </svg>
);
const LoginIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
    ></path>
  </svg>
);
const RegisterIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
    ></path>
  </svg>
);
const HomeIcon = () => (
  <svg className="mr-3 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    ></path>
  </svg>
);
const AboutIcon = () => (
  <svg className="mr-3 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
);
const VenuesIcon = () => (
  <svg className="mr-3 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-6m-8 0H3m2 0h14"
    ></path>
  </svg>
);
const ContactIcon = () => (
  <svg className="mr-3 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    ></path>
  </svg>
);

export default function Navbar() {
  const { props, url, component } = usePage<{ auth: { user: User; role: string | null } }>();
  const authUser = props.auth.user;
  const authRole = props.auth.role;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isNavbarScrolled, setIsNavbarScrolled] = useState(false);

  const userDropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleUserDropdown = () => setIsUserDropdownOpen(!isUserDropdownOpen);

  useEffect(() => {
    const handleScroll = () => setIsNavbarScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
      if (
        mobileMenuRef.current &&
        mobileMenuButtonRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        !mobileMenuButtonRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) setIsMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  const isActiveRoute = (routeName: string) => {
    const currentPath = url.split('?')[0];
    const routeMap: { [key: string]: string } = {
      home: '/',
      about: '/about',
      venues: '/venues',
      contact: '/contact',
      history: '/riwayat-pemesanan',
      dashboard: '/admin/dashboard',
    };

    try {
      const generatedUrl = route(routeName).toString();
      const origin = window.location.origin;
      const pathFromGeneratedUrl = generatedUrl.startsWith(origin) ? generatedUrl.substring(origin.length) : generatedUrl;
      return pathFromGeneratedUrl === currentPath || (routeName === 'home' && currentPath === '/');
    } catch (e) {
      console.log(e);
      return routeMap[routeName] === currentPath || (component && component.toLowerCase().includes(routeName.toLowerCase()));
    }
  };

  const navLinkClasses = (routeName: string) =>
    `nav-link px-4 py-2 text-sm font-medium transition-colors duration-200 ${isActiveRoute(routeName) ? 'active text-secondary' : 'text-secondary/80 hover:text-secondary'}`;
  const mobileNavLinkClasses = (routeName: string) =>
    `${isActiveRoute(routeName) ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'} flex items-center rounded-lg px-3 py-3 text-sm font-medium transition-colors duration-200`;

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${isNavbarScrolled ? 'bg-white/90 shadow-lg backdrop-blur-md' : 'bg-transparent'}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <Link href={route('home')} className="flex items-center py-4">
              <img className="w-10" src="/icons/LogoKabPekalongan.png" alt="Logo Kabupaten Pekalongan" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-1 md:flex">
            <Link href={route('home')} className={navLinkClasses('home')}>
              Beranda
            </Link>
            <Link href={route('about')} className={navLinkClasses('about')}>
              Tentang Kami
            </Link>
            <Link href={route('venues')} className={navLinkClasses('venues')}>
              Gedung
            </Link>
            <Link href={route('contact')} className={navLinkClasses('contact')}>
              Kontak
            </Link>
          </div>

          {/* User Actions */}
          <div className="hidden items-center space-x-3 md:flex">
            {authUser ? (
              <div className="relative" ref={userDropdownRef}>
                <button
                  onClick={toggleUserDropdown}
                  type="button"
                  className="group from-primary to-secondary flex cursor-pointer items-center space-x-2 rounded-lg bg-gradient-to-r px-3 py-1.5 text-sm font-medium text-white transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
                  aria-expanded={isUserDropdownOpen}
                  aria-haspopup="true"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-xs font-semibold text-white shadow-sm">
                    {authUser.name.substring(0, 1).toUpperCase()}
                  </div>
                  <span className="max-w-[100px] truncate">Halo, {authUser.name.split(' ')[0]}</span>
                  <span className={`transform transition-transform duration-200 ease-in-out ${isUserDropdownOpen ? 'rotate-180' : 'rotate-0'}`}>
                    <ChevronDownIcon />
                  </span>
                </button>

                <div
                  id="userDropdown"
                  className={`dark:highlight-white/5 absolute right-0 z-50 mt-2 w-60 origin-top-right rounded-xl bg-white py-1.5 shadow-xl ring-1 ring-slate-900/5 transition-all duration-150 ease-out focus:outline-none dark:bg-slate-800 dark:ring-0 ${isUserDropdownOpen ? 'scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0'}`}
                  role="menu"
                  aria-orientation="vertical"
                  tabIndex={-1}
                >
                  <div className="border-b border-slate-200/80 px-3.5 py-2.5 dark:border-slate-700/80">
                    <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">{authUser.name}</p>
                    <p className="truncate text-xs text-slate-500 dark:text-slate-400">{authUser.email}</p>
                  </div>

                  <div className="py-1">
                    {authRole == 'admin' && (
                      <>
                        <Link
                          href={route('dashboard')}
                          className="group flex w-full items-center rounded-md px-3.5 py-2 text-sm text-slate-700 transition-colors duration-150 hover:bg-slate-100 hover:text-blue-600 focus:bg-slate-100 focus:text-blue-600 focus:outline-none"
                          onClick={() => setIsUserDropdownOpen(false)}
                          role="menuitem"
                        >
                          <DashboardIcon />
                          Dashboard
                        </Link>
                      </>
                    )}
                    <Link
                      href={route('history')}
                      className="group flex w-full items-center gap-2.5 rounded-md px-3.5 py-2 text-sm text-slate-700 transition-colors duration-150 hover:bg-slate-100 hover:text-blue-600 focus:bg-slate-100 focus:text-blue-600 focus:outline-none dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-blue-400 dark:focus:bg-slate-700 dark:focus:text-blue-400"
                      onClick={() => setIsUserDropdownOpen(false)}
                      role="menuitem"
                    >
                      <History className="h-4 w-4 text-slate-500 transition-colors group-hover:text-blue-600 dark:text-slate-400 dark:group-hover:text-blue-400" />
                      Riwayat Pemesanan
                    </Link>

                    {authRole === 'admin' && <div className="my-1.5 h-px bg-slate-200/80 dark:bg-slate-700/80"></div>}

                    <Link
                      href={route('logout')}
                      method="post"
                      as="button"
                      className="group flex w-full items-center rounded-md px-3.5 py-2 text-sm text-red-600 transition-colors duration-150 hover:bg-red-50 focus:bg-red-50 focus:outline-none dark:hover:bg-red-500/10 dark:focus:bg-red-500/10"
                      onClick={() => setIsUserDropdownOpen(false)}
                      role="menuitem"
                    >
                      <LogoutIcon />
                      Logout
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href={route('login')}>
                  <button className="flex cursor-pointer items-center space-x-2 rounded-lg bg-blue-100/80 px-4 py-2 text-sm font-medium text-blue-700 shadow-sm transition duration-300 hover:bg-blue-100 hover:shadow-md dark:bg-blue-600/30 dark:text-blue-300 dark:hover:bg-blue-600/50">
                    <div className="h-4 w-4">
                      <LoginIcon />
                    </div>
                    <span>Masuk</span>
                  </button>
                </Link>
                <Link href={route('register')}>
                  <button className="from-primary/80 to-secondary/80 hover:from-primary hover:to-secondary flex cursor-pointer items-center space-x-2 rounded-lg bg-gradient-to-r px-4 py-2 text-sm font-medium text-white shadow-md transition duration-300 hover:shadow-lg">
                    <div className="h-4 w-4">
                      <RegisterIcon />
                    </div>
                    <span>Daftar</span>
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              ref={mobileMenuButtonRef}
              onClick={toggleMobileMenu}
              className="mobile-menu-button rounded-lg p-2 text-gray-600 transition-all duration-200 hover:bg-gray-100 hover:text-blue-600"
            >
              <span className={`${isMobileMenuOpen ? 'rotate-90' : ''} inline-block transform transition-transform duration-300`}>
                <MenuIcon />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`mobile-menu overflow-hidden border-t border-gray-100 bg-white/95 transition-all duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? 'max-h-screen py-2' : 'max-h-0'}`}
      >
        <div className="space-y-1 px-2">
          <Link href={route('home')} className={mobileNavLinkClasses('home')} onClick={() => setIsMobileMenuOpen(false)}>
            <HomeIcon /> Beranda
          </Link>
          <Link href={route('about')} className={mobileNavLinkClasses('about')} onClick={() => setIsMobileMenuOpen(false)}>
            <AboutIcon /> Tentang Kami
          </Link>
          <Link href={route('venues')} className={mobileNavLinkClasses('venues')} onClick={() => setIsMobileMenuOpen(false)}>
            <VenuesIcon /> Gedung
          </Link>
          <Link href={route('contact')} className={mobileNavLinkClasses('contact')} onClick={() => setIsMobileMenuOpen(false)}>
            <ContactIcon /> Kontak
          </Link>
          {/* Mobile Auth Section */}
          <div className="mt-2 border-t border-gray-200 pt-3">
            {authUser ? (
              <div className="space-y-1">
                <div className="px-3 py-1">
                  <p className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">Halo, {authUser.name.split(' ')[0]}</p>
                </div>
                {authRole === 'admin' && (
                  <Link
                    href={route('dashboard')}
                    className={`${mobileNavLinkClasses('dashboard')} text-slate-700 hover:text-blue-600`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <DashboardIcon /> Dashboard
                  </Link>
                )}

                <Link
                  href={route('history')}
                  className={`${mobileNavLinkClasses('history')} text-slate-700 hover:text-blue-600`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <History className="mr-3 h-4 w-4" /> Riwayat Pemesanan
                </Link>
                <Link
                  href={route('logout')}
                  method="post"
                  as="button"
                  className="flex w-full items-center rounded-lg px-3 py-3 text-sm text-red-600 transition-colors duration-200 hover:bg-red-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <LogoutIcon /> Logout
                </Link>
              </div>
            ) : (
              <div className="flex flex-col space-y-2 pt-2">
                <Link href={route('login')} onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="flex w-full items-center justify-center space-x-2 rounded-lg bg-blue-50 px-4 py-3 text-sm font-medium text-blue-600 transition-colors duration-200 hover:bg-blue-100">
                    <LoginIcon />
                    <span>Masuk</span>
                  </button>
                </Link>
                <Link href={route('register')} onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="flex w-full items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-3 text-sm font-medium text-white transition-colors duration-200 hover:from-blue-600 hover:to-purple-700">
                    <RegisterIcon /> <span>Daftar</span>
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
