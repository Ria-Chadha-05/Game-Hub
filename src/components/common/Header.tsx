'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';

const navLinks = [
  { id: 'nav_home', label: 'Home', href: '/homepage' },
  { id: 'nav_tictactoe', label: 'Tic Tac Toe', href: '/tic-tac-toe' },
  { id: 'nav_snake', label: 'Snake', href: '/snake-game' },
  { id: 'nav_whack', label: 'Whack A Mole', href: '/whack-a-mole' },
  { id: 'nav_memory', label: 'Memory Cards', href: '/memory-cards' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link href="/homepage" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Icon name="SparklesIcon" size={24} className="text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">Game Hub</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className={`text-sm font-medium transition-colors relative group ${
                  pathname === link.href ? 'text-white' : 'text-white/60 hover:text-white'
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
            ))}
          </nav>

          <button className="md:hidden w-10 h-10 flex items-center justify-center text-white">
            <Icon name="Bars3Icon" size={24} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
