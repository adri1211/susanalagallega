import Link from 'next/link';
import { getPublishedPosts, getCategoriaColor, getCategoriaLabel, CATEGORIAS_BLOG } from '@/lib/blog';
import type { BlogPost } from '@/lib/blog';
import type { Metadata } from 'next';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Blog & Noticias',
  description: 'Historias, recetas, reportajes y todo lo que rodea a la gastronomía gallega de la mano de Susana La Gallega.',
};

const SOURCE_ICONS: Record<string, string> = {
  facebook: '📘', instagram: '📸', youtube: '▶️', web: '🌐', propio: '✍️',
};

function BlogCard({ post }: { post: BlogPost }) {
  const color = getCategoriaColor(post.categoria);
  const fecha = new Date(post.created_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
      <article style={{ background: 'white', borderRadius: '1.25rem', overflow: 'hidden', border: '1px solid rgba(36,59,96,0.07)', transition: 'transform 0.3s, box-shadow 0.3s', height: '100%', display: 'flex', flexDirection: 'column' }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 48px rgba(36,59,96,0.13)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}
      >
        <div style={{ height: 180, background: `linear-gradient(135deg, ${color}22 0%, ${color}44 100%)`, position: 'relative', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {post.imagen_portada
            ? <img src={post.imagen_portada} alt={post.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
            : <span style={{ fontSize: '3rem' }}>{post.fuente_tipo ? SOURCE_ICONS[post.fuente_tipo] : '📝'}</span>
          }
          <div style={{ position: 'absolute', top: 12, left: 12, background: color, color: 'white', borderRadius: 9999, padding: '4px 12px', fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            {getCategoriaLabel(post.categoria)}
          </div>
          {post.fuente_tipo && post.fuente_tipo !== 'propio' && (
            <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(255,255,255,0.9)', borderRadius: 9999, padding: '4px 10px', fontSize: '0.75rem' }}>
              {SOURCE_ICONS[post.fuente_tipo]}
            </div>
          )}
        </div>
        <div style={{ padding: '1.25rem 1.5rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.72rem', color: '#6b7a8d', margin: '0 0 0.5rem' }}>{fecha}</p>
          <h2 style={{ fontFamily: 'var(--font-lilita), Lilita One, cursive', color: '#1a2d4a', fontSize: '1.1rem', lineHeight: 1.3, margin: '0 0 0.75rem', flex: 1 }}>
            {post.titulo}
          </h2>
          {post.extracto && (
            <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.85rem', color: '#6b7a8d', lineHeight: 1.65, margin: '0 0 1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {post.extracto}
            </p>
          )}
          <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '0.78rem', color }}>
            Leer más →
          </span>
        </div>
      </article>
    </Link>
  );
}

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ cat?: string }> }) {
  const { cat } = await searchParams;
  let posts: BlogPost[] = [];

  try {
    posts = await getPublishedPosts();
  } catch {
    // Supabase not configured
  }

  const filteredPosts = cat ? posts.filter(p => p.categoria === cat) : posts;

  return (
    <main style={{ background: '#F4F3E4', minHeight: '100vh' }}>
      {/* Hero */}
      <section style={{ background: '#1a2d4a', padding: '9rem 1.5rem 5rem', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#45b0e5', marginBottom: '0.75rem' }}>
          Blog & Noticias
        </p>
        <h1 style={{ fontFamily: 'var(--font-lilita), Lilita One, cursive', color: 'white', fontSize: 'clamp(2.5rem, 5vw, 4rem)', margin: '0 0 1rem', lineHeight: 1.05 }}>
          Historias que se cuentan
        </h1>
        <p style={{ fontFamily: 'Poppins, sans-serif', color: 'rgba(199,231,244,0.7)', fontSize: '1rem', maxWidth: 520, margin: '0 auto' }}>
          Gastronomía gallega, hostelería, prensa, television y todo lo que rodea a Susana La Gallega
        </p>
      </section>

      {/* Filtros de categoría */}
      <section style={{ background: 'white', borderBottom: '1px solid rgba(36,59,96,0.07)', padding: '1rem 1.5rem', overflowX: 'auto' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', borderRadius: 9999, padding: '7px 18px', fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '0.78rem', textDecoration: 'none', transition: 'all 0.2s', background: !cat ? '#1a2d4a' : 'transparent', color: !cat ? 'white' : '#6b7a8d', border: `2px solid ${!cat ? '#1a2d4a' : 'rgba(36,59,96,0.15)'}` }}>
            Todos
          </Link>
          {CATEGORIAS_BLOG.map(c => (
            <Link key={c.slug} href={`/blog?cat=${c.slug}`} style={{ display: 'inline-flex', alignItems: 'center', borderRadius: 9999, padding: '7px 18px', fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '0.78rem', textDecoration: 'none', transition: 'all 0.2s', background: cat === c.slug ? c.color : 'transparent', color: cat === c.slug ? 'white' : '#6b7a8d', border: `2px solid ${cat === c.slug ? c.color : 'rgba(36,59,96,0.15)'}` }}>
              {c.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '4rem 1.5rem' }}>
        {filteredPosts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <p style={{ fontFamily: 'Poppins, sans-serif', color: '#6b7a8d', fontSize: '1rem' }}>No hay publicaciones aún en esta categoría.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }} className="blog-grid-full">
            {filteredPosts.map(post => <BlogCard key={post.id} post={post} />)}
          </div>
        )}
      </section>

      <style>{`
        @media(max-width: 900px) { .blog-grid-full { grid-template-columns: 1fr 1fr !important; } }
        @media(max-width: 600px) { .blog-grid-full { grid-template-columns: 1fr !important; } }
      `}</style>
    </main>
  );
}
