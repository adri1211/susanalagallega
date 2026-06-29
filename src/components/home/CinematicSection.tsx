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
      {/* ── Fondo crema con azulejos ── */}
      <div style={{ position:'absolute', inset:0, background:'#F4F3E4' }} />
      {/* Patrón azulejo sutil */}
      <div style={{ position:'absolute', inset:0, opacity:0.06, backgroundImage:'radial-gradient(circle, #243b60 1.5px, transparent 1.5px)', backgroundSize:'32px 32px' }} />
      {/* Orbes suaves crema/azul */}
      <style>{`
        @keyframes orb-cream1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(40px,-30px)} }
        @keyframes orb-cream2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-50px,35px)} }
      `}</style>
      <div style={{ position:'absolute', top:'-10%', left:'10%', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle,rgba(69,176,229,0.1) 0%,transparent 65%)', animation:'orb-cream1 16s ease-in-out infinite', filter:'blur(60px)' }} />
      <div style={{ position:'absolute', bottom:'-10%', right:'5%', width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle,rgba(36,59,96,0.07) 0%,transparent 65%)', animation:'orb-cream2 20s ease-in-out infinite', filter:'blur(50px)' }} />

      {/* Franja superior e inferior decorativas */}
      <div style={{ position:'absolute', top:0, left:0, right:0, height:5, background:'linear-gradient(90deg,transparent,#45b0e5,transparent)' }} />
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:5, background:'linear-gradient(90deg,transparent,#45b0e5,transparent)' }} />

      {/* Contenido */}
      <div ref={textRef} style={{ position:'relative', zIndex:10, textAlign:'center', padding:'0 1.5rem', maxWidth:820, opacity:0, transform:'translateY(32px)', transition:'opacity 1.1s cubic-bezier(0.22,1,0.36,1), transform 1.1s cubic-bezier(0.22,1,0.36,1)' }}>
        {/* Comillas decorativas */}
        <div style={{ fontFamily:'Georgia,serif', fontSize:'6rem', color:'rgba(36,59,96,0.1)', lineHeight:0.6, marginBottom:'1rem', userSelect:'none' }}>"</div>
        <blockquote style={{ fontFamily:'Lilita One, cursive', color:'#1a2d4a', fontSize:'clamp(1.7rem, 3.8vw, 3rem)', lineHeight:1.25, margin:'0 0 2rem', letterSpacing:'-0.01em' }}>
          La gastronomía gallega es el alma de un pueblo que come bien, vive mejor y celebra siempre.
        </blockquote>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'1rem' }}>
          <div style={{ height:2, width:48, background:'rgba(69,176,229,0.5)', borderRadius:1 }} />
          <p style={{ fontFamily:'Poppins,sans-serif', color:'#45b0e5', fontWeight:700, fontSize:'0.82rem', letterSpacing:'0.12em', margin:0, textTransform:'uppercase' }}>
            Susana Fernández, La Gallega
          </p>
          <div style={{ height:2, width:48, background:'rgba(69,176,229,0.5)', borderRadius:1 }} />
        </div>
      </div>
    </section>
  );
}
