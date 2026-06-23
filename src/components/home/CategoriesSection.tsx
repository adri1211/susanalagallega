'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const CATEGORIAS = [
  {
    slug: 'marisqueria',
    nombre: 'Marisquerías',
    emoji: '🦞',
    descripcion: 'El marisco más fresco del Atlántico',
    color: 'from-blue-900/80 to-blue-700/60',
    img: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=600&q=75',
  },
  {
    slug: 'pulperia',
    nombre: 'Pulperías',
    emoji: '🐙',
    descripcion: 'El auténtico pulpo á feira gallego',
    color: 'from-red-900/80 to-red-700/60',
    img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=75',
  },
  {
    slug: 'parrillada',
    nombre: 'Parrilladas',
    emoji: '🔥',
    descripcion: 'Carnes y pescados a la brasa perfecta',
    color: 'from-orange-900/80 to-amber-700/60',
    img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=75',
  },
  {
    slug: 'taperia',
    nombre: 'Taperías',
    emoji: '🍽️',
    descripcion: 'Las mejores tapas y raciones gallegas',
    color: 'from-emerald-900/80 to-green-700/60',
    img: 'https://images.unsplash.com/photo-1543353071-873f17a7a088?w=600&q=75',
  },
  {
    slug: 'tradicional',
    nombre: 'Tradicionales',
    emoji: '🏠',
    descripcion: 'Cocina gallega de siempre, de toda la vida',
    color: 'from-stone-900/80 to-stone-700/60',
    img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=75',
  },
  {
    slug: 'cocina-moderna',
    nombre: 'Cocina Moderna',
    emoji: '⭐',
    descripcion: 'Vanguardia con producto gallego de proximidad',
    color: 'from-slate-900/80 to-slate-700/60',
    img: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=600&q=75',
  },
  {
    slug: 'bar',
    nombre: 'Bares',
    emoji: '🍺',
    descripcion: 'El ambiente gallego en su máxima expresión',
    color: 'from-yellow-900/80 to-yellow-700/60',
    img: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=600&q=75',
  },
  {
    slug: 'cafeteria',
    nombre: 'Cafeterías',
    emoji: '☕',
    descripcion: 'Desayunos y meriendas de Galicia',
    color: 'from-amber-900/80 to-amber-700/60',
    img: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=600&q=75',
  },
];

export function CategoriesSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#FAF7F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="section-label text-[#2D5016] mb-3">Lo que encontrarás</p>
          <h2 className="text-4xl lg:text-5xl font-light text-[#1A1A1A]">
            Toda la gastronomía
            <br />
            <span className="font-semibold">gallega en un lugar</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {CATEGORIAS.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
            >
              <Link
                href={`/categorias/${cat.slug}`}
                className="group relative block overflow-hidden rounded-2xl aspect-[4/5] card-hover"
              >
                {/* Background image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${cat.img})` }}
                />
                {/* Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-t ${cat.color}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-end p-4 sm:p-5">
                  <span className="text-2xl mb-2">{cat.emoji}</span>
                  <h3 className="text-white font-semibold text-sm sm:text-base leading-tight">
                    {cat.nombre}
                  </h3>
                  <p className="text-white/60 text-xs mt-1 leading-relaxed line-clamp-2 hidden sm:block">
                    {cat.descripcion}
                  </p>
                  <div className="mt-3 flex items-center gap-1 text-white/50 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Ver todos</span>
                    <span>→</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
