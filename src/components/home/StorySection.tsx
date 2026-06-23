'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Play, Tv } from 'lucide-react';
import { useState } from 'react';

const VIDEOS = [
  { id: '1yLIB30MFkg', titulo: 'Los sabores de Ferrol', ep: 'Ep. 1' },
  { id: 'NNzJAOAhFE0', titulo: 'Gastronomía auténtica', ep: 'Ep. 2' },
  { id: 'xRRHhJSynD8', titulo: 'Rincones de Galicia', ep: 'Ep. 3' },
];

export function StorySection() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section className="relative overflow-hidden py-0" style={{ background: '#243b60' }}>
      {/* Patrón decorativo */}
      <div className="absolute inset-0 patron-azulejo opacity-50" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-16">
        {/* Cabecera */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-4"
              style={{ background: 'rgba(69,176,229,0.15)', border: '1px solid rgba(69,176,229,0.3)', borderRadius: '9999px', padding: '6px 16px' }}>
              <Tv size={14} className="text-[#45b0e5]" />
              <span className="text-[#45b0e5] text-xs font-bold uppercase tracking-widest">El programa</span>
            </div>
            <h2 className="text-4xl sm:text-5xl text-white" style={{ fontFamily: 'Lilita One, cursive' }}>
              Saboreando<br />con Susana
            </h2>
          </div>
          <p className="text-white/60 text-sm max-w-sm leading-relaxed lg:text-right">
            Nacido en la TV de Ferrol y ahora también en Canal 33 Madrid,
            el programa que lleva la gastronomía gallega a toda España.
          </p>
        </div>

        {/* Grid de vídeos */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {VIDEOS.map(v => (
            <div key={v.id} className="group relative rounded-2xl overflow-hidden bg-black/40 cursor-pointer"
              onClick={() => setActiveVideo(v.id)}>
              {/* Miniatura YouTube */}
              <div className="relative aspect-video">
                <Image
                  src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`}
                  alt={v.titulo}
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  unoptimized
                />
                {activeVideo === v.id ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${v.id}?autoplay=1`}
                    title={v.titulo}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full border-0"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                      <Play size={20} className="text-[#243b60] ml-1" fill="currentColor" />
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4">
                <p className="text-[#45b0e5] text-[10px] font-bold uppercase tracking-wider mb-1">{v.ep}</p>
                <p className="text-white font-semibold text-sm">{v.titulo}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Canales + CTA */}
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap gap-3">
            {['📺 TV Ferrol · Canal 34', '📺 Canal 33 Madrid', '▶️ YouTube'].map(c => (
              <div key={c} className="text-white/60 text-xs font-semibold px-4 py-2 rounded-full"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
                {c}
              </div>
            ))}
          </div>
          <Link href="/saboreando-con-susana" className="btn-turquesa">
            Ver todos los episodios →
          </Link>
        </div>
      </div>
    </section>
  );
}
