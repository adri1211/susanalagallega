'use client';

import Link from 'next/link';

const CATS = [
  { slug: 'marisqueria', emoji: '🦞', label: 'Marisquería' },
  { slug: 'pulperia', emoji: '🐙', label: 'Pulpería' },
  { slug: 'parrillada', emoji: '🥩', label: 'Parrillada' },
  { slug: 'taperia', emoji: '🍺', label: 'Tapería' },
  { slug: 'tradicional', emoji: '🏠', label: 'Tradicional' },
  { slug: 'cocina-moderna', emoji: '✨', label: 'Cocina moderna' },
  { slug: 'bar', emoji: '☕', label: 'Bar & café' },
  { slug: 'cafeteria', emoji: '🥐', label: 'Cafetería' },
];

export function CategoriesSection() {
  return (
    <section style={{ background: '#ffffff', padding: '5rem 0' }}>
      <div style={{ maxWidth: 1152, margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Header */}
        <div style={{ marginBottom: '3rem' }}>
          <span className="section-label" style={{ color: '#45b0e5', marginBottom: 8, display: 'block' }}>
            ¿Qué te apetece hoy?
          </span>
          <h2 style={{ fontFamily: 'Lilita One, cursive', color: '#243b60', fontSize: 'clamp(2rem, 4vw, 2.8rem)', margin: 0 }}>
            Elige tu tipo de cocina
          </h2>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1rem',
        }}>
          {CATS.map((cat, i) => {
            const dark = i % 3 === 0;
            return (
              <Link
                key={cat.slug}
                href={`/restaurantes?categoria=${cat.slug}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  padding: '1.5rem',
                  borderRadius: '1.25rem',
                  background: dark ? '#243b60' : '#F4F3E4',
                  border: dark ? 'none' : '1px solid rgba(36,59,96,0.08)',
                  textDecoration: 'none',
                  transition: 'transform 0.25s, box-shadow 0.25s',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = dark
                    ? '0 12px 32px rgba(36,59,96,0.35)'
                    : '0 12px 32px rgba(36,59,96,0.12)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                <span style={{ fontSize: '2rem', lineHeight: 1 }}>{cat.emoji}</span>
                <span style={{
                  fontFamily: 'Lilita One, cursive',
                  fontSize: '1rem',
                  color: dark ? '#ffffff' : '#243b60',
                  lineHeight: 1.2,
                }}>
                  {cat.label}
                </span>
                {/* Arrow */}
                <span style={{
                  position: 'absolute', bottom: 16, right: 16,
                  color: dark ? 'rgba(69,176,229,0.7)' : 'rgba(36,59,96,0.25)',
                  fontSize: '1.1rem', fontWeight: 700,
                }}>→</span>
              </Link>
            );
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Link href="/restaurantes" className="btn-outline">
            Ver todos los restaurantes →
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .cats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .cats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
