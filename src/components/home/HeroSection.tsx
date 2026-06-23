'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';

const HERO_SLIDES = [
  {
    bg: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=80',
    title: 'El alma de',
    titleBold: 'Galicia',
    subtitle: 'en cada bocado',
    tag: 'Gastronomía atlántica',
  },
  {
    bg: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=1920&q=80',
    title: 'Mar, tradición',
    titleBold: 'y producto local',
    subtitle: 'en cada rincón',
    tag: 'Marisquerías de excepción',
  },
  {
    bg: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80',
    title: 'Descubre dónde',
    titleBold: 'comer en Galicia',
    subtitle: 'como nunca antes',
    tag: 'Más de 500 restaurantes',
  },
];

export function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [query, setQuery] = useState('');
  const router = useRouter();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/restaurantes?busqueda=${encodeURIComponent(query.trim())}`);
    } else {
      router.push('/restaurantes');
    }
  };

  const slide = HERO_SLIDES[current];

  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden">
      {/* Background slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.bg})` }}
          />
          <div className="absolute inset-0 hero-overlay" />
          {/* Color tint for atmosphere */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B3D6B]/30 via-transparent to-[#2D5016]/20" />
        </motion.div>
      </AnimatePresence>

      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAUVBMVEWFhYWDg4N3d3dtbW17e3t1dXWBgYGHh4t5eXlzc3OLi4ubm5uVlZWPj4+NjY19fX2JiYl/f39ra2uRkZGZmZlpaWmXl5dvb29xcXGTk5NnZ2c8TV1mAAAAG3RSTlNAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAvEOwtAAAFVklEQVR4XpWWB67c2BUFb3g557T/hRo9/WUMZHlgr4Bg8Z4qQgQJlHI4A8SzFVrapvmTF9O7dmYRFZ60YiBhJRCgh1FYhiLAmdvX0CzTOpNE77ME0Zty/nWWzchDtiqrmQDeuv3powQ5ta2eN0FY0InkqDD73lT9c9lEzwUNqgFHs9VQce3TVClFCQrSTfOiYkVJQBmpbq2L6iZavPnAPcoU0dSw0SUTqz/GtrGuXfbyyBniKykOWQWGqwwMA7QiYAxi+IlPdqo+hYHnUt5ZPfnsHJyNiDtnpJyayNBkF6cWoYGAMY92ZBsiAeilQZ/UCf7whAMNO01b7RoqgPVUqXM4tJqFI7OX5h1FX4fBxOJkHwVMj4P3WvL+jcCr5GKoRBKRL2gV7pAGAC2Af24ADFtGlvjKGbxOmqEE2r7n3Q05oMYfMUHKRRWjT8KJxuF3CGBFqSGcTW0GCq4FY2v8DmXIFbYc/AIUBb5AIsWCDcJaA7PaLCzSmfzxo0WRFbOPRFEqIHHZK1NJRFCy1JWgIDWX/V5OynhJ8hqNRZJJi5/zfI9m3/fFD7+ZNUfzAGQtE5Gxg8TRMJSwLFLiBwJQl4SqBTNITWqaA9UCNFYGIOblFDkW1HlV/eGFPHR0+MCMB8VqFz5s8SuMmHBjHhN5KDNJBBn5MnuEqMiWcY6g5M8vQ==')] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6">
        {/* Tag */}
        <motion.div
          key={`tag-${current}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-6"
        >
          <span className="section-label text-white/70 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm">
            {slide.tag}
          </span>
        </motion.div>

        {/* Heading */}
        <AnimatePresence mode="wait">
          <motion.h1
            key={`h1-${current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-center text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light text-white leading-[1.05] mb-4 max-w-4xl"
          >
            {slide.title}{' '}
            <span className="font-semibold italic">{slide.titleBold}</span>
            <br />
            <span className="text-white/70 font-light">{slide.subtitle}</span>
          </motion.h1>
        </AnimatePresence>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="w-full max-w-2xl mt-8"
        >
          <form onSubmit={handleSearch} className="relative">
            <div className="flex items-center bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden pl-5 pr-2 py-2 gap-3">
              <Search size={18} className="text-[#3D3D3D]/50 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Busca por nombre, localidad o tipo de cocina..."
                className="flex-1 text-[#1A1A1A] placeholder-[#3D3D3D]/40 bg-transparent outline-none text-sm sm:text-base py-2"
              />
              <button
                type="submit"
                className="shrink-0 bg-[#2D5016] text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-[#4A7C23] transition-colors"
              >
                Buscar
              </button>
            </div>
          </form>

          {/* Quick filters */}
          <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
            {['Marisquerías', 'Pulperías', 'Santiago de Compostela', 'Vigo', 'A Coruña'].map((tag) => (
              <button
                key={tag}
                onClick={() => router.push(`/restaurantes?busqueda=${encodeURIComponent(tag)}`)}
                className="text-xs text-white/70 border border-white/25 px-3 py-1.5 rounded-full hover:bg-white/15 hover:text-white transition-colors backdrop-blur-sm"
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="flex items-center gap-8 mt-10 text-white/60 text-sm"
        >
          {[
            { value: '500+', label: 'restaurantes' },
            { value: '4', label: 'provincias' },
            { value: '10', label: 'categorías' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-white text-xl font-semibold">{stat.value}</p>
              <p className="text-xs">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-500 rounded-full ${
              i === current ? 'w-6 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/40'
            }`}
          />
        ))}
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 right-8 text-white/40 flex flex-col items-center gap-1 text-xs"
      >
        <span className="section-label">Descubre</span>
        <ChevronDown size={16} className="animate-bounce" />
      </motion.div>

      {/* Location pill */}
      <div className="absolute top-24 right-6 lg:right-10 glass text-white/80 flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full">
        <MapPin size={11} />
        Galicia, España
      </div>
    </section>
  );
}
