import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Guía de Sabores | Susana La Gallega',
  description: 'Descarga la Guía de Sabores de Susana La Gallega — tu referencia gastronómica para descubrir lo mejor de la cocina gallega.',
};

export default function GuiaPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#F4F3E4' }}>
      {/* Hero */}
      <section style={{ background: '#1a2d4a', padding: '5rem 1.5rem 4rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.06, backgroundImage: 'radial-gradient(circle, #45b0e5 1.5px, transparent 1.5px)', backgroundSize: '32px 32px', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', maxWidth: 700, margin: '0 auto' }}>
          <span style={{ display: 'inline-block', background: 'rgba(69,176,229,0.15)', color: '#45b0e5', borderRadius: 999, padding: '6px 20px', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.5rem', fontFamily: 'Poppins, sans-serif' }}>
            📖 Descarga gratuita
          </span>
          <h1 style={{ fontFamily: 'var(--font-lilita), Lilita One, cursive', color: 'white', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', lineHeight: 1.1, margin: '0 0 1.25rem' }}>
            Guía de Sabores
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(1rem, 2vw, 1.2rem)', lineHeight: 1.7, margin: '0 0 2.5rem' }}>
            Tu referencia gastronómica para descubrir lo mejor de la cocina gallega, de la mano de Susana La Gallega.
          </p>
          <a
            href="/guia-de-sabores.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', background: '#45b0e5', color: 'white', borderRadius: 999, padding: '1rem 2.5rem', fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '1.05rem', textDecoration: 'none', boxShadow: '0 12px 40px rgba(69,176,229,0.35)', transition: 'transform 0.2s' }}
          >
            <span style={{ fontSize: '1.2rem' }}>📥</span>
            Descargar guía gratis
          </a>
        </div>
      </section>

      {/* Contenido */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '4rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          {[
            { icon: '🦞', title: 'Mariscos y pescados', desc: 'Los mejores productos del mar gallego y cómo disfrutarlos' },
            { icon: '🐙', title: 'Pulpo y tradición', desc: 'Historia y recetas del plato más emblemático de Galicia' },
            { icon: '🍷', title: 'Vinos gallegos', desc: 'Albariños, Ribeiros y otras joyas de las Rías Baixas' },
            { icon: '📍', title: 'Dónde comer', desc: 'Restaurantes y pulperías seleccionados por Susana' },
          ].map(item => (
            <div key={item.title} style={{ background: 'white', borderRadius: '1.25rem', padding: '1.5rem', border: '1px solid rgba(26,45,74,0.08)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{item.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-lilita), Lilita One, cursive', color: '#1a2d4a', fontSize: '1.1rem', margin: '0 0 0.5rem' }}>{item.title}</h3>
              <p style={{ color: '#6b7a8d', fontSize: '0.88rem', margin: 0, lineHeight: 1.6, fontFamily: 'Poppins, sans-serif' }}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA final */}
        <div style={{ background: '#1a2d4a', borderRadius: '1.5rem', padding: '2.5rem', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-lilita), Lilita One, cursive', color: 'white', fontSize: '1.8rem', margin: '0 0 0.75rem' }}>
            ¿Lista para explorar Galicia?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'Poppins, sans-serif', fontSize: '0.95rem', margin: '0 0 1.75rem', lineHeight: 1.6 }}>
            Descarga la guía y descubre los sabores que hacen única la gastronomía gallega.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="/guia-de-sabores.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: '#45b0e5', color: 'white', borderRadius: 999, padding: '0.85rem 2rem', fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none' }}
            >
              📥 Descargar PDF
            </a>
            <Link
              href="/restaurantes"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(255,255,255,0.1)', color: 'white', borderRadius: 999, padding: '0.85rem 2rem', fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none' }}
            >
              Ver restaurantes →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
