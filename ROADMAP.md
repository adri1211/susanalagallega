# Susana La Gallega — Roadmap de Desarrollo

## Estado actual: ✅ Fase 1 completa

---

## FASE 1 — Base (completada)
- [x] Proyecto Next.js 15 + TypeScript + Tailwind + Framer Motion
- [x] Hero inmersivo con slideshow cinemático
- [x] Buscador inteligente en hero
- [x] Sección de categorías visuales (8 tipos)
- [x] Grid de restaurantes destacados
- [x] Sección mapa interactivo (visual placeholder)
- [x] Sección storytelling de Galicia
- [x] Navbar con transparencia + scroll effect
- [x] Footer completo con links por categoría y provincia
- [x] Directorio de restaurantes con filtros (categoría, provincia, precio)
- [x] Ficha de restaurante premium con storytelling, galería masonry, lightbox
- [x] Panel Admin: Dashboard + CRUD restaurantes
- [x] Schema.org para SEO (Restaurant + LocalBusiness + Breadcrumb)
- [x] Sitemap dinámico + robots.txt
- [x] Scraper para importar datos de la web actual
- [x] API routes: restaurantes público + admin CRUD + IA descripción
- [x] Schema SQL completo para Supabase con FTS en español
- [x] Build de producción sin errores

---

## FASE 2 — Datos y Supabase (próximo paso)
- [ ] Configurar proyecto Supabase
- [ ] Ejecutar schema.sql en Supabase SQL Editor
- [ ] Ejecutar scraper: `npx ts-node src/utils/scraper.ts`
- [ ] Revisar y limpiar datos importados
- [ ] Subir imágenes al Storage de Supabase
- [ ] Configurar CDN para imágenes (Supabase Storage + transformaciones)

---

## FASE 3 — Mapa interactivo
- [ ] Integrar Mapbox GL JS o react-map-gl
- [ ] Marcadores por categoría con colores
- [ ] Cluster de marcadores para zoom
- [ ] Panel lateral con restaurante seleccionado
- [ ] Filtros sobre el mapa

---

## FASE 4 — Features premium
- [ ] Sistema de favoritos con localStorage (sin login)
- [ ] "Mi próxima ruta gastronómica" — curador de favoritos con PDF exportable
- [ ] Sistema de recomendaciones dinámicas ("Dónde comer hoy")
- [ ] Filtro por localización del usuario (Geolocalización)
- [ ] Buscador con autocompletado (Supabase full-text search)
- [ ] Página de rutas gastronómicas temáticas

---

## FASE 5 — Admin avanzado
- [ ] Upload de imágenes drag & drop → Supabase Storage
- [ ] Compresión automática + generación WebP con sharp
- [ ] Gestión de galería por restaurante
- [ ] Horarios con UI visual semanal
- [ ] Importador masivo desde CSV/JSON
- [ ] Autenticación para el panel admin (Supabase Auth o NextAuth)
- [ ] Logs de actividad

---

## FASE 6 — SEO extremo
- [ ] Páginas por localidad: `/restaurantes/santiago-de-compostela`
- [ ] Páginas por provincia + categoría: `/marisquerias-a-coruna`
- [ ] FAQ schema para preguntas frecuentes
- [ ] Review schema (opiniones)
- [ ] Google Business Profile integration
- [ ] Performance: Core Web Vitals 100/100

---

## FASE 7 — Escala (1000+ restaurantes)
- [ ] ISR (Incremental Static Regeneration) por restaurante
- [ ] Cache de Supabase con Redis/Vercel KV
- [ ] Paginación eficiente con cursor en lugar de offset
- [ ] CDN de imágenes con Cloudinary o Imgix
- [ ] Búsqueda avanzada con Algolia o Meilisearch

---

## Stack tecnológico
| Capa | Tecnología |
|------|-----------|
| Frontend | Next.js 15, React, TypeScript, Tailwind CSS |
| Animaciones | Framer Motion |
| Backend/DB | Supabase (PostgreSQL) |
| Auth admin | Supabase Auth |
| Hosting | Vercel |
| Imágenes | Supabase Storage + Sharp |
| IA | Claude API (descripciones) |
| Maps | Mapbox GL JS |
| SEO | Next.js Metadata API, Schema.org |

---

## Comandos útiles
```bash
# Desarrollo
npm run dev

# Build producción
npm run build

# Scraping de la web actual
npx ts-node src/utils/scraper.ts

# Type check
npx tsc --noEmit
```
