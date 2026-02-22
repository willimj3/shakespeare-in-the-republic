'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Dashboard' },
  { href: '/explorer', label: 'Explorer' },
  { href: '/visualizations', label: 'Visualizations' },
  { href: '/methodology', label: 'Methodology' },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-navy text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-gold font-serif text-xl font-bold">S&times;F</span>
            <span className="hidden sm:inline text-sm font-sans text-navy-100">
              Shakespeare &amp; The Federalist
            </span>
          </Link>
          <div className="flex gap-1 sm:gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded text-sm font-sans transition-colors ${
                  pathname === link.href
                    ? 'bg-gold text-navy-800 font-semibold'
                    : 'text-navy-100 hover:bg-navy-400 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
