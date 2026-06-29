'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

const CATS = [
  { slug: 'marisqueria', emoji: '🦞', label: 'Marisquería', desc: 'Del mar a la mesa', color: '#1a4a6b' },
  { slug: 'pulperia', emoji: '🐙', label: 'Pulpería', desc: 'Tradición gallega', color: '#2d1a4a' },
  { slug: 'parrillada', emoji: '🥩', label: 'Parrillada', desc: 'Fuego y sabor', color: '#4a1a1a' },
  { slug: 'taperia', emoji: '🍺', label: 'Tapería', desc: 'Pinchos y raciones', color: '#1a3a4a' },
  { slug: 'tradicional', emoji: '🏠', label: 'Tradicional', desc: 'Cocina de siempre', color: '#243b60' },
  { slug: 'cocina-moderna', emoji: '✨', label: 'Cocina moderna', desc: 'Creatividad sin límites', color: '#1a2d4a' },
  { slug: 'bar', emoji: '☕', label: 'Bar & café', desc: 'El ritual del café', color: '#3a2a1a' },
  { slug: 'cafeteria', emoji: '🥐', label: 'Cafetería', desc: 'Buenos días, Galicia', color: '#1a3a2a' },
];

export function CategoriesSection() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const items = ref.current?.querySelectorAll('.cat-item') ?? [];
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) (e.target as HTMLElement).style.opacity = '1', (e.target as HTMLElement).style.transform = 'translateY(0) scale(1)'; });
    }, { threshold: 0.08 });
    items.forEach(i => obs.observe(i));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ background: '#0d1e36', padding: '6rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
      {/* Cuadrícula sutil */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(69,176,229,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(69,176,229,0.03) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem', marginBottom: '3.5rem' }}>
          <div>
            <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#45b0e5', marginBottom: '0.6rem' }}>
              ¿Qué te apetece hoy?
            </p>
            <h2 style={{ fontFamily: 'Lilita One, cursive', color: 'white', fontSize: 'clamp(2rem, 4vw, 3rem)', margin: 0, lineHeight: 1.05 }}>
              Elige tu tipo de cocina
            </h2>
          </div>
          <Link href="/restaurantes" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1.5px solid rgba(69,176,229,0.4)', color: '#45b0e5', borderRadius: 9999, padding: '10px 22px', fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '0.82rem', textDecoration: 'none', transition: 'all 0.25s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#45b0e5'; (e.currentTarget as HTMLElement).style.color = 'white'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#45b0e5'; }}
          >
            Ver todos →
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }} className="cats-grid">
          {CATS.map((cat, i) => (
            <Link key={cat.slug} href={`/restaurantes?categoria=${cat.slug}`} className="cat-item"
              style={{
                display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                height: 210,
                borderRadius: '1.5rem', overflow: 'hidden', textDecoration: 'none',
                position: 'relative', background: cat.color,
                opacity: 0, transform: 'translateY(24px) scale(0.97)',
                transition: `opacity 0.7s ${i * 60}ms ease, transform 0.7s ${i * 60}ms ease`,
                border: '1px solid rgba(69,176,229,0.1)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'translateY(-6px) scale(1.03)';
                el.style.boxShadow = '0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(69,176,229,0.3)';
                const emoji = el.querySelector('.cat-emoji') as HTMLElement;
                if (emoji) emoji.style.transform = 'scale(1.3) rotate(-8deg)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'translateY(0) scale(1)';
                el.style.boxShadow = 'none';
                const emoji = el.querySelector('.cat-emoji') as HTMLElement;
                if (emoji) emoji.style.transform = 'scale(1) rotate(0deg)';
              }}
            >
              {/* Emoji grande al fondo */}
              <div className="cat-emoji" style={{ position: 'absolute', top: 16, right: 16, fontSize: '3.5rem', lineHeight: 1, opacity: 0.4, transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1)' }}>
                {cat.emoji}
              </div>
              {/* Gradiente inferior */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' }} />
              {/* Texto */}
              <div style={{ position: 'relative', padding: '1.25rem' }}>
                <p style={{ fontFamily: 'Lilita One, cursive', color: 'white', fontSize: '1.1rem', margin: '0 0 2px', lineHeight: 1.2 }}>{cat.label}</p>
                <p style={{ fontFamily: 'Poppins, sans-serif', color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem', fontWeight: 600, margin: 0 }}>{cat.desc}</p>
              </div>
              {/* Arrow turquesa */}
              <div style={{ position: 'absolute', top: 16, left: 16, width: 32, height: 32, borderRadius: '50%', background: 'rgba(69,176,229,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>→</div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @media(max-width: 1024px) { .cats-grid { grid-template-columns: repeat(3,1fr) !important; } }
        @media(max-width: 640px) { .cats-grid { grid-template-columns: repeat(2,1fr) !important; } }
      `}</style>
    </section>
  );
}
