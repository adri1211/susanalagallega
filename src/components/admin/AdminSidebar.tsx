'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, UtensilsCrossed, FileImage, Settings,
  Menu, X, ExternalLink, ChevronRight
} from 'lucide-react';
import { cn } from '@/utils/cn';

const LINKS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/restaurantes', label: 'Restaurantes', icon: UtensilsCrossed },
  { href: '/admin/media', label: 'Galería / Media', icon: FileImage },
  { href: '/admin/configuracion', label: 'Configuración', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const Nav = () => (
    <nav className="flex flex-col gap-1 mt-2">
      {LINKS.map((link) => {
        const active = pathname === link.href || (link.href !== '/admin' && pathname.startsWith(link.href));
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
              active
                ? 'bg-[#2D5016] text-white'
                : 'text-[#3D3D3D] hover:bg-black/5 hover:text-[#1A1A1A]'
            )}
          >
            <link.icon size={17} />
            {link.label}
            {active && <ChevronRight size={14} className="ml-auto opacity-60" />}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-black/8 h-14 flex items-center justify-between px-4">
        <span className="font-semibold text-[#1A1A1A]">Admin Panel</span>
        <button onClick={() => setOpen(!open)} className="p-2">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-30 bg-black/40" onClick={() => setOpen(false)}>
          <div
            className="absolute left-0 top-14 bottom-0 w-64 bg-white p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Nav />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-black/8 flex-col p-5 z-30">
        {/* Logo */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-lg bg-[#2D5016] flex items-center justify-center text-white text-xs font-bold">
              S
            </div>
            <span className="font-semibold text-[#1A1A1A] text-sm">Susana la Gallega</span>
          </div>
          <span className="text-[10px] text-[#3D3D3D]/40 ml-9 section-label">Panel de administración</span>
        </div>

        <Nav />

        <div className="mt-auto">
          <a
            href="/"
            target="_blank"
            className="flex items-center gap-2 text-xs text-[#3D3D3D]/50 hover:text-[#3D3D3D] transition-colors"
          >
            <ExternalLink size={13} />
            Ver web pública
          </a>
        </div>
      </aside>
    </>
  );
}
