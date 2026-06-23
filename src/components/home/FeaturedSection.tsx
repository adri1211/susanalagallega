'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ArrowRight } from 'lucide-react';
import type { RestaurantCard } from '@/types/restaurant';

const CAT: Record<string, string> = {
  marisqueria: 'Marisquería', pulperia: 'Pulpería', parrillada: 'Parrillada',
  taperia: 'Tapería', tradicional: 'Tradicional', 'cocina-moderna': 'Cocina moderna',
  bar: 'Bar', cafeteria: 'Cafetería',
};

const DEMO: RestaurantCard[] = [
  { id:'1', slug:'meson-muino-kilowatio-cedeira-no-3583', nombre:'Mesón Muíño Kilowatio', descripcionCorta:'Un rincón único donde la cocina gallega se convierte en experiencia', categoria:'tradicional', localidad:'Cedeira', provincia:'A Coruña', imagenPrincipal:'https://easycdn.es/4/i/meson-muino-kilowatio-cedeira_33095_cabblog.jpg', destacado:true, etiquetas:[] },
  { id:'2', slug:'restaurante-brisas-ferrol-no-3582', nombre:'Restaurante Brisas', descripcionCorta:'El sabor del Atlántico en pleno Ferrol', categoria:'marisqueria', localidad:'Ferrol', provincia:'A Coruña', imagenPrincipal:'https://easycdn.es/4/i/restaurante-brisas-ferrol_33094_cabblog.jpg', destacado:false, etiquetas:[] },
  { id:'3', slug:'cerveceria-australian-naron-no-3581', nombre:'Cervecería Australian', descripcionCorta:'Tapas y ambiente en Narón', categoria:'taperia', localidad:'Narón', provincia:'A Coruña', imagenPrincipal:'https://easycdn.es/4/i/cerveceria-australian-naron_33093_cabblog.png', destacado:false, etiquetas:[] },
  { id:'4', slug:'gastrobar-nua-no-3579', nombre:'Gastrobar Nuá', descripcionCorta:'Cocina de autor con raíces gallegas', categoria:'cocina-moderna', localidad:'Ferrol', provincia:'A Coruña', imagenPrincipal:'https://easycdn.es/4/i/gastrobar-nua_33090_cabblog.jpg', destacado:false, etiquetas:[] },
];

export function FeaturedSection({ restaurantes }: { restaurantes: RestaurantCard[] }) {
  const items = restaurantes.length > 0 ? restaurantes : DEMO;
  const [main, ...rest] = items;

  return (
    <section style={{ background: '#F4F3E4', padding: '5rem 0' }}>
      <div style={{ maxWidth: 1152, margin: '0 auto', padding: '0 1.5rem' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="section-label" style={{ color: '#45b0e5', marginBottom: 8 }}>Selección de Susana</span>
            <h2 style={{ fontFamily: 'Lilita One, cursive', color: '#243b60', fontSize: 'clamp(2rem, 4vw, 2.8rem)', margin: 0 }}>
              Restaurantes que<br />no puedes perderte
            </h2>
          </div>
          <Link href="/restaurantes" style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#243b60', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none', borderBottom: '2px solid #243b60', paddingBottom: 2, transition: 'color 0.2s' }}>
            Ver todos <ArrowRight size={16} />
          </Link>
        </div>

        {/* Card principal — full ancho */}
        {main && (
          <Link href={`/restaurantes/${main.slug}`}
            style={{ display: 'block', position: 'relative', borderRadius: '1.5rem', overflow: 'hidden', height: 420, marginBottom: '1.25rem', textDecoration: 'none' }}
            onMouseEnter={e => { const el = e.currentTarget.querySelector('img') as HTMLImageElement; if(el) el.style.transform = 'scale(1.05)'; }}
            onMouseLeave={e => { const el = e.currentTarget.querySelector('img') as HTMLImageElement; if(el) el.style.transform = 'scale(1)'; }}>
            <Image
              src={main.imagenPrincipal || '/images/original_32874.png'}
              alt={main.nombre}
              fill
              unoptimized
              style={{ objectFit: 'cover', transition: 'transform 0.6s ease' }}
              sizes="100vw"
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,45,74,0.92) 0%, rgba(26,45,74,0.3) 50%, transparent 100%)' }} />
            {main.destacado && (
              <div style={{ position: 'absolute', top: 20, left: 20, background: '#45b0e5', color: 'white', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '6px 14px', borderRadius: 9999 }}>
                ★ Destacado
              </div>
            )}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2rem' }}>
              <p style={{ color: '#45b0e5', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', margin: '0 0 8px' }}>
                {CAT[main.categoria] || main.categoria}
              </p>
              <h3 style={{ fontFamily: 'Lilita One, cursive', color: 'white', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', margin: '0 0 8px', lineHeight: 1.1 }}>
                {main.nombre}
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', margin: '0 0 16px', maxWidth: 500 }}>
                {main.descripcionCorta}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>
                <MapPin size={13} />
                <span>{main.localidad}, {main.provincia}</span>
              </div>
            </div>
          </Link>
        )}

        {/* Cards secundarias */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
          {rest.slice(0, 3).map(r => (
            <Link key={r.id} href={`/restaurantes/${r.slug}`}
              style={{ display: 'block', position: 'relative', borderRadius: '1.25rem', overflow: 'hidden', height: 240, textDecoration: 'none' }}
              onMouseEnter={e => { const el = e.currentTarget.querySelector('img') as HTMLImageElement; if(el) el.style.transform = 'scale(1.05)'; }}
              onMouseLeave={e => { const el = e.currentTarget.querySelector('img') as HTMLImageElement; if(el) el.style.transform = 'scale(1)'; }}>
              <Image
                src={r.imagenPrincipal || '/images/original_32874.png'}
                alt={r.nombre}
                fill
                unoptimized
                style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                sizes="33vw"
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,45,74,0.88) 0%, transparent 60%)' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.25rem' }}>
                <p style={{ color: '#45b0e5', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 5px' }}>
                  {CAT[r.categoria] || r.categoria}
                </p>
                <h3 style={{ fontFamily: 'Lilita One, cursive', color: 'white', fontSize: '1.15rem', margin: '0 0 6px', lineHeight: 1.15 }}>
                  {r.nombre}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem' }}>
                  <MapPin size={11} />
                  <span>{r.localidad}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Link href="/restaurantes" className="btn-azul">
            Ver el directorio completo →
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .featured-grid { grid-template-columns: 1fr !important; }
          .featured-main { height: 280px !important; }
          .featured-small { height: 200px !important; }
        }
      `}</style>
    </section>
  );
}
