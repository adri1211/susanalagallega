'use client';

import Link from 'next/link';
import Image from 'next/image';

export function MapTeaser() {
  return (
    <section className="py-16 px-4" style={{ background: '#C7E7F4' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Texto */}
          <div>
            <span className="section-label text-[#243b60]">Guía de Susana</span>
            <h2 className="mt-2 text-3xl sm:text-4xl" style={{ fontFamily: 'Lilita One, cursive', color: '#243b60' }}>
              Descárgate la guía de sabores gratuita
            </h2>
            <p className="mt-4 text-[#2d4f82] text-base leading-relaxed">
              Susana ha reunido sus mejores recomendaciones en una guía descargable para que nunca te quedes sin saber dónde comer.
              Restaurantes, consejos y secretos gastronómicos de Galicia.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <a
                href="/guia-de-sabores.pdf"
                download
                className="btn-primario"
              >
                ⬇️ Descargar guía gratis
              </a>
              <Link href="/restaurantes" className="btn-secundario">
                Ver restaurantes →
              </Link>
            </div>

            {/* Ciudades */}
            <div className="mt-8 flex flex-wrap gap-3">
              {['Ferrol', 'A Coruña', 'Narón', 'Cedeira', 'Santiago', 'Madrid'].map(c => (
                <Link
                  key={c}
                  href={`/restaurantes?localidad=${c.toLowerCase().replace(' ', '-')}`}
                  className="bg-white/70 hover:bg-white border border-[#243b60]/20 text-[#243b60] text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
                >
                  📍 {c}
                </Link>
              ))}
            </div>
          </div>

          {/* Imagen/mapa */}
          <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/images/original_32884.png"
              alt="Galicia gastronómica"
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/90 rounded-2xl p-6 text-center shadow-lg max-w-xs">
                <div className="text-4xl mb-2">🗺️</div>
                <h3 className="font-bold text-[#243b60] text-lg" style={{ fontFamily: 'Lilita One, cursive' }}>
                  Mapa gastronómico
                </h3>
                <p className="text-[#5a6a7a] text-sm mt-1">Encuentra restaurantes cerca de ti</p>
                <Link href="/restaurantes" className="btn-turquesa mt-3 text-sm">
                  Explorar →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
