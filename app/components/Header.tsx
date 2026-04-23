'use client';

import Link from 'next/link';
import Logo from './Logo';

export default function Header() {
  return (
    <header className="bg-[var(--color-surface)] shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Logo />
        </Link>
        <nav className="flex space-x-8">
          <Link
            href="/"
            className="text-[var(--color-neutral)] hover:text-[var(--color-hero)] transition-colors font-medium"
          >
            Home
          </Link>
          <Link
            href="/friends"
            className="text-[var(--color-neutral)] hover:text-[var(--color-hero)] transition-colors font-medium"
          >
            Friends
          </Link>
          <button className="text-[var(--color-neutral)] hover:text-[var(--color-hero)] transition-colors">
            <span className="text-xl">🔔</span>
          </button>
        </nav>
      </div>
    </header>
  );
}