'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search, SlidersHorizontal, X, MapPin, Grid3X3, List } from 'lucide-react';
import Link from 'next/link';
import type { RestaurantCard, Categoria, Provincia, RangoPrecio } from '@/types/restaurant';
import { cn } from '@/utils/cn';

const CATEGORIAS = [
  { value: 'marisqueria', label: '🦞 Marisquerías' },
  { value: 'pulperia', label: '🐙 Pulperías' },
  { value: 'parrillada', label: '🔥 Parrilladas' },
  { value: 'taperia', label: '🍽️ Taperías' },
  { value: 'tradicional', label: '🏠 Tradicionales' },
  { value: 'cocina-moderna', label: '⭐ Cocina Moderna' },
  { value: 'bar', label: '🍺 Bares' },
  { value: 'cafeteria', label: '☕ Cafeterías' },
];

const PROVINCIAS = ['A Coruña', 'Pontevedra', 'Lugo', 'Ourense'];
const PRECIOS = [
  { value: 'economico', label: '€ Económico' },
  { value: 'moderado', label: '€€ Moderado' },
  { value: 'premium', label: '€€€ Premium' },
  { value: 'lujo', label: '€€€€ Lujo' },
];

const PRICE_MAP: Record<string, string> = { economico: '€', moderado: '€€', premium: '€€€', lujo: '€€€€' };
const CAT_LABEL: Record<string, string> = {
  marisqueria: 'Marisquería', pulperia: 'Pulpería', parrillada: 'Parrillada',
  taperia: 'Tapería', tradicional: 'Tradicional', 'cocina-moderna': 'Cocina Moderna',
  bar: 'Bar', cafeteria: 'Cafetería',
};

// Demo data for when Supabase is not configured
const DEMO: RestaurantCard[] = Array.from({ length: 12 }, (_, i) => ({
  id: String(i + 1),
  slug: `restaurante-demo-${i + 1}`,
  nombre: ['Mesón O Pote', 'Marisquería Atlántica', 'Pulpería do Mar', 'Casa Amparo', 'O Cruceiro', 'Taberna Galicia', 'Asador O Monte', 'Bar Rías', 'Cafetería Central', 'Sidrería Norte', 'Tapas Rías Baixas', 'Restaurante Faro'][i],
  descripcionCorta: 'Auténtica cocina gallega con los mejores productos de la tierra y el mar.',
  categoria: ['marisqueria', 'pulperia', 'tradicional', 'parrillada', 'taperia', 'bar', 'marisqueria', 'cafeteria', 'tradicional', 'bar', 'taperia', 'cocina-moderna'][i] as Categoria,
  localidad: ['Santiago', 'Vigo', 'Lugo', 'A Coruña', 'Pontevedra', 'Ourense', 'Ferrol', 'Vilagarcía', 'Cangas', 'Carballo', 'Betanzos', 'Lalín'][i],
  provincia: ['A Coruña', 'Pontevedra', 'Lugo', 'A Coruña', 'Pontevedra', 'Ourense', 'A Coruña', 'Pontevedra', 'Pontevedra', 'A Coruña', 'A Coruña', 'Pontevedra'][i] as Provincia,
  imagenPrincipal: `https://images.unsplash.com/photo-${['1414235077428-338989a2e8c0', '1559737558-2f5a35f4523b', '1565557623262-b51c2513a641', '1555939594-58d7cb561ad1', '1543353071-873f17a7a088', '1572116469696-31de0f17cc34', '1414235077428-338989a2e8c0', '1445116572660-236099ec97a0', '1476224203421-9ac39bcb3327', '1504674900247-0877df9cc836', '1414235077428-338989a2e8c0', '1476224203421-9ac39bcb3327'][i]}?w=600&q=75`,
  rangoPrecio: ['moderado', 'premium', 'economico', 'moderado', 'economico', 'economico', 'premium', 'economico', 'economico', 'economico', 'economico', 'lujo'][i] as RangoPrecio,
  rating: [4.7, 4.9, 4.6, 4.4, 4.3, 4.1, 4.8, 4.0, 4.2, 4.5, 4.3, 4.9][i],
  totalReviews: [234, 567, 389, 128, 92, 445, 201, 67, 156, 88, 112, 78][i],
  etiquetas: ['gallego', 'fresco'],
  destacado: i < 3,
}));

