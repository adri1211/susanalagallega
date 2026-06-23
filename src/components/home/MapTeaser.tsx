'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Download, MapPin } from 'lucide-react';

const CIUDADES = [
  { label: 'Ferrol', slug: 'ferrol', n: 5 },
  { label: 'Narón', slug: 'naron', n: 3 },
  { label: 'Cedeira', slug: 'cedeira', n: 2 },
  { label: 'A Coruña', slug: 'a-coruna', n: 4 },
  { label: 'Santiago', slug: 'santiago-de-compostela', n: 2 },
  { label: 'Madrid', slug: 'madrid', n: 15 },
];

export function MapTeaser() {
  return (
    <section style={{ background: '#ffffff', padding: '5rem 0' }}>
      <style>{`
        .ciudad-link { transition: all 0.2s; }
        .ciudad-link:hover { border-color: #45b0e5 !important; background: #C7E7F4 !important; }
        @media(max-width:768px){
          .guide-layout { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .guide-photo { height: 300px !important; }
          .guide-badge { display: none !important; }
        }
      `}</style>
      <div style={{ maxWidth: 1152, margin: '0 auto', padding: '0 1.5rem' }}>
        <div className="guide-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>

          {/* Izquierda */}
          <div>
            <span style={{ display: 'block', fontFamily: 'Poppins, sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#45b0e5', marginBottom: 10 }}>Llévala contigo</span>
            <h2 style={{ fontFamily: 'Lilita One, cursive', color: '#243b60', fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', margin: '0 0 1.25rem', lineHeight: 1.1 }}>
              La guía de sabores<br />gratuita de Susana
            </h2>
            <p style={{ color: '#6b7a8d', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '2rem', maxWidth: 440 }}>
              Susana ha reunido sus mejores recomendaciones en una guía descargable gratuita. Restaurantes, secretos y los rincones favoritos de Galicia — todo en tu bolsillo.
            </p>
            <a href="/guia-de-sabores.pdf" download className="btn-azul" style={{ marginBottom: '2.5rem', display: 'inline-flex' }}>
              <Download size={16} />
              Descargar guía gratis (PDF)
            </a>

            <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(36,59,96,0.4)', marginBottom: '1rem', display: 'block' }}>
              Restaurantes por ciudad
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.625rem' }}>
              {CIUDADES.map(c => (
                <Link key={c.slug} href={`/restaurantes?localidad=${c.slug}`} className="ciudad-link"
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8, padding: '0.625rem 0.875rem',
                    background: '#F4F3E4', borderRadius: '0.75rem',
                    border: '1px solid rgba(36,59,96,0.07)', textDecoration: 'none',
                  }}>
                  <MapPin size={12} style={{ color: '#45b0e5', flexShrink: 0 }} />
                  <div>
                    <p style={{ color: '#243b60', fontSize: '0.78rem', fontWeight: 700, margin: 0 }}>{c.label}</p>
                    <p style={{ color: '#6b7a8d', fontSize: '0.65rem', margin: 0 }}>{c.n} sitios</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Derecha — foto */}
          <div style={{ position: 'relative' }}>
            <div className="guide-photo" style={{ borderRadius: '1.5rem', overflow: 'hidden', height: 520, position: 'relative' }}>
              <Image src="/images/original_32884.png" alt="Gastronomía gallega" fill unoptimized style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,45,74,0.92) 0%, rgba(26,45,74,0.1) 55%, transparent 100%)' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2rem' }}>
                <blockquote style={{ color: 'rgba(255,255,255,0.88)', fontSize: '0.92rem', fontStyle: 'italic', margin: '0 0 10px', lineHeight: 1.6 }}>
                  &ldquo;Las recomendaciones de Susana nunca fallan, descubrí un restaurante increíble en Ferrol&rdquo;
                </blockquote>
                <p style={{ color: '#45b0e5', fontSize: '0.75rem', fontWeight: 700, margin: 0 }}>— Seguidora del programa</p>
              </div>
            </div>
            <div className="guide-badge" style={{
              position: 'absolute', top: -16, right: -16,
              width: 96, height: 96, borderRadius: '50%', background: '#45b0e5',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 8px 32px rgba(69,176,229,0.35)',
            }}>
              <span style={{ fontFamily: 'Lilita One, cursive', color: 'white', fontSize: '1.6rem', lineHeight: 1 }}>+30</span>
              <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', textAlign: 'center', lineHeight: 1.3 }}>Restaurantes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
