'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import type { BlogPost } from '@/lib/blog';
import { getCategoriaColor, getCategoriaLabel } from '@/lib/blog';

const SOURCE_ICONS: Record<string, string> = {
  facebook: '📘',
  instagram: '📸',
  youtube: '▶️',
  web: '🌐',
  propio: '✍️',
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
        {/* Imagen o placeholder */}
        <div style={{ height: 180, background: `linear-gradient(135deg, ${color}22 0%, ${color}44 100%)`, position: 'relative', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {post.imagen_portada ? (
            <img src={post.imagen_portada} alt={post.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
          ) : (
            <span style={{ fontSize: '3rem' }}>
              {post.fuente_tipo ? SOURCE_ICONS[post.fuente_tipo] : '📝'}
            </span>
          )}
          {/* Badge categoría */}
          <div style={{ position: 'absolute', top: 12, left: 12, background: color, color: 'white', borderRadius: 9999, padding: '4px 12px', fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            {getCategoriaLabel(post.categoria)}
          </div>
          {post.fuente_tipo && post.fuente_tipo !== 'propio' && (
            <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(255,255,255,0.9)', borderRadius: 9999, padding: '4px 10px', fontSize: '0.75rem' }}>
              {SOURCE_ICONS[post.fuente_tipo]}
            </div>
          )}
        </div>

        {/* Contenido */}
        <div style={{ padding: '1.25rem 1.5rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.72rem', color: '#6b7a8d', margin: '0 0 0.5rem' }}>{fecha}</p>
          <h3 style={{ fontFamily: 'var(--font-lilita), Lilita One, cursive', color: '#1a2d4a', fontSize: '1.1rem', lineHeight: 1.3, margin: '0 0 0.75rem', flex: 1 }}>
            {post.titulo}
          </h3>
          {post.extracto && (
            <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.85rem', color: '#6b7a8d', lineHeight: 1.65, margin: '0 0 1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {post.extracto}
            </p>
          )}
          <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '0.78rem', color: color, display: 'flex', alignItems: 'center', gap: 4 }}>
            Leer más →
          </span>
        </div>
      </article>
    </Link>
  );
}

export function BlogPreviewSection({ posts }: { posts: BlogPost[] }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll('.blog-reveal');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).style.opacity = '1';
          (e.target as HTMLElement).style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });
    items.forEach(i => obs.observe(i));
    return () => obs.disconnect();
  }, []);

  if (!posts.length) return null;

  return (
    <section ref={ref} style={{ background: '#F4F3E4', padding: '6rem 1.5rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Cabecera */}
        <div className="blog-reveal" style={{ opacity: 0, transform: 'translateY(28px)', transition: 'opacity 0.8s ease, transform 0.8s ease', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
          <div>
            <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#45b0e5', marginBottom: '0.5rem' }}>
              Blog & Noticias
            </p>
            <h2 style={{ fontFamily: 'var(--font-lilita), Lilita One, cursive', color: '#1a2d4a', fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)', margin: 0, lineHeight: 1.1 }}>
              Historias que se cuentan
            </h2>
          </div>
          <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '2px solid #1a2d4a', color: '#1a2d4a', borderRadius: 9999, padding: '10px 22px', fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '0.82rem', textDecoration: 'none', transition: 'all 0.25s', whiteSpace: 'nowrap' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#1a2d4a'; (e.currentTarget as HTMLElement).style.color = 'white'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#1a2d4a'; }}
          >
            Ver todo el blog →
          </Link>
        </div>

        {/* Grid de posts */}
        <div className="blog-reveal blog-grid" style={{ opacity: 0, transform: 'translateY(28px)', transition: 'opacity 0.8s 0.15s ease, transform 0.8s 0.15s ease', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          {posts.slice(0, 3).map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>

      <style>{`
        @media(max-width: 900px) { .blog-grid { grid-template-columns: 1fr 1fr !important; } }
        @media(max-width: 600px) { .blog-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
