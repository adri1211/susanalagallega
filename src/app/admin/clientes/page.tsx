import Link from 'next/link';
import { Plus, Phone, Mail, MapPin, Building2 } from 'lucide-react';
import { adminGetClientes, getEstado, ESTADOS } from '@/lib/clientes';
import { NotasPanel } from '@/components/admin/NotasPanel';

export const dynamic = 'force-dynamic';

export default async function AdminClientesPage() {
  const clientes = await adminGetClientes().catch(() => []);

  const porEstado = ESTADOS.map(e => ({
    ...e,
    count: clientes.filter(c => c.estado === e.slug).length,
  }));

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 style={{ fontFamily: 'Lilita One, cursive', color: '#1a2d4a', fontSize: '2rem', margin: 0 }}>
            Clientes
          </h1>
          <p style={{ color: '#6b7a8d', marginTop: 4, fontSize: '0.9rem' }}>
            {clientes.length} contactos en total
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <NotasPanel />
          <Link
            href="/admin/clientes/nuevo"
            className="flex items-center gap-2 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
            style={{ background: '#1a2d4a' }}
          >
            <Plus size={16} />
            Nuevo cliente
          </Link>
        </div>
      </div>

      {/* Resumen por estado */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {porEstado.map(e => (
          <div key={e.slug} style={{ background: 'white', borderRadius: '0.75rem', padding: '1rem', border: '1px solid rgba(26,45,74,0.08)', textAlign: 'center' }}>
            <p style={{ fontSize: '1.6rem', fontWeight: 700, color: '#1a2d4a', margin: 0 }}>{e.count}</p>
            <span style={{ background: e.bg, color: e.color, borderRadius: 999, padding: '2px 10px', fontSize: '0.7rem', fontWeight: 600 }}>
              {e.label}
            </span>
          </div>
        ))}
      </div>

      {/* Lista */}
      {clientes.length === 0 ? (
        <div style={{ background: 'white', borderRadius: '1rem', padding: '3rem', textAlign: 'center', border: '1px solid rgba(26,45,74,0.08)' }}>
          <p style={{ color: '#6b7a8d', fontSize: '1rem' }}>No hay clientes todavía.</p>
          <Link href="/admin/clientes/nuevo" style={{ color: '#45b0e5', fontWeight: 600, fontSize: '0.9rem' }}>
            Añadir el primero →
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {clientes.map(c => {
            const estado = getEstado(c.estado);
            return (
              <div key={c.id} style={{ background: 'white', borderRadius: '1rem', padding: '1.25rem 1.5rem', border: '1px solid rgba(26,45,74,0.08)', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                {/* Avatar */}
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#1a2d4a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '1.1rem', flexShrink: 0 }}>
                  {c.nombre_persona.charAt(0).toUpperCase()}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 700, color: '#1a2d4a', fontSize: '0.95rem' }}>{c.nombre_persona}</span>
                    <span style={{ background: estado.bg, color: estado.color, borderRadius: 999, padding: '2px 12px', fontSize: '0.72rem', fontWeight: 600 }}>
                      {estado.label}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', marginTop: 4, flexWrap: 'wrap' }}>
                    {c.nombre_comercio && (
                      <span style={{ color: '#6b7a8d', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Building2 size={12} />{c.nombre_comercio}
                      </span>
                    )}
                    {c.telefono && (
                      <span style={{ color: '#6b7a8d', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Phone size={12} />{c.telefono}
                      </span>
                    )}
                    {c.correo && (
                      <span style={{ color: '#6b7a8d', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Mail size={12} />{c.correo}
                      </span>
                    )}
                    {c.localidad && (
                      <span style={{ color: '#6b7a8d', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <MapPin size={12} />{c.localidad}
                      </span>
                    )}
                  </div>
                  {c.notas && (
                    <p style={{ color: '#9ca3af', fontSize: '0.78rem', margin: '4px 0 0', fontStyle: 'italic' }}>
                      {c.notas.slice(0, 120)}{c.notas.length > 120 ? '…' : ''}
                    </p>
                  )}
                </div>

                {/* Fecha + acción */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, flexShrink: 0 }}>
                  <span style={{ color: '#9ca3af', fontSize: '0.75rem' }}>
                    {new Date(c.created_at).toLocaleDateString('es-ES')}
                  </span>
                  <Link
                    href={`/admin/clientes/${c.id}/editar`}
                    style={{ background: '#f4f3e4', color: '#1a2d4a', borderRadius: 8, padding: '5px 14px', fontSize: '0.78rem', fontWeight: 600, textDecoration: 'none' }}
                  >
                    Ver / Editar
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
