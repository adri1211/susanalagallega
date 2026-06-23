'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Play } from 'lucide-react';

export function HeroSection() {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) window.location.href = `/restaurantes?q=${encodeURIComponent(query)}`;
    else window.location.href = '/restaurantes';
  };

  return (
    <section style={{ background: '#1a2d4a', minHeight: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'stretch' }}>
      <style>{`
        .hero-photo { width: 52%; }
        .hero-text { width: 52%; }
        @media(max-width:1024px){
          .hero-photo { display: none !important; }
          .hero-text { width: 100% !important; padding: 7rem 1.5rem 4rem !important; text-align: center; }
          .hero-chips { justify-content: center !important; }
          .hero-stats { justify-content: center !important; }
          .hero-search { max-width: 100% !important; }
          .hero-badge { justify-content: center !important; align-self: center !important; }
        }
      `}</style>

      {/* ─── Foto Susana — derecha ─── */}
      <div className="hero-photo" style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '52%' }}>
        <Image src="/images/original_32874.png" alt="Susana La Gallega" fill priority unoptimized style={{ objectFit: 'cover', objectPosition: 'center top' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #1a2d4a 0%, #1a2d4a 5%, rgba(26,45,74,0.55) 45%, rgba(26,45,74,0) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #1a2d4a 0%, transparent 35%)' }} />
      </div>

      {/* ─── Contenido ─── */}
      <div className="hero-text" style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '7rem 3rem 5rem 5rem', width: '52%' }}>

        {/* Badge */}
        <div className="hero-badge" style={{ display: 'inline-flex', alignSelf: 'flex-start', alignItems: 'center', gap: 8, background: 'rgba(69,176,229,0.12)', border: '1px solid rgba(69,176,229,0.3)', borderRadius: 9999, padding: '7px 18px', marginBottom: '1.75rem' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#45b0e5', animation: 'pulse 2s infinite', display: 'block' }} />
          <span style={{ color: '#45b0e5', fontWeight: 700, fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>TV Ferrol · Canal 33 Madrid · YouTube</span>
        </div>

        {/* Nombre — lo más importante */}
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 0.5rem' }}>
          Soy Susana Fernández
        </p>
        <h1 style={{ fontFamily: 'Lilita One, cursive', color: 'white', fontSize: 'clamp(2.8rem, 5.5vw, 4.8rem)', lineHeight: 1.0, margin: '0 0 0.75rem' }}>
          La Gallega
        </h1>
        <p style={{ fontFamily: 'Lilita One, cursive', color: '#45b0e5', fontSize: 'clamp(1.3rem, 2.5vw, 2rem)', margin: '0 0 1.5rem', lineHeight: 1.2 }}>
          ¡Historias que se comen!
        </p>

        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(0.9rem, 1.3vw, 1rem)', lineHeight: 1.75, maxWidth: 460, margin: '0 0 2rem' }}>
          Apasionada de la gastronomía gallega y de descubrir rincones únicos. Aquí comparto mis restaurantes favoritos, mis recomendaciones de temporada y todo lo que me enamora de la mesa gallega.
        </p>

        {/* Buscador */}
        <form onSubmit={handleSearch} className="hero-search" style={{ display: 'flex', alignItems: 'center', background: 'white', borderRadius: '1rem', padding: '5px', boxShadow: '0 8px 32px rgba(0,0,0,0.25)', maxWidth: 480, marginBottom: '1.25rem' }}>
          <Search size={16} style={{ color: '#243b60', marginLeft: 12, flexShrink: 0 }} />
          <input type="text" value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Restaurante, ciudad, tipo..."
            style={{ flex: 1, background: 'transparent', outline: 'none', padding: '10px 10px', fontSize: '0.85rem', color: '#243b60', fontFamily: 'Poppins, sans-serif' }} />
          <button type="submit" style={{ background: '#243b60', color: 'white', border: 'none', borderRadius: '0.75rem', padding: '10px 20px', fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer', flexShrink: 0 }}>
            Buscar
          </button>
        </form>

        {/* Chips */}
        <div className="hero-chips" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: '2rem' }}>
          {[
            ['🦞 Marisquería', '/restaurantes?categoria=marisqueria'],
            ['🐙 Pulpería', '/restaurantes?categoria=pulperia'],
            ['📍 Ferrol', '/restaurantes?localidad=ferrol'],
            ['📍 Madrid', '/restaurantes?localidad=madrid'],
          ].map(([label, href]) => (
            <Link key={href} href={href} style={{ background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.85)', borderRadius: 9999, padding: '6px 14px', fontSize: '0.75rem', fontWeight: 600, textDecoration: 'none' }}>
              {label}
            </Link>
          ))}
        </div>

        {/* Stats + CTA */}
        <div className="hero-stats" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1.5rem' }}>
          {[{ n: '+30', l: 'Restaurantes' }, { n: '3', l: 'Temporadas TV' }, { n: '100%', l: 'Reales' }].map(s => (
            <div key={s.l}>
              <div style={{ fontFamily: 'Lilita One, cursive', color: '#45b0e5', fontSize: '1.6rem', lineHeight: 1 }}>{s.n}</div>
              <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 2 }}>{s.l}</div>
            </div>
          ))}
          <Link href="/saboreando-con-susana" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(69,176,229,0.15)', border: '1px solid rgba(69,176,229,0.35)', color: '#45b0e5', borderRadius: 9999, padding: '9px 20px', fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none' }}>
            <Play size={13} fill="currentColor" />
            Ver el programa
          </Link>
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 10, animation: 'bounce 2s infinite' }}>
        <div style={{ width: 28, height: 44, border: '2px solid rgba(255,255,255,0.25)', borderRadius: 14, display: 'flex', justifyContent: 'center', paddingTop: 6 }}>
          <div style={{ width: 4, height: 8, background: 'rgba(255,255,255,0.5)', borderRadius: 2 }} />
        </div>
      </div>
      <style>{`@keyframes bounce{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(-8px)}} @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
    </section>
  );
}
