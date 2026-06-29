export function GodalbaSection() {
  return (
    <section style={{ background: '#F4F3E4', padding: '5rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
      {/* Decoración SVG copa izquierda */}
      <svg style={{ position: 'absolute', left: -20, bottom: 40, width: 200, opacity: 0.12 }} viewBox="0 0 160 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M80 10 C80 10 30 60 30 100 C30 130 52 148 52 148 L52 190 L35 200 L125 200 L108 190 L108 148 C108 148 130 130 130 100 C130 60 80 10 80 10Z" stroke="#1a2d4a" strokeWidth="5" fill="none"/>
        <ellipse cx="80" cy="198" rx="45" ry="6" stroke="#1a2d4a" strokeWidth="3" fill="none"/>
      </svg>

      {/* Decoración SVG copa derecha */}
      <svg style={{ position: 'absolute', right: 80, top: 30, width: 140, opacity: 0.10 }} viewBox="0 0 160 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M80 10 C80 10 30 60 30 100 C30 130 52 148 52 148 L52 190 L35 200 L125 200 L108 190 L108 148 C108 148 130 130 130 100 C130 60 80 10 80 10Z" stroke="#1a2d4a" strokeWidth="5" fill="none"/>
        <ellipse cx="80" cy="198" rx="45" ry="6" stroke="#1a2d4a" strokeWidth="3" fill="none"/>
      </svg>

      {/* Destellos decorativos */}
      {[
        { top: '15%', left: '8%', size: 18 },
        { top: '65%', left: '12%', size: 12 },
        { top: '20%', right: '10%', size: 20 },
        { top: '70%', right: '18%', size: 14 },
      ].map((pos, i) => (
        <svg key={i} style={{ position: 'absolute', opacity: 0.3, ...pos as React.CSSProperties }} width={pos.size} height={pos.size} viewBox="0 0 24 24" fill="#45b0e5">
          <path d="M12 2L13.5 9.5L21 8L14.5 13L17 21L12 16L7 21L9.5 13L3 8L10.5 9.5Z"/>
        </svg>
      ))}

      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', position: 'relative', zIndex: 2 }}>

        {/* Texto */}
        <div>
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#45b0e5', marginBottom: '1rem' }}>
            Otros proyectos
          </p>
          <h2 style={{ fontFamily: 'Lilita One, cursive', color: '#1a2d4a', fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1.05, margin: '0 0 1.25rem' }}>
            MAR DE GODALBA:<br />
            <span style={{ color: '#243b60' }}>LUJO ATLÁNTICO</span><br />
            EN CADA COPA.
          </h2>
          <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '1.05rem', color: '#243b60', margin: '0 0 0.5rem' }}>
            Ideal para acompañar los mejores momentos.
          </p>
          <p style={{ fontFamily: 'Poppins, sans-serif', fontStyle: 'italic', fontSize: '0.9rem', color: '#6b7a8d', margin: '0 0 2rem' }}>
            De Galicia para el mundo ~ By Susana La Gallega
          </p>
          <a href="https://www.cedeiragourmet.es/mar-de-godalba_pr498396" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#1a2d4a', color: 'white', borderRadius: 9999, padding: '13px 28px', fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '0.06em', textDecoration: 'none', textTransform: 'uppercase', transition: 'all 0.25s' }}
            className="godalba-btn"
          >
            🍷 Descúbrelo aquí
          </a>
        </div>

        {/* Visual copa grande */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: 280, height: 360 }}>
            {/* Copa SVG grande */}
            <svg viewBox="0 0 200 280" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 12px 32px rgba(26,45,74,0.12))' }}>
              {/* Copa */}
              <path d="M100 18 C100 18 35 75 35 125 C35 165 65 188 65 188 L65 248 L42 258 L158 258 L135 248 L135 188 C135 188 165 165 165 125 C165 75 100 18 100 18Z" fill="#C7E7F4" stroke="#1a2d4a" strokeWidth="4"/>
              {/* Vino dentro */}
              <path d="M60 145 C62 145 100 185 140 145 C140 165 122 188 100 188 C78 188 60 168 60 145Z" fill="#45b0e5" opacity="0.5"/>
              {/* Pie */}
              <ellipse cx="100" cy="256" rx="58" ry="8" fill="#1a2d4a" opacity="0.15"/>
              {/* Reflejos */}
              <path d="M75 50 C78 60 76 80 72 95" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.6"/>
            </svg>
            {/* Badge "Albariño" */}
            <div style={{ position: 'absolute', top: 30, right: -20, background: '#1a2d4a', color: 'white', borderRadius: 9999, padding: '6px 16px', fontFamily: 'Lilita One, cursive', fontSize: '1rem', transform: 'rotate(12deg)', boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}>
              Albariño
            </div>
          </div>
        </div>
      </div>

      {/* Hostal card */}
      <div style={{ maxWidth: 1100, margin: '3rem auto 0', position: 'relative', zIndex: 2 }}>
        <div style={{ background: 'white', borderRadius: '1.5rem', padding: '2rem 2.5rem', display: 'flex', alignItems: 'center', gap: '2rem', boxShadow: '0 4px 24px rgba(36,59,96,0.08)', flexWrap: 'wrap' }}>
          <div style={{ fontSize: '3rem' }}>🏡</div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', color: '#45b0e5', textTransform: 'uppercase', margin: '0 0 0.4rem' }}>Otro proyecto</p>
            <h3 style={{ fontFamily: 'Lilita One, cursive', color: '#1a2d4a', fontSize: '1.4rem', margin: '0 0 0.4rem' }}>Hostal Rústico La Gallega</h3>
            <p style={{ fontFamily: 'Poppins, sans-serif', color: '#6b7a8d', fontSize: '0.9rem', margin: 0 }}>Disfruta de la calma, la tradición y la mejor gastronomía</p>
          </div>
          <a href="https://share.google/lguzS1wEED3IE1afD" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '2px solid #1a2d4a', color: '#1a2d4a', borderRadius: 9999, padding: '10px 22px', fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '0.82rem', textDecoration: 'none', whiteSpace: 'nowrap' }}
            className="hostal-btn"
          >
            Conócelo aquí →
          </a>
        </div>
      </div>

      <style>{`
        .godalba-btn:hover { background: #45b0e5 !important; transform: translateY(-2px); }
        .hostal-btn:hover { background: #1a2d4a !important; color: white !important; }
      `}</style>
    </section>
  );
}
