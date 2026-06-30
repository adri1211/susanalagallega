'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';

export function CinematicSection() {
  const ref = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).style.opacity = '1';
          (e.target as HTMLElement).style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.2 });
    if (leftRef.current) obs.observe(leftRef.current);
    if (rightRef.current) obs.observe(rightRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ position: 'relative', overflow: 'hidden', background: '#F4F3E4', padding: '6rem 1.5rem' }}>
      {/* Fondo */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'radial-gradient(circle, #243b60 1.5px, transparent 1.5px)', backgroundSize: '32px 32px', pointerEvents: 'none' }} />
      <style>{`
        @keyframes orb-c1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(40px,-30px)} }
        @keyframes orb-c2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-40px,30px)} }
        @keyframes photo-float { 0%,100%{transform:translateY(0) rotate(-1.5deg)} 50%{transform:translateY(-10px) rotate(0.5deg)} }
      `}</style>
      <div style={{ position: 'absolute', top: '-10%', left: '5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(69,176,229,0.09) 0%,transparent 65%)', animation: 'orb-c1 16s ease-in-out infinite', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-10%', right: '5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(36,59,96,0.06) 0%,transparent 65%)', animation: 'orb-c2 20s ease-in-out infinite', filter: 'blur(50px)', pointerEvents: 'none' }} />

      {/* Franjas decorativas */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg,transparent,#45b0e5,transparent)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg,transparent,#45b0e5,transparent)' }} />

      {/* Layout dos columnas */}
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 420px', gap: '5rem', alignItems: 'center' }} className="cinematic-grid">

        {/* Columna izquierda — cita */}
        <div ref={leftRef} style={{ opacity: 0, transform: 'translateY(32px)', transition: 'opacity 1.1s cubic-bezier(0.22,1,0.36,1), transform 1.1s cubic-bezier(0.22,1,0.36,1)' }}>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: '5rem', color: 'rgba(36,59,96,0.1)', lineHeight: 0.6, marginBottom: '1.25rem', userSelect: 'none' }}>"</div>
          <blockquote style={{ fontFamily: 'var(--font-lilita), Lilita One, cursive', color: '#1a2d4a', fontSize: 'clamp(1.7rem, 3vw, 2.7rem)', lineHeight: 1.25, margin: '0 0 2rem', letterSpacing: '-0.01em' }}>
            La gastronomía gallega es el alma de un pueblo que come bien, vive mejor y celebra siempre.
          </blockquote>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ height: 2, width: 48, background: 'rgba(69,176,229,0.5)', borderRadius: 1, flexShrink: 0 }} />
            <p style={{ fontFamily: 'Poppins, sans-serif', color: '#45b0e5', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.12em', margin: 0, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
              Susana Fernández, La Gallega
            </p>
            <div style={{ height: 2, width: 48, background: 'rgba(69,176,229,0.5)', borderRadius: 1, flexShrink: 0 }} />
          </div>
        </div>

        {/* Columna derecha — foto */}
        <div ref={rightRef} style={{ opacity: 0, transform: 'translateY(32px)', transition: 'opacity 1.1s 0.2s cubic-bezier(0.22,1,0.36,1), transform 1.1s 0.2s cubic-bezier(0.22,1,0.36,1)', position: 'relative', display: 'flex', justifyContent: 'center' }}>
          {/* Marco decorativo detrás */}
          <div style={{ position: 'absolute', top: 16, left: 16, right: -16, bottom: -16, borderRadius: '2rem', border: '2px solid rgba(69,176,229,0.3)', zIndex: 0 }} />
          {/* Foto */}
          <div style={{ position: 'relative', width: 340, height: 420, borderRadius: '2rem', overflow: 'hidden', boxShadow: '0 32px 80px rgba(26,45,74,0.18)', animation: 'photo-float 7s ease-in-out infinite', zIndex: 1 }}>
            <Image
              src="/images/original_32874.png"
              alt="Susana La Gallega"
              fill
              unoptimized
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
            />
            {/* Degradado sutil abajo */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(244,243,228,0.4) 0%, transparent 40%)' }} />
          </div>
          {/* Badge flotante */}
          <div style={{ position: 'absolute', bottom: 24, right: -8, background: '#1a2d4a', color: 'white', borderRadius: 9999, padding: '8px 20px', fontFamily: 'var(--font-lilita), Lilita One, cursive', fontSize: '0.95rem', boxShadow: '0 8px 24px rgba(26,45,74,0.25)', zIndex: 2, whiteSpace: 'nowrap' }}>
            ¡Historias que se comen! 🍽️
          </div>
          {/* Badge turquesa */}
          <div style={{ position: 'absolute', top: 32, left: -12, background: '#45b0e5', color: 'white', borderRadius: 9999, padding: '6px 16px', fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '0.7rem', boxShadow: '0 6px 18px rgba(69,176,229,0.4)', zIndex: 2, transform: 'rotate(-4deg)' }}>
            TV Ferrol · Canal 33
          </div>
        </div>
      </div>

      <style>{`
        .cinematic-grid { }
        @media(max-width: 900px) {
          .cinematic-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .cinematic-grid > div:last-child { display: none !important; }
        }
      `}</style>
    </section>
  );
}
