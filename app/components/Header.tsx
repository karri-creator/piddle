'use client';

import Link from 'next/link';
import Logo from './Logo';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  
  return (
    <header className="bg-white">
      <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Logo variant="header" />
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className={`font-body font-semibold text-sm transition-colors ${
              pathname === '/' 
                ? 'text-[var(--color-primary)]' 
                : 'text-black/60 hover:text-[var(--color-primary)]'
            }`}
          >
            Streaks
          </Link>
          <Link
            href="/friends"
            className={`font-body font-semibold text-sm transition-colors ${
              pathname === '/friends' 
                ? 'text-[var(--color-primary)]' 
                : 'text-black/60 hover:text-[var(--color-primary)]'
            }`}
          >
            Friends
          </Link>
          <button 
            className="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-heading font-bold text-sm"
            aria-label="Profile"
          >
            K
          </button>
        </nav>
      </div>
    </header>
  );
}
