import { HeroSection } from '@/components/home/HeroSection';
import { MarqueeSection } from '@/components/home/MarqueeSection';
import { StorySection } from '@/components/home/StorySection';
import { CinematicSection } from '@/components/home/CinematicSection';
import { StatsSection } from '@/components/home/StatsSection';
import { MediaSection } from '@/components/home/MediaSection';
import { CategoriesSection } from '@/components/home/CategoriesSection';
import { FeaturedSection } from '@/components/home/FeaturedSection';
import { GodalbaSection } from '@/components/home/GodalbaSection';
import { TestimoniosSection } from '@/components/home/TestimoniosSection';
import { ColaboradoresSection } from '@/components/home/ColaboradoresSection';
import { MapTeaser } from '@/components/home/MapTeaser';
import { getDestacados } from '@/lib/data';

export const revalidate = 3600;

export default async function HomePage() {
  let destacados: Awaited<ReturnType<typeof getDestacados>> = [];
  try {
    destacados = await getDestacados();
  } catch {
    // Supabase not configured
  }

  return (
    <>
      {/* 1. Marca personal — hero inmersivo */}
      <HeroSection />
      {/* 2. Marquee animado */}
      <MarqueeSection />
      {/* 3. El programa TV */}
      <StorySection />
      {/* 4. Sección cinematográfica — cita + parallax */}
      <CinematicSection />
      {/* 5. Stats animados */}
      <StatsSection />
      {/* 6. Medios */}
      <MediaSection />
      {/* 7. Categorías inmersivas */}
      <CategoriesSection />
      {/* 8. Restaurantes destacados */}
      <FeaturedSection restaurantes={destacados} />
      {/* 9. Mar de Godalba + Hostal */}
      <GodalbaSection />
      {/* 10. Testimonios */}
      <TestimoniosSection />
      {/* 11. Colaboradores */}
      <ColaboradoresSection />
      {/* 12. Guía descargable */}
      <MapTeaser />
    </>
  );
}
