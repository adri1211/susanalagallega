/**
 * SUSANA LA GALLEGA - Importador completo
 * Scrape + importa directamente en Supabase
 * Uso: node scripts/import.mjs
 */

import * as cheerio from 'cheerio';
import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import * as url from 'url';

// ── Config ────────────────────────────────────────────────
const BASE = 'https://susanalagallega.com';
const DELAY = 1200; // ms entre peticiones

// Lee las keys del .env.local
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const envFile = fs.readFileSync(path.join(__dirname, '../.env.local'), 'utf-8');
const env = Object.fromEntries(
  envFile.split('\n')
    .filter(l => l.includes('=') && !l.startsWith('#'))
    .map(l => { const [k, ...v] = l.split('='); return [k.trim(), v.join('=').trim()]; })
);

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  'Accept': 'text/html,application/xhtml+xml',
  'Accept-Language': 'es-ES,es;q=0.9',
};

const ALL_URLS = [
  '/a-pulpeira-no-3574/',
  '/as-pedrinas-novas-no-3567/',
  '/bienmesabe-arturo-soria-no-3555/',
  '/bienmesabe-general-arrado-no-3561/',
  '/bienmesabe-goya-no-3554/',
  '/bienmesabe-mirasierra-no-3553/',
  '/bienmesabe-pozas-no-3551/',
  '/bienmesabe-principe-vergara-no-3558/',
  '/bienmesabe-santa-engracia-no-3560/',
  '/bienmesabe-soto-moraleja-no-3562/',
  '/bienmesabe-trafalgar-no-3559/',
  '/bienmesabe-zurbano-no-3557/',
  '/botin-no-3568/',
  '/camino-estrelas-no-3573/',
  '/carta-marina-no-3570/',
  '/cerveceria-australian-naron-no-3581/',
  '/gastrobar-nua-no-3579/',
  '/la-castafiore-no-3569/',
  '/los-torreznos-alonso-cano-no-3564/',
  '/los-torreznos-goya-no-3563/',
  '/los-torreznos-lopez-de-hoyos-no-3565/',
  '/meson-gallego-ii-no-3576/',
  '/meson-gallego-no-3575/',
  '/meson-muino-kilowatio-cedeira-no-3583/',
  '/meson-o-galo-no-3580/',
  '/o-faro-laxe-no-3571/',
  '/parrilla-sanabresa-no-3566/',
  '/restaurante-brisas-ferrol-no-3582/',
  '/restaurante-carta-marina-madrid-no-3534/',
  '/urimare-no-3578/',
];

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function guessCategoria(nombre, descripcion, url) {
  const txt = `${nombre} ${descripcion} ${url}`.toLowerCase();
  if (txt.includes('pulpeira') || txt.includes('pulpo')) return 'pulperia';
  if (txt.includes('marisq') || txt.includes('marisco')) return 'marisqueria';
  if (txt.includes('parrilla') || txt.includes('asador')) return 'parrillada';
  if (txt.includes('gastrobar') || txt.includes('tapas') || txt.includes('cerveceria')) return 'taperia';
  if (txt.includes('mesón') || txt.includes('meson') || txt.includes('casa') || txt.includes('botin')) return 'tradicional';
  if (txt.includes('bar')) return 'bar';
  return 'tradicional';
}

function guessProvince(text, nombre) {
  const t = (text + nombre).toLowerCase();
  if (t.includes('ferrol') || t.includes('narón') || t.includes('naron') ||
      t.includes('cedeira') || t.includes('laxe') || t.includes('coruña')) return 'A Coruña';
  if (t.includes('vigo') || t.includes('pontevedra')) return 'Pontevedra';
  if (t.includes('lugo')) return 'Lugo';
  if (t.includes('ourense')) return 'Ourense';
  if (t.includes('madrid')) return 'A Coruña'; // restaurantes madrileños → los ponemos en A Coruña como fallback
  return 'A Coruña';
}

function guessLocalidad(text, slug) {
  const t = (text + slug).toLowerCase();
  const map = {
    'ferrol': 'Ferrol', 'narón': 'Narón', 'naron': 'Narón', 'cedeira': 'Cedeira',
    'laxe': 'Laxe', 'santiago': 'Santiago de Compostela', 'coruña': 'A Coruña',
    'vigo': 'Vigo', 'pontevedra': 'Pontevedra', 'lugo': 'Lugo', 'ourense': 'Ourense',
    'madrid': 'Madrid',
  };
  for (const [key, val] of Object.entries(map)) {
    if (t.includes(key)) return val;
  }
  return 'Galicia';
}

