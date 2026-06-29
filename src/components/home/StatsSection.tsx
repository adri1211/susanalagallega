'use client';
import { useEffect, useRef, useState } from 'react';

const STATS = [
  { n: 30, suffix: '+', label: 'Restaurantes recomendados', icon: '🍽️' },
  { n: 3, suffix: '', label: 'Temporadas en televisión', icon: '📺' },
  { n: 2, suffix: '', label: 'Cadenas de TV', icon: '🎬' },
  { n: 5, suffix: '+', label: 'Años compartiendo Galicia', icon: '⭐' },
];

function Counter({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = Math.ceil(target / 40);
    const id = setInterval(() => {
      start = Math.min(start + step, target);
      setVal(start);
      if (start >= target) clearInterval(id);
    }, 35);
    return () => clearInterval(id);
  }, [active, target]);
  return <>{val}{suffix}</>;
}

export function StatsSection() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setActive(true); obs.disconnect(); } }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ background: 'linear-gradient(135deg, #0d1e36 0%, #1a2d4a 50%, #243b60 100%)', padding: '5rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
      {/* Cuadrícula sutil */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(69,176,229,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(69,176,229,0.04) 1px,transparent 1px)', backgroundSize: '48px 48px', pointerEvents: 'none' }} />
      {/* Orbe decorativo */}
      <div style={{ position: 'absolute', top: '-30%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(69,176,229,0.08) 0%,transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(69,176,229,0.6)', marginBottom: '0.75rem' }}>En números</p>
          <h2 style={{ fontFamily: 'Lilita One, cursive', color: 'white', fontSize: 'clamp(2rem, 4vw, 3rem)', margin: 0 }}>
            Una trayectoria hecha de sabor
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1px', background: 'rgba(69,176,229,0.12)', borderRadius: '1.5rem', overflow: 'hidden' }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ background: 'rgba(13,30,54,0.7)', padding: '2.5rem 1.5rem', textAlign: 'center', backdropFilter: 'blur(8px)', transition: 'background 0.3s' }} className="stat-cell">
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem', lineHeight: 1 }}>{s.icon}</div>
              <div style={{ fontFamily: 'Lilita One, cursive', fontSize: 'clamp(2.8rem, 5vw, 4rem)', color: '#45b0e5', lineHeight: 1, marginBottom: '0.5rem' }}>
                <Counter target={s.n} suffix={s.suffix} active={active} />
              </div>
              <p style={{ fontFamily: 'Poppins, sans-serif', color: 'rgba(255,255,255,0.55)', fontSize: '0.82rem', fontWeight: 600, margin: 0, lineHeight: 1.4 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .stat-cell:hover { background: rgba(69,176,229,0.1) !important; }
        @media(max-width:768px){ .stat-cell { grid-column: span 2; } }
      `}</style>
    </section>
  );
}
