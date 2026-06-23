import { NextResponse } from 'next/server';
import { getRestaurantes } from '@/lib/data';
import type { FiltrosRestaurante, Categoria, Provincia, RangoPrecio } from '@/types/restaurant';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const filtros: FiltrosRestaurante = {
    busqueda: searchParams.get('busqueda') || undefined,
    categoria: (searchParams.get('categoria') as Categoria) || undefined,
    provincia: (searchParams.get('provincia') as Provincia) || undefined,
    rangoPrecio: (searchParams.get('precio') as RangoPrecio) || undefined,
    pagina: Number(searchParams.get('pagina') || '1'),
    porPagina: Number(searchParams.get('porPagina') || '12'),
  };

  try {
    const result = await getRestaurantes(filtros);
    return NextResponse.json(result);
  } catch (err) {
    console.error('Error fetching restaurantes:', err);
    return NextResponse.json({ data: [], total: 0 }, { status: 200 });
  }
}
