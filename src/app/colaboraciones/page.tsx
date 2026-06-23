import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Colaboraciones | Susana La Gallega',
  description: '¿Quieres colaborar con Susana La Gallega? Conoce cómo aparecer en el programa, en la guía gastronómica o en las redes sociales.',
};

export default function ColaboracionesPage() {
  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="py-20 px-4" style={{ background: '#243b60' }}>
        <div className="max-w-3xl mx-auto text-center text-white">
          <span className="section-label text-[#45b0e5]">Trabaja conmigo</span>
          <h1 className="mt-3 text-4xl sm:text-5xl" style={{ fontFamily: 'Lilita One, cursive' }}>
            Colaboraciones
          </h1>
          <p className="mt-5 text-white/80 text-lg max-w-xl mx-auto">
            Si tienes un restaurante, producto o proyecto gastronómico y quieres llegar a miles de personas
            apasionadas por la buena mesa, hablemos.
          </p>
        </div>
      </section>

      {/* Tipos de colaboración */}
      <section className="py-16 px-4" style={{ background: '#F4F3E4' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="section-label text-[#45b0e5]">¿Cómo trabajamos?</span>
            <h2 className="mt-2 text-3xl" style={{ fontFamily: 'Lilita One, cursive', color: '#243b60' }}>
              Formas de colaborar
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '📺',
                titulo: 'Aparición en TV',
                desc: 'Tu restaurante o producto en el programa Saboreando con Susana, emitido en TV Ferrol y Canal 33 Madrid.',
              },
              {
                icon: '📖',
                titulo: 'Guía Gastronómica',
                desc: 'Inclusión en la guía de sabores descargable que miles de personas consultan cada mes.',
              },
              {
                icon: '🌐',
                titulo: 'Presencia en la web',
                desc: 'Ficha destacada en el directorio de restaurantes con fotos, descripción y enlace directo.',
              },
            ].map(c => (
              <div key={c.titulo} className="card-susana p-6 text-center">
                <div className="text-4xl mb-3">{c.icon}</div>
                <h3 className="font-bold text-[#243b60] text-lg mb-2" style={{ fontFamily: 'Lilita One, cursive' }}>
                  {c.titulo}
                </h3>
                <p className="text-[#5a6a7a] text-sm">{c.desc}</p>
              </div>
            ))}
          </div>

          {/* Logos colaboradores */}
          <div className="mt-12 text-center">
            <p className="text-[#5a6a7a] text-sm mb-6 uppercase tracking-wider font-semibold">Colaboradores</p>
            <div className="flex flex-wrap justify-center gap-6 items-center">
              <Image src="/images/original_32882.png" alt="Colaborador" width={80} height={50} className="opacity-60 hover:opacity-100 transition-opacity object-contain" unoptimized />
              <Image src="/images/original_32883.png" alt="Colaborador" width={80} height={50} className="opacity-60 hover:opacity-100 transition-opacity object-contain" unoptimized />
              <Image src="/images/original_32986.png" alt="Colaborador" width={80} height={50} className="opacity-60 hover:opacity-100 transition-opacity object-contain" unoptimized />
            </div>
          </div>
        </div>
      </section>

      {/* CTA contacto */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl" style={{ fontFamily: 'Lilita One, cursive', color: '#243b60' }}>
            ¿Hablamos?
          </h2>
          <p className="mt-3 text-[#5a6a7a] text-sm">
            Escríbeme directamente por WhatsApp y te explico todas las opciones disponibles.
          </p>
          <a
            href="https://wa.me/34608756544"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-turquesa mt-6 inline-flex"
          >
            💬 Contactar por WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
