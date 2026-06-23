import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

const BASE_URL = 'https://susanalagallega.com';

export async function POST(request: Request) {
  const { url } = await request.json();
  if (!url) return NextResponse.json({ error: 'Missing url' }, { status: 400 });

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SusanaCrawler/1.0)',
        Accept: 'text/html',
      },
      signal: AbortSignal.timeout(15000),
    });

    const html = await response.text();
    const $ = cheerio.load(html);

    const data = {
      url,
      nombre: $('h1').first().text().trim() || $('[itemprop="name"]').first().text().trim(),
      descripcion: $('[itemprop="description"]').text().trim() || $('.entry-content p').first().text().trim(),
      direccion: $('[itemprop="streetAddress"]').text().trim(),
      localidad: $('[itemprop="addressLocality"]').text().trim(),
      telefono: $('a[href^="tel:"]').first().attr('href')?.replace('tel:', '').trim(),
      email: $('a[href^="mailto:"]').first().attr('href')?.replace('mailto:', '').trim(),
      facebook: undefined as string | undefined,
      instagram: undefined as string | undefined,
      lat: undefined as string | undefined,
      lng: undefined as string | undefined,
      imagenes: [] as string[],
    };

    // Social links
    $('a[href]').each((_, el) => {
      const href = $(el).attr('href') || '';
      if (href.includes('facebook.com') && !href.includes('sharer')) data.facebook = href;
      if (href.includes('instagram.com')) data.instagram = href;
    });

    // Coordinates from Google Maps iframe
    const mapSrc = $('iframe[src*="maps"]').first().attr('src') || '';
    const coords = mapSrc.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/);
    if (coords) { data.lat = coords[1]; data.lng = coords[2]; }

    // Schema.org
    const schemaHtml = $('script[type="application/ld+json"]').first().html();
    if (schemaHtml) {
      try {
        const schema = JSON.parse(schemaHtml);
        if (schema.geo && !data.lat) {
          data.lat = schema.geo.latitude;
          data.lng = schema.geo.longitude;
        }
      } catch { /* ignore */ }
    }

    // Images
    const imgs: string[] = [];
    $('img').each((_, el) => {
      const src = $(el).attr('src') || $(el).attr('data-src') || '';
      if (src && !src.includes('logo') && !src.includes('icon') && src.startsWith('http')) {
        imgs.push(src);
      }
    });
    data.imagenes = [...new Set(imgs)].slice(0, 10);

    return NextResponse.json({ data });
  } catch (err) {
    return NextResponse.json({ error: 'Scraping failed', message: String(err) }, { status: 500 });
  }
}

// GET: crawl sitemap
export async function GET() {
  try {
    const res = await fetch(`${BASE_URL}/sitemap.xml`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; SusanaCrawler/1.0)' },
      signal: AbortSignal.timeout(15000),
    });
    const xml = await res.text();
    const matches = xml.match(/<loc>(.*?)<\/loc>/g) || [];
    const urls = matches
      .map((m) => m.replace('<loc>', '').replace('</loc>', '').trim())
      .filter((u) => u !== BASE_URL && u !== `${BASE_URL}/`);

    return NextResponse.json({ urls, total: urls.length });
  } catch {
    return NextResponse.json({ urls: [], total: 0, error: 'Could not fetch sitemap' });
  }
}
