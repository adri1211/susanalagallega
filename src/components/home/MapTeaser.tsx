'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';

const POINTS = [
  { label: 'A Coruña', x: '28%', y: '15%', count: 87 },
  { label: 'Santiago', x: '22%', y: '35%', count: 124 },
  { label: 'Vigo', x: '15%', y: '78%', count: 96 },
  { label: 'Pontevedra', x: '20%', y: '68%', count: 71 },
  { label: 'Lugo', x: '52%', y: '22%', count: 58 },
  { label: 'Ourense', x: '55%', y: '72%', count: 64 },
];

export function MapTeaser() {
  return (
    <section className="py-20 lg:py-28 bg-[#1A1A1A] overflow-hidden relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="section-label text-[#4A7C23] mb-4">Explora Galicia</p>
            <h2 className="text-4xl lg:text-5xl font-light text-white mb-6 leading-tight">
              Descubre sabores
              <br />
              <span className="font-semibold italic">en cada rincón</span>
            </h2>
            <p className="text-white/50 text-base leading-relaxed mb-8 max-w-md">
              Desde las rías de Pontevedra hasta las montañas de Lugo. Explora el mapa gastronómico
              de Galicia y encuentra tu próxima experiencia culinaria.
            </p>

            {/* Stats by province */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                { prov: 'A Coruña', count: 211, color: '#4A7C23' },
                { prov: 'Pontevedra', count: 167, color: '#1A5EA8' },
                { prov: 'Lugo', count: 58, color: '#8B5E3C' },
                { prov: 'Ourense', count: 64, color: '#DAA520' },
              ].map((item) => (
                <Link
                  key={item.prov}
                  href={`/restaurantes?provincia=${encodeURIComponent(item.prov)}`}
                  className="group flex items-center justify-between bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-4 py-3 rounded-xl transition-all"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-white/70 text-sm group-hover:text-white transition-colors">
                      {item.prov}
                    </span>
                  </div>
                  <span className="text-white/40 text-xs">{item.count}</span>
                </Link>
              ))}
            </div>

            <Link
              href="/mapa"
              className="inline-flex items-center gap-3 bg-white text-[#1A1A1A] px-7 py-3.5 rounded-full font-medium text-sm hover:bg-white/90 transition-colors"
            >
              <MapPin size={16} />
              Abrir mapa interactivo
              <ArrowRight size={16} />
            </Link>
          </motion.div>

          {/* Right: Map visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Galicia silhouette placeholder */}
              <div className="w-full h-full rounded-3xl bg-white/5 border border-white/10 overflow-hidden relative">
                {/* Grid lines for atmosphere */}
                <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 400 400">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <g key={i}>
                      <line x1={i * 40} y1="0" x2={i * 40} y2="400" stroke="white" strokeWidth="0.5" />
                      <line x1="0" y1={i * 40} x2="400" y2={i * 40} stroke="white" strokeWidth="0.5" />
                    </g>
                  ))}
                </svg>

                {/* Map placeholder with dots */}
                <div className="relative w-full h-full p-8">
                  {/* Galicia shape hint */}
                  <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[#2D5016]/20 to-[#0B3D6B]/20 relative">
                    {/* Province dots */}
                    {POINTS.map((point) => (
                      <motion.div
                        key={point.label}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                        className="absolute"
                        style={{ left: point.x, top: point.y }}
                      >
                        <div className="relative -translate-x-1/2 -translate-y-1/2">
                          {/* Pulse ring */}
                          <div className="absolute inset-0 w-5 h-5 rounded-full bg-[#4A7C23]/30 animate-ping" />
                          {/* Dot */}
                          <div className="relative w-5 h-5 rounded-full bg-[#4A7C23] border-2 border-white/30 flex items-center justify-center">
                            <MapPin size={10} className="text-white" />
                          </div>
                          {/* Tooltip */}
                          <div className="absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap">
                            <span className="text-white text-[10px] font-medium bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full">
                              {point.label} · {point.count}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {/* Center label */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center opacity-20">
                        <p className="text-white text-xs section-label">Galicia</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-4 -right-4 glass-dark rounded-2xl p-4 min-w-[160px]"
              >
                <p className="text-white/50 text-[10px] section-label mb-1">Total</p>
                <p className="text-white text-2xl font-semibold">500+</p>
                <p className="text-white/40 text-xs">restaurantes en Galicia</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
