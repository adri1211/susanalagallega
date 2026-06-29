const TESTIMONIOS = [
  {
    texto: 'Las recomendaciones de Susana nunca fallan, descubrí un restaurante increíble en Ferrol gracias a ella.',
    autor: 'María G.',
    ciudad: 'Ferrol',
  },
  {
    texto: 'Gracias a su guía encontré el mejor pulpo a feira que he probado en mi vida. ¡Una joya de Galicia!',
    autor: 'Carlos M.',
    ciudad: 'A Coruña',
  },
  {
    texto: 'Sigo su programa desde el principio, cada episodio me da ganas de salir a descubrir nuevos sabores.',
    autor: 'Ana R.',
    ciudad: 'Madrid',
  },
];

export function TestimoniosSection() {
  return (
    <section style={{ background: '#F4F3E4', padding: '4.5rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
      {/* Comillas decorativas */}
      <div style={{ position: 'absolute', top: 30, left: '5%', fontFamily: 'Georgia, serif', fontSize: '12rem', color: 'rgba(36,59,96,0.05)', lineHeight: 1, userSelect: 'none' }}>"</div>

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#45b0e5', marginBottom: '0.75rem' }}>
            Lo que dicen
          </p>
          <h2 style={{ fontFamily: 'Lilita One, cursive', color: '#1a2d4a', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', margin: 0 }}>
            La comunidad habla
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {TESTIMONIOS.map((t, i) => (
            <div key={i} className="card-lift" style={{ background: 'white', borderRadius: '1.5rem', padding: '2rem', boxShadow: '0 4px 20px rgba(36,59,96,0.07)', position: 'relative' }}>
              <div style={{ color: '#45b0e5', fontSize: '2.5rem', fontFamily: 'Georgia, serif', lineHeight: 1, marginBottom: '0.75rem' }}>"</div>
              <p style={{ fontFamily: 'Poppins, sans-serif', color: '#243b60', fontSize: '0.95rem', lineHeight: 1.7, margin: '0 0 1.5rem', fontStyle: 'italic' }}>
                {t.texto}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#1a2d4a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Lilita One, cursive', color: 'white', fontSize: '1rem', flexShrink: 0 }}>
                  {t.autor[0]}
                </div>
                <div>
                  <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '0.85rem', color: '#1a2d4a', margin: 0 }}>{t.autor}</p>
                  <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.75rem', color: '#6b7a8d', margin: 0 }}>{t.ciudad}</p>
                </div>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: 2 }}>
                  {[...Array(5)].map((_, s) => <span key={s} style={{ color: '#f59e0b', fontSize: '0.85rem' }}>★</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
