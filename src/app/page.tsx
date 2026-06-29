import { HeroSection } from '@/components/home/HeroSection';
import { MarqueeSection } from '@/components/home/MarqueeSection';
import { StorySection } from '@/components/home/StorySection';
import { MediaSection } from '@/components/home/MediaSection';
import { CategoriesSection } from '@/components/home/CategoriesSection';
import { FeaturedSection } from '@/components/home/FeaturedSection';
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
      {/* 1. Susana / Marca personal */}
      <HeroSection />
      {/* Marquee animado */}
      <MarqueeSection />
      {/* 2. El programa de TV */}
      <StorySection />
      {/* 3. Me habrás visto en */}
      <MediaSection />
      {/* 4. Explorar por categoría */}
      <CategoriesSection />
      {/* 5. Restaurantes destacados */}
      <FeaturedSection restaurantes={destacados} />
      {/* 6. Guía descargable */}
      <MapTeaser />
    </>
  );
}