async function scrapePage(relUrl) {
  const fullUrl = BASE + relUrl;
  const res = await fetch(fullUrl, { headers: HEADERS });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const html = await res.text();
  const $ = cheerio.load(html);

  // Nombre
  const nombre = $('h1').first().text().trim()
    || $('[itemprop="name"]').first().text().trim()
    || $('title').text().replace(/[-|].*/, '').trim();

  // Descripción
  const descripcionLarga = $('[itemprop="description"]').text().trim()
    || $('.entry-content p').map((_, el) => $(el).text().trim()).get().filter(t => t.length > 50).join('\n\n')
    || $('.post-content p').map((_, el) => $(el).text().trim()).get().filter(t => t.length > 50).join('\n\n');

  const descripcionCorta = descripcionLarga.slice(0, 160).replace(/\s+/g, ' ').trim();

  // Dirección
  const direccion = $('[itemprop="streetAddress"]').text().trim()
    || $('.direccion').text().trim();

  // Teléfono
  const telHref = $('a[href^="tel:"]').first().attr('href') || '';
  const telefono = telHref.replace('tel:', '').trim()
    || $('[itemprop="telephone"]').text().trim();

  // Web
  const web = $('a[rel="external"]').first().attr('href')
    || $('[itemprop="url"]').attr('content');

  // Redes
  let facebook, instagram;
  $('a[href*="facebook.com"]').each((_, el) => {
    const h = $(el).attr('href') || '';
    if (!h.includes('sharer') && !h.includes('share')) facebook = h;
  });
  $('a[href*="instagram.com"]').each((_, el) => { instagram = $(el).attr('href'); });

  // Coordenadas
  let lat, lng;
  const mapSrc = $('iframe[src*="maps"]').attr('src') || $('iframe[src*="google"]').attr('src') || '';
  const coordM = mapSrc.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/);
  if (coordM) { lat = parseFloat(coordM[1]); lng = parseFloat(coordM[2]); }

  // Schema.org
  const schemaEl = $('script[type="application/ld+json"]').first().html();
  if (schemaEl) {
    try {
      const schema = JSON.parse(schemaEl);
      if (schema.geo && !lat) { lat = parseFloat(schema.geo.latitude); lng = parseFloat(schema.geo.longitude); }
    } catch (_) {}
  }

  // Imágenes
  const imgs = [];
  $('img').each((_, el) => {
    const src = $(el).attr('src') || $(el).attr('data-src') || $(el).attr('data-lazy-src') || '';
    if (src && src.startsWith('http') && !src.includes('logo') && !src.includes('icon') &&
        !src.includes('avatar') && !src.includes('blank') && (src.includes('.jpg') || src.includes('.jpeg') || src.includes('.webp') || src.includes('.png'))) {
      imgs.push(src);
    }
  });
  const imagenes = [...new Set(imgs)].slice(0, 8);

  // Inferir datos
  const slug = relUrl.replace(/^\//, '').replace(/\/$/, '');
  const allText = $('body').text();
  const localidad = guessLocalidad(allText + relUrl, nombre);
  const provincia = guessProvince(allText + relUrl + nombre, nombre);
  const categoria = guessCategoria(nombre, descripcionLarga, relUrl);

  return {
    slug,
    nombre: nombre || slug,
    descripcion_corta: descripcionCorta || `${nombre} en ${localidad}`,
    descripcion_larga: descripcionLarga || '',
    categoria,
    direccion: direccion || '',
    localidad,
    provincia,
    telefono: telefono || null,
    web: web || null,
    facebook: facebook || null,
    instagram: instagram || null,
    lat: lat || null,
    lng: lng || null,
    imagen_principal: imagenes[0] || null,
    etiquetas: [categoria, localidad.toLowerCase()],
    destacado: false,
    activo: true,
    _imagenes_extra: imagenes.slice(1),
  };
}

async function main() {
  console.log('═══════════════════════════════════');
  console.log('  SUSANA LA GALLEGA - Importador');
  console.log('═══════════════════════════════════\n');

  if (!env.NEXT_PUBLIC_SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')) {
    console.error('❌ ERROR: Configura las variables de Supabase en .env.local');
    process.exit(1);
  }

  console.log(`📡 Supabase: ${env.NEXT_PUBLIC_SUPABASE_URL}`);
  console.log(`🌐 Scrapeando ${ALL_URLS.length} restaurantes...\n`);

  const results = [];
  const errors = [];

  for (let i = 0; i < ALL_URLS.length; i++) {
    const relUrl = ALL_URLS[i];
    process.stdout.write(`[${i + 1}/${ALL_URLS.length}] ${relUrl.padEnd(50, ' ')}`);
    try {
      const data = await scrapePage(relUrl);
      results.push(data);
      console.log(`✓ ${data.nombre}`);
    } catch (e) {
      errors.push(relUrl);
      console.log(`✗ Error: ${e.message}`);
    }
    if (i < ALL_URLS.length - 1) await sleep(DELAY);
  }

  // Guardar JSON
  const jsonPath = path.join(__dirname, '../scraped-data.json');
  fs.writeFileSync(jsonPath, JSON.stringify(results, null, 2));
  console.log(`\n💾 Guardado en scraped-data.json (${results.length} restaurantes)`);

  // Importar en Supabase
  console.log('\n📤 Importando en Supabase...\n');
  let imported = 0, skipped = 0;

  for (const r of results) {
    const { _imagenes_extra, ...row } = r;

    // Upsert restaurante (por slug)
    const { data: inserted, error } = await supabase
      .from('restaurantes')
      .upsert(row, { onConflict: 'slug' })
      .select('id')
      .single();

    if (error) {
      console.log(`  ✗ ${r.nombre}: ${error.message}`);
      skipped++;
      continue;
    }

    // Insertar imágenes extra en galería
    if (_imagenes_extra.length > 0 && inserted?.id) {
      const galeriaRows = _imagenes_extra.map((url, idx) => ({
        restaurante_id: inserted.id,
        url,
        alt: r.nombre,
        orden: idx + 1,
        tipo: 'imagen',
      }));
      await supabase.from('galeria').upsert(galeriaRows, { onConflict: 'restaurante_id,url' });
    }

    console.log(`  ✓ ${r.nombre} (${r.localidad})`);
    imported++;
  }

  console.log('\n═══════════════════════════════════');
  console.log(`  ✅ Importados: ${imported}`);
  console.log(`  ⚠️  Errores:   ${skipped + errors.length}`);
  console.log('═══════════════════════════════════\n');
  console.log('🎉 ¡Listo! Ahora visita tu web para ver los restaurantes.');
}

main().catch(console.error);
