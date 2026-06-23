'use client';

import { motion } from 'framer-motion';

const PILLARS = [
  {
    emoji: '🌊',
    title: 'Atlántico en el plato',
    body: 'Galicia tiene la costa más rica de la Península Ibérica. Sus rías producen el marisco más exquisito del mundo: percebes, ostras, mejillones, nécoras y centollas.',
  },
  {
    emoji: '🌿',
    title: 'Producto de proximidad',
    body: 'Grelos, pimientos de Padrón, patatas gallegas, lacón... La huerta gallega abastece mesas que llevan generaciones cocinando con lo que da la tierra.',
  },
  {
    emoji: '🍷',
    title: 'Albariño y más',
    body: 'Las Rías Baixas producen el Albariño más reconocido del mundo. Pero Galicia tiene 5 denominaciones de origen que maridán a la perfección con su cocina.',
  },
  {
    emoji: '🏔️',
    title: 'Interior y montaña',
    body: 'Más allá del mar, la Galicia interior guarda secretos únicos: el lacón con grelos, la carne de vacuno gallega, los quesos D.O. Tetilla y Arzúa-Ulloa.',
  },
];

export function StorySection() {
  return (
    <section className="py-20 lg:py-28 bg-[#FAF7F0] relative overflow-hidden">
      {/* Decorative element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#2D5016]/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#0B3D6B]/5 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="section-label text-[#2D5016] mb-4">Nuestra historia</p>
            <h2 className="text-4xl lg:text-5xl font-light text-[#1A1A1A] mb-6 leading-tight">
              Galicia es
              <br />
              <span className="font-semibold italic text-gradient">mucho más</span>
              <br />
              que un destino
            </h2>
            <p className="text-[#3D3D3D]/70 text-base leading-relaxed mb-6">
              Susana La Gallega nació del amor profundo por la gastronomía de esta tierra.
              Queremos que cada visita a Galicia, o cada excusa para quedarte, sea una
              experiencia gastronómica que recuerdes de por vida.
            </p>
            <p className="text-[#3D3D3D]/70 text-base leading-relaxed">
              No somos una guía más. Somos la voz de los restaurantes que merecen ser descubiertos,
              de los cocineros que guardan recetas de abuelas, de los productos que definen
              una forma única de entender el comer bien.
            </p>

            {/* Quote */}
            <blockquote className="mt-8 pl-5 border-l-2 border-[#2D5016]/30">
              <p className="text-[#3D3D3D] italic text-lg leading-relaxed">
                &ldquo;En Galicia no se cena. Se celebra.&rdquo;
              </p>
            </blockquote>
          </motion.div>

          {/* Right pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-3xl block mb-3">{p.emoji}</span>
                <h3 className="font-semibold text-[#1A1A1A] mb-2">{p.title}</h3>
                <p className="text-[#3D3D3D]/60 text-sm leading-relaxed">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
