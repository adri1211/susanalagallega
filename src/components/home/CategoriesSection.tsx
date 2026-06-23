'use client';

import Link from 'next/link';

const CATEGORIAS = [
  { slug: 'marisqueria', label: 'Marisquería', emoji: '🦞', color: '#1a4f7a' },
  { slug: 'pulperia', label: 'Pulpería', emoji: '🐙', color: '#1a4f7a' },
  { slug: 'parrillada', label: 'Parrillada', emoji: '🥩', color: '#1a4f7a' },
  { slug: 'taperia', label: 'Tapería', emoji: '🍺', color: '#1a4f7a' },
  { slug: 'tradicional', label: 'Tradicional', emoji: '🏠', color: '#1a4f7a' },
  { slug: 'cocina-moderna', label: 'Cocina Moderna', emoji: '✨', color: '#1a4f7a' },
  { slug: 'bar', label: 'Bar & Café', emoji: '☕', color: '#1a4f7a' },
  { slug: 'cafeteria', label: 'Cafetería', emoji: '🥐', color: '#1a4f7a' },
];

export function CategoriesSection() {
  return (
    <section className="py-16 px-4" style={{ background: '#F4F3E4' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
          <div>
            <p className="section-label text-[#45b0e5] mb-1">¿Qué te apetece hoy?</p>
            <h2 className="text-3xl sm:text-4xl" style={{ fontFamily: 'Lilita One, cursive', color: '#243b60' }}>
              Elige tu tipo de cocina
            </h2>
          </div>
          <p className="text-[#5a6a7a] text-sm max-w-xs">
            De la marisquería más fresca a la pulpería más auténtica — todo en un solo lugar.
          </p>
        </div>

        {/* Grid de categorías — estilo tile compacto */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {CATEGORIAS.map((cat, i) => (
            <Link
              key={cat.slug}
              href={`/restaurantes?categoria=${cat.slug}`}
              className="group relative overflow-hidden rounded-2xl p-5 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{
                background: i % 2 === 0 ? '#243b60' : 'white',
                border: i % 2 === 0 ? 'none' : '1.5px solid rgba(36,59,96,0.1)',
              }}
            >
              <span className="text-3xl">{cat.emoji}</span>
              <div>
                <p className={`font-bold text-sm leading-tight ${i % 2 === 0 ? 'text-white' : 'text-[#243b60]'}`}
                  style={{ fontFamily: 'Lilita One, cursive' }}>
                  {cat.label}
                </p>
              </div>
              {/* Hover indicator */}
              <div className={`absolute bottom-3 right-3 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity ${i % 2 === 0 ? 'text-[#45b0e5]' : 'text-[#243b60]'}`}>
                Ver →
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <Link href="/restaurantes" className="btn-secundario">
            Ver todos los restaurantes →
          </Link>
        </div>
      </div>
    </section>
  );
}
