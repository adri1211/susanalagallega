export default function AdminMediaPage() {
  return (
    <div>
      <h1 style={{ fontFamily: 'Lilita One, cursive', color: '#243b60', fontSize: '2rem', marginBottom: '0.5rem' }}>
        Galería / Media
      </h1>
      <p style={{ color: '#6b7a8d', marginBottom: '2rem' }}>
        Gestiona las imágenes de los restaurantes directamente desde Supabase Storage.
      </p>
      <div style={{ background: 'white', borderRadius: '1rem', padding: '2rem', border: '1px solid rgba(36,59,96,0.08)', textAlign: 'center' }}>
        <p style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🖼️</p>
        <h2 style={{ color: '#243b60', fontWeight: 700, marginBottom: '0.5rem' }}>Gestión de imágenes</h2>
        <p style={{ color: '#6b7a8d', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          Las imágenes se gestionan directamente en Supabase Storage. Accede al dashboard para subir o eliminar archivos.
        </p>
        <a
          href="https://supabase.com/dashboard/project/wcktpvktbcahnxizqbwg/storage/buckets"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#243b60', color: 'white',
            padding: '0.75rem 1.5rem', borderRadius: 9999,
            textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem',
          }}
        >
          Abrir Supabase Storage →
        </a>
      </div>
    </div>
  );
}
