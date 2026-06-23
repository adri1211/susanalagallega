'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ArrowRight } from 'lucide-react';
import type { RestaurantCard } from '@/types/restaurant';

const CAT_LABELS: Record<string, string> = {
  marisqueria: 'Marisquería', pulperia: 'Pulpería', parrillada: 'Parrillada',
  taperia: 'Tapería', tradicional: 'Tradicional', 'cocina-moderna': 'Cocina Moderna',
  bar: 'Bar', cafeteria: 'Cafetería',
};

const DEMO: RestaurantCard[] = [
  {
    id: '1', slug: 'meson-muino-kilowatio-cedeira-no-3583',
    nombre: 'Mesón Muíño Kilowatio', descripcionCorta: 'Un rincón único en Cedeira donde la cocina gallega se convierte en experiencia',
    categoria: 'tradicional', localidad: 'Cedeira', provincia: 'A Coruña',
    imagenPrincipal: 'https://easycdn.es/4/i/meson-muino-kilowatio-cedeira_33095_cabblog.jpg',
    rangoPrecio: 'moderado', destacado: true, etiquetas: [],
  },
  {
    id: '2', slug: 'restaurante-brisas-ferrol-no-3582',
    nombre: 'Restaurante Brisas', descripcionCorta: 'El sabor del Atlántico en pleno Ferrol',
    categoria: 'marisqueria', localidad: 'Ferrol', provincia: 'A Coruña',
    imagenPrincipal: 'https://easycdn.es/4/i/restaurante-brisas-ferrol_33094_cabblog.jpg',
    rangoPrecio: 'moderado', destacado: false, etiquetas: [],
  },
  {
    id: '3', slug: 'cerveceria-australian-naron-no-3581',
    nombre: 'Cervecería Australian Narón', descripcionCorta: 'Tapas y ambiente en Narón',
    categoria: 'taperia', localidad: 'Narón', provincia: 'A Coruña',
    imagenPrincipal: 'https://easycdn.es/4/i/cerveceria-australian-naron_33093_cabblog.png',
    rangoPrecio: 'economico', destacado: false, etiquetas: [],
  },
  {
    id: '4', slug: 'gastrobar-nua-no-3579',
    nombre: 'Gastrobar Nuá', descripcionCorta: 'Cocina de autor con raíces gallegas',
    categoria: 'cocina-moderna', localidad: 'Ferrol', provincia: 'A Coruña',
    imagenPrincipal: 'https://easycdn.es/4/i/gastrobar-nua_33090_cabblog.jpg',
    rangoPrecio: 'moderado', destacado: false, etiquetas: [],
  },
];

function CardGrande({ r }: { r: RestaurantCard }) {
  return (
    <Link href={`/restaurantes/${r.slug}`} className="group relative block h-full min-h-[420px] rounded-2xl overflow-hidden shadow-lg">
      <Image
        src={r.imagenPrincipal || '/images/original_32874.png'}
        alt={r.nombre}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 55vw"
        unoptimized
      />
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(to top, rgba(36,59,96,0.95) 0%, rgba(36,59,96,0.4) 50%, transparent 100%)'
      }} />
      {r.destacado && (
        <div className="absolute top-4 left-4 bg-[#45b0e5] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
          ★ Destacado
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <p className="text-[#45b0e5] text-xs font-bold uppercase tracking-widest mb-2">
          {CAT_LABELS[r.categoria] || r.categoria}
        </p>
        <h3 className="text-white text-2xl sm:text-3xl mb-2 leading-tight" style={{ fontFamily: 'Lilita One, cursive' }}>
          {r.nombre}
        </h3>
        <p className="text-white/65 text-sm mb-4 line-clamp-2">{r.descripcionCorta}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-white/60 text-xs">
            <MapPin size={12} />
            <span>{r.localidad}</span>
          </div>
          <span className="text-[#45b0e5] text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
            Ver más <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}

function CardPequena({ r }: { r: RestaurantCard }) {
  return (
    <Link href={`/restaurantes/${r.slug}`} className="group flex gap-4 items-center p-3 rounded-2xl transition-all hover:bg-[#C7E7F4]/30">
      <div className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-[#C7E7F4]">
        <Image
          src={r.imagenPrincipal || '/images/original_32874.png'}
          alt={r.nombre}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="80px"
          unoptimized
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[#45b0e5] text-[10px] font-bold uppercase tracking-wider mb-0.5">
          {CAT_LABELS[r.categoria] || r.categoria}
        </p>
        <h3 className="font-bold text-sm text-[#243b60] line-clamp-1 group-hover:text-[#45b0e5] transition-colors"
          style={{ fontFamily: 'Lilita One, cursive' }}>
          {r.nombre}
        </h3>
        <div className="flex items-center gap-1 text-[#5a6a7a] text-xs mt-1">
          <MapPin size={10} />
          <span>{r.localidad}</span>
        </div>
      </div>
      <ArrowRight size={14} className="text-[#243b60]/30 group-hover:text-[#45b0e5] transition-colors flex-shrink-0" />
    </Link>
  );
}

export function FeaturedSection({ restaurantes }: { restaurantes: RestaurantCard[] }) {
  const items = restaurantes.length > 0 ? restaurantes : DEMO;
  const [principal, ...resto] = items;

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="section-label text-[#45b0e5] mb-1">Selección de Susana</p>
            <h2 className="text-3xl sm:text-4xl" style={{ fontFamily: 'Lilita One, cursive', color: '#243b60' }}>
              Restaurantes que<br />no te puedes perder
            </h2>
          </div>
          <Link href="/restaurantes" className="hidden sm:flex items-center gap-2 text-sm font-bold text-[#243b60] hover:text-[#45b0e5] transition-colors">
            Ver todos <ArrowRight size={16} />
          </Link>
        </div>

        {/* Layout revista */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Card grande — 3 columnas */}
          <div className="md:col-span-3">
            {principal && <CardGrande r={principal} />}
          </div>

          {/* Lista lateral — 2 columnas */}
          <div className="md:col-span-2 flex flex-col justify-between gap-2">
            <div className="mb-4">
              <p className="text-xs font-bold text-[#243b60]/40 uppercase tracking-widest mb-3">También te recomendamos</p>
              <div className="space-y-1">
                {resto.slice(0, 3).map(r => <CardPequena key={r.id} r={r} />)}
              </div>
            </div>

            {/* Mini CTA */}
            <div className="rounded-2xl p-5 text-center" style={{ background: '#C7E7F4' }}>
              <p className="text-[#243b60] font-bold text-sm mb-1" style={{ fontFamily: 'Lilita One, cursive' }}>
                ¿Buscas algo concreto?
              </p>
              <p className="text-[#243b60]/60 text-xs mb-3">Filtra por tipo, ciudad o precio</p>
              <Link href="/restaurantes" className="btn-primario text-xs py-2 px-4">
                Ver directorio completo →
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 text-center sm:hidden">
          <Link href="/restaurantes" className="btn-primario">Ver todos los restaurantes →</Link>
        </div>
      </div>
    </section>
  );
}
