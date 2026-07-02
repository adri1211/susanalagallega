import type { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://saboreandoconsusanalagallega.com';

const STATIC_ROUTES = [
  { url: '/', changeFrequency: 'daily' as const, priority: 1.0 },
  { url: '/restaurantes', changeFrequency: 'daily' as const, priority: 0.9 },
  { url: '/categorias/marisqueria', changeFrequency: 'weekly' as const, priority: 0.8 },
  { url: '/categorias/pulperia', changeFrequency: 'weekly' as const, priority: 0.8 },
  { url: '/categorias/parrillada', changeFrequency: 'weekly' as const, priority: 0.8 },
  { url: '/categorias/taperia', changeFrequency: 'weekly' as const, priority: 0.8 },
  { url: '/categorias/tradicional', changeFrequency: 'weekly' as const, priority: 0.8 },
  { url: '/categorias/cocina-moderna', changeFrequency: 'weekly' as const, priority: 0.8 },
  { url: '/categorias/bar', changeFrequency: 'weekly' as const, priority: 0.7 },
  { url: '/categorias/cafeteria', changeFrequency: 'weekly' as const, priority: 0.7 },
  { url: '/mapa', changeFrequency: 'weekly' as const, priority: 0.7 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = STATIC_ROUTES.map((route) => ({
    url: `${BASE_URL}${route.url}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Dynamic restaurant routes
  let restaurantRoutes: MetadataRoute.Sitemap = [];
  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data } = await supabase
      .from('restaurantes')
      .select('slug, updated_at')
      .eq('activo', true);

    restaurantRoutes = (data || []).map((r) => ({
      url: `${BASE_URL}/restaurantes/${r.slug}`,
      lastModified: new Date(r.updated_at),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  } catch {
    // Supabase not configured
  }

  return [...staticRoutes, ...restaurantRoutes];
}
