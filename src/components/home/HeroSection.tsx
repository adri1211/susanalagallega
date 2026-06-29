'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Play, ChevronDown } from 'lucide-react';

export function HeroSection() {
  return (
    <section style={{ background: '#F4F3E4', minHeight: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'stretch' }}>
      <style>{`
        .hero-photo-wrap { position: absolute; right: 0; top: 175px; bottom: 0; width: 52%; }
        .hero-content { width: 56%; position: relative; z-index: 10; display: flex; flex-direction: column; justify-content: center; padding: 15rem 3rem 6rem 5rem; }

        @keyframes bounce-cue { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(-10px)} }
        @keyframes dot-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.3;transform:scale(0.7)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes orb-h1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(30px,-20px)} }
        @keyframes orb-h2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-25px,18px)} }

        .hero-badge  { animation: fadeUp 0.7s 0.05s ease both; }
        .hero-eyebrow{ animation: fadeUp 0.7s 0.18s ease both; }
        .hero-title  { animation: fadeUp 0.8s 0.30s ease both; }
        .hero-tagline{ animation: fadeUp 0.8s 0.45s ease both; }
        .hero-bio    { animation: fadeUp 0.7s 0.58s ease both; }
        .hero-ctas   { animation: fadeUp 0.7s 0.72s ease both; }
        .hero-chips  { animation: fadeUp 0.7s 0.85s ease both; }

        .btn-ver:hover { transform:translateY(-3px) scale(1.04); box-shadow:0 12px 32px rgba(69,176,229,0.45) !important; }
        .btn-exp:hover { background:rgba(36,59,96,0.1) !important; transform:translateY(-3px); }

        @media(max-width:1024px){
          .hero-photo-wrap{ width:100%; opacity:0.12; }
          .hero-content{ width:100%; padding:14rem 1.5rem 5rem; text-align:center; align-items:center; }
          .hero-ctas{ justify-content:center !important; }
          .hero-chips{ justify-content:center !important; }
        }
      `}</style>

      {/* Orbes crema suaves */}
      <div style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none' }}>
        <div style={{ position:'absolute', top:'10%', left:'5%', width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle,rgba(69,176,229,0.08) 0%,transparent 70%)', animation:'orb-h1 14s ease-in-out infinite', filter:'blur(40px)' }} />
        <div style={{ position:'absolute', bottom:'15%', left:'35%', width:280, height:280, borderRadius:'50%', background:'radial-gradient(circle,rgba(36,59,96,0.06) 0%,transparent 70%)', animation:'orb-h2 18s ease-in-out infinite', filter:'blur(30px)' }} />
      </div>

      {/* Patrón puntitos sutil */}
      <div style={{ position:'absolute', inset:0, zIndex:0, opacity:0.04, backgroundImage:'radial-gradient(circle, #243b60 1px, transparent 1px)', backgroundSize:'28px 28px', pointerEvents:'none' }} />

      {/* Foto Susana */}
      <div className="hero-photo-wrap" style={{ zIndex:2 }}>
        <Image src="/images/original_32874.png" alt="Susana La Gallega" fill priority unoptimized style={{ objectFit:'cover', objectPosition:'center top' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, #F4F3E4 0%, #F4F3E4 4%, rgba(244,243,228,0.65) 35%, rgba(244,243,228,0.1) 65%, rgba(244,243,228,0) 100%)' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, #F4F3E4 0%, transparent 40%)' }} />
      </div>

      {/* Contenido */}
      <div className="hero-content" style={{ zIndex:10 }}>
        {/* Badge */}
        <div className="hero-badge" style={{ display:'inline-flex', alignSelf:'flex-start', alignItems:'center', gap:8, background:'rgba(69,176,229,0.12)', border:'1px solid rgba(69,176,229,0.35)', borderRadius:9999, padding:'8px 20px', marginBottom:'2rem' }}>
          <span style={{ width:7, height:7, borderRadius:'50%', background:'#45b0e5', animation:'dot-pulse 2s infinite', display:'block' }} />
          <span style={{ color:'#45b0e5', fontWeight:700, fontSize:'0.62rem', letterSpacing:'0.18em', textTransform:'uppercase' }}>El programa de gastronomía gallega</span>
        </div>

        <p className="hero-eyebrow" style={{ color:'rgba(36,59,96,0.5)', fontSize:'0.9rem', fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', margin:'0 0 0.35rem' }}>
          Soy Susana Fernández
        </p>

        <h1 className="hero-title" style={{ fontFamily:'Lilita One, cursive', color:'#1a2d4a', fontSize:'clamp(3.5rem, 6.5vw, 6rem)', lineHeight:0.9, margin:'0 0 0.7rem' }}>
          La Gallega
        </h1>

        <p className="hero-tagline" style={{ fontFamily:'Lilita One, cursive', color:'#45b0e5', fontSize:'clamp(1.5rem, 2.8vw, 2.4rem)', margin:'0 0 2rem', lineHeight:1.2 }}>
          ¡Historias que se comen!
        </p>

        <p className="hero-bio" style={{ color:'rgba(36,59,96,0.65)', fontSize:'clamp(0.9rem, 1.2vw, 1rem)', lineHeight:1.85, maxWidth:460, margin:'0 0 2.75rem' }}>
          Apasionada de la gastronomía gallega, presentadora de{' '}
          <strong style={{ color:'#1a2d4a' }}>Saboreando con Susana</strong>{' '}
          en TV Ferrol y Canal 33 Madrid. Aquí comparto mis restaurantes favoritos y todo lo que me enamora de la mesa gallega.
        </p>

        <div className="hero-ctas" style={{ display:'flex', flexWrap:'wrap', gap:'0.85rem', marginBottom:'2.75rem' }}>
          <Link href="/saboreando-con-susana" className="btn-ver" style={{ display:'inline-flex', alignItems:'center', gap:10, background:'#45b0e5', color:'white', borderRadius:9999, padding:'14px 28px', fontSize:'0.9rem', fontWeight:700, textDecoration:'none', fontFamily:'Poppins, sans-serif', boxShadow:'0 6px 24px rgba(69,176,229,0.35)', transition:'all 0.25s' }}>
            <Play size={15} fill="white" strokeWidth={0} />
            Ver el programa
          </Link>
          <Link href="/restaurantes" className="btn-exp" style={{ display:'inline-flex', alignItems:'center', gap:10, background:'transparent', border:'1.5px solid rgba(36,59,96,0.25)', color:'#1a2d4a', borderRadius:9999, padding:'14px 28px', fontSize:'0.9rem', fontWeight:700, textDecoration:'none', fontFamily:'Poppins, sans-serif', transition:'all 0.25s' }}>
            🍽️ Explorar restaurantes
          </Link>
        </div>

        <div className="hero-chips" style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
          {['📺 TV Ferrol · Canal 34', '📺 Canal 33 Madrid', '▶️ YouTube'].map(c => (
            <span key={c} style={{ color:'rgba(36,59,96,0.5)', fontSize:'0.75rem', fontWeight:600, background:'rgba(36,59,96,0.06)', border:'1px solid rgba(36,59,96,0.12)', borderRadius:9999, padding:'7px 16px' }}>
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{ position:'absolute', bottom:28, left:'50%', zIndex:10, animation:'bounce-cue 2.4s ease-in-out infinite' }}>
        <ChevronDown size={30} style={{ color:'rgba(36,59,96,0.25)' }} />
      </div>
    </section>
  );
}
