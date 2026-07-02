import type { Metadata } from 'next';
import type { Restaurant } from '@/types/restaurant';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://saboreandoconsusanalagallega.com';
const SITE_NAME = 'Susana La Gallega';
const SITE_DESCRIPTION =
  'El directorio gastronómico de referencia en Galicia. Descubre marisquerías, pulperías, restaurantes tradicionales y los mejores lugares donde comer en Galicia.';

export function generateMetadata(overrides: Partial<Metadata> = {}): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${SITE_NAME} | Guía Gastronómica de Galicia`,
      template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    keywords: [
      'restaurantes galicia', 'donde comer galicia', 'gastronomia gallega',
      'marisquerias galicia', 'pulperias galicia', 'cocina gallega',
      'guia restaurantes galicia', 'mejores restaurantes galicia',
    ],
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    openGraph: {
      type: 'website',
      locale: 'es_ES',
      url: SITE_URL,
      siteName: SITE_NAME,
      title: `${SITE_NAME} | Guía Gastronómica de Galicia`,
      description: SITE_DESCRIPTION,
      images: [{ url: `${SITE_URL}/og-default.jpg`, width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${SITE_NAME} | Guía Gastronómica de Galicia`,
      description: SITE_DESCRIPTION,
      images: [`${SITE_URL}/og-default.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large' },
    },
    ...overrides,
  };
}

export function generateRestaurantMetadata(restaurant: Restaurant): Metadata {
  const title = restaurant.seo.metaTitle || `${restaurant.nombre} | ${restaurant.localidad}, Galicia`;
  const description =
    restaurant.seo.metaDescription ||
    restaurant.descripcionCorta ||
    `${restaurant.nombre} en ${restaurant.localidad}. ${restaurant.descripcionLarga?.slice(0, 150)}...`;
  const url = `${SITE_URL}/restaurantes/${restaurant.slug}`;
  const image = restaurant.seo.ogImage || restaurant.imagenPrincipal || `${SITE_URL}/og-default.jpg`;

  return {
    title,
    description,
    keywords: restaurant.seo.keywords || restaurant.etiquetas,
    openGraph: {
      type: 'article',
      url,
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: restaurant.nombre }],
      locale: 'es_ES',
      siteName: SITE_NAME,
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
    alternates: { canonical: restaurant.seo.canonicalUrl || url },
  };
}

export function generateRestaurantSchema(restaurant: Restaurant) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: restaurant.nombre,
    description: restaurant.descripcionCorta,
    url: `${SITE_URL}/restaurantes/${restaurant.slug}`,
    telephone: restaurant.telefono,
    email: restaurant.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: restaurant.direccion,
      addressLocality: restaurant.localidad,
      addressRegion: restaurant.provincia,
      postalCode: restaurant.codigoPostal,
      addressCountry: 'ES',
    },
    servesCuisine: restaurant.categoria,
    priceRange:
      restaurant.rangoPrecio === 'economico' ? '€' :
      restaurant.rangoPrecio === 'moderado' ? '€€' :
      restaurant.rangoPrecio === 'premium' ? '€€€' : '€€€€',
    image: restaurant.imagenPrincipal ? [restaurant.imagenPrincipal] : undefined,
    sameAs: [
      restaurant.web,
      restaurant.redesSociales.facebook,
      restaurant.redesSociales.instagram,
      restaurant.redesSociales.tiktok,
    ].filter(Boolean),
  };

  if (restaurant.coordenadas) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: restaurant.coordenadas.lat,
      longitude: restaurant.coordenadas.lng,
    };
  }

  if (restaurant.rating) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: restaurant.rating,
      reviewCount: restaurant.totalReviews,
      bestRating: 5,
      worstRating: 1,
    };
  }

  return schema;
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}
