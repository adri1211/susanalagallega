import Image from 'next/image';

const LOGOS = [
  { src: '/images/img_32963_post.png', alt: 'Antena 3' },
  { src: '/images/img_32962_post.png', alt: 'Telecinco' },
  { src: '/images/img_32961_post.png', alt: 'COPE' },
  { src: '/images/img_32960_post.png', alt: 'Tele Sur Madrid' },
  { src: '/images/img_32959_post.png', alt: 'esRadio' },
  { src: '/images/img_32958_post.png', alt: 'Libertad FM' },
  { src: '/images/img_32957_post.png', alt: 'Canal' },
];

export function MediaSection() {
  // Duplicamos para loop infinito
  const track = [...LOGOS, ...LOGOS];

  return (
    <section style={{ background: '#C7E7F4', padding: '5rem 0', position: 'relative', overflow: 'hidden' }}>
      {/* Patrón azulejo */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.06, backgroundImage: 'radial-gradient(circle, #243b60 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', padding: '0 1.5rem', position: 'relative' }}>
        <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(36,59,96,0.45)', marginBottom: '0.75rem' }}>
          Presencia en medios
        </p>
        <h2 style={{ fontFamily: 'Lilita One, cursive', color: '#1a2d4a', fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', margin: '0 0 3rem', lineHeight: 1.05 }}>
          Me habrás visto en…
        </h2>
      </div>

      {/* Carrusel de logos */}
      <div style={{ overflow: 'hidden', position: 'relative' }}>
        <style>{`
          @keyframes logos-slide { 0%{ transform: translateX(0); } 100%{ transform: translateX(-50%); } }
          .logos-track { display: flex; width: max-content; animation: logos-slide 22s linear infinite; gap: 1.5rem; padding: 0 0.75rem; }
          .logos-track:hover { animation-play-state: paused; }
          .logo-card { background: white; border-radius: 1.25rem; padding: 1rem 1.5rem; width: 200px; height: 100px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 4px 20px rgba(36,59,96,0.09); transition: transform 0.25s, box-shadow 0.25s; }
          .logo-card:hover { transform: translateY(-6px) scale(1.05); box-shadow: 0 12px 36px rgba(36,59,96,0.18); }
        `}</style>

        <div className="logos-track">
          {track.map((logo, i) => (
            <div key={i} className="logo-card">
              <Image src={logo.src} alt={logo.alt} width={160} height={70} unoptimized style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
