'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';

export function GodalbaSection() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll('.godalba-reveal');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).style.opacity = '1';
          (e.target as HTMLElement).style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });
    items.forEach(i => obs.observe(i));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ background: '#F4F3E4', padding: '6rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
      {/* Destellos decorativos */}
      {[
        { top: '8%', left: '3%' }, { top: '65%', left: '6%' },
        { top: '15%', right: '5%' }, { top: '80%', right: '8%' },
      ].map((p, i) => (
        <svg key={i} style={{ position: 'absolute', opacity: 0.2, ...p as React.CSSProperties, width: 18, height: 18 }} viewBox="0 0 24 24" fill="#45b0e5">
          <path d="M12 2L13.8 9.2L21 8L14.8 13.2L17 21L12 16.2L7 21L9.2 13.2L3 8L10.2 9.2Z"/>
        </svg>
      ))}

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 2 }}>

        {/* ── Cabecera ── */}
        <div className="godalba-reveal" style={{ opacity: 0, transform: 'translateY(32px)', transition: 'opacity 0.8s ease, transform 0.8s ease', textAlign: 'center', marginBottom: '3.5rem' }}>
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#45b0e5', marginBottom: '0.75rem' }}>
            Producto destacado
          </p>
          <h2 style={{ fontFamily: 'var(--font-lilita), Lilita One, cursive', color: '#1a2d4a', fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', lineHeight: 1.05, margin: '0 0 0.75rem' }}>
            MAR DE GODALBA:<br />LUJO ATLÁNTICO EN CADA COPA.
          </h2>
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1rem', color: '#6b7a8d', maxWidth: 560, margin: '0 auto' }}>
            De Galicia para el mundo · <em>By Susana La Gallega</em>
          </p>
        </div>

        {/* ── Foto principal + detalles ── */}
        <div className="godalba-grid godalba-reveal" style={{ opacity: 0, transform: 'translateY(32px)', transition: 'opacity 0.8s 0.1s ease, transform 0.8s 0.1s ease', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center', marginBottom: '3rem' }}>

          {/* Foto atardecer */}
          <div style={{ position: 'relative', borderRadius: '1.5rem', overflow: 'hidden', aspectRatio: '4/5', boxShadow: '0 24px 64px rgba(26,45,74,0.18)' }}>
            <Image
              src="/images/godalba_sunset.jpg"
              alt="Mar de Godalba al atardecer frente al mar"
              fill
              unoptimized
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
            {/* Badge encima */}
            <div style={{ position: 'absolute', top: 16, left: 16, background: 'rgba(26,45,74,0.85)', backdropFilter: 'blur(8px)', color: 'white', borderRadius: 9999, padding: '6px 16px', fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.08em' }}>
              🌊 Lujo Atlántico
            </div>
          </div>

          {/* Detalles vino */}
          <div>
            {/* Nota de cata */}
            <div style={{ background: 'white', borderRadius: '1.25rem', padding: '1.75rem 2rem', marginBottom: '1.25rem', boxShadow: '0 4px 20px rgba(36,59,96,0.08)', borderLeft: '4px solid #45b0e5' }}>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#45b0e5', margin: '0 0 0.5rem' }}>Nota de cata</p>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.92rem', color: '#243b60', lineHeight: 1.75, margin: 0, fontStyle: 'italic' }}>
                "Amarillo dorado con reminiscencias a membrillo. Entrada en boca cítrica y chispeante, fresca y persistente, con un postgusto goloso y equilibrado."
              </p>
            </div>

            {/* Ficha rápida */}
            <div style={{ background: 'white', borderRadius: '1.25rem', padding: '1.5rem 2rem', marginBottom: '1.25rem', boxShadow: '0 4px 20px rgba(36,59,96,0.08)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                {[
                  { label: 'Variedad', value: 'Coupage de nobles blancas' },
                  { label: 'Graduación', value: '12,5% Vol.' },
                  { label: 'Temperatura', value: '10–12 °C' },
                  { label: 'Bodega', value: 'Fernández & Macías' },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#45b0e5', margin: '0 0 0.2rem' }}>{label}</p>
                    <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.87rem', fontWeight: 600, color: '#1a2d4a', margin: 0 }}>{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Maridaje */}
            <div style={{ background: '#1a2d4a', borderRadius: '1.25rem', padding: '1.25rem 1.75rem', marginBottom: '1.5rem' }}>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#45b0e5', margin: '0 0 0.4rem' }}>Maridaje ideal</p>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.87rem', color: 'rgba(199,231,244,0.85)', lineHeight: 1.65, margin: 0 }}>
                Pescados, mariscos, carnes blancas, arroces y quesos frescos.
              </p>
            </div>

            <a
              href="https://www.cedeiragourmet.es/mar-de-godalba_pr498396"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#45b0e5', color: 'white', borderRadius: 9999, padding: '14px 30px', fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.04em', textDecoration: 'none', boxShadow: '0 8px 28px rgba(69,176,229,0.35)', transition: 'all 0.25s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.filter = 'brightness(1.1)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.filter = ''; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
            >
              🍷 Descúbrelo aquí
            </a>
          </div>
        </div>

        {/* ── Dos fotos secundarias: Expo Susana + Orixes Godello ── */}
        <div className="godalba-reveal godalba-bottom-grid" style={{ opacity: 0, transform: 'translateY(32px)', transition: 'opacity 0.8s 0.25s ease, transform 0.8s 0.25s ease', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>

          {/* Foto Susana expo */}
          <div style={{ position: 'relative', borderRadius: '1.25rem', overflow: 'hidden', aspectRatio: '4/3', boxShadow: '0 8px 32px rgba(26,45,74,0.12)' }}>
            <Image
              src="/images/godalba_expo.jpg"
              alt="Susana La Gallega con Mar de Godalba en el Salón Gourmet"
              fill
              unoptimized
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,45,74,0.8) 0%, transparent 55%)' }} />
            <div style={{ position: 'absolute', bottom: 16, left: 18, right: 18 }}>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '0.78rem', color: 'white', margin: 0 }}>Salón de Gourmets · Madrid</p>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.7rem', color: 'rgba(199,231,244,0.8)', margin: '2px 0 0' }}>Mar de Godalba en la feria más importante del sector</p>
            </div>
          </div>

          {/* Orixes Godello */}
          <div style={{ background: 'white', borderRadius: '1.25rem', padding: '1.75rem', display: 'flex', alignItems: 'center', gap: '1.5rem', boxShadow: '0 8px 32px rgba(26,45,74,0.10)', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', width: 90, height: 220, flexShrink: 0 }}>
              <Image
                src="/images/orixes_bottle.jpg"
                alt="Orixes Godello"
                fill
                unoptimized
                style={{ objectFit: 'contain' }}
              />
            </div>
            <div style={{ flex: 1, minWidth: 120 }}>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#45b0e5', margin: '0 0 0.4rem' }}>También recomendado</p>
              <h3 style={{ fontFamily: 'var(--font-lilita), Lilita One, cursive', color: '#1a2d4a', fontSize: '1.3rem', margin: '0 0 0.5rem' }}>Orixes Godello</h3>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.85rem', color: '#6b7a8d', lineHeight: 1.65, margin: '0 0 1rem' }}>
                Godello de autor, complejo y mineral. La otra joya blanca de Galicia.
              </p>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(69,176,229,0.1)', color: '#1a2d4a', borderRadius: 9999, padding: '6px 14px', fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '0.72rem' }}>
                🍾 Vino gallego de calidad
              </span>
            </div>
          </div>
        </div>

        {/* ── Hostal card ── */}
        <div className="godalba-reveal" style={{ opacity: 0, transform: 'translateY(32px)', transition: 'opacity 0.8s 0.4s ease, transform 0.8s 0.4s ease' }}>
          <div style={{ background: 'white', borderRadius: '1.75rem', padding: '2rem 2.5rem', display: 'flex', alignItems: 'center', gap: '2rem', boxShadow: '0 8px 32px rgba(36,59,96,0.1)', flexWrap: 'wrap' }}>
            <div style={{ fontSize: '3.5rem', lineHeight: 1 }}>🏡</div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.18em', color: '#45b0e5', textTransform: 'uppercase', margin: '0 0 0.35rem' }}>Otro proyecto</p>
              <h3 style={{ fontFamily: 'var(--font-lilita), Lilita One, cursive', color: '#1a2d4a', fontSize: '1.5rem', margin: '0 0 0.35rem' }}>Hostal Rústico La Gallega</h3>
              <p style={{ fontFamily: 'Poppins, sans-serif', color: '#6b7a8d', fontSize: '0.9rem', margin: 0 }}>Disfruta de la calma, la tradición y la mejor gastronomía gallega</p>
            </div>
            <a
              href="https://share.google/lguzS1wEED3IE1afD"
              target="_blank"
              rel="noopener noreferrer"
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
        .godalba-bottom-grid { }
        @media(max-width: 768px) {
          .godalba-grid { grid-template-columns: 1fr !important; }
          .godalba-bottom-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
