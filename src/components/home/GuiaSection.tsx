import Link from 'next/link';
import Image from 'next/image';

export function GuiaSection() {
  return (
    <section style={{ background: '#1a2d4a', padding: '5rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
      {/* Fondo decorativo */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'radial-gradient(circle, #45b0e5 1.5px, transparent 1.5px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '-20%', right: '-5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(69,176,229,0.12) 0%, transparent 65%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} className="guia-grid">

        {/* Texto */}
        <div style={{ position: 'relative' }}>
          <span style={{ display: 'inline-block', background: 'rgba(69,176,229,0.15)', color: '#45b0e5', borderRadius: 999, padding: '5px 18px', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.25rem', fontFamily: 'Poppins, sans-serif' }}>
            📖 Descarga gratuita
          </span>
          <h2 style={{ fontFamily: 'var(--font-lilita), Lilita One, cursive', color: 'white', fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.1, margin: '0 0 1.25rem' }}>
            Guía de Sabores<br />
            <span style={{ color: '#45b0e5' }}>de Ferrolterra y Ortegal</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'Poppins, sans-serif', fontSize: '1rem', lineHeight: 1.75, margin: '0 0 2rem' }}>
            Tu guía de eventos, ferias y fiestas de la comarca. Descubre los mejores restaurantes, productos y tradiciones gastronómicas de Ferrolterra y Ortegal.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a
              href="/guia-de-sabores.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: '#45b0e5', color: 'white', borderRadius: 999, padding: '0.9rem 2rem', fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none', boxShadow: '0 10px 32px rgba(69,176,229,0.35)' }}
            >
              <span>📥</span> Descargar gratis
            </a>
            <Link
              href="/guia"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(255,255,255,0.08)', color: 'white', borderRadius: 999, padding: '0.9rem 2rem', fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }}
            >
              Ver más →
            </Link>
          </div>
        </div>

        {/* Card del PDF */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <a
            href="/guia-de-sabores.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'block', textDecoration: 'none', position: 'relative' }}
          >
            {/* Portada PDF */}
            <div style={{ width: 240, borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Image
                src="/images/guia-portada-crop.jpg"
                alt="Guía de Sabores de Ferrolterra y Ortegal"
                width={490}
                height={500}
                style={{ width: '100%', height: 'auto', display: 'block' }}
                unoptimized
              />
            </div>
            {/* Badge */}
            <div style={{ position: 'absolute', top: -12, right: -12, background: '#F4F3E4', color: '#1a2d4a', borderRadius: 999, padding: '4px 14px', fontSize: '0.72rem', fontWeight: 700, fontFamily: 'Poppins, sans-serif', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
              ¡GRATIS!
            </div>
            {/* Botón overlay */}
            <div style={{ position: 'absolute', bottom: -16, left: '50%', transform: 'translateX(-50%)', background: '#45b0e5', color: 'white', borderRadius: 999, padding: '8px 24px', fontSize: '0.82rem', fontWeight: 700, fontFamily: 'Poppins, sans-serif', whiteSpace: 'nowrap', boxShadow: '0 8px 24px rgba(69,176,229,0.4)' }}>
              📥 Descargar PDF
            </div>
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .guia-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .guia-grid > div:last-child { justify-content: flex-start !important; }
        }
      `}</style>
    </section>
  );
}
