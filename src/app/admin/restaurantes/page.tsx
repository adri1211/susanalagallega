import Link from 'next/link';
import { Plus } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const CAT_LABEL: Record<string, string> = {
  marisqueria: 'Marisquería', pulperia: 'Pulpería', parrillada: 'Parrillada',
  taperia: 'Tapería', tradicional: 'Tradicional', 'cocina-moderna': 'Moderna',
  bar: 'Bar', cafeteria: 'Cafetería',
};

async function getRestaurantes() {
  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data } = await client
    .from('restaurantes')
    .select('id,slug,nombre,categoria,localidad,provincia,activo,destacado,imagen_principal')
    .order('nombre', { ascending: true });
  return data || [];
}

export default async function AdminRestaurantesPage() {
  const restaurantes = await getRestaurantes().catch(() => []);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-[#243b60]" style={{ fontFamily: 'Lilita One, cursive' }}>
            Restaurantes
          </h1>
          <p className="text-sm text-[#6b7a8d]">{restaurantes.length} fichas en total</p>
        </div>
        <Link
          href="/admin/restaurantes/nuevo"
          className="flex items-center gap-2 text-white px-4 py-2.5 rounded-xl text-sm font-medium"
          style={{ background: '#243b60' }}
        >
          <Plus size={16} />
          Nuevo
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-black/5 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-black/5 bg-[#F4F3E4]/50">
            <tr>
              <th className="text-left px-5 py-3.5 text-xs font-bold text-[#243b60]/50 uppercase tracking-wider">Nombre</th>
              <th className="text-left px-5 py-3.5 text-xs font-bold text-[#243b60]/50 uppercase tracking-wider hidden md:table-cell">Categoría</th>
              <th className="text-left px-5 py-3.5 text-xs font-bold text-[#243b60]/50 uppercase tracking-wider hidden lg:table-cell">Localidad</th>
              <th className="text-left px-5 py-3.5 text-xs font-bold text-[#243b60]/50 uppercase tracking-wider">Estado</th>
              <th className="px-5 py-3.5" />
            </tr>
          </thead>
          <tbody className="divide-y divide-black/4">
            {restaurantes.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-16 text-center text-[#6b7a8d] text-sm">
                  <p className="text-4xl mb-3">🍽️</p>
                  <p>No hay restaurantes todavía</p>
                </td>
              </tr>
            ) : (
              restaurantes.map((r) => (
                <tr key={r.id} className="hover:bg-[#F4F3E4]/40 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {r.imagen_principal ? (
                        <img src={r.imagen_principal} alt="" className="w-9 h-9 rounded-lg object-cover flex-shrink-0" />
                      ) : (
                        <div className="w-9 h-9 rounded-lg bg-[#C7E7F4] flex items-center justify-center flex-shrink-0 text-base">🍽️</div>
                      )}
                      <div>
                        <p className="font-semibold text-[#243b60]">{r.nombre}</p>
                        {r.destacado && (
                          <span className="text-[10px] font-bold text-[#45b0e5] uppercase tracking-wider">★ Destacado</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-[#6b7a8d] hidden md:table-cell">
                    {CAT_LABEL[r.categoria] || r.categoria}
                  </td>
                  <td className="px-5 py-4 text-[#6b7a8d] hidden lg:table-cell">
                    {r.localidad}, {r.provincia}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
                      r.activo ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${r.activo ? 'bg-emerald-500' : 'bg-red-400'}`} />
                      {r.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      href={`/restaurantes/${r.slug}`}
                      className="text-xs font-semibold text-[#45b0e5] hover:underline"
                    >
                      Ver ficha →
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
