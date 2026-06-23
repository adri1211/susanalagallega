'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const CATEGORIAS = [
  { value: 'marisqueria', label: 'Marisquería' },
  { value: 'pulperia', label: 'Pulpería' },
  { value: 'parrillada', label: 'Parrillada' },
  { value: 'taperia', label: 'Tapería' },
  { value: 'tradicional', label: 'Tradicional' },
  { value: 'cocina-moderna', label: 'Cocina Moderna' },
  { value: 'bar', label: 'Bar' },
  { value: 'cafeteria', label: 'Cafetería' },
];

function Field({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[#3D3D3D]/60 mb-1.5 section-label">
        {label}{required && ' *'}
      </label>
      {children}
    </div>
  );
}

const inputClass = 'w-full px-3.5 py-2.5 bg-white border border-black/12 rounded-xl text-sm focus:outline-none focus:border-[#2D5016] focus:ring-1 focus:ring-[#2D5016]/30 transition-all';

export default function NuevoRestaurantePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [form, setForm] = useState({
    nombre: '',
    slug: '',
    categoria: 'tradicional',
    descripcionCorta: '',
    descripcionLarga: '',
    experiencia: '',
    quePedir: '',
    porQueVisitar: '',
    loQueLoHaceUnico: '',
    direccion: '',
    localidad: '',
    provincia: 'A Coruña',
    telefono: '',
    email: '',
    web: '',
    instagram: '',
    facebook: '',
    rangoPrecio: 'moderado',
    destacado: false,
    activo: true,
  });

  const update = (key: string, value: string | boolean) =>
    setForm((f) => ({ ...f, [key]: value }));

  function generateSlug(nombre: string) {
    return nombre
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  }

  async function generateDescription() {
    if (!form.nombre || !form.categoria || !form.localidad) {
      alert('Completa nombre, categoría y localidad para generar la descripción');
      return;
    }
    setGenerating(true);
    try {
      const res = await fetch('/api/admin/restaurantes/generate-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: form.nombre, categoria: form.categoria, localidad: form.localidad }),
      });
      if (res.ok) {
        const { descripcion } = await res.json();
        update('descripcionLarga', descripcion);
      }
    } catch {
      alert('Error al generar descripción. Configura ANTHROPIC_API_KEY en .env.local');
    } finally {
      setGenerating(false);
    }
  }

  async function handleSave() {
    if (!form.nombre || !form.categoria) {
      alert('Nombre y categoría son obligatorios');
      return;
    }
    setSaving(true);
    try {
      const slug = form.slug || generateSlug(form.nombre);
      const res = await fetch('/api/admin/restaurantes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, slug }),
      });
      if (res.ok) {
        router.push('/admin/restaurantes');
      } else {
        alert('Error al guardar. Verifica la configuración de Supabase.');
      }
    } catch {
      alert('Error al guardar.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Link href="/admin/restaurantes" className="p-2 rounded-xl hover:bg-black/5 transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-[#1A1A1A]">Nuevo restaurante</h1>
            <p className="text-sm text-[#3D3D3D]/50">Completa la ficha del restaurante</p>
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-[#2D5016] text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-[#4A7C23] transition-colors disabled:opacity-50"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          Guardar
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Información básica */}
          <div className="bg-white rounded-2xl border border-black/5 p-6 space-y-4">
            <h2 className="font-semibold text-[#1A1A1A]">Información básica</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Nombre" required>
                <input
                  type="text"
                  value={form.nombre}
                  onChange={(e) => {
                    update('nombre', e.target.value);
                    update('slug', generateSlug(e.target.value));
                  }}
                  placeholder="Ej: Mesón O Pote"
                  className={inputClass}
                />
              </Field>
              <Field label="Slug (URL)">
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => update('slug', e.target.value)}
                  placeholder="meson-o-pote"
                  className={inputClass}
                />
              </Field>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Categoría" required>
                <select
                  value={form.categoria}
                  onChange={(e) => update('categoria', e.target.value)}
                  className={inputClass}
                >
                  {CATEGORIAS.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </Field>
              <Field label="Rango de precio">
                <select
                  value={form.rangoPrecio}
                  onChange={(e) => update('rangoPrecio', e.target.value)}
                  className={inputClass}
                >
                  <option value="economico">€ Económico</option>
                  <option value="moderado">€€ Moderado</option>
                  <option value="premium">€€€ Premium</option>
                  <option value="lujo">€€€€ Lujo</option>
                </select>
              </Field>
            </div>
            <Field label="Descripción corta">
              <textarea
                value={form.descripcionCorta}
                onChange={(e) => update('descripcionCorta', e.target.value)}
                rows={2}
                placeholder="Una línea que resuma el restaurante (aparece en listados)"
                className={inputClass}
              />
            </Field>
          </div>

          {/* Storytelling */}
          <div className="bg-white rounded-2xl border border-black/5 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-[#1A1A1A]">Storytelling</h2>
              <button
                onClick={generateDescription}
                disabled={generating}
                className="flex items-center gap-1.5 text-xs text-[#2D5016] border border-[#2D5016]/30 px-3 py-1.5 rounded-lg hover:bg-[#2D5016]/5 transition-colors disabled:opacity-50"
              >
                {generating ? <Loader2 size={12} className="animate-spin" /> : '✨'}
                Generar con IA
              </button>
            </div>
            <Field label="Descripción larga">
              <textarea
                value={form.descripcionLarga}
                onChange={(e) => update('descripcionLarga', e.target.value)}
                rows={5}
                placeholder="Historia completa del restaurante..."
                className={inputClass}
              />
            </Field>
            <Field label="La experiencia">
              <textarea
                value={form.experiencia}
                onChange={(e) => update('experiencia', e.target.value)}
                rows={3}
                placeholder="Describe la sensación de entrar y comer aquí..."
                className={inputClass}
              />
            </Field>
            <Field label="Qué pedir">
              <textarea
                value={form.quePedir}
                onChange={(e) => update('quePedir', e.target.value)}
                rows={3}
                placeholder="Los platos que no te puedes perder..."
                className={inputClass}
              />
            </Field>
            <Field label="Por qué visitarlo">
              <textarea
                value={form.porQueVisitar}
                onChange={(e) => update('porQueVisitar', e.target.value)}
                rows={2}
                placeholder="La razón principal para ir..."
                className={inputClass}
              />
            </Field>
            <Field label="Lo que lo hace único">
              <textarea
                value={form.loQueLoHaceUnico}
                onChange={(e) => update('loQueLoHaceUnico', e.target.value)}
                rows={2}
                placeholder="Su diferenciador clave..."
                className={inputClass}
              />
            </Field>
          </div>

          {/* Localización */}
          <div className="bg-white rounded-2xl border border-black/5 p-6 space-y-4">
            <h2 className="font-semibold text-[#1A1A1A]">Localización</h2>
            <Field label="Dirección">
              <input
                type="text"
                value={form.direccion}
                onChange={(e) => update('direccion', e.target.value)}
                placeholder="Rúa do Franco, 12"
                className={inputClass}
              />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Localidad">
                <input
                  type="text"
                  value={form.localidad}
                  onChange={(e) => update('localidad', e.target.value)}
                  placeholder="Santiago de Compostela"
                  className={inputClass}
                />
              </Field>
              <Field label="Provincia">
                <select
                  value={form.provincia}
                  onChange={(e) => update('provincia', e.target.value)}
                  className={inputClass}
                >
                  {['A Coruña', 'Lugo', 'Ourense', 'Pontevedra'].map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </select>
              </Field>
            </div>
          </div>

          {/* Contacto */}
          <div className="bg-white rounded-2xl border border-black/5 p-6 space-y-4">
            <h2 className="font-semibold text-[#1A1A1A]">Contacto y redes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Teléfono">
                <input type="tel" value={form.telefono} onChange={(e) => update('telefono', e.target.value)} placeholder="+34 981 000 000" className={inputClass} />
              </Field>
              <Field label="Email">
                <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="info@restaurante.com" className={inputClass} />
              </Field>
              <Field label="Web">
                <input type="url" value={form.web} onChange={(e) => update('web', e.target.value)} placeholder="https://..." className={inputClass} />
              </Field>
              <Field label="Instagram">
                <input type="url" value={form.instagram} onChange={(e) => update('instagram', e.target.value)} placeholder="https://instagram.com/..." className={inputClass} />
              </Field>
              <Field label="Facebook">
                <input type="url" value={form.facebook} onChange={(e) => update('facebook', e.target.value)} placeholder="https://facebook.com/..." className={inputClass} />
              </Field>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-black/5 p-5 space-y-4">
            <h2 className="font-semibold text-[#1A1A1A]">Publicación</h2>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-[#3D3D3D]">Activo</span>
              <div
                className={`relative w-10 h-5 rounded-full transition-colors ${form.activo ? 'bg-[#2D5016]' : 'bg-gray-200'}`}
                onClick={() => update('activo', !form.activo)}
              >
                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.activo ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </div>
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-sm text-[#3D3D3D]">Destacado</span>
              <div
                className={`relative w-10 h-5 rounded-full transition-colors ${form.destacado ? 'bg-[#2D5016]' : 'bg-gray-200'}`}
                onClick={() => update('destacado', !form.destacado)}
              >
                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.destacado ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </div>
            </label>
          </div>

          <div className="bg-[#FAF7F0] rounded-2xl border border-[#2D5016]/10 p-5">
            <p className="text-xs text-[#3D3D3D]/60 leading-relaxed">
              <strong className="text-[#2D5016]">Tip:</strong> Usa el botón &ldquo;Generar con IA&rdquo; para crear automáticamente la descripción usando el nombre, categoría y localidad del restaurante.
              Necesita la variable <code className="bg-black/5 px-1 rounded">ANTHROPIC_API_KEY</code> en tu archivo <code className="bg-black/5 px-1 rounded">.env.local</code>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
