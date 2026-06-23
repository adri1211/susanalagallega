import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Colaboraciones | Susana La Gallega',
  description: '¿Quieres que Susana La Gallega recomiende tu restaurante? Aparece en el programa de TV, en la guía gastronómica o en el directorio online.',
};

const FORMAS = [
  { numero: '01', titulo: 'Aparición en TV', desc: 'Tu restaurante o producto en el programa Saboreando con Susana, emitido en TV Ferrol (Canal 34) y Canal 33 Madrid. Alcance real, audiencia fiel.' },
  { numero: '02', titulo: 'Guía Gastronómica', desc: 'Inclusión en la guía de sabores descargable que miles de personas consultan antes de salir a comer. PDF distribuido en redes y web.' },
  { numero: '03', titulo: 'Directorio web', desc: 'Ficha completa en el directorio online con fotos, descripción, contacto y enlace directo. Posicionamiento SEO incluido.' },
];

export default function ColaboracionesPage() {
  return (
    <main>
      <style>{`
        .colabs-forma { transition: transform 0.25s; }
        .colabs-forma:hover { transform: translateY(-4px); }
        .colabs-logo { filter: grayscale(50%); transition: filter 0.2s; }
        .colabs-logo:hover { filter: none; }
        .ciudad-chip { transition: all 0.2s; }
        .ciudad-chip:hover { border-color: #45b0e5 !important; background: #C7E7F4 !important; }
        @media(max-width:768px){
          .colabs-grid { grid-template-columns: 1fr !important; }
          .hero-title { font-size: 2.2rem !important; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ background: '#1a2d4a', padding: '8rem 1.5rem 5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -120, right: -80, width: 400, height: 400, borderRadius: '50%', background: 'rgba(69,176,229,0.07)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -60, left: -60, width: 280, height: 280, borderRadius: '50%', background: 'rgba(69,176,229,0.05)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(69,176,229,0.12)', border: '1px solid rgba(69,176,229,0.28)', borderRadius: 9999, padding: '7px 18px', marginBottom: 24 }}>
            <span style={{ color: '#45b0e5', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Trabaja conmigo</span>
          </div>
          <h1 className="hero-title" style={{ fontFamily: 'Lilita One, cursive', color: 'white', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', margin: '0 0 1.25rem', lineHeight: 1.05 }}>
            ¿Quieres que Susana<br />recomiende tu restaurante?
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 'clamp(1rem, 1.5vw, 1.15rem)', lineHeight: 1.75, maxWidth: 600, margin: '0 auto 2.5rem' }}>
            Si tienes un restaurante, producto o proyecto gastronómico y quieres llegar a miles de personas apasionadas por la buena mesa, hablemos.
          </p>
          <a href="https://wa.me/34608756544" target="_blank" rel="noopener noreferrer" className="btn-turquesa" style={{ fontSize: '1rem', padding: '0.9rem 2rem' }}>
            💬 Contactar por WhatsApp
          </a>
        </div>
      </section>

      {/* ── FORMAS ── */}
      <section style={{ background: '#ffffff', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ display: 'block', fontFamily: 'Poppins, sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#45b0e5', marginBottom: 10 }}>¿Cómo trabajamos?</span>
            <h2 style={{ fontFamily: 'Lilita One, cursive', color: '#243b60', fontSize: 'clamp(2rem, 4vw, 3rem)', margin: 0 }}>Tres formas de colaborar</h2>
          </div>
          <div className="colabs-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {FORMAS.map((f, i) => (
              <div key={f.numero} className="colabs-forma" style={{
                padding: '2.5rem 2rem',
                borderRadius: '1.5rem',
                background: i === 1 ? '#243b60' : '#F4F3E4',
                border: i === 1 ? 'none' : '1px solid rgba(36,59,96,0.07)',
              }}>
                <div style={{ fontFamily: 'Lilita One, cursive', fontSize: '3.5rem', lineHeight: 1, color: i === 1 ? 'rgba(69,176,229,0.3)' : 'rgba(36,59,96,0.1)', marginBottom: '1.25rem' }}>
                  {f.numero}
                </div>
                <h3 style={{ fontFamily: 'Lilita One, cursive', fontSize: '1.4rem', color: i === 1 ? 'white' : '#243b60', margin: '0 0 0.75rem' }}>
                  {f.titulo}
                </h3>
                <p style={{ color: i === 1 ? 'rgba(255,255,255,0.65)' : '#6b7a8d', fontSize: '0.9rem', lineHeight: 1.75, margin: 0 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COLABORADORES ── */}
      <section style={{ background: '#F4F3E4', padding: '4rem 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(36,59,96,0.4)', marginBottom: '2rem' }}>Colaboradores</p>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '3rem', flexWrap: 'wrap' }}>
            {['/images/original_32882.png', '/images/original_32883.png', '/images/original_32986.png'].map((src, i) => (
              <div key={i} className="colabs-logo" style={{ width: 90, height: 60, position: 'relative' }}>
                <Image src={src} alt="Colaborador" fill unoptimized style={{ objectFit: 'contain' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: '#243b60', padding: '5rem 1.5rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, height: 600, borderRadius: '50%', background: 'rgba(69,176,229,0.05)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', maxWidth: 700, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Lilita One, cursive', color: 'white', fontSize: 'clamp(2rem, 4vw, 3rem)', margin: '0 0 1rem' }}>
            Hablemos de tu proyecto
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', lineHeight: 1.75, margin: '0 auto 2.5rem', maxWidth: 500 }}>
            Escríbeme directamente por WhatsApp y en menos de 24 horas te explico todas las opciones.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="https://wa.me/34608756544" target="_blank" rel="noopener noreferrer" className="btn-turquesa" style={{ fontSize: '1rem', padding: '0.9rem 2rem' }}>
              💬 WhatsApp
            </a>
            <Link href="/contacto" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.75)', border: '2px solid rgba(255,255,255,0.3)', borderRadius: 9999, padding: '0.9rem 2rem', fontSize: '1rem', fontWeight: 600, textDecoration: 'none', fontFamily: 'Poppins, sans-serif', transition: 'all 0.2s' }}>
              Ver opciones de contacto →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
