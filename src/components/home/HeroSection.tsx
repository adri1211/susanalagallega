'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, ChevronDown } from 'lucide-react';

const SLIDES = [
  {
    img: '/images/original_32874.png',
    titulo: 'Descubre la Galicia\nmás auténtica',
    subtitulo: 'Los mejores restaurantes, pulperías y marisquerías seleccionados por Susana',
  },
  {
    img: '/images/original_32853.png',
    titulo: 'Saboreando con\nSusana',
    subtitulo: 'El programa de televisión que lleva la gastronomía gallega a toda España',
  },
  {
    img: '/images/original_33082.png',
    titulo: 'Dónde comer bien\nhoy mismo',
    subtitulo: 'Recomendaciones honestas de quien más sabe de cocina gallega',
  },
];

const FILTROS = [
  { label: 'Marisquería', href: '/restaurantes?categoria=marisqueria' },
  { label: 'Pulpería', href: '/restaurantes?categoria=pulperia' },
  { label: 'Tradicional', href: '/restaurantes?categoria=tradicional' },
  { label: 'Tapería', href: '/restaurantes?categoria=taperia' },
  { label: 'Ferrol', href: '/restaurantes?localidad=ferrol' },
  { label: 'A Coruña', href: '/restaurantes?localidad=a-coruna' },
];

export function HeroSection() {
  const [slide, setSlide] = useState(0);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) window.location.href = `/restaurantes?q=${encodeURIComponent(query)}`;
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Slides */}
      {SLIDES.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === slide ? 1 : 0 }}
        >
          <Image
            src={s.img}
            alt={s.titulo}
            fill
            className="object-cover object-center"
            priority={i === 0}
          />
        </div>
      ))}

      {/* Overlay azul marino */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, rgba(36,59,96,0.5) 0%, rgba(36,59,96,0.3) 50%, rgba(36,59,96,0.8) 100%)' }}
      />

      {/* Contenido */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto pt-20">
        {/* Badge TV */}
        <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-4 py-1.5 mb-6">
          <span className="w-2 h-2 rounded-full bg-[#45b0e5] animate-pulse" />
          <span className="text-xs font-semibold tracking-widest uppercase">TV Ferrol · Canal 33 Madrid · YouTube</span>
        </div>

        {/* Título */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl mb-4 leading-tight"
          style={{ fontFamily: 'Lilita One, cursive', whiteSpace: 'pre-line' }}
        >
          {SLIDES[slide].titulo}
        </h1>

        <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto font-light">
          {SLIDES[slide].subtitulo}
        </p>

        {/* Buscador */}
        <form onSubmit={handleSearch} className="flex items-center gap-2 bg-white rounded-full p-2 max-w-xl mx-auto mb-6 shadow-xl">
          <Search size={18} className="ml-3 text-[#243b60] flex-shrink-0" />
          <input
            type="text"
            placeholder="Busca restaurante, ciudad, tipo de cocina..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-[#243b60] placeholder-gray-400 text-sm outline-none px-2"
          />
          <button
            type="submit"
            className="bg-[#243b60] text-white rounded-full px-5 py-2 text-sm font-semibold hover:bg-[#2d4f82] transition-colors flex-shrink-0"
          >
            Buscar
          </button>
        </form>

        {/* Filtros rápidos */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {FILTROS.map(f => (
            <Link
              key={f.href}
              href={f.href}
              className="bg-white/15 hover:bg-white/25 border border-white/30 text-white text-xs font-semibold px-4 py-1.5 rounded-full transition-all backdrop-blur-sm"
            >
              {f.label}
            </Link>
          ))}
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 sm:gap-14">
          {[
            { n: '+30', label: 'Restaurantes' },
            { n: '2', label: 'Ciudades' },
            { n: '3', label: 'Temporadas TV' },
          ].map(st => (
            <div key={st.label} className="text-center">
              <div className="text-3xl font-bold text-[#45b0e5]" style={{ fontFamily: 'Lilita One, cursive' }}>{st.n}</div>
              <div className="text-xs text-white/80 font-semibold uppercase tracking-wider">{st.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Indicadores slide */}
      <div className="absolute bottom-20 flex gap-2 z-10">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setSlide(i)}
            className="transition-all rounded-full"
            style={{
              width: i === slide ? '24px' : '8px',
              height: '8px',
              background: i === slide ? '#45b0e5' : 'rgba(255,255,255,0.5)',
            }}
          />
        ))}
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 z-10 animate-bounce">
        <ChevronDown size={28} className="text-white/70" />
      </div>
    </section>
  );
}
