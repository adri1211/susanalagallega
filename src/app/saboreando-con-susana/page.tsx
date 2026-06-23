import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Saboreando con Susana | El programa de gastronomía gallega',
  description: 'Saboreando con Susana es el programa de gastronomía gallega en TV Ferrol y Canal 33 Madrid. Descubre los mejores restaurantes y productos de Galicia.',
};

const VIDEOS = [
  { id: '1yLIB30MFkg', titulo: 'Episodio 1 - Los sabores de Ferrol', desc: 'Susana descubre los mejores rincones gastronómicos de la ciudad naval.' },
  { id: 'NNzJAOAhFE0', titulo: 'Episodio 2 - Gastronomía gallega', desc: 'Un recorrido por los productos más auténticos de Galicia.' },
  { id: 'xRRHhJSynD8', titulo: 'Episodio 3 - Los rincones de Galicia', desc: 'Lugares que Susana no puede dejar de recomendar.' },
];

export default function SaboreandoPage() {
  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="py-20 px-4" style={{ background: '#243b60' }}>
        <div className="max-w-4xl mx-auto text-center text-white">
          <span className="section-label text-[#45b0e5]">El programa</span>
          <h1 className="mt-3 text-4xl sm:text-5xl" style={{ fontFamily: 'Lilita One, cursive' }}>
            Saboreando con Susana
          </h1>
          <p className="mt-5 text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
            Nacido en la TV de Ferrol y ahora también en Canal 33 Madrid,
            <em> Saboreando con Susana</em> es un programa que combina pasión culinaria,
            productos auténticos y lugares que merecen ser descubiertos.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {[
              { label: '📺 TV Ferrol', sub: 'Canal 34' },
              { label: '📺 Canal 33 Madrid', sub: 'Madrid' },
              { label: '▶️ YouTube', sub: 'Online' },
            ].map(c => (
              <div key={c.label} className="bg-white/10 border border-white/20 rounded-2xl px-6 py-3 text-center">
                <div className="text-white font-bold">{c.label}</div>
                <div className="text-white/50 text-xs">{c.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vídeos */}
      <section className="py-16 px-4" style={{ background: '#F4F3E4' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="section-label text-[#45b0e5]">Episodios</span>
            <h2 className="mt-2 text-3xl" style={{ fontFamily: 'Lilita One, cursive', color: '#243b60' }}>
              Ve los episodios
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VIDEOS.map(v => (
              <div key={v.id} className="card-susana overflow-hidden">
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${v.id}`}
                    title={v.titulo}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full border-0"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-[#243b60] text-sm" style={{ fontFamily: 'Lilita One, cursive' }}>
                    {v.titulo}
                  </h3>
                  <p className="text-[#5a6a7a] text-xs mt-1">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href="https://www.youtube.com/@susanalagallega"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primario"
            >
              ▶️ Ver todos los vídeos en YouTube →
            </a>
          </div>
        </div>
      </section>

      {/* Sobre Susana */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <span className="section-label text-[#45b0e5]">Quién soy</span>
          <h2 className="mt-2 text-3xl" style={{ fontFamily: 'Lilita One, cursive', color: '#243b60' }}>
            Susana Fernández, La Gallega
          </h2>
          <p className="mt-4 text-[#5a6a7a] text-base leading-relaxed">
            Soy Susana Fernández, aunque todos me conocen como La Gallega. Apasionada de la gastronomía
            y de descubrir rincones únicos, quiero compartir contigo mi viaje entre fogones, restaurantes
            y productos con alma.
          </p>
          <blockquote className="mt-6 border-l-4 border-[#45b0e5] pl-4 text-left italic text-[#243b60] font-medium">
            &ldquo;Las recomendaciones de Susana nunca fallan, descubrí un restaurante increíble en Ferrol&rdquo;
          </blockquote>
          <a
            href="https://wa.me/34608756544"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-turquesa mt-8 inline-flex"
          >
            Contactar con Susana →
          </a>
        </div>
      </section>
    </main>
  );
}
