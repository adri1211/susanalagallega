export function MarqueeSection() {
  const chunk = 'SUSANA LA GALLEGA ~ HISTORIAS QUE SE COMEN ~ ';
  const repeated = chunk.repeat(10);
  return (
    <div style={{ background: '#1a2d4a', padding: '1.1rem 0', overflow: 'hidden', userSelect: 'none', borderTop: '1px solid rgba(69,176,229,0.12)', borderBottom: '1px solid rgba(69,176,229,0.12)' }}>
      <style>{`
        @keyframes marquee-scroll { 0%{ transform: translateX(0); } 100%{ transform: translateX(-50%); } }
        .marquee-inner { display: flex; width: max-content; animation: marquee-scroll 30s linear infinite; }
        .marquee-inner:hover { animation-play-state: paused; }
      `}</style>
      <div className="marquee-inner">
        <span style={{ fontFamily: 'Lilita One, cursive', color: 'rgba(199,231,244,0.4)', fontSize: '1.05rem', letterSpacing: '0.12em', whiteSpace: 'nowrap' }}>
          {repeated}{repeated}
        </span>
      </div>
    </div>
  );
}
