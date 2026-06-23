'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Phone, MapPin, Globe, Clock, Share2,
  Star, ChevronRight, Navigation,
  Bookmark, ExternalLink, CheckCircle2, Link2
} from 'lucide-react';
import type { Restaurant, RestaurantCard } from '@/types/restaurant';
import { cn } from '@/utils/cn';

const CAT_LABEL: Record<string, string> = {
  marisqueria: 'Marisquería', pulperia: 'Pulpería', parrillada: 'Parrillada',
  taperia: 'Tapería', tradicional: 'Tradicional', 'cocina-moderna': 'Cocina Moderna',
  bar: 'Bar', cafeteria: 'Cafetería',
};
const PRICE_MAP: Record<string, string> = { economico: '€', moderado: '€€', premium: '€€€', lujo: '€€€€' };
const DIAS = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'] as const;
const DIAS_LABEL: Record<string, string> = {
  lunes: 'Lunes', martes: 'Martes', miercoles: 'Miércoles', jueves: 'Jueves',
  viernes: 'Viernes', sabado: 'Sábado', domingo: 'Domingo',
};
const SERVICIOS_LABEL: Record<string, string> = {
  reservas: 'Reservas', terraza: 'Terraza', parking: 'Parking', wifi: 'WiFi',
  menuDegustacion: 'Menú degustación', menuDelDia: 'Menú del día',
  paraLlevar: 'Para llevar', delivery: 'Delivery', accesible: 'Accesible',
  gruposGrandes: 'Grupos grandes', eventosCorporativos: 'Eventos', bodas: 'Bodas',
};

interface RestaurantDetailProps {
  restaurant: Restaurant;
  similares: RestaurantCard[];
}

