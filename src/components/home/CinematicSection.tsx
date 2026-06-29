'use client';
import { useEffect, useRef } from 'react';

export function CinematicSection() {
  const ref = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const txt = textRef.current;
    if (!txt) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { txt.style.opacity = '1'; txt.style.transform = 'translateY(0)'; }
    }, { threshold: 0.25 });
    obs.observe(txt);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ position: 'relative', height: '68vh', minHeight: 460, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* ── Fondo aurora animada ── */}
      <div style={{ position: 'absolute', inset: 0, background: '#060f1e' }} />
      <style>{`
        @keyframes orb1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(60px,-40px) scale(1.15)} 66%{transform:translate(-40px,30px) scale(0.9)} }
        @keyframes orb2 { 0%,100%{transform:translate(0,0) scale(1)} 40%{transform:translate(-70px,50px) scale(1.1)} 70%{transform:translate(50px,-30px) scale(0.95)} }
        @keyframes orb3 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(40px,-60px)} }
        @keyframes cin-grain { 0%{opacity:0.03} 50%{opacity:0.07} 100%{opacity:0.03} }
      `}</style>

      {/* Orbes de aurora */}
      <div style={{ position:'absolute', top:'20%', left:'15%', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle,rgba(69,176,229,0.22) 0%,transparent 65%)', animation:'orb1 14s ease-in-out infinite', filter:'blur(40px)' }} />
      <div style={{ position:'absolute', bottom:'10%', right:'10%', width:420, height:420, borderRadius:'50%', background:'radial-gradient(circle,rgba(36,59,96,0.9) 0%,transparent 65%)', animation:'orb2 18s ease-in-out infinite', filter:'blur(50px)' }} />
      <div style={{ position:'absolute', top:'50%', left:'55%', width:300, height:300, borderRadius:'50%', background:'radial-gradient(circle,rgba(69,176,229,0.12) 0%,transparent 70%)', animation:'orb3 10s ease-in-out infinite', filter:'blur(30px)' }} />
      <div style={{ position:'absolute', bottom:'30%', left:'5%', width:250, height:250, borderRadius:'50%', background:'radial-gradient(circle,rgba(100,200,255,0.1) 0%,transparent 70%)', animation:'orb1 22s ease-in-out infinite reverse', filter:'blur(35px)' }} />

      {/* Patrón de ruido sutil */}
      <div style={{ position:'absolute', inset:0, backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, opacity:0.04, animation:'cin-grain 4s linear infinite' }} />

      {/* Franjas cine */}
      <div style={{ position:'absolute', top:0, left:0, right:0, height:44, background:'linear-gradient(to bottom,#000,transparent)', zIndex:2 }} />
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:44, background:'linear-gradient(to top,#000,transparent)', zIndex:2 }} />

      {/* Línea horizontal decorativa */}
      <div style={{ position:'absolute', left:'5%', right:'5%', top:'50%', height:1, background:'linear-gradient(90deg,transparent,rgba(69,176,229,0.15),transparent)', zIndex:1 }} />

      {/* Contenido */}
      <div ref={textRef} style={{ position:'relative', zIndex:10, textAlign:'center', padding:'0 1.5rem', maxWidth:820, opacity:0, transform:'translateY(32px)', transition:'opacity 1.1s cubic-bezier(0.22,1,0.36,1), transform 1.1s cubic-bezier(0.22,1,0.36,1)' }}>
        {/* Comillas decorativas */}
        <div style={{ fontFamily:'Georgia,serif', fontSize:'6rem', color:'rgba(69,176,229,0.15)', lineHeight:0.6, marginBottom:'1rem', userSelect:'none' }}>"</div>
        <blockquote style={{ fontFamily:'Lilita One, cursive', color:'white', fontSize:'clamp(1.7rem, 3.8vw, 3rem)', lineHeight:1.25, margin:'0 0 2rem', textShadow:'0 2px 40px rgba(69,176,229,0.2)', letterSpacing:'-0.01em' }}>
          La gastronomía gallega es el alma de un pueblo que come bien, vive mejor y celebra siempre.
        </blockquote>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'1rem' }}>
          <div style={{ height:1, width:40, background:'rgba(69,176,229,0.4)' }} />
          <p style={{ fontFamily:'Poppins,sans-serif', color:'rgba(69,176,229,0.8)', fontWeight:700, fontSize:'0.85rem', letterSpacing:'0.1em', margin:0, textTransform:'uppercase' }}>
            Susana Fernández, La Gallega
          </p>
          <div style={{ height:1, width:40, background:'rgba(69,176,229,0.4)' }} />
        </div>
      </div>
    </section>
  );
}
