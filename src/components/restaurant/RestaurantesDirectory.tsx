'use client';

import { useState, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search, MapPin, Star, SlidersHorizontal, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import type { RestaurantCard } from '@/types/restaurant';

const CATEGORIAS = [
  { value: '', label: 'Todas' },
  { value: 'marisqueria', label: '🦞 Marisquería' },
  { value: 'pulperia', label: '🐙 Pulpería' },
  { value: 'parrillada', label: '🥩 Parrillada' },
  { value: 'taperia', label: '🍺 Tapería' },
  { value: 'tradicional', label: '🏠 Tradicional' },
  { value: 'cocina-moderna', label: '✨ Moderna' },
  { value: 'bar', label: '☕ Bar' },
  { value: 'cafeteria', label: '🥐 Cafetería' },
];

const CAT_LABEL: Record<string, string> = {
  marisqueria: 'Marisquería', pulperia: 'Pulpería', parrillada: 'Parrillada',
  taperia: 'Tapería', tradicional: 'Tradicional', 'cocina-moderna': 'Cocina Moderna',
  bar: 'Bar', cafeteria: 'Cafetería',
};

const PLACEHOLDER_IMG = '/images/original_32874.png';

function RestCard({ r }: { r: RestaurantCard }) {
  const img = r.imagenPrincipal || PLACEHOLDER_IMG;

  return (
    <Link href={`/restaurantes/${r.slug}`} className="group block">
      <article className="card-susana overflow-hidden">
        {/* Imagen */}
        <div className="relative aspect-[4/3] overflow-hidden bg-[#C7E7F4]">
          <Image
            src={img}
            alt={r.nombre}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          {r.destacado && (
            <div className="absolute top-3 left-3 bg-[#45b0e5] text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-full">
              ★ Destacado
            </div>
          )}
          <div className="absolute bottom-3 left-3 right-3">
            <span className="text-[#C7E7F4] text-[10px] font-bold uppercase tracking-wider block">
              {CAT_LABEL[r.categoria] || r.categoria}
            </span>
            <h3 className="text-white font-bold text-base leading-tight mt-0.5 line-clamp-1"
              style={{ fontFamily: 'Lilita One, cursive' }}>
              {r.nombre}
            </h3>
          </div>
        </div>
        {/* Info */}
        <div className="p-3 flex items-center justify-between">
          <div className="flex items-center gap-1 text-[#5a6a7a] text-xs">
            <MapPin size={11} className="flex-shrink-0" />
            <span className="line-clamp-1">{r.localidad}</span>
          </div>
          {r.rating && (
            <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: '#243b60' }}>
              <Star size={11} className="text-amber-400 fill-amber-400" />
              {r.rating}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}

interface Props {
  initialData: { data: RestaurantCard[]; total: number };
}

export function RestaurantesDirectory({ initialData }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [busqueda, setBusqueda] = useState(searchParams.get('q') || searchParams.get('busqueda') || '');
  const categoriaActiva = searchParams.get('categoria') || '';
  const [showFilters, setShowFilters] = useState(false);

  const navigate = useCallback((key: string, value: string) => {
    const p = new URLSearchParams(searchParams.toString());
    if (value) p.set(key, value); else p.delete(key);
    p.delete('pagina');
    router.push(`/restaurantes?${p.toString()}`);
  }, [searchParams, router]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('q', busqueda);
  };

  const { data, total } = initialData;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Cabecera */}
      <div className="mb-8">
        <p className="section-label text-[#45b0e5] mb-1">Descubre</p>
        <h1 style={{ fontFamily: 'Lilita One, cursive', color: '#243b60' }} className="text-3xl sm:text-4xl">
          {categoriaActiva ? CAT_LABEL[categoriaActiva] || categoriaActiva : 'Todos los restaurantes'}
        </h1>
        <p className="text-[#5a6a7a] text-sm mt-1">
          {total} {total === 1 ? 'restaurante' : 'restaurantes'} encontrados
        </p>
      </div>

      {/* Buscador */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-5">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#243b60]/40" />
          <input
            type="text"
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            placeholder="Busca por nombre, ciudad, tipo..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-[#243b60]/10 rounded-xl text-sm focus:outline-none focus:border-[#45b0e5] focus:ring-1 focus:ring-[#45b0e5]"
            style={{ color: '#243b60' }}
          />
        </div>
        <button type="submit" className="btn-primario px-5 py-3 rounded-xl text-sm">
          Buscar
        </button>
        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-3 bg-white border border-[#243b60]/10 rounded-xl text-sm font-semibold hover:border-[#45b0e5] transition-colors"
          style={{ color: '#243b60' }}
        >
          <SlidersHorizontal size={15} />
          Filtros
        </button>
      </form>

      {/* Filtro categorías */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIAS.map(cat => (
          <button
            key={cat.value}
            onClick={() => navigate('categoria', cat.value)}
            className={`text-xs font-semibold px-4 py-2 rounded-full transition-all ${
              categoriaActiva === cat.value
                ? 'bg-[#243b60] text-white shadow-md'
                : 'bg-white text-[#243b60] border border-[#243b60]/10 hover:border-[#45b0e5]'
            }`}
          >
            {cat.label}
          </button>
        ))}
        {(categoriaActiva || busqueda) && (
          <button
            onClick={() => { setBusqueda(''); router.push('/restaurantes'); }}
            className="flex items-center gap-1 text-xs font-semibold px-3 py-2 rounded-full bg-red-50 text-red-500 border border-red-200 hover:bg-red-100 transition-all"
          >
            <X size={12} /> Limpiar
          </button>
        )}
      </div>

      {/* Grid */}
      {data.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🍽️</div>
          <h3 className="text-xl font-bold text-[#243b60] mb-2" style={{ fontFamily: 'Lilita One, cursive' }}>
            No se encontraron restaurantes
          </h3>
          <p className="text-[#5a6a7a] text-sm mb-6">Prueba con otros filtros o términos de búsqueda.</p>
          <button onClick={() => router.push('/restaurantes')} className="btn-primario">
            Ver todos los restaurantes
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.map(r => <RestCard key={r.id} r={r} />)}
        </div>
      )}
    </div>
  );
}
