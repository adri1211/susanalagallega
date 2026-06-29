'use client';
import { useEffect } from 'react';

export function CursorGlow() {
  useEffect(() => {
    const blob = document.createElement('div');
    blob.style.cssText = [
      'position:fixed', 'width:500px', 'height:500px', 'border-radius:50%',
      'pointer-events:none', 'z-index:9999',
      'background:radial-gradient(circle,rgba(69,176,229,0.07) 0%,transparent 70%)',
      'transform:translate(-50%,-50%)',
      'top:0', 'left:0', 'will-change:transform',
      'transition:opacity 0.4s ease',
    ].join(';');
    document.body.appendChild(blob);

    let tx = 0, ty = 0, x = 0, y = 0, raf = 0;
    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };
    document.addEventListener('mousemove', onMove);
    const tick = () => {
      x += (tx - x) * 0.07;
      y += (ty - y) * 0.07;
      blob.style.left = `${x}px`;
      blob.style.top = `${y}px`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      blob.remove();
    };
  }, []);
  return null;
}
