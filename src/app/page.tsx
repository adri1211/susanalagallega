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
import { BlogPreviewSection } from '@/components/home/BlogPreviewSection';
import { MapTeaser } from '@/components/home/MapTeaser';
import { getDestacados } from '@/lib/data';
import { getPublishedPosts } from '@/lib/blog';

export const revalidate = 3600;

export default async function HomePage() {
  let destacados: Awaited<ReturnType<typeof getDestacados>> = [];
  let blogPosts: Awaited<ReturnType<typeof getPublishedPosts>> = [];

  try {
    [destacados, blogPosts] = await Promise.all([
      getDestacados(),
      getPublishedPosts(3),
    ]);
  } catch {
    // Supabase not configured
  }

  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <StorySection />
      <CinematicSection />
      <StatsSection />
      <MediaSection />
      <CategoriesSection />
      <FeaturedSection restaurantes={destacados} />
      <GodalbaSection />
      <TestimoniosSection />
      <ColaboradoresSection />
      <BlogPreviewSection posts={blogPosts} />
      <MapTeaser />
    </>
  );
}
