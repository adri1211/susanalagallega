const MEDIOS = [
  { label: 'Tele Sur', sub: 'Madrid', dark: false },
  { label: 'esRadio', sub: 'Nacional', dark: false },
  { label: 'Libertad FM', sub: 'Nacional', dark: false },
  { label: 'TV Ferrol', sub: 'Canal 34', dark: true },
  { label: 'Canal 33', sub: 'Madrid', dark: true },
  { label: 'YouTube', sub: '@susanalagallega', dark: true },
];

export function MediaSection() {
  return (
    <section style={{ background: '#F4F3E4', padding: '3rem 1.5rem', borderBottom: '1px solid rgba(36,59,96,0.07)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(36,59,96,0.35)', marginBottom: '1.75rem' }}>
          Me habrás visto en…
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          {MEDIOS.map(m => (
            <div key={m.label} style={{
              background: m.dark ? '#243b60' : 'white',
              borderRadius: '0.875rem',
              padding: '0.875rem 1.5rem',
              border: m.dark ? 'none' : '1px solid rgba(36,59,96,0.09)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 110,
              boxShadow: m.dark ? '0 4px 12px rgba(36,59,96,0.15)' : 'none',
            }}>
              <span style={{ fontFamily: 'Lilita One, cursive', color: m.dark ? 'white' : '#243b60', fontSize: '1.05rem', lineHeight: 1.2 }}>{m.label}</span>
              <span style={{ color: m.dark ? '#45b0e5' : 'rgba(36,59,96,0.4)', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 2 }}>{m.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
