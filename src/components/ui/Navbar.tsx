'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Saboreando con Susana', href: '/saboreando-con-susana' },
  { label: '¿Qué te apetece comer hoy?', href: '/restaurantes' },
  { label: 'Colaboraciones', href: '/colaboraciones' },
  { label: 'Contacto', href: '/contacto' },
];

const HERO_PAGES = ['/'];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = HERO_PAGES.includes(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const solid = scrolled || menuOpen || !isHome;
  const showLargeLogo = isHome && !scrolled && !menuOpen;

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 40,
      transition: 'all 0.4s ease',
      background: solid ? 'white' : 'transparent',
      boxShadow: solid ? '0 1px 24px rgba(0,0,0,0.08)' : 'none',
    }}>
      {/* ── LOGO GRANDE (solo homepage antes de scroll) ── */}
      {showLargeLogo && (
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '1.25rem', paddingBottom: '0.5rem' }}>
          <Link href="/">
            <Image src="/images/original_32849.svg" alt="Susana La Gallega" width={320} height={110} priority unoptimized style={{ height: 110, width: 'auto', filter: 'brightness(0) invert(1) drop-shadow(0 4px 24px rgba(69,176,229,0.35))' }} />
          </Link>
        </div>
      )}

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: showLargeLogo ? 'center' : 'space-between', height: showLargeLogo ? 60 : 76, transition: 'height 0.3s' }}>

          {/* Logo compacto (en scroll o páginas internas) */}
          {!showLargeLogo && (
            <Link href="/" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              <Image src="/images/original_32849.svg" alt="Susana La Gallega" width={160} height={54} priority unoptimized style={{ height: 54, width: 'auto', transition: 'all 0.3s' }} />
            </Link>
          )}

          {/* Nav desktop */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: showLargeLogo ? '2rem' : '1.5rem' }} className="hide-mobile">
            {NAV_LINKS.map(link => (
              <Link key={link.href} href={link.href} style={{
                fontSize: '0.82rem', fontWeight: 700, textDecoration: 'none', transition: 'color 0.2s',
                color: solid ? '#243b60' : 'rgba(255,255,255,0.9)',
                letterSpacing: '0.01em',
                borderBottom: pathname === link.href ? '2px solid #45b0e5' : '2px solid transparent',
                paddingBottom: 2,
              }}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Burger móvil */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="show-mobile"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, color: solid ? '#243b60' : 'white', marginLeft: showLargeLogo ? 0 : 'auto' }}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menú móvil */}
        {menuOpen && (
          <div style={{ background: 'white', borderTop: '1px solid rgba(36,59,96,0.08)', padding: '1rem 0' }}>
            {NAV_LINKS.map(link => (
              <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
                style={{ display: 'block', padding: '0.75rem 1rem', fontWeight: 700, fontSize: '0.9rem', color: pathname === link.href ? '#45b0e5' : '#243b60', textDecoration: 'none', borderRadius: '0.5rem' }}>
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .hide-mobile { display: flex !important; }
        .show-mobile { display: none !important; }
        @media(max-width: 768px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
