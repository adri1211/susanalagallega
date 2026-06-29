'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';

export function CinematicSection() {
  const ref = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const txt = textRef.current;
    if (!el || !txt) return;

    // Reveal on scroll
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) txt.style.opacity = '1', txt.style.transform = 'translateY(0)';
    }, { threshold: 0.2 });
    obs.observe(el);

    // Parallax suave en la foto
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const progress = -rect.top / (el.offsetHeight + window.innerHeight);
      const img = el.querySelector('.cin-photo') as HTMLElement | null;
      if (img) img.style.transform = `translateY(${progress * 80}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { obs.disconnect(); window.removeEventListener('scroll', onScroll); };
  }, []);

  return (
    <section ref={ref} style={{ position: 'relative', height: '70vh', minHeight: 480, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Foto con parallax */}
      <div className="cin-photo" style={{ position: 'absolute', inset: '-15%', transition: 'transform 0.05s linear' }}>
        <Image src="/images/original_32853.png" alt="Susana La Gallega" fill unoptimized style={{ objectFit: 'cover', objectPosition: 'center 25%' }} />
      </div>

      {/* Overlay oscuro cinematográfico */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(13,30,54,0.6) 0%, rgba(13,30,54,0.75) 50%, rgba(13,30,54,0.6) 100%)' }} />
      {/* Franjas de cine arriba y abajo */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 40, background: '#000' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 40, background: '#000' }} />

      {/* Contenido */}
      <div ref={textRef} style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 1.5rem', maxWidth: 800, opacity: 0, transform: 'translateY(28px)', transition: 'opacity 1s ease, transform 1s ease' }}>
        <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#45b0e5', marginBottom: '1.5rem' }}>
          · · · · ·
        </p>
        <blockquote style={{ fontFamily: 'Lilita One, cursive', color: 'white', fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', lineHeight: 1.2, margin: '0 0 1.5rem', textShadow: '0 4px 32px rgba(0,0,0,0.4)' }}>
          "La gastronomía gallega es el alma de un pueblo que come bien, vive mejor y celebra siempre."
        </blockquote>
        <p style={{ fontFamily: 'Poppins, sans-serif', color: 'rgba(69,176,229,0.85)', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.08em', margin: 0 }}>
          — Susana Fernández, La Gallega
        </p>
      </div>
    </section>
  );
}
