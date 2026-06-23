'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Star } from 'lucide-react';
import type { RestaurantCard } from '@/types/restaurant';

const CAT_LABELS: Record<string, string> = {
  marisqueria: 'Marisquería',
  pulperia: 'Pulpería',
  parrillada: 'Parrillada',
  taperia: 'Tapería',
  tradicional: 'Tradicional',
  'cocina-moderna': 'Cocina Moderna',
  bar: 'Bar',
  cafeteria: 'Cafetería',
};

const DEMO: RestaurantCard[] = [
  {
    id: '1', slug: 'meson-muino-kilowatio-cedeira-no-3583',
    nombre: 'Mesón Muíño Kilowatio', descripcionCorta: 'Gastronomía gallega en un entorno único en Cedeira',
    categoria: 'tradicional', localidad: 'Cedeira', provincia: 'A Coruña',
    imagenPrincipal: 'https://easycdn.es/4/i/meson-muino-kilowatio-cedeira_33095_cabblog.jpg',
    rangoPrecio: 'moderado', destacado: true, etiquetas: ['galicia'],
  },
  {
    id: '2', slug: 'restaurante-brisas-ferrol-no-3582',
    nombre: 'Restaurante Brisas', descripcionCorta: 'El sabor del mar en pleno Ferrol',
    categoria: 'marisqueria', localidad: 'Ferrol', provincia: 'A Coruña',
    imagenPrincipal: 'https://easycdn.es/4/i/restaurante-brisas-ferrol_33094_cabblog.jpg',
    rangoPrecio: 'moderado', destacado: false, etiquetas: ['galicia'],
  },
  {
    id: '3', slug: 'cerveceria-australian-naron-no-3581',
    nombre: 'Cervecería Australian Narón', descripcionCorta: 'Tapas y cañas con mucho ambiente en Narón',
    categoria: 'taperia', localidad: 'Narón', provincia: 'A Coruña',
    imagenPrincipal: 'https://easycdn.es/4/i/cerveceria-australian-naron_33093_cabblog.png',
    rangoPrecio: 'economico', destacado: false, etiquetas: ['galicia'],
  },
  {
    id: '4', slug: 'gastrobar-nua-no-3579',
    nombre: 'Gastrobar Nuá', descripcionCorta: 'Cocina moderna con alma gallega en Ferrol',
    categoria: 'cocina-moderna', localidad: 'Ferrol', provincia: 'A Coruña',
    imagenPrincipal: 'https://easycdn.es/4/i/gastrobar-nua_33090_cabblog.jpg',
    rangoPrecio: 'moderado', destacado: false, etiquetas: ['galicia'],
  },
  {
    id: '5', slug: 'urimare-no-3578',
    nombre: 'Urimare', descripcionCorta: 'Pescados frescos y marisco de calidad en Narón',
    categoria: 'marisqueria', localidad: 'Narón', provincia: 'A Coruña',
    imagenPrincipal: 'https://easycdn.es/4/i/urimare_33089_cabblog.jpg',
    rangoPrecio: 'moderado', destacado: false, etiquetas: ['galicia'],
  },
];

function RestCard({ r, big }: { r: RestaurantCard; big?: boolean }) {
  const imgSrc = r.imagenPrincipal || 'https://easycdn.es/4/i/original_32874.png';

  return (
    <Link
      href={`/restaurantes/${r.slug}`}
      className={`group relative block overflow-hidden rounded-2xl shadow-md ${big ? 'aspect-[3/2] md:h-full' : 'aspect-[4/3]'}`}
    >
      <Image
        src={imgSrc}
        alt={r.nombre}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 33vw"
        unoptimized
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(36,59,96,0.85) 0%, transparent 60%)' }} />

      {r.destacado && (
        <div className="absolute top-3 left-3 z-10 bg-[#45b0e5] text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-full">
          Destacado
        </div>
      )}

      <div className="absolute inset-0 z-10 flex flex-col justify-end p-4">
        <span className="text-[#C7E7F4] text-[10px] font-bold uppercase tracking-wider">
          {CAT_LABELS[r.categoria] || r.categoria}
        </span>
        <h3 className={`text-white font-bold mt-1 leading-tight ${big ? 'text-xl' : 'text-base'}`}
          style={{ fontFamily: 'Lilita One, cursive' }}>
          {r.nombre}
        </h3>
        <div className="flex items-center gap-1 text-white/60 text-xs mt-1">
          <MapPin size={11} />
          <span>{r.localidad}</span>
        </div>
        {r.rating && (
          <div className="flex items-center gap-1 mt-1.5">
            <Star size={11} className="text-amber-400 fill-amber-400" />
            <span className="text-white text-xs font-semibold">{r.rating}</span>
          </div>
        )}
      </div>
    </Link>
  );
}

export function FeaturedSection({ restaurantes }: { restaurantes: RestaurantCard[] }) {
  const items = restaurantes.length > 0 ? restaurantes.slice(0, 5) : DEMO;

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="section-label text-[#45b0e5]">Selección de Susana</span>
            <h2 className="mt-2 text-3xl sm:text-4xl" style={{ fontFamily: 'Lilita One, cursive', color: '#243b60' }}>
              Restaurantes que no te puedes perder
            </h2>
          </div>
          <Link href="/restaurantes" className="hidden sm:inline btn-secundario text-sm">
            Ver todos →
          </Link>
        </div>

        {/* Grid asimétrico */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:grid-rows-2" style={{ height: 'auto' }}>
          <div className="md:col-span-2 md:row-span-2">
            {items[0] && <RestCard r={items[0]} big />}
          </div>
          {items.slice(1, 5).map(r => (
            <div key={r.id}>
              <RestCard r={r} />
            </div>
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link href="/restaurantes" className="btn-primario">Ver todos →</Link>
        </div>
      </div>
    </section>
  );
}
