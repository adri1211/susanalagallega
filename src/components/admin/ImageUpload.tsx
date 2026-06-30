'use client';
import { useRef, useState } from 'react';
import { Upload, X, Link as LinkIcon } from 'lucide-react';

interface Props {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export function ImageUpload({ value, onChange, label = 'Imagen de portada' }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [tab, setTab] = useState<'upload' | 'url'>('upload');

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Solo se admiten imágenes');
      return;
    }
    setUploading(true);
    setError('');
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/admin/blog/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || 'Error al subir');
      onChange(data.url);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '0.75rem',
    color: '#6b7a8d', textTransform: 'uppercase', letterSpacing: '0.1em',
    display: 'block', marginBottom: '0.5rem',
  };

  return (
    <div>
      <label style={labelStyle}>{label}</label>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: '0.75rem' }}>
        {(['upload', 'url'] as const).map(t => (
          <button key={t} type="button" onClick={() => setTab(t)}
            style={{ flex: 1, padding: '7px', borderRadius: 8, border: 'none', cursor: 'pointer', fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '0.75rem', background: tab === t ? '#243b60' : 'rgba(36,59,96,0.08)', color: tab === t ? 'white' : '#6b7a8d', transition: 'all 0.2s' }}>
            {t === 'upload' ? '⬆️ Subir archivo' : '🔗 Pegar URL'}
          </button>
        ))}
      </div>

      {tab === 'upload' ? (
        <div
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
          onClick={() => !uploading && inputRef.current?.click()}
          style={{ border: '2px dashed rgba(36,59,96,0.2)', borderRadius: 12, padding: '1.5rem', textAlign: 'center', cursor: uploading ? 'not-allowed' : 'pointer', transition: 'border-color 0.2s', background: 'rgba(36,59,96,0.02)' }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = '#45b0e5')}
          onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(36,59,96,0.2)')}
        >
          <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }}
            onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
          {uploading ? (
            <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.85rem', color: '#45b0e5', margin: 0 }}>
              Subiendo imagen...
            </p>
          ) : (
            <>
              <Upload size={22} style={{ color: '#6b7a8d', marginBottom: 8 }} />
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.85rem', color: '#6b7a8d', margin: '0 0 0.25rem' }}>
                Arrastra una imagen o <strong style={{ color: '#45b0e5' }}>haz clic para seleccionar</strong>
              </p>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.72rem', color: '#9ca3af', margin: 0 }}>
                JPG, PNG, WEBP · Máx. 5 MB
              </p>
            </>
          )}
        </div>
      ) : (
        <input
          type="url"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="https://..."
          style={{ width: '100%', border: '1px solid rgba(36,59,96,0.15)', borderRadius: 10, padding: '10px 14px', fontFamily: 'Poppins, sans-serif', fontSize: '0.88rem', color: '#243b60', outline: 'none' }}
        />
      )}

      {error && (
        <p style={{ fontFamily: 'Poppins, sans-serif', color: '#ef4444', fontSize: '0.78rem', marginTop: '0.4rem' }}>{error}</p>
      )}

      {/* Preview */}
      {value && (
        <div style={{ marginTop: '0.75rem', position: 'relative', display: 'inline-block' }}>
          <img src={value} alt="Preview" style={{ width: '100%', maxHeight: 160, objectFit: 'cover', borderRadius: 10, display: 'block', border: '1px solid rgba(36,59,96,0.1)' }} />
          <button type="button" onClick={() => onChange('')}
            style={{ position: 'absolute', top: 6, right: 6, background: 'rgba(0,0,0,0.6)', border: 'none', borderRadius: '50%', width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white' }}>
            <X size={13} />
          </button>
        </div>
      )}
    </div>
  );
}
