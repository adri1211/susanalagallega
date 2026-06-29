'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Play, ChevronDown } from 'lucide-react';

export function HeroSection() {
  return (
    <section style={{ background: '#0d1e36', minHeight: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'stretch' }}>
      <style>{`
        /* Layout */
        .hero-photo-wrap { position: absolute; right: 0; top: 0; bottom: 0; width: 52%; }
        .hero-content { width: 56%; position: relative; z-index: 10; display: flex; flex-direction: column; justify-content: center; padding: 12rem 3rem 6rem 5rem; }

        /* Partículas */
        @keyframes floatA { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(18px,-22px) scale(1.08)} 66%{transform:translate(-12px,14px) scale(0.95)} }
        @keyframes floatB { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-20px,-18px)} }
        @keyframes floatC { 0%,100%{transform:translate(0,0) rotate(0deg)} 50%{transform:translate(16px,20px) rotate(180deg)} }
        @keyframes pulse-glow { 0%,100%{opacity:0.15} 50%{opacity:0.35} }
        @keyframes bounce-cue { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(-10px)} }
        @keyframes hero-bg-shift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        @keyframes dot-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.3;transform:scale(0.7)} }

        /* Animaciones entrada */
        .hero-badge { animation: fadeUp 0.7s 0.05s ease both; }
        .hero-eyebrow { animation: fadeUp 0.7s 0.18s ease both; }
        .hero-title { animation: fadeUp 0.8s 0.3s ease both; }
        .hero-tagline { animation: fadeUp 0.8s 0.45s ease both; }
        .hero-bio { animation: fadeUp 0.7s 0.58s ease both; }
        .hero-ctas { animation: fadeUp 0.7s 0.72s ease both; }
        .hero-chips { animation: fadeUp 0.7s 0.85s ease both; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }

        /* Botones hero */
        .btn-ver-programa { transition: all 0.25s; }
        .btn-ver-programa:hover { transform: translateY(-3px) scale(1.04); box-shadow: 0 12px 32px rgba(69,176,229,0.5) !important; }
        .btn-explorar { transition: all 0.25s; }
        .btn-explorar:hover { background: rgba(255,255,255,0.18) !important; transform: translateY(-3px); }

        /* Móvil */
        @media(max-width:1024px){
          .hero-photo-wrap { width: 100%; opacity: 0.15; }
          .hero-content { width: 100%; padding: 11rem 1.5rem 5rem; text-align: center; align-items: center; }
          .hero-ctas { justify-content: center !important; }
          .hero-chips { justify-content: center !important; }
        }
      `}</style>

      {/* ── Fondo degradado animado ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'radial-gradient(ellipse 80% 60% at 20% 60%, rgba(69,176,229,0.12) 0%, transparent 70%), radial-gradient(ellipse 60% 80% at 80% 20%, rgba(36,59,96,0.4) 0%, transparent 70%), #0d1e36',
      }} />

      {/* ── Orbes flotantes ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
        {/* Orbe grande turquesa */}
        <div style={{ position: 'absolute', top: '15%', left: '8%', width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(69,176,229,0.14) 0%, transparent 70%)', animation: 'floatA 9s ease-in-out infinite', animationDelay: '0s' }} />
        {/* Orbe mediano azul */}
        <div style={{ position: 'absolute', bottom: '20%', left: '30%', width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle, rgba(36,59,96,0.6) 0%, transparent 70%)', animation: 'floatB 12s ease-in-out infinite', animationDelay: '-3s' }} />
        {/* Orbe pequeño acento */}
        <div style={{ position: 'absolute', top: '55%', left: '3%', width: 90, height: 90, borderRadius: '50%', background: 'radial-gradient(circle, rgba(69,176,229,0.25) 0%, transparent 70%)', animation: 'floatC 7s ease-in-out infinite', animationDelay: '-1.5s' }} />
        {/* Puntos estrellas */}
        {[
          { top: '22%', left: '42%', s: 4 },
          { top: '68%', left: '18%', s: 6 },
          { top: '35%', left: '6%', s: 3 },
          { top: '80%', left: '38%', s: 5 },
        ].map((p, i) => (
          <div key={i} style={{ position: 'absolute', top: p.top, left: p.left, width: p.s, height: p.s, borderRadius: '50%', background: '#45b0e5', animation: `pulse-glow ${3 + i * 0.8}s ease-in-out infinite`, animationDelay: `${i * 0.7}s` }} />
        ))}
      </div>

      {/* ── Foto Susana ── */}
      <div className="hero-photo-wrap" style={{ zIndex: 2 }}>
        <Image src="/images/original_32874.png" alt="Susana La Gallega" fill priority unoptimized style={{ objectFit: 'cover', objectPosition: 'center top' }} />
        {/* Gradiente mezcla lateral */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #0d1e36 0%, #0d1e36 4%, rgba(13,30,54,0.7) 35%, rgba(13,30,54,0.1) 70%, rgba(13,30,54,0) 100%)' }} />
        {/* Gradiente inferior */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0d1e36 0%, transparent 45%)' }} />
        {/* Viñeta color */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(69,176,229,0.06) 0%, transparent 50%)' }} />
      </div>

      {/* ── Contenido ── */}
      <div className="hero-content" style={{ zIndex: 10 }}>
        {/* Badge */}
        <div className="hero-badge" style={{ display: 'inline-flex', alignSelf: 'flex-start', alignItems: 'center', gap: 8, background: 'rgba(69,176,229,0.12)', border: '1px solid rgba(69,176,229,0.35)', borderRadius: 9999, padding: '8px 20px', marginBottom: '2rem', backdropFilter: 'blur(8px)' }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#45b0e5', animation: 'dot-pulse 2s infinite', display: 'block' }} />
          <span style={{ color: '#45b0e5', fontWeight: 700, fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase' }}>El programa de gastronomía gallega</span>
        </div>

        {/* Eyebrow */}
        <p className="hero-eyebrow" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', margin: '0 0 0.35rem' }}>
          Soy Susana Fernández
        </p>

        {/* Nombre principal */}
        <h1 className="hero-title" style={{ fontFamily: 'Lilita One, cursive', color: 'white', fontSize: 'clamp(3.5rem, 6.5vw, 6rem)', lineHeight: 0.9, margin: '0 0 0.7rem', textShadow: '0 4px 32px rgba(69,176,229,0.2)' }}>
          La Gallega
        </h1>

        {/* Tagline */}
        <p className="hero-tagline" style={{ fontFamily: 'Lilita One, cursive', color: '#45b0e5', fontSize: 'clamp(1.5rem, 2.8vw, 2.4rem)', margin: '0 0 2rem', lineHeight: 1.2, textShadow: '0 2px 20px rgba(69,176,229,0.3)' }}>
          ¡Historias que se comen!
        </p>

        {/* Bio */}
        <p className="hero-bio" style={{ color: 'rgba(255,255,255,0.58)', fontSize: 'clamp(0.9rem, 1.2vw, 1rem)', lineHeight: 1.85, maxWidth: 460, margin: '0 0 2.75rem' }}>
          Apasionada de la gastronomía gallega, presentadora de{' '}
          <strong style={{ color: 'rgba(255,255,255,0.88)', fontWeight: 700 }}>Saboreando con Susana</strong>{' '}
          en TV Ferrol y Canal 33 Madrid. Aquí comparto mis restaurantes favoritos y todo lo que me enamora de la mesa gallega.
        </p>

        {/* CTAs */}
        <div className="hero-ctas" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', marginBottom: '2.75rem' }}>
          <Link href="/saboreando-con-susana" className="btn-ver-programa" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#45b0e5', color: 'white', borderRadius: 9999, padding: '14px 28px', fontSize: '0.9rem', fontWeight: 700, textDecoration: 'none', fontFamily: 'Poppins, sans-serif', boxShadow: '0 6px 24px rgba(69,176,229,0.4)' }}>
            <Play size={15} fill="white" strokeWidth={0} />
            Ver el programa
          </Link>
          <Link href="/restaurantes" className="btn-explorar" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.22)', color: 'white', borderRadius: 9999, padding: '14px 28px', fontSize: '0.9rem', fontWeight: 700, textDecoration: 'none', fontFamily: 'Poppins, sans-serif', backdropFilter: 'blur(8px)' }}>
            🍽️ Explorar restaurantes
          </Link>
        </div>

        {/* Chips */}
        <div className="hero-chips" style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {['📺 TV Ferrol · Canal 34', '📺 Canal 33 Madrid', '▶️ YouTube'].map(c => (
            <span key={c} style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem', fontWeight: 600, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 9999, padding: '7px 16px', backdropFilter: 'blur(4px)' }}>
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{ position: 'absolute', bottom: 28, left: '50%', zIndex: 10, animation: 'bounce-cue 2.4s ease-in-out infinite' }}>
        <ChevronDown size={30} style={{ color: 'rgba(255,255,255,0.25)' }} />
      </div>
    </section>
  );
}
