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
import { GuiaSection } from '@/components/home/GuiaSection';
import { getDestacados } from '@/lib/data';
import { getPublishedPosts } from '@/lib/blog';

export const revalidate = 3600;

export default async function HomePage() {
  let destacados: Awaited<ReturnType<typeof getDestacados>> = [];
  let blogPosts: Awaited<ReturnType<typeof getPublishedPosts>> = [];

  try { destacados = await getDestacados(); } catch {}
  try { blogPosts = await getPublishedPosts(3); } catch {}

  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <StorySection />
      <CinematicSection />
      <GuiaSection />
      <BlogPreviewSection posts={blogPosts} />
      <StatsSection />
      <MediaSection />
      <CategoriesSection />
      <FeaturedSection restaurantes={destacados} />
      <GodalbaSection />
      <TestimoniosSection />
      <ColaboradoresSection />
      <MapTeaser />
    </>
  );
}
