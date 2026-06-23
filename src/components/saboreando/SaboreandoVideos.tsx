'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';

const VIDEOS = [
  { id: '1yLIB30MFkg', ep: 'Episodio 1', titulo: 'Los sabores de Ferrol', desc: 'Susana descubre los mejores rincones gastronómicos de la ciudad naval.' },
  { id: 'NNzJAOAhFE0', ep: 'Episodio 2', titulo: 'Gastronomía gallega auténtica', desc: 'Un recorrido por los productos más auténticos de Galicia.' },
  { id: 'xRRHhJSynD8', ep: 'Episodio 3', titulo: 'Rincones de Galicia', desc: 'Los lugares que Susana no puede dejar de recomendar.' },
];

export function SaboreandoVideos() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
      {VIDEOS.map(v => (
        <div key={v.id} style={{ borderRadius: '1.25rem', overflow: 'hidden', background: '#1a2d4a', boxShadow: '0 4px 24px rgba(26,45,74,0.12)' }}>
          {/* Video area */}
          <div style={{ position: 'relative', paddingBottom: '56.25%' }}>
            {active === v.id ? (
              <iframe
                src={`https://www.youtube.com/embed/${v.id}?autoplay=1`}
                title={v.titulo}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
              />
            ) : (
              <div style={{ position: 'absolute', inset: 0 }}>
                <Image
                  src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`}
                  alt={v.titulo}
                  fill
                  unoptimized
                  style={{ objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(26,45,74,0.45)' }} />
                <button
                  onClick={() => setActive(v.id)}
                  style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer' }}
                  aria-label={`Reproducir ${v.titulo}`}
                >
                  <div style={{ width: 54, height: 54, borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.3)', transition: 'transform 0.2s' }}>
                    <Play size={20} style={{ color: '#243b60', marginLeft: 3 }} fill="#243b60" />
                  </div>
                </button>
              </div>
            )}
          </div>
          {/* Info */}
          <div style={{ padding: '1.25rem' }}>
            <p style={{ color: '#45b0e5', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 6px' }}>{v.ep}</p>
            <h3 style={{ fontFamily: 'Lilita One, cursive', color: 'white', fontSize: '1.1rem', margin: '0 0 6px', lineHeight: 1.2 }}>{v.titulo}</h3>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', margin: 0, lineHeight: 1.6 }}>{v.desc}</p>
          </div>
        </div>
      ))}
      <style>{`@media(max-width:768px){.saboreando-videos{grid-template-columns:1fr !important;}}`}</style>
    </div>
  );
}
