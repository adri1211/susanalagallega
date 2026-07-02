'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard, UtensilsCrossed, FileImage, Settings,
  Menu, X, ExternalLink, ChevronRight, BookOpen, LogOut
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

const LINKS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/restaurantes', label: 'Restaurantes', icon: UtensilsCrossed },
  { href: '/admin/blog', label: 'Blog & Noticias', icon: BookOpen },
  { href: '/admin/media', label: 'Galería / Media', icon: FileImage },
  { href: '/admin/configuracion', label: 'Configuración', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function handleLogout() {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  }

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
                ? 'bg-[#1a2d4a] text-white'
                : 'text-[#1a2d4a]/60 hover:bg-[#1a2d4a]/8 hover:text-[#1a2d4a]'
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
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-[#F4F3E4] border-b border-[#1a2d4a]/10 h-14 flex items-center justify-between px-4">
        <Image src="/images/original_32849.svg" alt="Susana La Gallega" width={110} height={38} unoptimized style={{ height: 38, width: 'auto' }} />
        <button onClick={() => setOpen(!open)} className="p-2 text-[#1a2d4a]">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-30 bg-black/40" onClick={() => setOpen(false)}>
          <div
            className="absolute left-0 top-14 bottom-0 w-64 bg-[#F4F3E4] p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Nav />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 bg-[#F4F3E4] border-r border-[#1a2d4a]/10 flex-col p-5 z-30">
        {/* Logo */}
        <div className="mb-8 px-1">
          <Image
            src="/images/original_32849.svg"
            alt="Susana La Gallega"
            width={160}
            height={56}
            unoptimized
            style={{ height: 56, width: 'auto' }}
          />
          <div className="mt-2 ml-0.5 flex items-center gap-2">
            <div style={{ height: 2, width: 24, background: '#45b0e5', borderRadius: 1 }} />
            <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.65rem', fontWeight: 600, color: '#45b0e5', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Panel de administración
            </span>
          </div>
        </div>

        <Nav />

        <div className="mt-auto flex flex-col gap-2 pt-4 border-t border-[#1a2d4a]/10">
          <a
            href="/"
            target="_blank"
            className="flex items-center gap-2 text-xs text-[#1a2d4a]/40 hover:text-[#1a2d4a] transition-colors"
          >
            <ExternalLink size={13} />
            Ver web pública
          </a>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs text-red-400/60 hover:text-red-500 transition-colors w-full text-left"
          >
            <LogOut size={13} />
            Cerrar sesión
          </button>
        </div>
      </aside>
    </>
  );
}
