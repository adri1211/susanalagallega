'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MapPin, Star } from 'lucide-react';
import type { RestaurantCard } from '@/types/restaurant';

const PRICE_LABELS: Record<string, string> = {
  economico: '€',
  moderado: '€€',
  premium: '€€€',
  lujo: '€€€€',
};

const CAT_LABELS: Record<string, string> = {
  marisqueria: 'Marisquería',
  pulperia: 'Pulpería',
  parrillada: 'Parrillada',
  taperia: 'Tapería',
  tradicional: 'Tradicional',
  'cocina-moderna': 'Cocina Moderna',
  bar: 'Bar',
  cafeteria: 'Cafetería',
  sidreria: 'Sidrería',
  bodega: 'Bodega',
};

interface FeaturedSectionProps {
  restaurantes: RestaurantCard[];
}

function RestaurantCardComponent({ r, index }: { r: RestaurantCard; index: number }) {
  const isBig = index === 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className={isBig ? 'md:col-span-2 md:row-span-2' : ''}
    >
      <Link
        href={`/restaurantes/${r.slug}`}
        className={`group relative block overflow-hidden rounded-2xl card-hover bg-white shadow-sm ${
          isBig ? 'aspect-[4/3] md:aspect-auto md:h-full' : 'aspect-[4/3]'
        }`}
      >
        {/* Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{
            backgroundImage: r.imagenPrincipal
              ? `url(${r.imagenPrincipal})`
              : `url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=75)`,
          }}
        />
        <div className="absolute inset-0 hero-overlay" />

        {/* Badge */}
        {r.destacado && (
          <div className="absolute top-3 left-3 z-10">
            <span className="text-gradient-gold section-label bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full text-white text-[10px]">
              Destacado
            </span>
          </div>
        )}

        {/* Price */}
        {r.rangoPrecio && (
          <div className="absolute top-3 right-3 z-10">
            <span className="text-white/80 text-xs bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full">
              {PRICE_LABELS[r.rangoPrecio]}
            </span>
          </div>
        )}

        {/* Content */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end p-5">
          <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            {/* Category */}
            <span className="section-label text-white/60 text-[10px]">
              {CAT_LABELS[r.categoria] || r.categoria}
            </span>
            {/* Name */}
            <h3
              className={`text-white font-semibold mt-1 leading-tight ${
                isBig ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg'
              }`}
            >
              {r.nombre}
            </h3>
            {/* Location */}
            <div className="flex items-center gap-1 text-white/60 text-xs mt-1">
              <MapPin size={11} />
              <span>
                {r.localidad}, {r.provincia}
              </span>
            </div>
            {/* Rating */}
            {r.rating && (
              <div className="flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Star size={12} className="text-amber-400 fill-amber-400" />
                <span className="text-white text-xs font-medium">{r.rating}</span>
                {r.totalReviews && (
                  <span className="text-white/40 text-xs">({r.totalReviews})</span>
                )}
              </div>
            )}
            {/* Description - only on big card */}
            {isBig && r.descripcionCorta && (
              <p className="text-white/60 text-sm mt-2 line-clamp-2 hidden sm:block">
                {r.descripcionCorta}
              </p>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

// Fallback demo cards when no data
const DEMO_RESTAURANTS: RestaurantCard[] = [
  {
    id: '1', slug: 'meson-ejemplo', nombre: 'Mesón O Pote', descripcionCorta: 'Cocina gallega tradicional en el corazón de Santiago',
    categoria: 'tradicional', localidad: 'Santiago de Compostela', provincia: 'A Coruña',
    imagenPrincipal: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=75',
    rangoPrecio: 'moderado', rating: 4.7, totalReviews: 234, etiquetas: ['gallego', 'tradicional'], destacado: true,
  },
  {
    id: '2', slug: 'marisqueria-ejemplo', nombre: 'Marisquería Atlántica', descripcionCorta: 'El mejor marisco fresco de Galicia',
    categoria: 'marisqueria', localidad: 'Vigo', provincia: 'Pontevedra',
    imagenPrincipal: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=800&q=75',
    rangoPrecio: 'premium', rating: 4.9, totalReviews: 567, etiquetas: ['marisco', 'fresco'], destacado: false,
  },
  {
    id: '3', slug: 'pulperia-ejemplo', nombre: 'Pulpería do Mar', descripcionCorta: 'Pulpo á feira auténtico de tradición centenaria',
    categoria: 'pulperia', localidad: 'Lugo', provincia: 'Lugo',
    imagenPrincipal: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=75',
    rangoPrecio: 'economico', rating: 4.6, totalReviews: 389, etiquetas: ['pulpo', 'feria'], destacado: false,
  },
  {
    id: '4', slug: 'parrilla-ejemplo', nombre: 'Parrilla O Carballo', descripcionCorta: 'Carnes y pescados a la brasa sobre carbón vegetal',
    categoria: 'parrillada', localidad: 'Pontevedra', provincia: 'Pontevedra',
    imagenPrincipal: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=75',
    rangoPrecio: 'moderado', rating: 4.5, totalReviews: 178, etiquetas: ['brasa', 'carne'], destacado: false,
  },
  {
    id: '5', slug: 'taperia-ejemplo', nombre: 'Tapería Rías Baixas', descripcionCorta: 'Las mejores tapas con vino Albariño',
    categoria: 'taperia', localidad: 'A Coruña', provincia: 'A Coruña',
    imagenPrincipal: 'https://images.unsplash.com/photo-1543353071-873f17a7a088?w=800&q=75',
    rangoPrecio: 'economico', rating: 4.4, totalReviews: 92, etiquetas: ['tapas', 'albariño'], destacado: false,
  },
];

export function FeaturedSection({ restaurantes }: FeaturedSectionProps) {
  const items = restaurantes.length > 0 ? restaurantes.slice(0, 5) : DEMO_RESTAURANTS;

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="section-label text-[#2D5016] mb-3">Selección del mes</p>
            <h2 className="text-4xl lg:text-5xl font-light text-[#1A1A1A]">
              Restaurantes
              <br />
              <span className="font-semibold">que no te puedes perder</span>
            </h2>
          </div>
          <Link
            href="/restaurantes"
            className="hidden sm:inline-flex items-center gap-2 text-sm text-[#2D5016] font-medium border border-[#2D5016]/30 px-5 py-2.5 rounded-full hover:bg-[#2D5016] hover:text-white transition-all"
          >
            Ver todos →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[260px]">
          {items.map((r, i) => (
            <RestaurantCardComponent key={r.id} r={r} index={i} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/restaurantes"
            className="inline-flex items-center gap-2 text-sm text-[#2D5016] font-medium border border-[#2D5016]/30 px-6 py-3 rounded-full hover:bg-[#2D5016] hover:text-white transition-all"
          >
            Ver todos los restaurantes →
          </Link>
        </div>
      </div>
    </section>
  );
}
