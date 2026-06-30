'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import { CATEGORIAS_BLOG } from '@/lib/blog';

function slugify(text: string) {
  return text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function NuevoPostPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    titulo: '', slug: '', extracto: '', contenido: '',
    imagen_portada: '', categoria: 'gastronomia',
    etiquetas: '', fuente_url: '', fuente_tipo: 'propio',
    destacado: false, publicado: true,
  });

  const set = (field: string, value: string | boolean) =>
    setForm(f => ({ ...f, [field]: value }));

  const handleTitulo = (v: string) => {
    setForm(f => ({ ...f, titulo: v, slug: slugify(v) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const payload = {
        ...form,
        etiquetas: form.etiquetas.split(',').map(t => t.trim()).filter(Boolean),
      };
      const res = await fetch('/api/admin/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Error al guardar');
      router.push('/admin/blog');
    } catch (err) {
      setError('Error al guardar. Revisa la conexión con Supabase.');
    } finally {
      setSaving(false);
    }
  };

  const inputStyle = { width: '100%', border: '1px solid rgba(36,59,96,0.15)', borderRadius: 10, padding: '10px 14px', fontFamily: 'Poppins, sans-serif', fontSize: '0.88rem', color: '#243b60', outline: 'none', background: 'white' };
  const labelStyle = { fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '0.75rem', color: '#6b7a8d', textTransform: 'uppercase' as const, letterSpacing: '0.1em', display: 'block', marginBottom: '0.4rem' };

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/blog" className="p-2 rounded-xl hover:bg-black/5 transition-colors text-[#6b7a8d]">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-2xl font-semibold text-[#243b60]" style={{ fontFamily: 'Lilita One, cursive' }}>Nueva publicación</h1>
          <p className="text-sm text-[#6b7a8d] mt-0.5">Añade un nuevo post al blog</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '1.5rem', alignItems: 'start' }}>
          {/* Columna principal */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="bg-white rounded-2xl border border-black/5 p-6">
              <div style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>Título *</label>
                <input required value={form.titulo} onChange={e => handleTitulo(e.target.value)} style={inputStyle} placeholder="Título de la publicación" />
              </div>
              <div>
                <label style={labelStyle}>Slug (URL)</label>
                <input value={form.slug} onChange={e => set('slug', e.target.value)} style={{ ...inputStyle, background: '#f8f9fa', color: '#6b7a8d' }} placeholder="url-del-post" />
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-black/5 p-6">
              <div style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>Extracto / Resumen</label>
                <textarea value={form.extracto} onChange={e => set('extracto', e.target.value)} style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }} placeholder="Breve descripción que aparece en las tarjetas del blog..." />
              </div>
              <div>
                <label style={labelStyle}>Contenido completo</label>
                <textarea value={form.contenido} onChange={e => set('contenido', e.target.value)} style={{ ...inputStyle, minHeight: 260, resize: 'vertical' }} placeholder="Escribe el contenido completo del post aquí. Separa los párrafos con una línea en blanco." />
              </div>
            </div>
          </div>

          {/* Columna lateral */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="bg-white rounded-2xl border border-black/5 p-5">
              <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, color: '#243b60', fontSize: '0.88rem', margin: '0 0 1rem' }}>Publicación</h3>
              <div style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>Estado</label>
                <select value={form.publicado ? 'true' : 'false'} onChange={e => set('publicado', e.target.value === 'true')} style={inputStyle}>
                  <option value="true">Publicado</option>
                  <option value="false">Borrador</option>
                </select>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input type="checkbox" id="destacado" checked={form.destacado} onChange={e => set('destacado', e.target.checked)} style={{ width: 16, height: 16 }} />
                <label htmlFor="destacado" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.85rem', color: '#243b60', cursor: 'pointer' }}>Destacado en homepage</label>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-black/5 p-5">
              <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, color: '#243b60', fontSize: '0.88rem', margin: '0 0 1rem' }}>Categoría</h3>
              <select value={form.categoria} onChange={e => set('categoria', e.target.value)} style={inputStyle}>
                {CATEGORIAS_BLOG.map(c => (
                  <option key={c.slug} value={c.slug}>{c.label}</option>
                ))}
              </select>
            </div>

            <div className="bg-white rounded-2xl border border-black/5 p-5">
              <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, color: '#243b60', fontSize: '0.88rem', margin: '0 0 1rem' }}>Fuente original</h3>
              <div style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>Red / Medio</label>
                <select value={form.fuente_tipo} onChange={e => set('fuente_tipo', e.target.value)} style={inputStyle}>
                  <option value="propio">Artículo propio</option>
                  <option value="facebook">Facebook</option>
                  <option value="instagram">Instagram</option>
                  <option value="youtube">YouTube</option>
                  <option value="web">Web / Prensa</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>URL del enlace original</label>
                <input value={form.fuente_url} onChange={e => set('fuente_url', e.target.value)} style={inputStyle} placeholder="https://..." type="url" />
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-black/5 p-5">
              <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, color: '#243b60', fontSize: '0.88rem', margin: '0 0 1rem' }}>Imagen</h3>
              <div style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>URL de imagen de portada</label>
                <input value={form.imagen_portada} onChange={e => set('imagen_portada', e.target.value)} style={inputStyle} placeholder="https://... o /images/..." />
              </div>
              <div>
                <label style={labelStyle}>Etiquetas (separadas por coma)</label>
                <input value={form.etiquetas} onChange={e => set('etiquetas', e.target.value)} style={inputStyle} placeholder="gastronomia, galicia, vino" />
              </div>
            </div>

            {error && <p style={{ fontFamily: 'Poppins, sans-serif', color: '#ef4444', fontSize: '0.82rem', background: '#fef2f2', padding: '0.75rem 1rem', borderRadius: 8 }}>{error}</p>}

            <button type="submit" disabled={saving} style={{ width: '100%', background: '#243b60', color: 'white', border: 'none', borderRadius: 12, padding: '14px', fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '0.9rem', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <Save size={16} />
              {saving ? 'Guardando...' : 'Publicar post'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
