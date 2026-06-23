import type { Metadata } from 'next';
import { Suspense } from 'react';
import { RestaurantesDirectory } from '@/components/restaurant/RestaurantesDirectory';

export const metadata: Metadata = {
  title: 'Restaurantes en Galicia',
  description:
    'Directorio completo de restaurantes en Galicia. Marisquerías, pulperías, parrilladas, bares y mucho más. Encuentra dónde comer en A Coruña, Pontevedra, Lugo y Ourense.',
};

export default function RestaurantesPage() {
  return (
    <div className="pt-20 min-h-screen bg-[#FAF7F0]">
      <Suspense fallback={<div className="h-96 flex items-center justify-center text-[#3D3D3D]/40">Cargando...</div>}>
        <RestaurantesDirectory />
      </Suspense>
    </div>
  );
}
