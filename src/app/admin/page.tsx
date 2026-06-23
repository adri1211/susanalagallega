import { LayoutDashboard, UtensilsCrossed, TrendingUp, Plus } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

async function getAdminStats() {
  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [{ count: total }, { count: destacados }, { count: sinImagen }] = await Promise.all([
    client.from('restaurantes').select('*', { count: 'exact', head: true }),
    client.from('restaurantes').select('*', { count: 'exact', head: true }).eq('destacado', true),
    client.from('restaurantes').select('*', { count: 'exact', head: true }).is('imagen_principal', null),
  ]);

  return { total: total || 0, destacados: destacados || 0, sinImagen: sinImagen || 0 };
}

export default async function AdminDashboard() {
  const { total, destacados, sinImagen } = await getAdminStats().catch(() => ({ total: 0, destacados: 0, sinImagen: 0 }));

  const stats = [
    { label: 'Total restaurantes', value: String(total), icon: UtensilsCrossed, color: 'bg-[#243b60]' },
    { label: 'Destacados', value: String(destacados), icon: TrendingUp, color: 'bg-[#45b0e5]' },
    { label: 'Sin imagen', value: String(sinImagen), icon: LayoutDashboard, color: 'bg-amber-500' },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-[#243b60]" style={{ fontFamily: 'Lilita One, cursive' }}>Dashboard</h1>
          <p className="text-sm text-[#6b7a8d] mt-0.5">
            {new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <Link
          href="/admin/restaurantes/nuevo"
          className="flex items-center gap-2 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
          style={{ background: '#243b60' }}
        >
          <Plus size={16} />
          Nuevo restaurante
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-5 border border-black/5">
            <div className={`${stat.color} w-9 h-9 rounded-xl flex items-center justify-center mb-4`}>
              <stat.icon size={18} className="text-white" />
            </div>
            <p className="text-3xl font-bold text-[#243b60]">{stat.value}</p>
            <p className="text-sm text-[#6b7a8d] mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-2xl border border-black/5 p-6 mb-6">
        <h2 className="font-semibold text-[#243b60] mb-4">Acciones rápidas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { label: 'Añadir restaurante', href: '/admin/restaurantes/nuevo', desc: 'Crear nueva ficha de restaurante' },
            { label: 'Ver directorio', href: '/restaurantes', desc: 'Ver la web pública' },
            { label: 'Gestionar media', href: '/admin/media', desc: 'Subir imágenes y vídeos' },
            { label: 'Exportar datos', href: '/api/admin/restaurantes', desc: 'Ver datos en JSON' },
          ].map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="flex items-center justify-between p-4 border border-black/8 rounded-xl hover:border-[#45b0e5]/40 hover:bg-[#C7E7F4]/20 transition-all group"
            >
              <div>
                <p className="font-medium text-[#243b60] text-sm">{action.label}</p>
                <p className="text-xs text-[#6b7a8d] mt-0.5">{action.desc}</p>
              </div>
              <span className="text-[#6b7a8d] group-hover:text-[#45b0e5] transition-colors">→</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Link a lista de restaurantes */}
      <div className="bg-white rounded-2xl border border-black/5 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-[#243b60]">Restaurantes ({total})</h2>
          <Link href="/admin/restaurantes" className="text-sm text-[#45b0e5] font-semibold hover:underline">
            Ver todos →
          </Link>
        </div>
        <p className="text-sm text-[#6b7a8d]">
          Tienes <strong>{total} restaurantes</strong> en el directorio,{' '}
          <strong>{destacados} destacados</strong> y{' '}
          <strong>{sinImagen} sin imagen</strong>.
        </p>
      </div>
    </div>
  );
}
