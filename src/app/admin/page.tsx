import { LayoutDashboard, UtensilsCrossed, TrendingUp, Plus } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total restaurantes', value: '0', icon: UtensilsCrossed, color: 'bg-[#2D5016]' },
    { label: 'Destacados', value: '0', icon: TrendingUp, color: 'bg-[#0B3D6B]' },
    { label: 'Sin imagen', value: '0', icon: LayoutDashboard, color: 'bg-amber-500' },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-[#1A1A1A]">Dashboard</h1>
          <p className="text-sm text-[#3D3D3D]/50 mt-0.5">
            {new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <Link
          href="/admin/restaurantes/nuevo"
          className="flex items-center gap-2 bg-[#2D5016] text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-[#4A7C23] transition-colors"
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
            <p className="text-2xl font-bold text-[#1A1A1A]">{stat.value}</p>
            <p className="text-sm text-[#3D3D3D]/50 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-2xl border border-black/5 p-6">
        <h2 className="font-semibold text-[#1A1A1A] mb-4">Acciones rápidas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { label: 'Añadir restaurante', href: '/admin/restaurantes/nuevo', desc: 'Crear nueva ficha de restaurante' },
            { label: 'Ver directorio', href: '/restaurantes', desc: 'Ver la web pública', external: true },
            { label: 'Gestionar media', href: '/admin/media', desc: 'Subir imágenes y vídeos' },
            { label: 'Exportar datos', href: '/api/admin/restaurantes?export=true', desc: 'Descargar JSON con todos los datos' },
          ].map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="flex items-center justify-between p-4 border border-black/8 rounded-xl hover:border-[#2D5016]/30 hover:bg-[#FAF7F0] transition-all group"
            >
              <div>
                <p className="font-medium text-[#1A1A1A] text-sm">{action.label}</p>
                <p className="text-xs text-[#3D3D3D]/40 mt-0.5">{action.desc}</p>
              </div>
              <span className="text-[#3D3D3D]/30 group-hover:text-[#2D5016] transition-colors">→</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Setup guide */}
      <div className="mt-6 bg-[#2D5016]/5 border border-[#2D5016]/15 rounded-2xl p-6">
        <h2 className="font-semibold text-[#2D5016] mb-3">Primeros pasos</h2>
        <ol className="space-y-2 text-sm text-[#3D3D3D]/70">
          {[
            'Configura tu proyecto en Supabase y copia las credenciales en .env.local',
            'Ejecuta el schema SQL en Supabase SQL Editor (src/lib/schema.sql)',
            'Ejecuta el scraper para importar datos: npx ts-node src/utils/scraper.ts',
            'Añade imágenes y configura el CDN para optimización',
            'Despliega en Vercel conectando tu repositorio GitHub',
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="shrink-0 w-5 h-5 rounded-full bg-[#2D5016]/20 text-[#2D5016] text-[11px] font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
