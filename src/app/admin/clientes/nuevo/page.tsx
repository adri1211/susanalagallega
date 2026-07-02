'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NuevoClientePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    nombre_persona: '',
    nombre_comercio: '',
    correo: '',
    telefono: '',
    localidad: '',
    notas: '',
    estado: 'pendiente',
  });

  function set(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const res = await fetch('/api/admin/clientes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (!res.ok) {
      setError('Error al guardar. Inténtalo de nuevo.');
      setLoading(false);
      return;
    }
    router.push('/admin/clientes');
    router.refresh();
  }

  const inputStyle = { width: '100%', border: '1px solid rgba(26,45,74,0.15)', borderRadius: 10, padding: '0.7rem 1rem', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' as const, color: '#1a2d4a', background: 'white' };
  const labelStyle = { display: 'block' as const, color: '#1a2d4a', fontSize: '0.78rem', fontWeight: 600 as const, marginBottom: 6, letterSpacing: '0.05em' };

  return (
    <div style={{ maxWidth: 680 }}>
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/admin/clientes" style={{ color: '#45b0e5', fontSize: '0.85rem', textDecoration: 'none' }}>← Volver</Link>
        <h1 style={{ fontFamily: 'Lilita One, cursive', color: '#1a2d4a', fontSize: '1.8rem', margin: '0.5rem 0 0' }}>
          Nuevo cliente
        </h1>
      </div>

      <form onSubmit={handleSubmit} style={{ background: 'white', borderRadius: '1rem', padding: '1.75rem', border: '1px solid rgba(26,45,74,0.08)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
          <div>
            <label style={labelStyle}>NOMBRE DE LA PERSONA *</label>
            <input style={inputStyle} value={form.nombre_persona} onChange={e => set('nombre_persona', e.target.value)} required placeholder="Ej: María García" />
          </div>
          <div>
            <label style={labelStyle}>NOMBRE DEL COMERCIO</label>
            <input style={inputStyle} value={form.nombre_comercio} onChange={e => set('nombre_comercio', e.target.value)} placeholder="Ej: Restaurante O Mar" />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
          <div>
            <label style={labelStyle}>TELÉFONO</label>
            <input style={inputStyle} value={form.telefono} onChange={e => set('telefono', e.target.value)} placeholder="Ej: 600 123 456" type="tel" />
          </div>
          <div>
            <label style={labelStyle}>CORREO</label>
            <input style={inputStyle} value={form.correo} onChange={e => set('correo', e.target.value)} placeholder="Ej: info@restaurante.com" type="email" />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
          <div>
            <label style={labelStyle}>LOCALIDAD</label>
            <input style={inputStyle} value={form.localidad} onChange={e => set('localidad', e.target.value)} placeholder="Ej: Ferrol" />
          </div>
          <div>
            <label style={labelStyle}>ESTADO</label>
            <select style={inputStyle} value={form.estado} onChange={e => set('estado', e.target.value)}>
              <option value="pendiente">Pendiente</option>
              <option value="contactado">Contactado</option>
              <option value="interesado">Interesado</option>
              <option value="contratado">Contratado</option>
              <option value="rechazado">Rechazado</option>
              <option value="no_contesta">No contesta</option>
            </select>
          </div>
        </div>

        <div>
          <label style={labelStyle}>NOTAS</label>
          <textarea
            style={{ ...inputStyle, minHeight: 100, resize: 'vertical' }}
            value={form.notas}
            onChange={e => set('notas', e.target.value)}
            placeholder="Observaciones, horario de contacto, referencias..."
          />
        </div>

        {error && (
          <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, padding: '0.6rem 1rem', color: '#dc2626', fontSize: '0.85rem' }}>
            {error}
          </div>
        )}

        <div style={{ display: 'flex', gap: '1rem', paddingTop: 4 }}>
          <button
            type="submit"
            disabled={loading}
            style={{ background: loading ? 'rgba(26,45,74,0.4)' : '#1a2d4a', color: 'white', border: 'none', borderRadius: 10, padding: '0.75rem 2rem', fontSize: '0.9rem', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer' }}
          >
            {loading ? 'Guardando...' : 'Guardar cliente'}
          </button>
          <Link href="/admin/clientes" style={{ background: 'rgba(26,45,74,0.06)', color: '#1a2d4a', borderRadius: 10, padding: '0.75rem 1.5rem', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
