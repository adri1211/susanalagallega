export function MarqueeSection() {
  const text = 'SUSANA LA GALLEGA ~ ';
  const repeated = text.repeat(12);
  return (
    <div style={{ background: '#243b60', padding: '1rem 0', overflow: 'hidden', userSelect: 'none' }}>
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .marquee-track { display: flex; width: max-content; animation: marquee 22s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }
      `}</style>
      <div className="marquee-track">
        <span style={{ fontFamily: 'Lilita One, cursive', color: 'rgba(199,231,244,0.5)', fontSize: '1.1rem', letterSpacing: '0.15em', whiteSpace: 'nowrap', paddingRight: 0 }}>
          {repeated}{repeated}
        </span>
      </div>
    </div>
  );
}
