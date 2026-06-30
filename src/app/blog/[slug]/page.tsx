import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, getPublishedPosts, getCategoriaColor, getCategoriaLabel } from '@/lib/blog';
import type { Metadata } from 'next';

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const posts = await getPublishedPosts();
    return posts.map(p => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPostBySlug(slug);
    if (!post) return {};
    return {
      title: post.titulo,
      description: post.extracto || undefined,
    };
  } catch {
    return {};
  }
}

const SOURCE_LABELS: Record<string, string> = {
  facebook: 'Facebook', instagram: 'Instagram', youtube: 'YouTube', web: 'Web', propio: 'Artículo propio',
};
const SOURCE_ICONS: Record<string, string> = {
  facebook: '📘', instagram: '📸', youtube: '▶️', web: '🌐', propio: '✍️',
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let post = null;

  try {
    post = await getPostBySlug(slug);
  } catch {
    // Supabase not configured
  }

  if (!post) notFound();

  const color = getCategoriaColor(post.categoria);
  const fecha = new Date(post.created_at).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <main style={{ background: '#F4F3E4', minHeight: '100vh' }}>
      {/* Hero con imagen o degradado */}
      <section style={{ background: post.imagen_portada ? 'transparent' : '#1a2d4a', position: 'relative', overflow: 'hidden' }}>
        {post.imagen_portada && (
          <>
            <img src={post.imagen_portada} alt={post.titulo} style={{ width: '100%', height: 420, objectFit: 'cover', display: 'block' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,45,74,0.85) 0%, transparent 60%)' }} />
          </>
        )}
        <div style={{ position: post.imagen_portada ? 'absolute' : 'relative', bottom: 0, left: 0, right: 0, padding: post.imagen_portada ? '2rem 1.5rem' : '9rem 1.5rem 4rem', maxWidth: 780, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <span style={{ background: color, color: 'white', borderRadius: 9999, padding: '5px 14px', fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {getCategoriaLabel(post.categoria)}
            </span>
            {post.fuente_tipo && (
              <span style={{ color: 'rgba(199,231,244,0.7)', fontFamily: 'Poppins, sans-serif', fontSize: '0.78rem' }}>
                {SOURCE_ICONS[post.fuente_tipo]} {SOURCE_LABELS[post.fuente_tipo]}
              </span>
            )}
          </div>
          <h1 style={{ fontFamily: 'var(--font-lilita), Lilita One, cursive', color: 'white', fontSize: 'clamp(1.75rem, 4vw, 3rem)', lineHeight: 1.1, margin: '0 0 0.75rem' }}>
            {post.titulo}
          </h1>
          <p style={{ fontFamily: 'Poppins, sans-serif', color: 'rgba(199,231,244,0.7)', fontSize: '0.85rem', margin: 0 }}>
            {fecha}
          </p>
        </div>
      </section>

      {/* Contenido */}
      <article style={{ maxWidth: 780, margin: '0 auto', padding: '3.5rem 1.5rem' }}>
        {post.extracto && (
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem', color: '#243b60', lineHeight: 1.8, marginBottom: '2rem', fontStyle: 'italic', borderLeft: `4px solid ${color}`, paddingLeft: '1.25rem' }}>
            {post.extracto}
          </p>
        )}

        {post.contenido && (
          <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1rem', color: '#374151', lineHeight: 1.85 }}>
            {post.contenido.split('\n\n').map((paragraph, i) => (
              <p key={i} style={{ marginBottom: '1.5rem' }}>{paragraph}</p>
            ))}
          </div>
        )}

        {/* Etiquetas */}
        {post.etiquetas && post.etiquetas.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid rgba(36,59,96,0.1)' }}>
            {post.etiquetas.map(tag => (
              <span key={tag} style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '0.72rem', color: '#6b7a8d', background: 'rgba(36,59,96,0.06)', borderRadius: 9999, padding: '5px 14px', border: '1px solid rgba(36,59,96,0.1)' }}>
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* CTA fuente original */}
        {post.fuente_url && (
          <div style={{ marginTop: '2.5rem', background: 'white', borderRadius: '1.25rem', padding: '1.75rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', boxShadow: '0 4px 20px rgba(36,59,96,0.08)' }}>
            <div>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, color: '#1a2d4a', margin: '0 0 0.25rem' }}>
                {SOURCE_ICONS[post.fuente_tipo || 'web']} Ver publicación original
              </p>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.82rem', color: '#6b7a8d', margin: 0 }}>
                Publicado en {SOURCE_LABELS[post.fuente_tipo || 'web']}
              </p>
            </div>
            <a href={post.fuente_url} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: color, color: 'white', borderRadius: 9999, padding: '12px 24px', fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '0.82rem', textDecoration: 'none', transition: 'all 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.filter = 'brightness(1.1)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.filter = ''; }}
            >
              Ver en {SOURCE_LABELS[post.fuente_tipo || 'web']} →
            </a>
          </div>
        )}

        {/* Volver al blog */}
        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(36,59,96,0.1)' }}>
          <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#45b0e5', fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none' }}>
            ← Volver al blog
          </Link>
        </div>
      </article>
    </main>
  );
}
