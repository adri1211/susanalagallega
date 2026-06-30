import Link from 'next/link';
import { Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import { adminGetAllPosts, getCategoriaColor, getCategoriaLabel } from '@/lib/blog';

export const dynamic = 'force-dynamic';

export default async function AdminBlogPage() {
  let posts: Awaited<ReturnType<typeof adminGetAllPosts>> = [];

  try {
    posts = await adminGetAllPosts();
  } catch {
    // Supabase not configured
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-[#243b60]" style={{ fontFamily: 'Lilita One, cursive' }}>Blog & Noticias</h1>
          <p className="text-sm text-[#6b7a8d] mt-0.5">{posts.length} publicaciones</p>
        </div>
        <Link
          href="/admin/blog/nuevo"
          className="flex items-center gap-2 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
          style={{ background: '#243b60' }}
        >
          <Plus size={16} />
          Nueva publicación
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-black/5 overflow-hidden">
        {posts.length === 0 ? (
          <div className="text-center py-16 text-[#6b7a8d]">
            <p className="text-4xl mb-3">📝</p>
            <p className="font-medium">No hay publicaciones aún</p>
            <p className="text-sm mt-1">Crea la primera desde el botón de arriba</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/5 text-xs text-[#6b7a8d] font-semibold uppercase tracking-wider">
                <th className="text-left p-4">Título</th>
                <th className="text-left p-4">Categoría</th>
                <th className="text-left p-4">Fuente</th>
                <th className="text-left p-4">Estado</th>
                <th className="text-left p-4">Fecha</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {posts.map(post => (
                <tr key={post.id} className="border-b border-black/5 hover:bg-black/2 transition-colors">
                  <td className="p-4">
                    <p className="font-medium text-[#243b60] line-clamp-1">{post.titulo}</p>
                    {post.extracto && <p className="text-xs text-[#6b7a8d] mt-0.5 line-clamp-1">{post.extracto}</p>}
                  </td>
                  <td className="p-4">
                    <span
                      className="text-white text-xs font-bold px-3 py-1 rounded-full"
                      style={{ background: getCategoriaColor(post.categoria) }}
                    >
                      {getCategoriaLabel(post.categoria)}
                    </span>
                  </td>
                  <td className="p-4 text-[#6b7a8d] capitalize">{post.fuente_tipo || '—'}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${post.publicado ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {post.publicado ? <Eye size={11} /> : <EyeOff size={11} />}
                      {post.publicado ? 'Publicado' : 'Borrador'}
                    </span>
                  </td>
                  <td className="p-4 text-[#6b7a8d] text-xs">
                    {new Date(post.created_at).toLocaleDateString('es-ES')}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 justify-end">
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="p-2 rounded-lg hover:bg-black/5 text-[#6b7a8d] transition-colors"
                        title="Ver en la web"
                      >
                        <Eye size={15} />
                      </Link>
                      <Link
                        href={`/admin/blog/${post.id}/editar`}
                        className="p-2 rounded-lg hover:bg-blue-50 text-[#45b0e5] transition-colors"
                        title="Editar"
                      >
                        <Pencil size={15} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
