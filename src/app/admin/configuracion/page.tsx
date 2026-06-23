export default function AdminConfiguracionPage() {
  return (
    <div>
      <h1 style={{ fontFamily: 'Lilita One, cursive', color: '#243b60', fontSize: '2rem', marginBottom: '0.5rem' }}>
        Configuración
      </h1>
      <p style={{ color: '#6b7a8d', marginBottom: '2rem' }}>
        Ajustes generales del sitio web.
      </p>

      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {[
          { icon: '🌐', title: 'Dominio', desc: 'susanalagallega.vercel.app', action: 'Cambiar en Vercel →', href: 'https://vercel.com/dashboard' },
          { icon: '🗄️', title: 'Base de datos', desc: 'Supabase · wcktpvktbcahnxizqbwg', action: 'Abrir Supabase →', href: 'https://supabase.com/dashboard/project/wcktpvktbcahnxizqbwg' },
          { icon: '📦', title: 'Repositorio', desc: 'adri1211/susanalagallega · GitHub', action: 'Abrir GitHub →', href: 'https://github.com/adri1211/susanalagallega' },
        ].map(item => (
          <div key={item.title} style={{ background: 'white', borderRadius: '1rem', padding: '1.5rem', border: '1px solid rgba(36,59,96,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
              <div>
                <p style={{ fontWeight: 700, color: '#243b60', margin: 0 }}>{item.title}</p>
                <p style={{ color: '#6b7a8d', fontSize: '0.85rem', margin: 0 }}>{item.desc}</p>
              </div>
            </div>
            <a href={item.href} target="_blank" rel="noopener noreferrer"
              style={{ color: '#45b0e5', fontWeight: 600, fontSize: '0.85rem', textDecoration: 'none' }}>
              {item.action}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
