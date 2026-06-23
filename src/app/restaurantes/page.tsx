import type { Metadata } from 'next';
import { Suspense } from 'react';
import { RestaurantesDirectory } from '@/components/restaurant/RestaurantesDirectory';
import { getRestaurantes } from '@/lib/data';
import type { Categoria, Provincia, RangoPrecio } from '@/types/restaurant';

export const metadata: Metadata = {
  title: 'Restaurantes en Galicia',
  description:
    'Directorio de restaurantes recomendados por Susana La Gallega. Marisquerías, pulperías, parrilladas y mucho más en Galicia y Madrid.',
};

export const revalidate = 1800;

interface Props {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function RestaurantesPage({ searchParams }: Props) {
  const params = await searchParams;
  const pagina = Number(params.pagina || '1');

  // Fetch server-side to avoid client Supabase RLS issues
  let initialData = { data: [], total: 0 } as Awaited<ReturnType<typeof getRestaurantes>>;
  try {
    initialData = await getRestaurantes({
      categoria: (params.categoria as Categoria) || undefined,
      provincia: (params.provincia as Provincia) || undefined,
      localidad: params.localidad,
      rangoPrecio: (params.precio as RangoPrecio) || undefined,
      busqueda: params.q || params.busqueda,
      pagina,
      porPagina: 12,
    });
  } catch (e) {
    console.error('Error loading restaurantes:', e);
  }

  return (
    <div className="pt-16 min-h-screen" style={{ background: '#F4F3E4' }}>
      <Suspense fallback={
        <div className="flex items-center justify-center h-64 text-[#243b60]/40">
          Cargando restaurantes...
        </div>
      }>
        <RestaurantesDirectory initialData={initialData} />
      </Suspense>
    </div>
  );
}
