import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacto | Susana La Gallega',
  description: 'Contacta con Susana La Gallega para colaboraciones, consultas o simplemente para hablar de gastronomía.',
};

export default function ContactoPage() {
  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="py-20 px-4" style={{ background: '#243b60' }}>
        <div className="max-w-3xl mx-auto text-center text-white">
          <span className="section-label text-[#45b0e5]">¿Hablamos?</span>
          <h1 className="mt-3 text-4xl sm:text-5xl" style={{ fontFamily: 'Lilita One, cursive' }}>
            Contacto
          </h1>
          <p className="mt-4 text-white/80">
            Estoy aquí para ayudarte. Escríbeme y te respondo lo antes posible.
          </p>
        </div>
      </section>

      {/* Opciones de contacto */}
      <section className="py-16 px-4" style={{ background: '#F4F3E4' }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* WhatsApp */}
            <a
              href="https://wa.me/34608756544"
              target="_blank"
              rel="noopener noreferrer"
              className="card-susana p-8 flex items-start gap-4 hover:border-[#25D366] group"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: '#dcfce7' }}>
                💬
              </div>
              <div>
                <h3 className="font-bold text-[#243b60] text-lg mb-1" style={{ fontFamily: 'Lilita One, cursive' }}>
                  WhatsApp
                </h3>
                <p className="text-[#5a6a7a] text-sm">La forma más rápida de contactarme. Te respondo en pocas horas.</p>
                <span className="text-[#25D366] text-sm font-semibold mt-2 inline-block group-hover:underline">
                  +34 608 756 544 →
                </span>
              </div>
            </a>

            {/* YouTube */}
            <a
              href="https://www.youtube.com/@susanalagallega"
              target="_blank"
              rel="noopener noreferrer"
              className="card-susana p-8 flex items-start gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: '#fee2e2' }}>
                ▶️
              </div>
              <div>
                <h3 className="font-bold text-[#243b60] text-lg mb-1" style={{ fontFamily: 'Lilita One, cursive' }}>
                  YouTube
                </h3>
                <p className="text-[#5a6a7a] text-sm">Suscríbete al canal y no te pierdas ningún episodio de Saboreando con Susana.</p>
                <span className="text-red-500 text-sm font-semibold mt-2 inline-block group-hover:underline">
                  Canal de YouTube →
                </span>
              </div>
            </a>

            {/* Guía PDF */}
            <a
              href="/guia-de-sabores.pdf"
              download
              className="card-susana p-8 flex items-start gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: '#C7E7F4' }}>
                📥
              </div>
              <div>
                <h3 className="font-bold text-[#243b60] text-lg mb-1" style={{ fontFamily: 'Lilita One, cursive' }}>
                  Guía de Sabores
                </h3>
                <p className="text-[#5a6a7a] text-sm">Descarga gratis la guía gastronómica con mis mejores recomendaciones.</p>
                <span className="text-[#45b0e5] text-sm font-semibold mt-2 inline-block group-hover:underline">
                  Descargar PDF →
                </span>
              </div>
            </a>

            {/* Colaboraciones */}
            <div className="card-susana p-8 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: '#f3e8ff' }}>
                🤝
              </div>
              <div>
                <h3 className="font-bold text-[#243b60] text-lg mb-1" style={{ fontFamily: 'Lilita One, cursive' }}>
                  Colaboraciones
                </h3>
                <p className="text-[#5a6a7a] text-sm">¿Tienes un restaurante o producto? Aparece en el programa y en la guía.</p>
                <a href="/colaboraciones" className="text-[#243b60] text-sm font-semibold mt-2 inline-block hover:underline">
                  Más información →
                </a>
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="bg-white rounded-2xl p-8 text-center border border-[#C7E7F4]">
            <div className="text-4xl mb-3">⭐</div>
            <blockquote className="text-[#243b60] font-medium text-lg italic max-w-xl mx-auto">
              &ldquo;Las recomendaciones de Susana nunca fallan, descubrí un restaurante increíble en Ferrol&rdquo;
            </blockquote>
            <p className="text-[#5a6a7a] text-sm mt-3">— Seguidora del programa</p>
          </div>
        </div>
      </section>
    </main>
  );
}
