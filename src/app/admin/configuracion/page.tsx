'use client';

import { useState } from 'react';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

export default function AdminConfiguracionPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'Las contraseñas nuevas no coinciden' });
      return;
    }
    if (newPassword.length < 8) {
      setMessage({ type: 'error', text: 'La contraseña debe tener al menos 8 caracteres' });
      return;
    }

    setLoading(true);
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      setMessage({ type: 'error', text: 'Error al cambiar la contraseña. Vuelve a iniciar sesión e inténtalo de nuevo.' });
    } else {
      setMessage({ type: 'success', text: '¡Contraseña actualizada correctamente!' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
    setLoading(false);
  }

  return (
    <div>
      <h1 style={{ fontFamily: 'Lilita One, cursive', color: '#1a2d4a', fontSize: '2rem', marginBottom: '0.5rem' }}>
        Configuración
      </h1>
      <p style={{ color: '#6b7a8d', marginBottom: '2rem' }}>
        Ajustes generales del sitio web.
      </p>

      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {/* Cambiar contraseña */}
        <div style={{ background: 'white', borderRadius: '1rem', padding: '1.5rem', border: '1px solid rgba(26,45,74,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '1.4rem' }}>🔒</span>
            <div>
              <p style={{ fontWeight: 700, color: '#1a2d4a', margin: 0 }}>Cambiar contraseña</p>
              <p style={{ color: '#6b7a8d', fontSize: '0.85rem', margin: 0 }}>Actualiza tu contraseña de acceso al panel</p>
            </div>
          </div>

          <form onSubmit={handleChangePassword} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 400 }}>
            <div>
              <label style={{ display: 'block', color: '#1a2d4a', fontSize: '0.8rem', fontWeight: 600, marginBottom: 6, letterSpacing: '0.05em' }}>
                CONTRASEÑA NUEVA
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                required
                placeholder="Mínimo 8 caracteres"
                style={{ width: '100%', border: '1px solid rgba(26,45,74,0.15)', borderRadius: 10, padding: '0.7rem 1rem', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box', color: '#1a2d4a' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: '#1a2d4a', fontSize: '0.8rem', fontWeight: 600, marginBottom: 6, letterSpacing: '0.05em' }}>
                CONFIRMAR CONTRASEÑA NUEVA
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
                placeholder="Repite la contraseña"
                style={{ width: '100%', border: '1px solid rgba(26,45,74,0.15)', borderRadius: 10, padding: '0.7rem 1rem', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box', color: '#1a2d4a' }}
              />
            </div>

            {message && (
              <div style={{
                background: message.type === 'success' ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
                border: `1px solid ${message.type === 'success' ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`,
                borderRadius: 8, padding: '0.6rem 0.9rem',
                color: message.type === 'success' ? '#16a34a' : '#dc2626',
                fontSize: '0.85rem'
              }}>
                {message.text}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{ background: loading ? 'rgba(26,45,74,0.4)' : '#1a2d4a', color: 'white', border: 'none', borderRadius: 10, padding: '0.75rem 1.5rem', fontSize: '0.9rem', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', alignSelf: 'flex-start' }}
            >
              {loading ? 'Guardando...' : 'Actualizar contraseña'}
            </button>
          </form>
        </div>

        {/* Info del sistema */}
        {[
          { icon: '🌐', title: 'Dominio', desc: 'saboreandoconsusanalagallega.com', action: 'Abrir Vercel →', href: 'https://vercel.com/dashboard' },
          { icon: '🗄️', title: 'Base de datos', desc: 'Supabase · wcktpvktbcahnxizqbwg', action: 'Abrir Supabase →', href: 'https://supabase.com/dashboard/project/wcktpvktbcahnxizqbwg' },
          { icon: '📦', title: 'Repositorio', desc: 'adri1211/susanalagallega · GitHub', action: 'Abrir GitHub →', href: 'https://github.com/adri1211/susanalagallega' },
        ].map(item => (
          <div key={item.title} style={{ background: 'white', borderRadius: '1rem', padding: '1.5rem', border: '1px solid rgba(26,45,74,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
              <div>
                <p style={{ fontWeight: 700, color: '#1a2d4a', margin: 0 }}>{item.title}</p>
                <p style={{ color: '#6b7a8d', fontSize: '0.85rem', margin: 0 }}>{item.desc}</p>
              </div>
            </div>
            <a href={item.href} target="_blank" rel="noopener noreferrer"
              style={{ color: '#45b0e5', fontWeight: 600, fontSize: '0.85rem', textDecoration: 'none' }}>
              {item.action}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
