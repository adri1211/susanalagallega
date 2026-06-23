import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SaboreandoVideos } from '@/components/saboreando/SaboreandoVideos';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Saboreando con Susana | El programa de gastronomía gallega',
  description: 'Saboreando con Susana es el programa de gastronomía gallega en TV Ferrol y Canal 33 Madrid. Descubre los mejores restaurantes y productos de Galicia.',
};

export default function SaboreandoPage() {
  return (
    <main>

      {/* ── HERO ── */}
      <section style={{ background: '#1a2d4a', padding: '8rem 1.5rem 5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.08 }}>
          <Image src="/images/original_32874.png" alt="" fill unoptimized style={{ objectFit: 'cover', objectPosition: 'center top' }} />
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(26,45,74,0.7) 0%, #1a2d4a 100%)' }} />
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(69,176,229,0.12)', border: '1px solid rgba(69,176,229,0.28)', borderRadius: 9999, padding: '7px 18px', marginBottom: 24 }}>
            <span style={{ color: '#45b0e5', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>El programa</span>
          </div>
          <h1 style={{ fontFamily: 'Lilita One, cursive', color: 'white', fontSize: 'clamp(2.8rem, 7vw, 5rem)', margin: '0 0 1.5rem', lineHeight: 1.05 }}>
            Saboreando<br />con Susana
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 'clamp(1rem, 1.5vw, 1.15rem)', lineHeight: 1.75, maxWidth: 580, margin: '0 auto 2rem' }}>
            Nacido en la TV de Ferrol y ahora también en Canal 33 Madrid — el programa que combina pasión culinaria, productos auténticos y lugares que merecen ser descubiertos.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
            {['📺 TV Ferrol · Canal 34', '📺 Canal 33 Madrid', '▶️ YouTube'].map(c => (
              <span key={c} style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.82rem', fontWeight: 600, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 9999, padding: '8px 18px' }}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── VÍDEOS ── */}
      <section style={{ background: '#F4F3E4', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ display: 'block', fontFamily: 'Poppins, sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#45b0e5', marginBottom: 10 }}>Episodios</span>
            <h2 style={{ fontFamily: 'Lilita One, cursive', color: '#243b60', fontSize: 'clamp(2rem, 4vw, 2.8rem)', margin: 0 }}>Ve los episodios</h2>
          </div>
          <SaboreandoVideos />
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <a href="https://www.youtube.com/@susanalagallega" target="_blank" rel="noopener noreferrer" className="btn-azul">
              ▶️ Ver todos en YouTube →
            </a>
          </div>
        </div>
      </section>

      {/* ── SOBRE SUSANA ── */}
      <section style={{ background: '#ffffff', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div style={{ position: 'relative', borderRadius: '1.5rem', overflow: 'hidden', height: 440 }}>
              <Image src="/images/original_32853.png" alt="Susana La Gallega" fill unoptimized style={{ objectFit: 'cover' }} />
            </div>
            <div>
              <span style={{ display: 'block', fontFamily: 'Poppins, sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#45b0e5', marginBottom: 16 }}>Quién soy</span>
              <h2 style={{ fontFamily: 'Lilita One, cursive', color: '#243b60', fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', margin: '0 0 1.25rem', lineHeight: 1.1 }}>
                Susana Fernández,<br />La Gallega
              </h2>
              <p style={{ color: '#6b7a8d', fontSize: '0.95rem', lineHeight: 1.8, margin: '0 0 1.5rem' }}>
                Soy Susana Fernández, aunque todos me conocen como La Gallega. Apasionada de la gastronomía y de descubrir rincones únicos, comparto mi viaje entre fogones, restaurantes y productos con alma.
              </p>
              <blockquote style={{
                borderLeft: '3px solid #45b0e5', paddingLeft: '1.25rem',
                color: '#243b60', fontStyle: 'italic', fontSize: '1rem',
                fontWeight: 500, margin: '0 0 2rem', lineHeight: 1.65,
              }}>
                &ldquo;Las recomendaciones de Susana nunca fallan, descubrí un restaurante increíble en Ferrol&rdquo;
              </blockquote>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <a href="https://wa.me/34608756544" target="_blank" rel="noopener noreferrer" className="btn-turquesa">
                  Contactar con Susana
                </a>
                <Link href="/colaboraciones" className="btn-outline">
                  Colaboraciones
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`@media(max-width:768px){.sobre-grid{grid-template-columns:1fr !important;} .sobre-foto{height:280px !important;}}`}</style>
    </main>
  );
}
