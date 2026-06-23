'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Search, MapPin } from 'lucide-react';
import { cn } from '@/utils/cn';

const navLinks = [
  { label: 'Restaurantes', href: '/restaurantes' },
  { label: 'Categorías', href: '/categorias' },
  { label: 'Mapa', href: '/mapa' },
  { label: 'Rutas', href: '/rutas' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-[#FAF7F0]/95 backdrop-blur-md shadow-sm border-b border-black/5'
          : 'bg-transparent'
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 lg:h-20 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div
            className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors',
              scrolled ? 'bg-[#2D5016] text-white' : 'bg-white/20 text-white'
            )}
          >
            S
          </div>
          <span
            className={cn(
              'font-semibold text-base tracking-tight transition-colors',
              scrolled ? 'text-[#1A1A1A]' : 'text-white'
            )}
          >
            Susana<span className="font-light"> la Gallega</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors hover:opacity-70',
                scrolled ? 'text-[#3D3D3D]' : 'text-white/90'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/restaurantes?busqueda="
            className={cn(
              'p-2 rounded-full transition-all hover:scale-110',
              scrolled ? 'text-[#3D3D3D] hover:bg-black/5' : 'text-white hover:bg-white/15'
            )}
          >
            <Search size={18} />
          </Link>
          <Link
            href="/mapa"
            className={cn(
              'flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full border transition-all',
              scrolled
                ? 'border-[#2D5016] text-[#2D5016] hover:bg-[#2D5016] hover:text-white'
                : 'border-white/40 text-white hover:bg-white/15'
            )}
          >
            <MapPin size={14} />
            Ver mapa
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className={cn(
            'lg:hidden p-2 rounded-lg transition-colors',
            scrolled ? 'text-[#1A1A1A]' : 'text-white'
          )}
          aria-label="Menú"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-[#FAF7F0] border-t border-black/5 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-[#1A1A1A] font-medium py-2 border-b border-black/5 last:border-0"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/restaurantes"
              onClick={() => setOpen(false)}
              className="mt-2 bg-[#2D5016] text-white text-center py-3 rounded-xl font-medium"
            >
              Buscar restaurantes
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
