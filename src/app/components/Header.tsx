'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { sanityClient, urlFor } from '@/lib/sanity';
import { useCart } from "../components/Context/Context";

interface SiteLogo {
  logo: {
    _type: 'image';
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
  alt: string;
  title: string;
}

export default function Header() {
  const [logo, setLogo] = useState<SiteLogo | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();
  const { cart } = useCart();

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "siteLogo"][0]{ logo, alt, title }`)
      .then((data) => setLogo(data));
  }, []);

  useEffect(() => {
    setIsClient(true); // Prevent hydration mismatch
  }, []);

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Newsletter', href: '/newsletter' },
    { name: 'Blog', href: '/blog' },
    { name: 'Local Spotlight', href: '/local-spotlight' },
    { name: 'Shop', href: '/shop' },
    { name: 'Advertise', href: '/advertise' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: '', href: '/cart', icon: true },
  ];

  return (
    <header className="main-header py-4 shadow-md">
      <div className="main-header-inner flex items-center justify-between relative">
        <div className="flex items-center space-x-4">
          <div className="site-logo">
            {logo?.logo && (
              <Image
                src={urlFor(logo.logo).width(120).url()}
                width={120}
                height={60}
                alt={logo.alt || 'Logo'}
              />
            )}
          </div>
          <div className="site-title">
            {logo?.title && (
              <span className="text-xl font-bold text-gray-800">{logo.title}</span>
            )}
          </div>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-4 text-sm font-medium">
          {menuItems.map((item) => {
            const isActive =
              (item.href === '/' && pathname === '/') ||
              (item.href !== '/' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  'px-3 py-1 rounded-md transition-colors duration-200 flex items-center gap-1' +
                  (isActive
                    ? ' bg-orange-500 text-white font-bold'
                    : ' text-white hover:bg-orange-400 hover:text-white')
                }
              >
                {item.icon && (
                  <div className="relative">
                    {/* Cart Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4"
                      />
                      <circle cx="7" cy="21" r="1" />
                      <circle cx="17" cy="21" r="1" />
                    </svg>

                    {/* Dot if cart has items (client only) */}
                    {isClient && cart.length > 0 && (
                      <span className="absolute -top-1 -right-1 block h-2 w-2 rounded-full bg-red-500"></span>
                    )}
                  </div>
                )}
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex items-center px-2 py-1 text-white focus:outline-none"
          onClick={() => setMobileMenuOpen((v) => !v)}
          aria-label="Open menu"
        >
          <svg
            className="h-7 w-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute right-0 top-23 bg-[#20293a] text-white rounded shadow-lg border border-gray-700 z-50 animate-fade-in min-w-[180px]">
          <nav className="flex flex-col py-4 px-6 gap-2">
            {menuItems.map((item) => {
              const isActive =
                (item.href === '/' && pathname === '/') ||
                (item.href !== '/' && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    'py-2 px-3 rounded-md transition-colors duration-200 flex items-center gap-2' +
                    (isActive
                      ? ' bg-orange-500 text-white font-bold'
                      : ' text-white hover:bg-orange-400 hover:text-white')
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.icon && (
                    <div className="relative">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4"
                        />
                        <circle cx="7" cy="21" r="1" />
                        <circle cx="17" cy="21" r="1" />
                      </svg>

                      {isClient && cart.length > 0 && (
                        <span className="absolute -top-1 -right-1 block h-2 w-2 rounded-full bg-red-500"></span>
                      )}
                    </div>
                  )}
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
