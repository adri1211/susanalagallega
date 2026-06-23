import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

const CATEGORIAS: Record<string, { nombre: string; descripcion: string; emoji: string }> = {
  marisqueria: { nombre: 'Marisquerías', descripcion: 'El mejor marisco gallego fresco del Atlántico', emoji: '🦞' },
  pulperia: { nombre: 'Pulperías', descripcion: 'El auténtico pulpo á feira gallego', emoji: '🐙' },
  parrillada: { nombre: 'Parrilladas', descripcion: 'Carnes y pescados a la brasa perfecta', emoji: '🔥' },
  taperia: { nombre: 'Taperías', descripcion: 'Las mejores tapas y raciones gallegas', emoji: '🍽️' },
  tradicional: { nombre: 'Restaurantes Tradicionales', descripcion: 'Cocina gallega de toda la vida', emoji: '🏠' },
  'cocina-moderna': { nombre: 'Cocina Moderna', descripcion: 'Vanguardia con producto gallego', emoji: '⭐' },
  bar: { nombre: 'Bares', descripcion: 'El ambiente gallego en su máxima expresión', emoji: '🍺' },
  cafeteria: { nombre: 'Cafeterías', descripcion: 'Desayunos y meriendas de Galicia', emoji: '☕' },
};

interface Props {
  params: Promise<{ categoria: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoria } = await params;
  const cat = CATEGORIAS[categoria];
  if (!cat) return { title: 'Categoría no encontrada' };
  return {
    title: `${cat.nombre} en Galicia`,
    description: `${cat.descripcion}. Encuentra las mejores ${cat.nombre.toLowerCase()} de Galicia en Susana La Gallega.`,
  };
}

export default async function CategoriaPage({ params }: Props) {
  const { categoria } = await params;
  const cat = CATEGORIAS[categoria];
  if (!cat) notFound();

  return (
    <div className="pt-20 min-h-screen bg-[#FAF7F0]">
      {/* Hero */}
      <div className="bg-[#1A1A1A] py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1.5 text-white/40 text-xs mb-6">
            <Link href="/" className="hover:text-white/70 transition-colors">Inicio</Link>
            <ChevronRight size={13} />
            <Link href="/restaurantes" className="hover:text-white/70 transition-colors">Restaurantes</Link>
            <ChevronRight size={13} />
            <span className="text-white/70">{cat.nombre}</span>
          </div>
          <span className="text-5xl mb-4 block">{cat.emoji}</span>
          <h1 className="text-4xl lg:text-5xl font-light text-white mb-3">
            <span className="font-semibold">{cat.nombre}</span>
            <br />
            <span className="text-white/50 text-2xl lg:text-3xl">en Galicia</span>
          </h1>
          <p className="text-white/50 text-base max-w-xl">{cat.descripcion}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Suspense fallback={<div className="text-center py-16 text-[#3D3D3D]/40">Cargando...</div>}>
          <RestaurantesPorCategoria categoria={categoria} />
        </Suspense>
      </div>
    </div>
  );
}

async function RestaurantesPorCategoria({ categoria }: { categoria: string }) {
  let restaurantes: Awaited<ReturnType<typeof import('@/lib/data').getRestaurantes>>['data'] = [];
  try {
    const { getRestaurantes } = await import('@/lib/data');
    const result = await getRestaurantes({ categoria: categoria as never, porPagina: 24 });
    restaurantes = result.data;
  } catch {
    // show empty state
  }

  if (restaurantes.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-5xl mb-4">🍽️</p>
        <p className="text-[#3D3D3D]/50">Próximamente restaurantes en esta categoría</p>
        <Link href="/restaurantes" className="mt-4 inline-block text-[#2D5016] text-sm hover:underline">
          Ver todos los restaurantes →
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {restaurantes.map((r) => (
        <Link key={r.id} href={`/restaurantes/${r.slug}`} className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-1 duration-300">
          <div
            className="aspect-[4/3] bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
            style={{ backgroundImage: `url(${r.imagenPrincipal || 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600'})` }}
          />
          <div className="p-4">
            <h3 className="font-semibold text-[#1A1A1A] text-sm line-clamp-1">{r.nombre}</h3>
            <p className="text-[#3D3D3D]/50 text-xs mt-0.5">{r.localidad}, {r.provincia}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
