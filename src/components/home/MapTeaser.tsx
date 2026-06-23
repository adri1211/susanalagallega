'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Download, MapPin } from 'lucide-react';

const CIUDADES = [
  { label: 'Ferrol', slug: 'ferrol', n: 5 },
  { label: 'Narón', slug: 'naron', n: 3 },
  { label: 'Cedeira', slug: 'cedeira', n: 2 },
  { label: 'A Coruña', slug: 'a-coruna', n: 4 },
  { label: 'Santiago', slug: 'santiago-de-compostela', n: 2 },
  { label: 'Madrid', slug: 'madrid', n: 15 },
];

export function MapTeaser() {
  return (
    <section className="py-0 overflow-hidden" style={{ background: '#F4F3E4' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: texto + descarga */}
          <div>
            <p className="section-label text-[#45b0e5] mb-2">Llévala contigo</p>
            <h2 className="text-3xl sm:text-4xl mb-4" style={{ fontFamily: 'Lilita One, cursive', color: '#243b60' }}>
              La guía de sabores<br />gratuita de Susana
            </h2>
            <p className="text-[#5a6a7a] text-base leading-relaxed mb-8">
              Susana ha reunido sus mejores recomendaciones en una guía descargable.
              Restaurantes, secretos gastronómicos y los rincones favoritos de Galicia
              — todo en tu bolsillo.
            </p>

            <a href="/guia-de-sabores.pdf" download
              className="btn-primario mb-8 inline-flex">
              <Download size={16} />
              Descargar guía gratis (PDF)
            </a>

            {/* Ciudades */}
            <div>
              <p className="text-[#243b60]/50 text-xs font-bold uppercase tracking-widest mb-4">Restaurantes por ciudad</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CIUDADES.map(c => (
                  <Link key={c.slug} href={`/restaurantes?localidad=${c.slug}`}
                    className="group flex items-center gap-2.5 p-3 bg-white rounded-xl border border-[#243b60]/08 hover:border-[#45b0e5] hover:shadow-md transition-all">
                    <MapPin size={13} className="text-[#45b0e5] flex-shrink-0" />
                    <div>
                      <p className="text-[#243b60] text-xs font-bold group-hover:text-[#45b0e5] transition-colors">{c.label}</p>
                      <p className="text-[#5a6a7a] text-[10px]">{c.n} restaurantes</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right: foto + quote */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden h-80 lg:h-[500px] shadow-2xl">
              <Image
                src="/images/original_32884.png"
                alt="Gastronomía gallega"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0" style={{
                background: 'linear-gradient(to top, rgba(36,59,96,0.9) 0%, transparent 60%)'
              }} />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <blockquote className="text-white/90 text-sm italic font-medium mb-2">
                  &ldquo;Las recomendaciones de Susana nunca fallan, descubrí un restaurante increíble en Ferrol&rdquo;
                </blockquote>
                <p className="text-[#45b0e5] text-xs font-bold">— Seguidora del programa</p>
              </div>
            </div>

            {/* Badge flotante */}
            <div className="absolute -top-4 -right-4 hidden lg:flex w-24 h-24 rounded-full items-center justify-center shadow-xl flex-col"
              style={{ background: '#45b0e5' }}>
              <span className="text-white text-2xl font-bold" style={{ fontFamily: 'Lilita One, cursive' }}>+30</span>
              <span className="text-white/80 text-[9px] font-bold uppercase tracking-wide text-center leading-tight">Restaurantes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
