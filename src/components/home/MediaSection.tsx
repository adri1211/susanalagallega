const LOGOS = [
  {
    svg: `<svg viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg"><circle cx="30" cy="30" r="22" fill="#FF6600"/><path d="M30 12 L30 48 M18 20 L42 20 M15 30 L45 30 M18 40 L42 40" stroke="white" stroke-width="3" fill="none"/><text x="62" y="25" font-family="Arial" font-weight="900" font-size="13" fill="#FF6600">Antena</text><text x="62" y="43" font-family="Arial" font-weight="900" font-size="16" fill="#FF6600">3</text></svg>`,
    alt: 'Antena 3',
  },
  {
    svg: `<svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="30" r="26" fill="#0057A8"/><text x="50" y="38" font-family="Arial" font-weight="900" font-size="30" fill="white" text-anchor="middle">5</text></svg>`,
    alt: 'Telecinco',
  },
  {
    svg: `<svg viewBox="0 0 130 60" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="10" width="126" height="40" rx="6" fill="#003087"/><text x="65" y="37" font-family="Arial" font-weight="900" font-size="20" fill="white" text-anchor="middle">COPE</text></svg>`,
    alt: 'COPE',
  },
  {
    svg: `<svg viewBox="0 0 150 60" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="146" height="56" rx="6" fill="#1a2d4a" stroke="#45b0e5" stroke-width="2"/><text x="75" y="28" font-family="Arial" font-weight="900" font-size="11" fill="#45b0e5" text-anchor="middle">TELE SUR</text><text x="75" y="48" font-family="Arial" font-weight="900" font-size="14" fill="white" text-anchor="middle">MADRID</text></svg>`,
    alt: 'Tele Sur Madrid',
  },
];

export function MediaSection() {
  return (
    <section style={{ background: '#C7E7F4', padding: '4rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
      {/* Fondo azulejos sutil */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.06, backgroundImage: 'radial-gradient(circle, #243b60 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

      <div style={{ maxWidth: 960, margin: '0 auto', position: 'relative', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(36,59,96,0.5)', marginBottom: '0.75rem' }}>
          Presencia en medios
        </p>
        <h2 style={{ fontFamily: 'Lilita One, cursive', color: '#243b60', fontSize: 'clamp(2rem, 4vw, 3rem)', margin: '0 0 2.5rem', lineHeight: 1.1 }}>
          Me habrás visto en…
        </h2>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '1.25rem' }}>
          {LOGOS.map(logo => (
            <div key={logo.alt} style={{
              background: 'white', borderRadius: '1.25rem',
              padding: '1.25rem 1.75rem', width: 170, height: 90,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(36,59,96,0.1)',
              transition: 'transform 0.25s, box-shadow 0.25s',
            }}
              className="media-logo-card"
            >
              <div dangerouslySetInnerHTML={{ __html: logo.svg }} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .media-logo-card:hover { transform: translateY(-6px) scale(1.04); box-shadow: 0 12px 32px rgba(36,59,96,0.18) !important; }
      `}</style>
    </section>
  );
}