function RestaurantCardItem({ r }: { r: RestaurantCard }) {
  return (
    <Link href={`/restaurantes/${r.slug}`} className="group block">
      <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{
              backgroundImage: `url(${r.imagenPrincipal || 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=75'})`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          {r.destacado && (
            <div className="absolute top-3 left-3">
              <span className="text-[10px] font-bold bg-[#2D5016] text-white px-2.5 py-1 rounded-full">
                ★ Destacado
              </span>
            </div>
          )}
          {r.rangoPrecio && (
            <div className="absolute top-3 right-3">
              <span className="text-xs text-white/90 bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full">
                {PRICE_MAP[r.rangoPrecio]}
              </span>
            </div>
          )}
        </div>
        {/* Info */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-semibold text-[#1A1A1A] leading-tight group-hover:text-[#2D5016] transition-colors line-clamp-1">
              {r.nombre}
            </h3>
            {r.rating && (
              <span className="shrink-0 text-xs font-semibold text-[#1A1A1A] flex items-center gap-0.5">
                ★ <span className="text-amber-500">{r.rating}</span>
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-[#3D3D3D]/50 text-xs mb-2">
            <MapPin size={11} />
            <span>{r.localidad}, {r.provincia}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-[#FAF7F0] text-[#2D5016] font-medium px-2.5 py-1 rounded-full">
              {CAT_LABEL[r.categoria] || r.categoria}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export function RestaurantesDirectory() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [restaurantes, setRestaurantes] = useState<RestaurantCard[]>(DEMO);
  const [total, setTotal] = useState(DEMO.length);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const busqueda = searchParams.get('busqueda') || '';
  const categoria = searchParams.get('categoria') || '';
  const provincia = searchParams.get('provincia') || '';
  const precio = searchParams.get('precio') || '';
  const pagina = Number(searchParams.get('pagina') || '1');

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) params.set(key, value);
      else params.delete(key);
      params.set('pagina', '1');
      router.push(`/restaurantes?${params.toString()}`);
    },
    [searchParams, router]
  );

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (busqueda) params.set('busqueda', busqueda);
        if (categoria) params.set('categoria', categoria);
        if (provincia) params.set('provincia', provincia);
        if (precio) params.set('precio', precio);
        params.set('pagina', String(pagina));

        const res = await fetch(`/api/restaurantes?${params.toString()}`);
        if (res.ok) {
          const json = await res.json();
          setRestaurantes(json.data);
          setTotal(json.total);
        }
      } catch {
        // keep demo data
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [busqueda, categoria, provincia, precio, pagina]);

  const hasFilters = busqueda || categoria || provincia || precio;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-light text-[#1A1A1A] mb-2">
          Restaurantes en <span className="font-semibold">Galicia</span>
        </h1>
        <p className="text-[#3D3D3D]/60">
          {total} restaurantes encontrados
        </p>
      </div>

      {/* Search + filters bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Search */}
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3D3D3D]/40" />
          <input
            type="text"
            defaultValue={busqueda}
            placeholder="Busca por nombre, localidad..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                updateParam('busqueda', (e.target as HTMLInputElement).value);
              }
            }}
            className="w-full pl-10 pr-4 py-3 bg-white border border-black/10 rounded-xl text-sm focus:outline-none focus:border-[#2D5016] focus:ring-1 focus:ring-[#2D5016]"
          />
        </div>

        {/* Filter toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={cn(
            'flex items-center gap-2 px-5 py-3 rounded-xl border text-sm font-medium transition-all',
            showFilters || hasFilters
              ? 'bg-[#2D5016] text-white border-[#2D5016]'
              : 'bg-white text-[#3D3D3D] border-black/10 hover:border-[#2D5016]'
          )}
        >
          <SlidersHorizontal size={16} />
          Filtros
          {hasFilters && (
            <span className="w-4 h-4 rounded-full bg-white/30 text-[10px] flex items-center justify-center font-bold">
              !
            </span>
          )}
        </button>
      </div>

      {/* Expanded filters */}
      {showFilters && (
        <div className="bg-white rounded-2xl border border-black/8 p-5 mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Categoria */}
          <div>
            <label className="section-label text-[#3D3D3D]/50 block mb-2">Categoría</label>
            <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto">
              {CATEGORIAS.map((c) => (
                <button
                  key={c.value}
                  onClick={() => updateParam('categoria', categoria === c.value ? '' : c.value)}
                  className={cn(
                    'text-left text-sm px-3 py-1.5 rounded-lg transition-colors',
                    categoria === c.value
                      ? 'bg-[#2D5016] text-white'
                      : 'text-[#3D3D3D] hover:bg-[#FAF7F0]'
                  )}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Provincia */}
          <div>
            <label className="section-label text-[#3D3D3D]/50 block mb-2">Provincia</label>
            <div className="flex flex-col gap-1.5">
              {PROVINCIAS.map((p) => (
                <button
                  key={p}
                  onClick={() => updateParam('provincia', provincia === p ? '' : p)}
                  className={cn(
                    'text-left text-sm px-3 py-1.5 rounded-lg flex items-center gap-2 transition-colors',
                    provincia === p ? 'bg-[#2D5016] text-white' : 'text-[#3D3D3D] hover:bg-[#FAF7F0]'
                  )}
                >
                  <MapPin size={12} />
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Precio */}
          <div>
            <label className="section-label text-[#3D3D3D]/50 block mb-2">Precio</label>
            <div className="flex flex-col gap-1.5">
              {PRECIOS.map((p) => (
                <button
                  key={p.value}
                  onClick={() => updateParam('precio', precio === p.value ? '' : p.value)}
                  className={cn(
                    'text-left text-sm px-3 py-1.5 rounded-lg transition-colors',
                    precio === p.value ? 'bg-[#2D5016] text-white' : 'text-[#3D3D3D] hover:bg-[#FAF7F0]'
                  )}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Active filters */}
      {hasFilters && (
        <div className="flex items-center gap-2 mb-5 flex-wrap">
          <span className="text-xs text-[#3D3D3D]/50">Filtros activos:</span>
          {busqueda && (
            <button
              onClick={() => updateParam('busqueda', '')}
              className="flex items-center gap-1 text-xs bg-[#2D5016]/10 text-[#2D5016] px-3 py-1 rounded-full"
            >
              &ldquo;{busqueda}&rdquo; <X size={10} />
            </button>
          )}
          {categoria && (
            <button
              onClick={() => updateParam('categoria', '')}
              className="flex items-center gap-1 text-xs bg-[#2D5016]/10 text-[#2D5016] px-3 py-1 rounded-full"
            >
              {CAT_LABEL[categoria]} <X size={10} />
            </button>
          )}
          {provincia && (
            <button
              onClick={() => updateParam('provincia', '')}
              className="flex items-center gap-1 text-xs bg-[#2D5016]/10 text-[#2D5016] px-3 py-1 rounded-full"
            >
              {provincia} <X size={10} />
            </button>
          )}
        </div>
      )}

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
              <div className="aspect-[4/3] bg-gray-100" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-100 rounded w-3/4" />
                <div className="h-3 bg-gray-100 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {restaurantes.map((r) => (
            <RestaurantCardItem key={r.id} r={r} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {total > 12 && (
        <div className="flex justify-center gap-2 mt-12">
          {pagina > 1 && (
            <button
              onClick={() => updateParam('pagina', String(pagina - 1))}
              className="px-5 py-2.5 rounded-xl border border-black/10 text-sm hover:border-[#2D5016] hover:text-[#2D5016] transition-colors"
            >
              ← Anterior
            </button>
          )}
          <span className="px-5 py-2.5 text-sm text-[#3D3D3D]/50">
            Página {pagina} de {Math.ceil(total / 12)}
          </span>
          {pagina * 12 < total && (
            <button
              onClick={() => updateParam('pagina', String(pagina + 1))}
              className="px-5 py-2.5 rounded-xl bg-[#2D5016] text-white text-sm hover:bg-[#4A7C23] transition-colors"
            >
              Siguiente →
            </button>
          )}
        </div>
      )}
    </div>
  );
}
