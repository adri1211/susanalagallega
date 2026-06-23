import Link from 'next/link';
import { Plus, Search } from 'lucide-react';

export default function AdminRestaurantesPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-[#1A1A1A]">Restaurantes</h1>
          <p className="text-sm text-[#3D3D3D]/50">Gestiona todas las fichas</p>
        </div>
        <Link
          href="/admin/restaurantes/nuevo"
          className="flex items-center gap-2 bg-[#2D5016] text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-[#4A7C23] transition-colors"
        >
          <Plus size={16} />
          Nuevo
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3D3D3D]/40" />
        <input
          type="text"
          placeholder="Buscar restaurantes..."
          className="w-full pl-10 pr-4 py-3 bg-white border border-black/10 rounded-xl text-sm focus:outline-none focus:border-[#2D5016]"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-black/5 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-black/5">
            <tr>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-[#3D3D3D]/50 section-label">Nombre</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-[#3D3D3D]/50 section-label hidden md:table-cell">Categoría</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-[#3D3D3D]/50 section-label hidden lg:table-cell">Localidad</th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-[#3D3D3D]/50 section-label">Estado</th>
              <th className="px-5 py-3.5" />
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={5} className="px-5 py-16 text-center text-[#3D3D3D]/40 text-sm">
                <div className="flex flex-col items-center gap-3">
                  <span className="text-4xl">🍽️</span>
                  <p>No hay restaurantes todavía</p>
                  <Link
                    href="/admin/restaurantes/nuevo"
                    className="text-[#2D5016] font-medium text-sm hover:underline"
                  >
                    Crear el primero →
                  </Link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