export function RestaurantDetail({ restaurant: r, similares }: RestaurantDetailProps) {
  const [saved, setSaved] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);

  const todayDay = DIAS[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];

  function handleShare() {
    if (navigator.share) {
      navigator.share({ title: r.nombre, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  }

  return (
    <article className="pt-0">
      {/* ===== HERO ===== */}
      <section className="relative h-[70vh] min-h-[500px] max-h-[800px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${r.imagenPrincipal || 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=85'})`,
          }}
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

        {/* Back breadcrumb */}
        <div className="absolute top-20 left-4 sm:left-8 z-10">
          <div className="flex items-center gap-1 text-white/60 text-sm">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <ChevronRight size={14} />
            <Link href="/restaurantes" className="hover:text-white transition-colors">Restaurantes</Link>
            <ChevronRight size={14} />
            <span className="text-white/90">{r.nombre}</span>
          </div>
        </div>

        {/* Hero content */}
        <div className="relative z-10 h-full flex flex-col justify-end px-4 sm:px-8 lg:px-16 pb-10 lg:pb-14 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Category + price */}
            <div className="flex items-center gap-3 mb-3">
              <span className="section-label text-white/70">
                {CAT_LABEL[r.categoria] || r.categoria}
              </span>
              {r.rangoPrecio && (
                <span className="text-white/60 text-xs border border-white/20 px-2 py-0.5 rounded-full">
                  {PRICE_MAP[r.rangoPrecio]}
                </span>
              )}
            </div>

            {/* Name */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-4 max-w-3xl">
              {r.nombre}
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 text-white/70 text-sm mb-6">
              <div className="flex items-center gap-1.5">
                <MapPin size={14} />
                <span>{r.localidad}, {r.provincia}</span>
              </div>
              {r.rating && (
                <div className="flex items-center gap-1.5">
                  <Star size={14} className="text-amber-400 fill-amber-400" />
                  <span className="text-white font-medium">{r.rating}</span>
                  <span className="text-white/40">({r.totalReviews} opiniones)</span>
                </div>
              )}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap items-center gap-3">
              {r.telefono && (
                <a
                  href={`tel:${r.telefono}`}
                  className="flex items-center gap-2 bg-[#2D5016] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#4A7C23] transition-colors"
                >
                  <Phone size={15} />
                  Llamar
                </a>
              )}
              {r.coordenadas && (
                <a
                  href={`https://maps.google.com/?q=${r.coordenadas.lat},${r.coordenadas.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 glass text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-white/20 transition-colors"
                >
                  <Navigation size={15} />
                  Cómo llegar
                </a>
              )}
              <button
                onClick={() => setSaved(!saved)}
                className={cn(
                  'flex items-center gap-2 glass px-5 py-2.5 rounded-full text-sm font-medium transition-all',
                  saved ? 'bg-white/20 text-white' : 'text-white/80 hover:bg-white/20 hover:text-white'
                )}
              >
                <Bookmark size={15} className={saved ? 'fill-white' : ''} />
                {saved ? 'Guardado' : 'Guardar'}
              </button>
              <button
                onClick={handleShare}
                className="glass text-white/80 p-2.5 rounded-full hover:bg-white/20 hover:text-white transition-colors"
              >
                <Share2 size={15} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== BODY ===== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* ---- LEFT COLUMN (main content) ---- */}
          <div className="lg:col-span-2 space-y-12">

            {/* La experiencia */}
            {r.experiencia && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <p className="section-label text-[#2D5016] mb-3">La experiencia</p>
                <p className="text-[#3D3D3D] text-lg leading-relaxed italic border-l-2 border-[#2D5016]/30 pl-5">
                  {r.experiencia}
                </p>
              </motion.section>
            )}

            {/* Descripción principal */}
            {r.descripcionLarga && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <p className="text-[#3D3D3D]/80 text-base leading-relaxed">
                  {r.descripcionLarga}
                </p>
              </motion.section>
            )}

            {/* Qué pedir */}
            {r.quePedir && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#FAF7F0] rounded-2xl p-6 lg:p-8"
              >
                <p className="section-label text-[#2D5016] mb-3">Qué pedir</p>
                <h2 className="text-xl font-semibold text-[#1A1A1A] mb-3">No te lo pierdas</h2>
                <p className="text-[#3D3D3D]/80 leading-relaxed">{r.quePedir}</p>
              </motion.section>
            )}

            {/* Por qué visitarlo */}
            {r.porQueVisitar && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <p className="section-label text-[#2D5016] mb-3">Por qué merece la pena</p>
                <p className="text-[#3D3D3D]/80 leading-relaxed">{r.porQueVisitar}</p>
              </motion.section>
            )}

            {/* Lo que lo hace único */}
            {r.loQueLoHaceUnico && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="border border-[#2D5016]/15 rounded-2xl p-6 lg:p-8"
              >
                <p className="section-label text-[#2D5016] mb-3">Lo que lo hace único</p>
                <p className="text-[#3D3D3D] text-base leading-relaxed">{r.loQueLoHaceUnico}</p>
              </motion.section>
            )}

            {/* Galería */}
            {r.galeria && r.galeria.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <p className="section-label text-[#2D5016] mb-4">Galería</p>
                <div className="masonry-grid">
                  {r.galeria.map((item, i) => (
                    <div
                      key={item.id}
                      className="masonry-item cursor-pointer group relative overflow-hidden rounded-xl"
                      onClick={() => setGalleryIndex(i)}
                    >
                      <img
                        src={item.url}
                        alt={item.alt || r.nombre}
                        className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Tags */}
            {r.etiquetas && r.etiquetas.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {r.etiquetas.map((tag) => (
                  <Link
                    key={tag}
                    href={`/restaurantes?busqueda=${encodeURIComponent(tag)}`}
                    className="text-xs text-[#3D3D3D]/60 border border-black/10 px-3 py-1.5 rounded-full hover:border-[#2D5016] hover:text-[#2D5016] transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* ---- RIGHT COLUMN (sidebar) ---- */}
          <aside className="space-y-5">

            {/* Info card */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-black/5 space-y-4">
              {/* Dirección */}
              {r.direccion && (
                <div className="flex gap-3">
                  <MapPin size={16} className="text-[#2D5016] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-[#3D3D3D]/50 mb-0.5">Dirección</p>
                    <p className="text-sm text-[#1A1A1A]">{r.direccion}</p>
                    <p className="text-sm text-[#1A1A1A]">{r.localidad}, {r.provincia}</p>
                  </div>
                </div>
              )}

              {/* Teléfono */}
              {r.telefono && (
                <div className="flex gap-3">
                  <Phone size={16} className="text-[#2D5016] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-[#3D3D3D]/50 mb-0.5">Teléfono</p>
                    <a href={`tel:${r.telefono}`} className="text-sm text-[#1A1A1A] hover:text-[#2D5016] transition-colors">
                      {r.telefono}
                    </a>
                  </div>
                </div>
              )}

              {/* Web */}
              {r.web && (
                <div className="flex gap-3">
                  <Globe size={16} className="text-[#2D5016] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-[#3D3D3D]/50 mb-0.5">Web</p>
                    <a
                      href={r.web}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#2D5016] flex items-center gap-1 hover:underline"
                    >
                      Visitar web <ExternalLink size={11} />
                    </a>
                  </div>
                </div>
              )}

              {/* Redes */}
              {(r.redesSociales.instagram || r.redesSociales.facebook) && (
                <div className="flex gap-2 pt-1">
                  {r.redesSociales.instagram && (
                    <a
                      href={r.redesSociales.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-white bg-gradient-to-br from-purple-500 to-pink-500 px-3 py-1.5 rounded-lg"
                    >
                      <Link2 size={12} />
                      Instagram
                    </a>
                  )}
                  {r.redesSociales.facebook && (
                    <a
                      href={r.redesSociales.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-white bg-blue-600 px-3 py-1.5 rounded-lg"
                    >
                      <Link2 size={12} />
                      Facebook
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Horarios */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-black/5">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={16} className="text-[#2D5016]" />
                <p className="font-semibold text-[#1A1A1A] text-sm">Horarios</p>
              </div>
              <div className="space-y-2">
                {DIAS.map((dia) => {
                  const horario = r.horarios[dia];
                  const isToday = dia === todayDay;
                  return (
                    <div
                      key={dia}
                      className={cn(
                        'flex justify-between text-xs py-1.5 rounded-lg px-2 -mx-2',
                        isToday ? 'bg-[#2D5016]/8 font-medium' : ''
                      )}
                    >
                      <span className={cn(isToday ? 'text-[#2D5016]' : 'text-[#3D3D3D]/60')}>
                        {DIAS_LABEL[dia]}
                        {isToday && <span className="ml-1 text-[10px]">(hoy)</span>}
                      </span>
                      <span className={cn(horario === 'Cerrado' ? 'text-red-400' : 'text-[#1A1A1A]')}>
                        {horario || '—'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Servicios */}
            {Object.values(r.servicios).some(Boolean) && (
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-black/5">
                <p className="font-semibold text-[#1A1A1A] text-sm mb-4">Servicios</p>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(r.servicios).map(([key, value]) =>
                    value ? (
                      <div key={key} className="flex items-center gap-1.5 text-xs text-[#3D3D3D]">
                        <CheckCircle2 size={13} className="text-[#2D5016] shrink-0" />
                        {SERVICIOS_LABEL[key] || key}
                      </div>
                    ) : null
                  )}
                </div>
              </div>
            )}

            {/* Mapa embed */}
            {r.coordenadas && (
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-black/5">
                <iframe
                  src={`https://maps.google.com/maps?q=${r.coordenadas.lat},${r.coordenadas.lng}&z=15&output=embed`}
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Mapa de ${r.nombre}`}
                />
                <div className="p-3">
                  <a
                    href={`https://maps.google.com/?q=${r.coordenadas.lat},${r.coordenadas.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 text-xs text-[#2D5016] font-medium hover:underline"
                  >
                    <Navigation size={12} />
                    Abrir en Google Maps
                  </a>
                </div>
              </div>
            )}
          </aside>
        </div>

        {/* Similares */}
        {similares.length > 0 && (
          <section className="mt-20">
            <p className="section-label text-[#2D5016] mb-3">También te puede interesar</p>
            <h2 className="text-2xl font-semibold text-[#1A1A1A] mb-8">Restaurantes similares</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {similares.map((s) => (
                <Link key={s.id} href={`/restaurantes/${s.slug}`} className="group block">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-1 duration-300">
                    <div
                      className="aspect-[4/3] bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                      style={{
                        backgroundImage: `url(${s.imagenPrincipal || 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600'})`,
                      }}
                    />
                    <div className="p-3">
                      <h3 className="font-semibold text-[#1A1A1A] text-sm line-clamp-1 group-hover:text-[#2D5016] transition-colors">
                        {s.nombre}
                      </h3>
                      <p className="text-[#3D3D3D]/50 text-xs mt-0.5 flex items-center gap-1">
                        <MapPin size={10} /> {s.localidad}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Lightbox */}
      {galleryIndex !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setGalleryIndex(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/60 hover:text-white text-2xl"
            onClick={() => setGalleryIndex(null)}
          >
            ✕
          </button>
          <img
            src={r.galeria[galleryIndex]?.url}
            alt={r.galeria[galleryIndex]?.alt || r.nombre}
            className="max-w-full max-h-[85vh] object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-2xl"
            onClick={(e) => { e.stopPropagation(); setGalleryIndex((galleryIndex - 1 + r.galeria.length) % r.galeria.length); }}
          >
            ‹
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-2xl"
            onClick={(e) => { e.stopPropagation(); setGalleryIndex((galleryIndex + 1) % r.galeria.length); }}
          >
            ›
          </button>
        </div>
      )}
    </article>
  );
}
