/**
 * Scraper para extraer datos de susanalagallega.com
 * Uso: npx ts-node src/utils/scraper.ts
 */

import axios from 'axios';
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';

const BASE_URL = 'https://susanalagallega.com';
const DELAY_MS = 1500;

interface ScrapedRestaurant {
  url: string;
  nombre?: string;
  descripcion?: string;
  direccion?: string;
  localidad?: string;
  telefono?: string;
  email?: string;
  web?: string;
  facebook?: string;
  instagram?: string;
  lat?: string;
  lng?: string;
  horarios?: string;
  servicios?: string[];
  imagenes?: string[];
  categoria?: string;
  rawHtml?: string;
}

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchPage(url: string): Promise<string | null> {
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SusanaCrawler/1.0)',
        Accept: 'text/html,application/xhtml+xml',
      },
      timeout: 15000,
    });
    return response.data;
  } catch (e) {
    console.error(`Error fetching ${url}:`, e instanceof Error ? e.message : e);
    return null;
  }
}

async function crawlSitemap(): Promise<string[]> {
  const urls: string[] = [];

  // Intentar sitemap.xml
  const sitemapHtml = await fetchPage(`${BASE_URL}/sitemap.xml`);
  if (sitemapHtml) {
    const matches = sitemapHtml.match(/<loc>(.*?)<\/loc>/g);
    if (matches) {
      matches.forEach((m) => {
        const url = m.replace('<loc>', '').replace('</loc>', '').trim();
        if (url.includes('/meson-') || url.includes('/restaurante-') || url.includes('/pulperia-') ||
            url.includes('/marisqueria-') || url.includes('/cafeteria-') || url.includes('/bar-')) {
          urls.push(url);
        }
      });
    }
  }

  // Si no hay sitemap, crawl desde la home
  if (urls.length === 0) {
    console.log('No sitemap found, crawling from home...');
    const homeHtml = await fetchPage(BASE_URL);
    if (homeHtml) {
      const $ = cheerio.load(homeHtml);
      $('a[href]').each((_, el) => {
        const href = $(el).attr('href') || '';
        if (href.startsWith(BASE_URL) && href !== BASE_URL && !href.includes('?') && !href.includes('#')) {
          if (!urls.includes(href)) urls.push(href);
        }
      });
    }
  }

  return [...new Set(urls)];
}

async function scrapeRestaurant(url: string): Promise<ScrapedRestaurant> {
  const html = await fetchPage(url);
  if (!html) return { url };

  const $ = cheerio.load(html);
  const data: ScrapedRestaurant = { url };

  // Nombre
  data.nombre =
    $('h1').first().text().trim() ||
    $('[itemprop="name"]').first().text().trim() ||
    $('title').text().replace(' - Susana La Gallega', '').trim();

  // Descripción
  data.descripcion =
    $('[itemprop="description"]').text().trim() ||
    $('.descripcion, .description, .entry-content p').first().text().trim();

  // Dirección
  data.direccion =
    $('[itemprop="streetAddress"]').text().trim() ||
    $('.direccion, .address').text().trim();

  data.localidad =
    $('[itemprop="addressLocality"]').text().trim() ||
    $('.localidad, .ciudad').text().trim();

  // Teléfono
  const telEl = $('a[href^="tel:"]').first();
  data.telefono = telEl.attr('href')?.replace('tel:', '').trim() || $('[itemprop="telephone"]').text().trim();

  // Email
  const mailEl = $('a[href^="mailto:"]').first();
  data.email = mailEl.attr('href')?.replace('mailto:', '').trim();

  // Web
  data.web = $('[itemprop="url"]').attr('content') || $('a[rel="external"]').first().attr('href');

  // Redes sociales
  $('a[href]').each((_, el) => {
    const href = $(el).attr('href') || '';
    if (href.includes('facebook.com') && !href.includes('sharer')) data.facebook = href;
    if (href.includes('instagram.com')) data.instagram = href;
  });

  // Coordenadas
  const mapIframe = $('iframe[src*="maps"]').first().attr('src') || '';
  const coordMatch = mapIframe.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/);
  if (coordMatch) {
    data.lat = coordMatch[1];
    data.lng = coordMatch[2];
  }
  // También buscar en schema.org
  const schemaEl = $('script[type="application/ld+json"]').first().html();
  if (schemaEl) {
    try {
      const schema = JSON.parse(schemaEl);
      if (schema.geo) {
        data.lat = data.lat || schema.geo.latitude;
        data.lng = data.lng || schema.geo.longitude;
      }
      if (schema.address) {
        data.direccion = data.direccion || schema.address.streetAddress;
        data.localidad = data.localidad || schema.address.addressLocality;
      }
    } catch (_) { /* ignore */ }
  }

  // Horarios
  data.horarios = $('[itemprop="openingHours"]').map((_, el) => $(el).attr('content')).get().join(', ');

  // Imágenes
  const imgs: string[] = [];
  $('img').each((_, el) => {
    const src = $(el).attr('src') || $(el).attr('data-src') || '';
    if (src && !src.includes('logo') && !src.includes('icon') && src.startsWith('http')) {
      imgs.push(src);
    }
  });
  data.imagenes = [...new Set(imgs)].slice(0, 10);

  // Categoría desde URL o breadcrumbs
  const breadcrumbs = $('.breadcrumbs, .breadcrumb').text().toLowerCase();
  if (breadcrumbs.includes('pulperia') || url.includes('pulperia')) data.categoria = 'pulperia';
  else if (breadcrumbs.includes('marisqueria') || url.includes('marisqueria')) data.categoria = 'marisqueria';
  else if (breadcrumbs.includes('parrilla') || url.includes('parrilla')) data.categoria = 'parrillada';
  else if (breadcrumbs.includes('bar') || url.includes('/bar-')) data.categoria = 'bar';
  else if (breadcrumbs.includes('cafe') || url.includes('cafeteria')) data.categoria = 'cafeteria';
  else data.categoria = 'tradicional';

  return data;
}

async function main() {
  console.log('=== SUSANA LA GALLEGA - Web Scraper ===');
  console.log(`Crawling ${BASE_URL}...`);

  const urls = await crawlSitemap();
  console.log(`Found ${urls.length} restaurant URLs`);

  const results: ScrapedRestaurant[] = [];

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    console.log(`[${i + 1}/${urls.length}] Scraping: ${url}`);

    const data = await scrapeRestaurant(url);
    results.push(data);

    await delay(DELAY_MS);
  }

  // Guardar resultados
  const outputPath = path.join(process.cwd(), 'scraped-data.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`\n✅ Scraping complete! ${results.length} restaurants saved to ${outputPath}`);

  // Estadísticas
  console.log('\n=== ESTADÍSTICAS ===');
  console.log(`Total restaurantes: ${results.length}`);
  console.log(`Con teléfono: ${results.filter((r) => r.telefono).length}`);
  console.log(`Con coordenadas: ${results.filter((r) => r.lat).length}`);
  console.log(`Con imágenes: ${results.filter((r) => r.imagenes && r.imagenes.length > 0).length}`);
  console.log(`Con Facebook: ${results.filter((r) => r.facebook).length}`);
  console.log(`Con Instagram: ${results.filter((r) => r.instagram).length}`);

  // Categorías
  const cats: Record<string, number> = {};
  results.forEach((r) => {
    if (r.categoria) cats[r.categoria] = (cats[r.categoria] || 0) + 1;
  });
  console.log('\nPor categoría:', cats);
}

main().catch(console.error);
