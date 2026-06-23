import Image from 'next/image';

const MEDIOS = [
  { src: '/images/original_32882.png', alt: 'Tele Sur Madrid' },
  { src: '/images/original_32883.png', alt: 'esRadio' },
  { src: '/images/original_32986.png', alt: 'Libertad FM' },
];

const TV = [
  { label: 'TV Ferrol', sub: 'Canal 34' },
  { label: 'Canal 33', sub: 'Madrid' },
  { label: 'YouTube', sub: '@susanalagallega' },
];

export function MediaSection() {
  return (
    <section style={{ background: '#F4F3E4', padding: '3.5rem 1.5rem', borderBottom: '1px solid rgba(36,59,96,0.07)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(36,59,96,0.35)', marginBottom: '2rem' }}>
          Me habrás visto en…
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          {MEDIOS.map(m => (
            <div key={m.alt} style={{ background: 'white', borderRadius: '1rem', padding: '1.25rem 2rem', border: '1px solid rgba(36,59,96,0.07)', height: 72, width: 160, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Image src={m.src} alt={m.alt} fill unoptimized style={{ objectFit: 'contain', padding: '12px 20px' }} />
            </div>
          ))}
          {TV.map(t => (
            <div key={t.label} style={{ background: '#243b60', borderRadius: '1rem', padding: '1rem 1.5rem', height: 72, minWidth: 120, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'white', fontFamily: 'Lilita One, cursive', fontSize: '1rem', lineHeight: 1.1 }}>{t.label}</span>
              <span style={{ color: '#45b0e5', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{t.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
