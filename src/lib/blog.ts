import { supabase, createAdminClient } from './supabase';

export type BlogPost = {
  id: string;
  slug: string;
  titulo: string;
  extracto: string | null;
  contenido: string | null;
  imagen_portada: string | null;
  categoria: 'gastronomia' | 'ferrolterra' | 'tv-prensa' | 'productos' | 'hosteleria' | 'lifestyle';
  etiquetas: string[];
  fuente_url: string | null;
  fuente_tipo: 'facebook' | 'instagram' | 'youtube' | 'web' | 'propio' | null;
  destacado: boolean;
  publicado: boolean;
  created_at: string;
  updated_at: string;
};

export const CATEGORIAS_BLOG = [
  { slug: 'gastronomia',  label: 'Gastronomía',   color: '#45b0e5' },
  { slug: 'ferrolterra',  label: 'Ferrolterra',    color: '#1a2d4a' },
  { slug: 'tv-prensa',    label: 'TV & Prensa',    color: '#d97706' },
  { slug: 'productos',    label: 'Productos',      color: '#059669' },
  { slug: 'hosteleria',   label: 'Hostelería',     color: '#7c3aed' },
  { slug: 'lifestyle',    label: 'Lifestyle',      color: '#db2777' },
] as const;

export function getCategoriaColor(cat: string): string {
  return CATEGORIAS_BLOG.find(c => c.slug === cat)?.color ?? '#45b0e5';
}

export function getCategoriaLabel(cat: string): string {
  return CATEGORIAS_BLOG.find(c => c.slug === cat)?.label ?? cat;
}

export async function getPublishedPosts(limit?: number): Promise<BlogPost[]> {
  let query = supabase
    .from('blog_posts')
    .select('*')
    .eq('publicado', true)
    .order('created_at', { ascending: false });
  if (limit) query = query.limit(limit);
  const { data, error } = await query;
  if (error) throw error;
  return (data as BlogPost[]) || [];
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('publicado', true)
    .single();
  return data as BlogPost | null;
}

export async function adminGetAllPosts(): Promise<BlogPost[]> {
  const client = createAdminClient();
  const { data, error } = await client
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data as BlogPost[]) || [];
}

export async function adminUpsertPost(post: Partial<BlogPost>): Promise<BlogPost> {
  const client = createAdminClient();
  const { data, error } = await client
    .from('blog_posts')
    .upsert(post)
    .select()
    .single();
  if (error) throw error;
  return data as BlogPost;
}

export async function adminDeletePost(id: string): Promise<void> {
  const client = createAdminClient();
  const { error } = await client.from('blog_posts').delete().eq('id', id);
  if (error) throw error;
}
