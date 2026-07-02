'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError('Email o contraseña incorrectos');
      setLoading(false);
      return;
    }

    router.push('/admin');
    router.refresh();
  }

  return (
    <div style={{ width: '100%', maxWidth: 420 }}>
      {/* Logo */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', overflow: 'hidden', display: 'inline-block', marginBottom: '1rem', border: '3px solid rgba(69,176,229,0.5)', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
          <Image src="/images/original_32874.png" alt="Susana La Gallega" width={80} height={80} style={{ objectFit: 'cover', objectPosition: 'center top', width: '100%', height: '100%' }} unoptimized />
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
        <h2 style={{ color: 'white', fontSize: '1.1rem', fontWeight: 600, margin: '0 0 1.5rem', fontFamily: 'Poppins, sans-serif' }}>
          Iniciar sesión
        </h2>

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
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <a href="/admin/register" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', fontFamily: 'Poppins, sans-serif', textDecoration: 'none' }}>
            ¿No tienes cuenta? Registrarse
          </a>
        </div>
      </div>
    </div>
  );
}
