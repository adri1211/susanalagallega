import Link from 'next/link';
import { MapPin, Link2 } from 'lucide-react';

const categorias = [
  { label: 'Marisquerías', href: '/categorias/marisqueria' },
  { label: 'Pulperías', href: '/categorias/pulperia' },
  { label: 'Parrilladas', href: '/categorias/parrillada' },
  { label: 'Tradicionales', href: '/categorias/tradicional' },
  { label: 'Cocina Moderna', href: '/categorias/cocina-moderna' },
  { label: 'Taperías', href: '/categorias/taperia' },
];

const provincias = [
  { label: 'A Coruña', href: '/restaurantes?provincia=A+Coru%C3%B1a' },
  { label: 'Pontevedra', href: '/restaurantes?provincia=Pontevedra' },
  { label: 'Lugo', href: '/restaurantes?provincia=Lugo' },
  { label: 'Ourense', href: '/restaurantes?provincia=Ourense' },
];

export function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#4A7C23] flex items-center justify-center text-sm font-bold text-white">
                S
              </div>
              <span className="text-white font-semibold">Susana la Gallega</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              La guía gastronómica de referencia en Galicia. Descubre lo mejor de la cocina gallega.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/susanalagallega"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Link2 size={16} />
              </a>
              <a
                href="https://facebook.com/susanalagallega"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Link2 size={16} />
              </a>
            </div>
          </div>

          {/* Categorías */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-5 section-label tracking-widest">
              Categorías
            </h3>
            <ul className="space-y-3">
              {categorias.map((cat) => (
                <li key={cat.href}>
                  <Link
                    href={cat.href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Provincias */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-5 section-label tracking-widest">
              Por Provincia
            </h3>
            <ul className="space-y-3">
              {provincias.map((p) => (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    className="text-sm text-white/50 hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <MapPin size={12} />
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-5 section-label tracking-widest">
              Información
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'Sobre nosotros', href: '/sobre-nosotros' },
                { label: 'Añade tu restaurante', href: '/contacto' },
                { label: 'Política de privacidad', href: '/privacidad' },
                { label: 'Aviso legal', href: '/aviso-legal' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/50 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} Susana La Gallega. Todos los derechos reservados.
          </p>
          <p className="text-white/20 text-xs">
            Hecho con amor en Galicia
          </p>
        </div>
      </div>
    </footer>
  );
}
