'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';
import { CATEGORIAS_BLOG } from '@/lib/blog';

export default function EditarPostPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    id: '', titulo: '', slug: '', extracto: '', contenido: '',
    imagen_portada: '', categoria: 'gastronomia',
    etiquetas: '', fuente_url: '', fuente_tipo: 'propio',
    destacado: false, publicado: true,
  });

  useEffect(() => {
    fetch('/api/admin/blog')
      .then(r => r.json())
      .then(({ data }) => {
        const post = data?.find((p: { id: string }) => p.id === id);
        if (post) {
          setForm({
            id: post.id,
            titulo: post.titulo || '',
            slug: post.slug || '',
            extracto: post.extracto || '',
            contenido: post.contenido || '',
            imagen_portada: post.imagen_portada || '',
            categoria: post.categoria || 'gastronomia',
            etiquetas: (post.etiquetas || []).join(', '),
            fuente_url: post.fuente_url || '',
            fuente_tipo: post.fuente_tipo || 'propio',
            destacado: post.destacado || false,
            publicado: post.publicado !== false,
          });
        }
      })
      .catch(() => setError('No se pudo cargar el post'))
      .finally(() => setLoading(false));
  }, [id]);

  const set = (field: string, value: string | boolean) =>
    setForm(f => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const payload = {
        ...form,
        etiquetas: form.etiquetas.split(',').map((t: string) => t.trim()).filter(Boolean),
      };
      const res = await fetch('/api/admin/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Error al guardar');
      router.push('/admin/blog');
    } catch {
      setError('Error al guardar. Revisa la conexión con Supabase.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('¿Eliminar esta publicación?')) return;
    try {
      await fetch(`/api/admin/blog?id=${id}`, { method: 'DELETE' });
      router.push('/admin/blog');
    } catch {
      setError('Error al eliminar');
    }
  };

  const inputStyle = { width: '100%', border: '1px solid rgba(36,59,96,0.15)', borderRadius: 10, padding: '10px 14px', fontFamily: 'Poppins, sans-serif', fontSize: '0.88rem', color: '#243b60', outline: 'none', background: 'white' };
  const labelStyle = { fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '0.75rem', color: '#6b7a8d', textTransform: 'uppercase' as const, letterSpacing: '0.1em', display: 'block', marginBottom: '0.4rem' };

  if (loading) return <div className="text-center py-16 text-[#6b7a8d]">Cargando...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/blog" className="p-2 rounded-xl hover:bg-black/5 transition-colors text-[#6b7a8d]">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-[#243b60]" style={{ fontFamily: 'Lilita One, cursive' }}>Editar publicación</h1>
            <p className="text-sm text-[#6b7a8d] mt-0.5 line-clamp-1">{form.titulo}</p>
          </div>
        </div>
        <button onClick={handleDelete} className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors">
          <Trash2 size={15} /> Eliminar
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '1.5rem', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="bg-white rounded-2xl border border-black/5 p-6">
              <div style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>Título *</label>
                <input required value={form.titulo} onChange={e => set('titulo', e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Slug (URL)</label>
                <input value={form.slug} onChange={e => set('slug', e.target.value)} style={{ ...inputStyle, background: '#f8f9fa', color: '#6b7a8d' }} />
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-black/5 p-6">
              <div style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>Extracto / Resumen</label>
                <textarea value={form.extracto} onChange={e => set('extracto', e.target.value)} style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }} />
              </div>
              <div>
                <label style={labelStyle}>Contenido completo</label>
                <textarea value={form.contenido} onChange={e => set('contenido', e.target.value)} style={{ ...inputStyle, minHeight: 260, resize: 'vertical' }} />
              </div>
            </div>
          </div>

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
                <label htmlFor="destacado" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.85rem', color: '#243b60', cursor: 'pointer' }}>Destacado</label>
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
                <input value={form.fuente_url} onChange={e => set('fuente_url', e.target.value)} style={inputStyle} type="url" />
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-black/5 p-5">
              <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, color: '#243b60', fontSize: '0.88rem', margin: '0 0 1rem' }}>Imagen</h3>
              <div style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>URL imagen de portada</label>
                <input value={form.imagen_portada} onChange={e => set('imagen_portada', e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Etiquetas (separadas por coma)</label>
                <input value={form.etiquetas} onChange={e => set('etiquetas', e.target.value)} style={inputStyle} />
              </div>
            </div>

            {error && <p style={{ fontFamily: 'Poppins, sans-serif', color: '#ef4444', fontSize: '0.82rem', background: '#fef2f2', padding: '0.75rem 1rem', borderRadius: 8 }}>{error}</p>}

            <button type="submit" disabled={saving} style={{ width: '100%', background: '#243b60', color: 'white', border: 'none', borderRadius: 12, padding: '14px', fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '0.9rem', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <Save size={16} />
              {saving ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
