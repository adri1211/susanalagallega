'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Play, Tv } from 'lucide-react';

const VIDEOS = [
  { id: '1yLIB30MFkg', ep: 'Episodio 1', titulo: 'Los sabores de Ferrol' },
  { id: 'NNzJAOAhFE0', ep: 'Episodio 2', titulo: 'Gastronomía auténtica' },
  { id: 'xRRHhJSynD8', ep: 'Episodio 3', titulo: 'Rincones de Galicia' },
];

function VideoCard({ v, active, onPlay }: { v: typeof VIDEOS[0]; active: boolean; onPlay: () => void }) {
  return (
    <div style={{ borderRadius: '1rem', overflow: 'hidden', background: '#0f1e35' }}>
      <div style={{ position: 'relative', paddingBottom: '56.25%' }}>
        {active ? (
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
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(26,45,74,0.4)' }} />
            <button
              onClick={onPlay}
              style={{
                position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'none', border: 'none', cursor: 'pointer',
              }}
            >
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: 'rgba(255,255,255,0.95)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                transition: 'transform 0.2s',
              }}>
                <Play size={20} style={{ color: '#243b60', marginLeft: 3 }} fill="#243b60" />
              </div>
            </button>
          </div>
        )}
      </div>
      <div style={{ padding: '1rem' }}>
        <p style={{ color: '#45b0e5', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 4px' }}>{v.ep}</p>
        <p style={{ color: 'white', fontWeight: 600, fontSize: '0.9rem', margin: 0, fontFamily: 'Poppins, sans-serif' }}>{v.titulo}</p>
      </div>
    </div>
  );
}

export function StorySection() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section style={{ background: '#1a2d4a', padding: '5rem 0', position: 'relative', overflow: 'hidden' }}>
      {/* Acento decorativo */}
      <div style={{
        position: 'absolute', top: -80, right: -80, width: 360, height: 360, borderRadius: '50%',
        background: 'rgba(69,176,229,0.06)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1152, margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(69,176,229,0.12)', border: '1px solid rgba(69,176,229,0.28)', borderRadius: 9999, padding: '6px 16px', marginBottom: 16 }}>
              <Tv size={13} style={{ color: '#45b0e5' }} />
              <span style={{ color: '#45b0e5', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' }}>El programa</span>
            </div>
            <h2 style={{ fontFamily: 'Lilita One, cursive', color: 'white', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', margin: 0, lineHeight: 1.05 }}>
              Saboreando<br />con Susana
            </h2>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', maxWidth: 360, lineHeight: 1.7, margin: 0 }}>
            Nacido en la TV de Ferrol y ahora también en Canal 33 Madrid — el programa que lleva la gastronomía gallega a toda España.
          </p>
        </div>

        {/* Vídeos */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', marginBottom: '2.5rem' }}>
          {VIDEOS.map(v => (
            <VideoCard
              key={v.id}
              v={v}
              active={activeVideo === v.id}
              onPlay={() => setActiveVideo(v.id)}
            />
          ))}
        </div>

        {/* Footer canales */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {['📺 TV Ferrol · Canal 34', '📺 Canal 33 Madrid', '▶️ YouTube'].map(c => (
              <span key={c} style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem', fontWeight: 600, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 9999, padding: '6px 16px' }}>
                {c}
              </span>
            ))}
          </div>
          <Link href="/saboreando-con-susana" className="btn-turquesa">
            Ver todos los episodios →
          </Link>
        </div>
      </div>

      <style>{`@media(max-width:768px){.videos-grid{grid-template-columns:1fr !important;}}`}</style>
    </section>
  );
}
