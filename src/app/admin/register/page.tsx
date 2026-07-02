'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

export default function AdminRegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (password !== confirm) {
      setError('Las contraseñas no coinciden');
      return;
    }
    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    setLoading(true);
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setError(error.message === 'User already registered' ? 'Este email ya está registrado' : error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  }

  if (success) {
    return (
      <div style={{ width: '100%', maxWidth: 420, textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
        <h2 style={{ color: 'white', fontFamily: 'var(--font-lilita), Lilita One, cursive', fontSize: '1.4rem', margin: '0 0 0.75rem' }}>
          ¡Cuenta creada!
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'Poppins, sans-serif', fontSize: '0.9rem', lineHeight: 1.6, margin: '0 0 1.5rem' }}>
          Revisa tu email y confirma la cuenta haciendo clic en el enlace que te hemos enviado.
        </p>
        <a href="/admin/login" style={{ display: 'inline-block', background: '#45b0e5', color: 'white', borderRadius: 10, padding: '0.75rem 2rem', fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}>
          Ir al login
        </a>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', maxWidth: 420 }}>
      {/* Logo */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{ width: 56, height: 56, borderRadius: 16, background: '#45b0e5', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', fontSize: '1.5rem', fontWeight: 700, color: 'white', fontFamily: 'var(--font-lilita), Lilita One, cursive' }}>
          S
        </div>
        <h1 style={{ color: 'white', fontFamily: 'var(--font-lilita), Lilita One, cursive', fontSize: '1.6rem', margin: 0, marginBottom: 6 }}>
          Susana La Gallega
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', margin: 0, fontFamily: 'Poppins, sans-serif' }}>
          Panel de administración
        </p>
      </div>

      {/* Card */}
      <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '2rem' }}>
        <h2 style={{ color: 'white', fontSize: '1.1rem', fontWeight: 600, margin: '0 0 0.5rem', fontFamily: 'Poppins, sans-serif' }}>
          Crear cuenta
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.78rem', margin: '0 0 1.5rem', fontFamily: 'Poppins, sans-serif' }}>
          Solo para administradores autorizados
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', fontWeight: 500, marginBottom: 6, fontFamily: 'Poppins, sans-serif', letterSpacing: '0.05em' }}>
              EMAIL
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="tu@email.com"
              style={{ width: '100%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10, padding: '0.75rem 1rem', color: 'white', fontSize: '0.95rem', fontFamily: 'Poppins, sans-serif', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', fontWeight: 500, marginBottom: 6, fontFamily: 'Poppins, sans-serif', letterSpacing: '0.05em' }}>
              CONTRASEÑA
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="Mínimo 8 caracteres"
              style={{ width: '100%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10, padding: '0.75rem 1rem', color: 'white', fontSize: '0.95rem', fontFamily: 'Poppins, sans-serif', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', fontWeight: 500, marginBottom: 6, fontFamily: 'Poppins, sans-serif', letterSpacing: '0.05em' }}>
              CONFIRMAR CONTRASEÑA
            </label>
            <input
              type="password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              required
              placeholder="••••••••"
              style={{ width: '100%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10, padding: '0.75rem 1rem', color: 'white', fontSize: '0.95rem', fontFamily: 'Poppins, sans-serif', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          {error && (
            <div style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, padding: '0.6rem 0.9rem', color: '#fca5a5', fontSize: '0.85rem', fontFamily: 'Poppins, sans-serif' }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', background: loading ? 'rgba(69,176,229,0.5)' : '#45b0e5', color: 'white', border: 'none', borderRadius: 10, padding: '0.85rem', fontSize: '0.95rem', fontWeight: 600, fontFamily: 'Poppins, sans-serif', cursor: loading ? 'not-allowed' : 'pointer', marginTop: 4, transition: 'opacity 0.2s' }}
          >
            {loading ? 'Creando cuenta...' : 'Crear cuenta'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <a href="/admin/login" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', fontFamily: 'Poppins, sans-serif', textDecoration: 'none' }}>
            ¿Ya tienes cuenta? Iniciar sesión
          </a>
        </div>
      </div>
    </div>
  );
}
