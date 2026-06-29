export function MarqueeSection() {
  const text = 'SUSANA LA GALLEGA · GASTRONOMÍA GALLEGA · HISTORIAS QUE SE COMEN · ';
  const repeated = text.repeat(6);
  return (
    <div style={{ background: 'linear-gradient(90deg, #1a2d4a 0%, #243b60 50%, #1a2d4a 100%)', padding: '1.1rem 0', overflow: 'hidden', userSelect: 'none', borderTop: '1px solid rgba(69,176,229,0.15)', borderBottom: '1px solid rgba(69,176,229,0.15)' }}>
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .marquee-track { display: flex; width: max-content; animation: marquee 35s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; cursor: default; }
        .marquee-sep { color: #45b0e5; margin: 0 0.25rem; }
      `}</style>
      <div className="marquee-track">
        <span style={{ fontFamily: 'Lilita One, cursive', color: 'rgba(199,231,244,0.35)', fontSize: '1rem', letterSpacing: '0.12em', whiteSpace: 'nowrap' }}>
          {repeated}{repeated}
        </span>
      </div>
    </div>
  );
}
