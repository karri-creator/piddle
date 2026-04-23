'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Clock, BarChart3, User } from 'lucide-react';

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/history', icon: Clock, label: 'History' },
  { href: '/insights', icon: BarChart3, label: 'Insights' },
  { href: '/profile', icon: User, label: 'You' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-charcoal/10 px-4 py-2 safe-area-pb">
      <div className="max-w-md mx-auto flex justify-around items-center">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors ${
                isActive 
                  ? 'text-blue' 
                  : 'text-charcoal/40 hover:text-charcoal/60'
              }`}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-xs font-body ${isActive ? 'font-semibold' : ''}`}>
                {label}
              </span>
            </Link>
          );
        })}
        
        {/* Center Add Button */}
        <Link
          href="/new"
          className="absolute left-1/2 -translate-x-1/2 -top-6 w-14 h-14 bg-blue rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
        >
          <span className="text-white text-3xl font-light">+</span>
        </Link>
      </div>
    </nav>
  );
}
