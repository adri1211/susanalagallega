import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mapa Gastronómico de Galicia',
  description: 'Explora el mapa interactivo con todos los restaurantes de Galicia. Encuentra dónde comer cerca de ti.',
};

export default function MapaPage() {
  return (
    <div className="pt-20 min-h-screen bg-[#1A1A1A] flex flex-col items-center justify-center text-center px-4">
      <span className="text-6xl mb-6">🗺️</span>
      <h1 className="text-3xl lg:text-4xl font-light text-white mb-4">
        Mapa <span className="font-semibold">interactivo</span>
      </h1>
      <p className="text-white/40 max-w-md mb-8">
        El mapa interactivo estará disponible próximamente. Integración con Mapbox o Google Maps.
        Puedes explorar los restaurantes por provincia mientras tanto.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        {['A Coruña', 'Pontevedra', 'Lugo', 'Ourense'].map((p) => (
          <a
            key={p}
            href={`/restaurantes?provincia=${encodeURIComponent(p)}`}
            className="text-sm text-white border border-white/20 px-5 py-2.5 rounded-full hover:bg-white/10 transition-colors"
          >
            {p}
          </a>
        ))}
      </div>
    </div>
  );
}
