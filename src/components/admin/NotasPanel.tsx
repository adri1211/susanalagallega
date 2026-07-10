'use client';

import { useState, useEffect, useRef } from 'react';
import { StickyNote, X, Save } from 'lucide-react';

export function NotasPanel() {
  const [open, setOpen] = useState(false);
  const [texto, setTexto] = useState('');
  const [saved, setSaved] = useState(true);
  const [saving, setSaving] = useState(false);
  const saveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    fetch('/api/admin/notas')
      .then(r => r.json())
      .then(d => setTexto(d.contenido ?? ''));
  }, []);

  function handleChange(val: string) {
    setTexto(val);
    setSaved(false);
    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => autoSave(val), 1500);
  }

  async function autoSave(val: string) {
    setSaving(true);
    await fetch('/api/admin/notas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contenido: val }),
    });
    setSaving(false);
    setSaved(true);
  }

  return (
    <>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: open ? '#1a2d4a' : 'rgba(26,45,74,0.08)', color: open ? 'white' : '#1a2d4a', border: 'none', borderRadius: 10, padding: '0.6rem 1.2rem', fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'Poppins, sans-serif', transition: 'all 0.2s' }}
      >
        <StickyNote size={15} />
        Notas
      </button>

      {open && (
        <div style={{ background: 'white', borderRadius: '1rem', border: '1px solid rgba(26,45,74,0.1)', padding: '1.25rem', marginTop: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <StickyNote size={15} style={{ color: '#45b0e5' }} />
              <span style={{ fontWeight: 700, color: '#1a2d4a', fontSize: '0.9rem', fontFamily: 'Poppins, sans-serif' }}>Notas del equipo</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '0.72rem', color: saving ? '#45b0e5' : saved ? '#10b981' : '#9ca3af', fontFamily: 'Poppins, sans-serif' }}>
                {saving ? 'Guardando...' : saved ? '✓ Guardado' : 'Sin guardar'}
              </span>
              <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', display: 'flex', alignItems: 'center' }}>
                <X size={16} />
              </button>
            </div>
          </div>
          <textarea
            value={texto}
            onChange={e => handleChange(e.target.value)}
            placeholder="Pega aquí notas, textos, recordatorios... Se guarda automáticamente."
            style={{ width: '100%', minHeight: 400, border: '1px solid rgba(26,45,74,0.1)', borderRadius: 8, padding: '1rem', fontSize: '0.95rem', fontFamily: 'Poppins, sans-serif', color: '#1a2d4a', resize: 'vertical', outline: 'none', boxSizing: 'border-box', lineHeight: 1.8 }}
          />
        </div>
      )}
    </>
  );
}
