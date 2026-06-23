import { HeroSection } from '@/components/home/HeroSection';
import { MediaSection } from '@/components/home/MediaSection';
import { CategoriesSection } from '@/components/home/CategoriesSection';
import { FeaturedSection } from '@/components/home/FeaturedSection';
import { MapTeaser } from '@/components/home/MapTeaser';
import { StorySection } from '@/components/home/StorySection';
import { getDestacados } from '@/lib/data';

export const revalidate = 3600;

export default async function HomePage() {
  let destacados: Awaited<ReturnType<typeof getDestacados>> = [];
  try {
    destacados = await getDestacados();
  } catch {
    // Si Supabase no está configurado, usa datos demo
  }

  return (
    <>
      <HeroSection />
      <MediaSection />
      <CategoriesSection />
      <FeaturedSection restaurantes={destacados} />
      <MapTeaser />
      <StorySection />
    </>
  );
}
