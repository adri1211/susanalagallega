'use client';
import { useEffect, useRef } from 'react';

export function GodalbaSection() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll('.godalba-reveal');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { (e.target as HTMLElement).style.opacity = '1'; (e.target as HTMLElement).style.transform = 'translateY(0)'; } });
    }, { threshold: 0.1 });
    items.forEach(i => obs.observe(i));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ background: '#F4F3E4', padding: '6rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
      {/* Copas decorativas SVG grandes */}
      <svg style={{ position: 'absolute', left: -40, bottom: 0, width: 260, opacity: 0.07, transform: 'rotate(-10deg)' }} viewBox="0 0 160 260" fill="none">
        <path d="M80 10C80 10 20 80 20 130C20 168 50 192 50 192L50 240L28 252L132 252L110 240L110 192C110 192 140 168 140 130C140 80 80 10 80 10Z" stroke="#1a2d4a" strokeWidth="6" fill="rgba(69,176,229,0.3)"/>
        <ellipse cx="80" cy="250" rx="52" ry="8" stroke="#1a2d4a" strokeWidth="4"/>
      </svg>
      <svg style={{ position: 'absolute', right: -20, top: 20, width: 200, opacity: 0.07, transform: 'rotate(8deg) scaleX(-1)' }} viewBox="0 0 160 260" fill="none">
        <path d="M80 10C80 10 20 80 20 130C20 168 50 192 50 192L50 240L28 252L132 252L110 240L110 192C110 192 140 168 140 130C140 80 80 10 80 10Z" stroke="#1a2d4a" strokeWidth="6" fill="rgba(69,176,229,0.3)"/>
        <ellipse cx="80" cy="250" rx="52" ry="8" stroke="#1a2d4a" strokeWidth="4"/>
      </svg>

      {/* Destellos */}
      {[
        { top: '12%', left: '6%' }, { top: '70%', left: '10%' },
        { top: '20%', right: '8%' }, { top: '75%', right: '12%' },
      ].map((p, i) => (
        <svg key={i} style={{ position: 'absolute', opacity: 0.25, ...p as React.CSSProperties, width: 20, height: 20 }} viewBox="0 0 24 24" fill="#45b0e5">
          <path d="M12 2L13.8 9.2L21 8L14.8 13.2L17 21L12 16.2L7 21L9.2 13.2L3 8L10.2 9.2Z"/>
        </svg>
      ))}

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} className="godalba-grid">

          {/* Texto */}
          <div className="godalba-reveal" style={{ opacity: 0, transform: 'translateY(32px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}>
            <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#45b0e5', marginBottom: '1rem' }}>
              Producto destacado
            </p>
            <h2 style={{ fontFamily: 'Lilita One, cursive', color: '#1a2d4a', fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1.05, margin: '0 0 1.25rem' }}>
              MAR DE GODALBA:<br />
              LUJO ATLÁNTICO<br />
              EN CADA COPA.
            </h2>
            <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '1.05rem', color: '#243b60', margin: '0 0 0.5rem' }}>
              Ideal para acompañar los mejores momentos.
            </p>
            <p style={{ fontFamily: 'Poppins, sans-serif', fontStyle: 'italic', fontSize: '0.9rem', color: '#6b7a8d', margin: '0 0 2.25rem' }}>
              De Galicia para el mundo · By Susana La Gallega
            </p>
            <a href="https://www.cedeiragourmet.es/mar-de-godalba_pr498396" target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#1a2d4a', color: 'white', borderRadius: 9999, padding: '14px 30px', fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.06em', textDecoration: 'none', textTransform: 'uppercase', boxShadow: '0 8px 28px rgba(26,45,74,0.25)', transition: 'all 0.25s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#45b0e5'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#1a2d4a'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
            >
              🍷 Descúbrelo aquí
            </a>
          </div>

          {/* Visual copa animada */}
          <div className="godalba-reveal" style={{ opacity: 0, transform: 'translateY(32px)', transition: 'opacity 0.8s 0.2s ease, transform 0.8s 0.2s ease', display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: 260, height: 340 }}>
              <style>{`
                @keyframes copa-float { 0%,100%{transform:translateY(0) rotate(-1deg)} 50%{transform:translateY(-14px) rotate(1deg)} }
                .copa-svg { animation: copa-float 5s ease-in-out infinite; }
              `}</style>
              <svg className="copa-svg" viewBox="0 0 200 280" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 16px 40px rgba(26,45,74,0.18))' }}>
                <path d="M100 16C100 16 32 78 32 128C32 168 62 190 62 190L62 248L38 260L162 260L138 248L138 190C138 190 168 168 168 128C168 78 100 16 100 16Z" fill="#C7E7F4" stroke="#1a2d4a" strokeWidth="3.5"/>
                <path d="M57 148C62 148 100 186 143 148C142 170 122 190 100 190C78 190 58 170 57 148Z" fill="#45b0e5" opacity="0.45"/>
                <ellipse cx="100" cy="258" rx="62" ry="9" fill="rgba(26,45,74,0.12)"/>
                <path d="M72 46C75 58 73 82 69 98" stroke="white" strokeWidth="3.5" strokeLinecap="round" opacity="0.55"/>
                <path d="M88 36C89 44 88 56 86 64" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.35"/>
              </svg>
              <div style={{ position: 'absolute', top: 20, right: -28, background: '#1a2d4a', color: 'white', borderRadius: 9999, padding: '7px 18px', fontFamily: 'Lilita One, cursive', fontSize: '1.05rem', transform: 'rotate(14deg)', boxShadow: '0 6px 20px rgba(0,0,0,0.22)' }}>
                Albariño
              </div>
              <div style={{ position: 'absolute', bottom: 60, left: -24, background: '#45b0e5', color: 'white', borderRadius: 9999, padding: '5px 14px', fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '0.7rem', transform: 'rotate(-8deg)', boxShadow: '0 4px 14px rgba(69,176,229,0.4)' }}>
                Galicia 🌊
              </div>
            </div>
          </div>
        </div>

        {/* Hostal card */}
        <div className="godalba-reveal" style={{ opacity: 0, transform: 'translateY(32px)', transition: 'opacity 0.8s 0.35s ease, transform 0.8s 0.35s ease', marginTop: '3.5rem' }}>
          <div style={{ background: 'white', borderRadius: '1.75rem', padding: '2rem 2.5rem', display: 'flex', alignItems: 'center', gap: '2rem', boxShadow: '0 8px 32px rgba(36,59,96,0.1)', flexWrap: 'wrap' }}>
            <div style={{ fontSize: '3.5rem', lineHeight: 1 }}>🏡</div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.18em', color: '#45b0e5', textTransform: 'uppercase', margin: '0 0 0.35rem' }}>Otro proyecto</p>
              <h3 style={{ fontFamily: 'Lilita One, cursive', color: '#1a2d4a', fontSize: '1.5rem', margin: '0 0 0.35rem' }}>Hostal Rústico La Gallega</h3>
              <p style={{ fontFamily: 'Poppins, sans-serif', color: '#6b7a8d', fontSize: '0.9rem', margin: 0 }}>Disfruta de la calma, la tradición y la mejor gastronomía gallega</p>
            </div>
            <a href="https://share.google/lguzS1wEED3IE1afD" target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '2px solid #1a2d4a', color: '#1a2d4a', borderRadius: 9999, padding: '12px 24px', fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '0.82rem', textDecoration: 'none', whiteSpace: 'nowrap', transition: 'all 0.25s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#1a2d4a'; (e.currentTarget as HTMLElement).style.color = 'white'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#1a2d4a'; }}
            >
              Conócelo aquí →
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .godalba-grid { }
        @media(max-width: 768px) { .godalba-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
