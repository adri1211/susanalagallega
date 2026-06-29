import Image from 'next/image';

const COLABORADORES = [
  { nombre: 'Expomar Cedeira', categoria: 'Marisco fresco', img: '/images/original_32882.png' },
  { nombre: 'Eron Coffee', categoria: 'Café de especialidad', img: '/images/original_33027.png' },
  { nombre: 'Otero Gourmet', categoria: 'Productos ibéricos', img: '/images/original_32883.png' },
  { nombre: 'Bioreona', categoria: 'Productos naturales', img: '/images/original_33028.png' },
];

export function ColaboradoresSection() {
  return (
    <section style={{ background: '#1a2d4a', padding: '5rem 1.5rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.2em', color: 'rgba(199,231,244,0.5)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
          Marcas de confianza
        </p>
        <h2 style={{ fontFamily: 'Lilita One, cursive', color: 'white', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', margin: '0 0 0.75rem' }}>
          Colaboradores
        </h2>
        <p style={{ fontFamily: 'Poppins, sans-serif', color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem', margin: '0 0 3rem', maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>
          Marcas que Susana recomienda porque cree en su calidad
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
          {COLABORADORES.map(c => (
            <div key={c.nombre} className="colab-card" style={{ borderRadius: '1.25rem', overflow: 'hidden', background: '#243b60', cursor: 'default', transition: 'transform 0.3s, box-shadow 0.3s' }}>
              <div style={{ position: 'relative', height: 160 }}>
                <Image src={c.img} alt={c.nombre} fill unoptimized style={{ objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,45,74,0.9) 0%, transparent 60%)' }} />
              </div>
              <div style={{ padding: '1.25rem', textAlign: 'left' }}>
                <p style={{ fontFamily: 'Lilita One, cursive', color: 'white', fontSize: '1.1rem', margin: '0 0 0.25rem' }}>{c.nombre}</p>
                <p style={{ fontFamily: 'Poppins, sans-serif', color: '#45b0e5', fontSize: '0.75rem', fontWeight: 600, margin: 0 }}>{c.categoria}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .colab-card:hover { transform: translateY(-6px); box-shadow: 0 16px 48px rgba(0,0,0,0.3); }
      `}</style>
    </section>
  );
}
