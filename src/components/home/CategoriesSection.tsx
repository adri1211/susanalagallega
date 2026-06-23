'use client';

import Link from 'next/link';

const CATEGORIAS = [
  { slug: 'marisqueria', label: 'Marisquería', emoji: '🦞', desc: 'Los mejores mariscos del Atlántico' },
  { slug: 'pulperia', label: 'Pulpería', emoji: '🐙', desc: 'Pulpo estilo gallego, tradición pura' },
  { slug: 'parrillada', label: 'Parrillada', emoji: '🥩', desc: 'Carnes a la brasa con carácter' },
  { slug: 'taperia', label: 'Tapería', emoji: '🍺', desc: 'Raciones y cañas en buena compañía' },
  { slug: 'tradicional', label: 'Tradicional', emoji: '🍲', desc: 'Cocina gallega de toda la vida' },
  { slug: 'cocina-moderna', label: 'Cocina Moderna', emoji: '✨', desc: 'Creatividad con raíces gallegas' },
  { slug: 'bar', label: 'Bar & Café', emoji: '☕', desc: 'Para un café o una copa tranquila' },
  { slug: 'cafeteria', label: 'Cafetería', emoji: '🥐', desc: 'Buenos desayunos y meriendas' },
];

export function CategoriesSection() {
  return (
    <section className="py-16 px-4" style={{ background: '#F4F3E4' }}>
      <div className="max-w-6xl mx-auto">
        {/* Encabezado */}
        <div className="text-center mb-10">
          <span className="section-label text-[#45b0e5]">¿Qué te apetece hoy?</span>
          <h2 className="mt-2 text-3xl sm:text-4xl" style={{ fontFamily: 'Lilita One, cursive', color: '#243b60' }}>
            Elige tu tipo de cocina
          </h2>
          <p className="mt-2 text-[#5a6a7a] text-sm max-w-xl mx-auto">
            Desde un pulpo a feira hasta una marisquería de lujo, encuentra exactamente lo que buscas.
          </p>
        </div>

        {/* Grid de categorías */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {CATEGORIAS.map(cat => (
            <Link
              key={cat.slug}
              href={`/restaurantes?categoria=${cat.slug}`}
              className="card-susana group p-5 flex flex-col items-center text-center gap-3 cursor-pointer"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform"
                style={{ background: '#C7E7F4' }}
              >
                {cat.emoji}
              </div>
              <div>
                <div className="font-bold text-sm" style={{ color: '#243b60', fontFamily: 'Poppins, sans-serif' }}>
                  {cat.label}
                </div>
                <div className="text-xs text-[#5a6a7a] mt-0.5">{cat.desc}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA ver todos */}
        <div className="text-center mt-8">
          <Link href="/restaurantes" className="btn-primario">
            Ver todos los restaurantes →
          </Link>
        </div>
      </div>
    </section>
  );
}
