'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ESTADOS } from '@/lib/clientes';

export default function EditarClientePage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
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

  useEffect(() => {
    setLoading(true);
    fetch(`/api/admin/clientes?id=${id}`)
      .then(r => r.json())
      .then(data => {
        if (data && !data.error) {
          setForm({
            nombre_persona: data.nombre_persona ?? '',
            nombre_comercio: data.nombre_comercio ?? '',
            correo: data.correo ?? '',
            telefono: data.telefono ?? '',
            localidad: data.localidad ?? '',
            notas: data.notas ?? '',
            estado: data.estado ?? 'pendiente',
          });
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  function set(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSaving(true);
    const res = await fetch('/api/admin/clientes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...form }),
    });
    if (!res.ok) { setError('Error al guardar.'); setSaving(false); return; }
    router.push('/admin/clientes');
    router.refresh();
  }

  async function handleDelete() {
    if (!confirm('¿Eliminar este cliente?')) return;
    setDeleting(true);
    await fetch('/api/admin/clientes', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    router.push('/admin/clientes');
    router.refresh();
  }

  const inputStyle = { width: '100%', border: '1px solid rgba(26,45,74,0.15)', borderRadius: 10, padding: '0.7rem 1rem', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' as const, color: '#1a2d4a', background: 'white' };
  const labelStyle = { display: 'block' as const, color: '#1a2d4a', fontSize: '0.78rem', fontWeight: 600 as const, marginBottom: 6, letterSpacing: '0.05em' };

  if (loading) return <div style={{ color: '#6b7a8d', padding: '2rem' }}>Cargando...</div>;

  return (
    <div style={{ maxWidth: 680 }}>
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/admin/clientes" style={{ color: '#45b0e5', fontSize: '0.85rem', textDecoration: 'none' }}>← Volver</Link>
        <h1 style={{ fontFamily: 'Lilita One, cursive', color: '#1a2d4a', fontSize: '1.8rem', margin: '0.5rem 0 0' }}>
          {form.nombre_persona || 'Editar cliente'}
        </h1>
      </div>

      {/* Selector de estado destacado */}
      <div style={{ background: 'white', borderRadius: '1rem', padding: '1.25rem 1.5rem', border: '1px solid rgba(26,45,74,0.08)', marginBottom: '1.25rem' }}>
        <p style={{ color: '#1a2d4a', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.05em', marginBottom: 12 }}>ESTADO DE LA LLAMADA</p>
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          {ESTADOS.map(e => (
            <button
              key={e.slug}
              type="button"
              onClick={() => set('estado', e.slug)}
              style={{
                background: form.estado === e.slug ? e.bg : 'transparent',
                color: form.estado === e.slug ? e.color : '#6b7a8d',
                border: `2px solid ${form.estado === e.slug ? e.color : 'rgba(26,45,74,0.1)'}`,
                borderRadius: 999,
                padding: '6px 16px',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {e.label}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ background: 'white', borderRadius: '1rem', padding: '1.75rem', border: '1px solid rgba(26,45,74,0.08)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
          <div>
            <label style={labelStyle}>NOMBRE DE LA PERSONA *</label>
            <input style={inputStyle} value={form.nombre_persona} onChange={e => set('nombre_persona', e.target.value)} required />
          </div>
          <div>
            <label style={labelStyle}>NOMBRE DEL COMERCIO</label>
            <input style={inputStyle} value={form.nombre_comercio} onChange={e => set('nombre_comercio', e.target.value)} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
          <div>
            <label style={labelStyle}>TELÉFONO</label>
            <input style={inputStyle} value={form.telefono} onChange={e => set('telefono', e.target.value)} type="tel" />
          </div>
          <div>
            <label style={labelStyle}>CORREO</label>
            <input style={inputStyle} value={form.correo} onChange={e => set('correo', e.target.value)} type="email" />
          </div>
        </div>

        <div>
          <label style={labelStyle}>LOCALIDAD</label>
          <input style={inputStyle} value={form.localidad} onChange={e => set('localidad', e.target.value)} />
        </div>

        <div>
          <label style={labelStyle}>NOTAS</label>
          <textarea
            style={{ ...inputStyle, minHeight: 100, resize: 'vertical' }}
            value={form.notas}
            onChange={e => set('notas', e.target.value)}
            placeholder="Resultado de la llamada, próximos pasos..."
          />
        </div>

        {error && (
          <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, padding: '0.6rem 1rem', color: '#dc2626', fontSize: '0.85rem' }}>
            {error}
          </div>
        )}

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between', paddingTop: 4, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              type="submit"
              disabled={saving}
              style={{ background: saving ? 'rgba(26,45,74,0.4)' : '#1a2d4a', color: 'white', border: 'none', borderRadius: 10, padding: '0.75rem 2rem', fontSize: '0.9rem', fontWeight: 600, cursor: saving ? 'not-allowed' : 'pointer' }}
            >
              {saving ? 'Guardando...' : 'Guardar cambios'}
            </button>
            <Link href="/admin/clientes" style={{ background: 'rgba(26,45,74,0.06)', color: '#1a2d4a', borderRadius: 10, padding: '0.75rem 1.5rem', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              Cancelar
            </Link>
          </div>
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            style={{ background: 'rgba(239,68,68,0.08)', color: '#dc2626', border: 'none', borderRadius: 10, padding: '0.75rem 1.5rem', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer' }}
          >
            {deleting ? 'Eliminando...' : 'Eliminar'}
          </button>
        </div>
      </form>
    </div>
  );
}
