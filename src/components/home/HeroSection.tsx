'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, ChevronDown, Play } from 'lucide-react';

const KEYWORDS = ['marisquería', 'pulpería', 'cocina gallega', 'sabores auténticos', 'Ferrol', 'A Coruña'];

export function HeroSection() {
  const [query, setQuery] = useState('');
  const [kwIndex, setKwIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setKwIndex(i => (i + 1) % KEYWORDS.length);
        setFade(true);
      }, 400);
    }, 2500);
    return () => clearInterval(t);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) window.location.href = `/restaurantes?q=${encodeURIComponent(query)}`;
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: '#243b60' }}>
      {/* Fondo — imagen Susana */}
      <div className="absolute inset-0">
        <Image
          src="/images/original_32874.png"
          alt="Susana La Gallega"
          fill
          className="object-cover object-center opacity-30"
          priority
          unoptimized
        />
        {/* Gradiente fuerte izquierda para texto legible */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to right, rgba(36,59,96,0.98) 0%, rgba(36,59,96,0.85) 55%, rgba(36,59,96,0.3) 100%)'
        }} />
      </div>

      {/* Patrón decorativo */}
      <div className="absolute inset-0 patron-azulejo" />

      {/* Contenido principal */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 mb-8"
            style={{ background: 'rgba(69,176,229,0.15)', border: '1px solid rgba(69,176,229,0.35)', borderRadius: '9999px', padding: '8px 18px' }}>
            <span className="w-2 h-2 rounded-full bg-[#45b0e5] animate-pulse" />
            <span className="text-[#45b0e5] text-xs font-bold uppercase tracking-widest">TV Ferrol · Canal 33 Madrid · YouTube</span>
          </div>

          {/* Título */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl text-white leading-[1.05] mb-6"
            style={{ fontFamily: 'Lilita One, cursive' }}>
            La guía<br />
            gastronómica<br />
            <span style={{ color: '#45b0e5' }}>de Galicia</span>
          </h1>

          {/* Keyword rotativo */}
          <p className="text-white/70 text-xl mb-10 font-light">
            Encuentra tu{' '}
            <span
              className="font-semibold text-white transition-opacity duration-300"
              style={{ opacity: fade ? 1 : 0 }}
            >
              {KEYWORDS[kwIndex]}
            </span>
            {' '}perfecta
          </p>

          {/* Buscador */}
          <form onSubmit={handleSearch} className="flex items-center gap-2 bg-white rounded-2xl p-2 max-w-xl shadow-2xl mb-8">
            <Search size={18} className="ml-3 flex-shrink-0" style={{ color: '#243b60' }} />
            <input
              type="text"
              placeholder="Restaurante, ciudad, tipo de cocina..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm outline-none px-2"
              style={{ color: '#243b60' }}
            />
            <button type="submit"
              className="flex-shrink-0 text-white rounded-xl px-5 py-2.5 text-sm font-bold transition-all hover:brightness-110"
              style={{ background: '#243b60' }}>
              Buscar
            </button>
          </form>

          {/* Chips rápidos */}
          <div className="flex flex-wrap gap-2 mb-12">
            {[
              { label: '🦞 Marisquería', href: '/restaurantes?categoria=marisqueria' },
              { label: '🐙 Pulpería', href: '/restaurantes?categoria=pulperia' },
              { label: '📍 Ferrol', href: '/restaurantes?localidad=ferrol' },
              { label: '📍 A Coruña', href: '/restaurantes?localidad=a-coruna' },
              { label: '📍 Cedeira', href: '/restaurantes?localidad=cedeira' },
            ].map(c => (
              <Link key={c.href} href={c.href}
                className="text-white/90 text-xs font-semibold px-4 py-2 rounded-full transition-all hover:bg-white/25"
                style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
                {c.label}
              </Link>
            ))}
          </div>

          {/* Stats + CTA TV */}
          <div className="flex flex-wrap items-center gap-8">
            {[
              { n: '+30', label: 'Restaurantes' },
              { n: '3', label: 'Temporadas en TV' },
              { n: '100%', label: 'Recomendaciones reales' },
            ].map(s => (
              <div key={s.label}>
                <div className="text-3xl font-bold" style={{ color: '#45b0e5', fontFamily: 'Lilita One, cursive' }}>{s.n}</div>
                <div className="text-white/60 text-xs font-semibold uppercase tracking-wide">{s.label}</div>
              </div>
            ))}

            <Link href="/saboreando-con-susana"
              className="flex items-center gap-2 text-white text-sm font-bold px-5 py-3 rounded-full transition-all hover:bg-white/10"
              style={{ background: 'rgba(69,176,229,0.2)', border: '1px solid rgba(69,176,229,0.4)' }}>
              <Play size={14} fill="currentColor" />
              Ver el programa
            </Link>
          </div>
        </div>
      </div>

      {/* Imagen Susana flotando a la derecha en desktop */}
      <div className="absolute right-0 bottom-0 hidden lg:block w-[42%] h-full pointer-events-none">
        <Image
          src="/images/original_32874.png"
          alt="Susana La Gallega"
          fill
          className="object-cover object-top"
          style={{ maskImage: 'linear-gradient(to left, rgba(0,0,0,0.6) 0%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.6) 0%, transparent 100%)' }}
          priority
          unoptimized
        />
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown size={28} className="text-white/50" />
      </div>
    </section>
  );
}
