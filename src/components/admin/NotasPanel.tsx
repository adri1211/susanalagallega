'use client';

import { useState, useEffect, useRef } from 'react';
import { StickyNote, X } from 'lucide-react';

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
    <button
      onClick={() => setOpen(o => !o)}
      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: open ? '#1a2d4a' : 'rgba(26,45,74,0.08)', color: open ? 'white' : '#1a2d4a', border: 'none', borderRadius: 10, padding: '0.6rem 1.2rem', fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'Poppins, sans-serif', transition: 'all 0.2s', flexShrink: 0 }}
    >
      <StickyNote size={15} />
      Notas
      {open && (
        /* Panel — fuera del flujo del botón, ocupa el ancho del contenedor padre */
        <div
          onClick={e => e.stopPropagation()}
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 100, pointerEvents: 'none' }}
        >
          <div style={{ position: 'absolute', top: 80, left: '50%', transform: 'translateX(-50%)', width: 'min(900px, calc(100vw - 4rem))', pointerEvents: 'all', background: 'white', borderRadius: '1rem', border: '1px solid rgba(26,45,74,0.12)', padding: '1.5rem', boxShadow: '0 20px 60px rgba(26,45,74,0.15)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <StickyNote size={16} style={{ color: '#45b0e5' }} />
                <span style={{ fontWeight: 700, color: '#1a2d4a', fontSize: '0.95rem', fontFamily: 'Poppins, sans-serif' }}>Notas del equipo</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '0.75rem', color: saving ? '#45b0e5' : saved ? '#10b981' : '#9ca3af', fontFamily: 'Poppins, sans-serif' }}>
                  {saving ? 'Guardando...' : saved ? '✓ Guardado' : 'Sin guardar'}
                </span>
                <button
                  onClick={e => { e.stopPropagation(); setOpen(false); }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', display: 'flex', alignItems: 'center' }}
                >
                  <X size={18} />
                </button>
              </div>
            </div>
            <textarea
              value={texto}
              onChange={e => handleChange(e.target.value)}
              placeholder="Pega aquí notas, textos, recordatorios... Se guarda automáticamente."
              autoFocus
              style={{ width: '100%', minHeight: 450, border: '1px solid rgba(26,45,74,0.1)', borderRadius: 8, padding: '1rem', fontSize: '0.95rem', fontFamily: 'Poppins, sans-serif', color: '#1a2d4a', resize: 'vertical', outline: 'none', boxSizing: 'border-box', lineHeight: 1.8 }}
            />
          </div>
        </div>
      )}
    </button>
  );
}
