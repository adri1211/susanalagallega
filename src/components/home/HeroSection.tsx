'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Play } from 'lucide-react';

const ROTATING = ['marisquería', 'pulpería', 'taberna gallega', 'restaurante'];

export function HeroSection() {
  const [query, setQuery] = useState('');
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setIdx(i => (i + 1) % ROTATING.length); setVisible(true); }, 350);
    }, 2800);
    return () => clearInterval(t);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) window.location.href = `/restaurantes?q=${encodeURIComponent(query)}`;
  };

  return (
    <section className="relative min-h-screen flex items-stretch overflow-hidden" style={{ background: '#1a2d4a' }}>

      {/* ─── Foto Susana — ocupa toda la derecha ─── */}
      <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[50%]">
        <Image
          src="/images/original_32874.png"
          alt="Susana La Gallega"
          fill
          priority
          unoptimized
          className="object-cover object-center"
        />
        {/* Gradiente izquierda — mezcla con el azul del texto */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to right, #1a2d4a 0%, #1a2d4a 10%, rgba(26,45,74,0.6) 50%, rgba(26,45,74,0) 100%)'
        }} />
        {/* Gradiente inferior */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to top, #1a2d4a 0%, transparent 40%)'
        }} />
      </div>

      {/* ─── Contenido izquierda ─── */}
      <div className="relative z-10 flex flex-col justify-center px-6 sm:px-10 lg:px-16 pt-24 pb-16 w-full lg:w-[58%]">

        {/* Badge TV */}
        <div className="inline-flex items-center gap-2 mb-8 self-start"
          style={{
            background: 'rgba(69,176,229,0.12)',
            border: '1px solid rgba(69,176,229,0.3)',
            borderRadius: 9999,
            padding: '7px 18px',
          }}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#45b0e5] animate-pulse" />
          <span className="text-[#45b0e5] font-bold" style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            TV Ferrol · Canal 33 Madrid · YouTube
          </span>
        </div>

        {/* Título */}
        <h1 className="text-white leading-[1.05] mb-4"
          style={{ fontFamily: 'Lilita One, cursive', fontSize: 'clamp(2.4rem, 5vw, 3.8rem)' }}>
          La guía<br />gastronómica<br />
          <span style={{ color: '#45b0e5' }}>de Galicia</span>
        </h1>

        {/* Subtítulo rotativo */}
        <p className="text-white/70 mb-8" style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)', fontWeight: 300 }}>
          Encuentra tu{' '}
          <span
            className="font-semibold text-white"
            style={{
              transition: 'opacity 0.3s',
              opacity: visible ? 1 : 0,
              display: 'inline-block',
              minWidth: '9ch',
            }}
          >
            {ROTATING[idx]}
          </span>
          {' '}perfecta
        </p>

        {/* Buscador */}
        <form onSubmit={handleSearch} className="flex items-center gap-0 mb-6 max-w-lg"
          style={{ background: 'white', borderRadius: '1rem', padding: '5px', boxShadow: '0 8px 32px rgba(0,0,0,0.25)' }}>
          <Search size={17} style={{ color: '#243b60', marginLeft: 12, flexShrink: 0 }} />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Restaurante, ciudad, tipo de cocina..."
            style={{
              flex: 1, background: 'transparent', outline: 'none',
              padding: '10px 12px', fontSize: '0.875rem', color: '#243b60',
              fontFamily: 'Poppins, sans-serif',
            }}
          />
          <button type="submit"
            style={{
              background: '#243b60', color: 'white', border: 'none',
              borderRadius: '0.75rem', padding: '10px 22px',
              fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '0.85rem',
              cursor: 'pointer', flexShrink: 0, transition: 'background 0.2s',
            }}>
            Buscar
          </button>
        </form>

        {/* Chips */}
        <div className="flex flex-wrap gap-2 mb-10">
          {[
            ['🦞 Marisquería', '/restaurantes?categoria=marisqueria'],
            ['🐙 Pulpería', '/restaurantes?categoria=pulperia'],
            ['📍 Ferrol', '/restaurantes?localidad=ferrol'],
            ['📍 A Coruña', '/restaurantes?localidad=a-coruna'],
            ['📍 Madrid', '/restaurantes?localidad=madrid'],
          ].map(([label, href]) => (
            <Link key={href} href={href}
              style={{
                background: 'rgba(255,255,255,0.09)',
                border: '1px solid rgba(255,255,255,0.18)',
                color: 'rgba(255,255,255,0.85)',
                borderRadius: 9999, padding: '6px 14px',
                fontSize: '0.75rem', fontWeight: 600,
                textDecoration: 'none', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.18)'; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.09)'; }}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Stats + CTA */}
        <div className="flex flex-wrap items-center gap-8">
          {[
            { n: '+30', label: 'Restaurantes' },
            { n: '3', label: 'Temporadas TV' },
            { n: '100%', label: 'Reales' },
          ].map(s => (
            <div key={s.label}>
              <div style={{ fontFamily: 'Lilita One, cursive', color: '#45b0e5', fontSize: '1.75rem', lineHeight: 1 }}>{s.n}</div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 3 }}>{s.label}</div>
            </div>
          ))}

          <Link href="/saboreando-con-susana"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(69,176,229,0.15)', border: '1px solid rgba(69,176,229,0.35)',
              color: '#45b0e5', borderRadius: 9999, padding: '9px 20px',
              fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none',
              transition: 'all 0.2s',
            }}>
            <Play size={13} fill="currentColor" />
            Ver el programa
          </Link>
        </div>
      </div>

      {/* ─── Scroll cue ─── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
        style={{ animation: 'bounce 2s infinite' }}>
        <div style={{ width: 28, height: 44, border: '2px solid rgba(255,255,255,0.3)', borderRadius: 14, display: 'flex', justifyContent: 'center', paddingTop: 6 }}>
          <div style={{ width: 4, height: 8, background: 'rgba(255,255,255,0.6)', borderRadius: 2, animation: 'fadeIn 2s infinite' }} />
        </div>
      </div>

      <style>{`@keyframes bounce { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(-8px)} }`}</style>
    </section>
  );
}
