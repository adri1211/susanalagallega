import { HeroSection } from '@/components/home/HeroSection';
import { MarqueeSection } from '@/components/home/MarqueeSection';
import { StorySection } from '@/components/home/StorySection';
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
      {/* 1. Marca personal */}
      <HeroSection />
      {/* Marquee animado */}
      <MarqueeSection />
      {/* 2. El programa */}
      <StorySection />
      {/* 3. Medios */}
      <MediaSection />
      {/* 4. Categorías restaurantes */}
      <CategoriesSection />
      {/* 5. Restaurantes destacados */}
      <FeaturedSection restaurantes={destacados} />
      {/* 6. Mar de Godalba + Hostal */}
      <GodalbaSection />
      {/* 7. Testimonios */}
      <TestimoniosSection />
      {/* 8. Colaboradores */}
      <ColaboradoresSection />
      {/* 9. Guía descargable */}
      <MapTeaser />
    </>
  );
}
