'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Play, ChevronDown } from 'lucide-react';

export function HeroSection() {
  return (
    <section style={{ background: '#1a2d4a', minHeight: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'stretch' }}>
      <style>{`
        .hero-photo-wrap { position: absolute; right: 0; top: 0; bottom: 0; width: 50%; }
        .hero-content { width: 55%; position: relative; z-index: 10; display: flex; flex-direction: column; justify-content: center; padding: 8rem 3rem 5rem 5rem; }
        @media(max-width:1024px){
          .hero-photo-wrap { width: 100%; opacity: 0.18; }
          .hero-content { width: 100%; padding: 7rem 1.5rem 5rem; text-align: center; align-items: center; }
          .hero-ctas { justify-content: center !important; }
          .hero-chips { justify-content: center !important; }
        }
        @keyframes bounce { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(-8px)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
      `}</style>

      {/* Foto */}
      <div className="hero-photo-wrap">
        <Image src="/images/original_32874.png" alt="Susana La Gallega" fill priority unoptimized style={{ objectFit: 'cover', objectPosition: 'center top' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #1a2d4a 0%, #1a2d4a 8%, rgba(26,45,74,0.5) 50%, rgba(26,45,74,0) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #1a2d4a 0%, transparent 40%)' }} />
      </div>

      {/* Contenido */}
      <div className="hero-content">
        {/* Badge */}
        <div className="hero-badge" style={{ display: 'inline-flex', alignSelf: 'flex-start', alignItems: 'center', gap: 8, background: 'rgba(69,176,229,0.12)', border: '1px solid rgba(69,176,229,0.3)', borderRadius: 9999, padding: '7px 18px', marginBottom: '2rem' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#45b0e5', animation: 'pulse 2s infinite', display: 'block' }} />
          <span style={{ color: '#45b0e5', fontWeight: 700, fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>El programa de gastronomía gallega</span>
        </div>

        {/* Intro */}
        <p className="hero-eyebrow" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 0.4rem' }}>Soy Susana Fernández</p>

        {/* Nombre grande */}
        <h1 className="hero-title" style={{ fontFamily: 'Lilita One, cursive', color: 'white', fontSize: 'clamp(3.2rem, 6vw, 5.5rem)', lineHeight: 0.95, margin: '0 0 0.6rem' }}>
          La Gallega
        </h1>

        {/* Tagline */}
        <p className="hero-tagline" style={{ fontFamily: 'Lilita One, cursive', color: '#45b0e5', fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)', margin: '0 0 1.75rem', lineHeight: 1.2 }}>
          ¡Historias que se comen!
        </p>

        {/* Bio */}
        <p className="hero-bio" style={{ color: 'rgba(255,255,255,0.62)', fontSize: 'clamp(0.9rem, 1.2vw, 1rem)', lineHeight: 1.8, maxWidth: 480, margin: '0 0 2.5rem' }}>
          Apasionada de la gastronomía gallega, presentadora de <strong style={{ color: 'rgba(255,255,255,0.85)' }}>Saboreando con Susana</strong> en TV Ferrol y Canal 33 Madrid. Aquí comparto mis restaurantes favoritos y todo lo que me enamora de la mesa gallega.
        </p>

        {/* CTAs */}
        <div className="hero-ctas" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2.5rem' }}>
          <Link href="/saboreando-con-susana" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: '#45b0e5', color: 'white', borderRadius: 9999, padding: '13px 26px', fontSize: '0.9rem', fontWeight: 700, textDecoration: 'none', fontFamily: 'Poppins, sans-serif', boxShadow: '0 4px 20px rgba(69,176,229,0.35)' }}>
            <Play size={14} fill="white" />
            Ver el programa
          </Link>
          <Link href="/restaurantes" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: 'rgba(255,255,255,0.1)', border: '1.5px solid rgba(255,255,255,0.25)', color: 'white', borderRadius: 9999, padding: '13px 26px', fontSize: '0.9rem', fontWeight: 700, textDecoration: 'none', fontFamily: 'Poppins, sans-serif' }}>
            🍽️ Explorar restaurantes
          </Link>
        </div>

        {/* Chips canales */}
        <div className="hero-chips" style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {['📺 TV Ferrol · Canal 34', '📺 Canal 33 Madrid', '▶️ YouTube'].map(c => (
            <span key={c} style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', fontWeight: 600, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 9999, padding: '6px 14px' }}>
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 10, animation: 'bounce 2s infinite' }}>
        <ChevronDown size={28} style={{ color: 'rgba(255,255,255,0.3)' }} />
      </div>
    </section>
  );
}
