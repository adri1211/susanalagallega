'use client';

import Image from 'next/image';
import Link from 'next/link';

const VIDEOS = [
  { id: '1yLIB30MFkg', titulo: 'Episodio destacado · Saboreando con Susana' },
  { id: 'NNzJAOAhFE0', titulo: 'Gastronomía gallega en TV' },
  { id: 'xRRHhJSynD8', titulo: 'Los mejores rincones de Galicia' },
];

export function StorySection() {
  return (
    <section className="py-16 px-4" style={{ background: '#243b60' }}>
      <div className="max-w-6xl mx-auto">
        {/* Cabecera */}
        <div className="text-center mb-10">
          <span className="section-label" style={{ color: '#45b0e5' }}>El programa</span>
          <h2 className="mt-2 text-3xl sm:text-4xl text-white" style={{ fontFamily: 'Lilita One, cursive' }}>
            Saboreando con Susana
          </h2>
          <p className="mt-3 text-white/75 text-sm max-w-2xl mx-auto">
            Nacido en la TV de Ferrol y ahora también en Canal 33 Madrid, <em>Saboreando con Susana</em> es un programa
            que combina pasión culinaria, productos auténticos y lugares que merecen ser descubiertos.
          </p>
        </div>

        {/* Grid de vídeos */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {VIDEOS.map(v => (
            <div key={v.id} className="rounded-xl overflow-hidden shadow-lg">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src={`https://www.youtube.com/embed/${v.id}`}
                  title={v.titulo}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              </div>
              <div className="bg-white/10 px-3 py-2">
                <p className="text-white/80 text-xs font-medium">{v.titulo}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Canales TV */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {[
            { label: '📺 TV Ferrol', sub: 'Canal 34' },
            { label: '📺 Canal 33 Madrid', sub: 'Disponible en Madrid' },
            { label: '▶️ YouTube', sub: 'Susana La Gallega' },
          ].map(c => (
            <div key={c.label} className="bg-white/10 border border-white/20 rounded-full px-5 py-2 text-center">
              <div className="text-white text-sm font-semibold">{c.label}</div>
              <div className="text-white/60 text-xs">{c.sub}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/saboreando-con-susana" className="btn-turquesa">
            Ver todos los episodios →
          </Link>
        </div>
      </div>
    </section>
  );
}
