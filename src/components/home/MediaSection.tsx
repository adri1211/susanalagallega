'use client';
import { useEffect, useRef } from 'react';

const LOGOS = [
  { label: 'Antena 3', color: '#FF6600', bg: '#fff5f0', text: 'A3' },
  { label: 'Telecinco', color: '#0057A8', bg: '#f0f5ff', text: '5' },
  { label: 'COPE', color: '#003087', bg: '#f0f4ff', text: 'COPE' },
  { label: 'Tele Sur', sub: 'Madrid', color: '#1a2d4a', bg: '#1a2d4a', textColor: '#45b0e5' },
  { label: 'TV Ferrol', sub: 'Canal 34', color: '#243b60', bg: '#243b60', textColor: 'white' },
  { label: 'YouTube', sub: '@susanalagallega', color: '#FF0000', bg: '#1a1a1a', textColor: 'white' },
];

export function MediaSection() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const cards = el.querySelectorAll('.media-card-reveal');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { (e.target as HTMLElement).style.opacity = '1'; (e.target as HTMLElement).style.transform = 'translateY(0) scale(1)'; } });
    }, { threshold: 0.1 });
    cards.forEach(c => obs.observe(c));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ background: 'linear-gradient(180deg, #C7E7F4 0%, #daeef8 100%)', padding: '5.5rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
      {/* Patrón de fondo */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'radial-gradient(circle, #243b60 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(36,59,96,0.45)', marginBottom: '0.75rem' }}>
          Presencia en medios
        </p>
        <h2 style={{ fontFamily: 'Lilita One, cursive', color: '#1a2d4a', fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', margin: '0 0 0.75rem', lineHeight: 1.05 }}>
          Me habrás visto en…
        </h2>
        <p style={{ fontFamily: 'Poppins, sans-serif', color: 'rgba(36,59,96,0.55)', fontSize: '0.95rem', margin: '0 0 3.5rem', maxWidth: 400, marginLeft: 'auto', marginRight: 'auto' }}>
          Televisión, radio y redes — Susana lleva la gastronomía gallega a todos los rincones
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '1.25rem' }}>
          {LOGOS.map((logo, i) => {
            const isDark = !!logo.bg && (logo.bg === '#1a2d4a' || logo.bg === '#243b60' || logo.bg === '#1a1a1a');
            return (
              <div key={logo.label} className="media-card-reveal" style={{
                background: logo.bg || 'white',
                borderRadius: '1.5rem',
                padding: '1.5rem 2rem',
                minWidth: 150, minHeight: 90,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4,
                boxShadow: isDark ? '0 8px 32px rgba(0,0,0,0.25)' : '0 6px 28px rgba(36,59,96,0.1)',
                opacity: 0,
                transform: 'translateY(24px) scale(0.95)',
                transition: `opacity 0.6s ${i * 80}ms ease, transform 0.6s ${i * 80}ms ease`,
                cursor: 'default',
              }}>
                <span style={{ fontFamily: 'Lilita One, cursive', fontSize: logo.text === 'COPE' ? '1.4rem' : logo.text === '5' ? '2rem' : logo.text === 'A3' ? '1.6rem' : '1.1rem', color: logo.textColor || logo.color, lineHeight: 1 }}>
                  {logo.text || logo.label}
                </span>
                {logo.sub && <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: logo.textColor ? 'rgba(255,255,255,0.55)' : 'rgba(36,59,96,0.45)' }}>{logo.sub}</span>}
                {!logo.text && !logo.sub && <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.7rem', fontWeight: 700, color: 'rgba(36,59,96,0.5)' }}>{logo.label}</span>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
