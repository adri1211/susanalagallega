import type { Metadata } from 'next';
import { Poppins, Lilita_One } from 'next/font/google';
import './globals.css';
import { PublicLayout } from '@/components/ui/PublicLayout';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const lilitaOne = Lilita_One({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-lilita',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://saboreandoconsusanalagallega.com'),
  title: {
    default: 'Susana La Gallega | Guía Gastronómica de Galicia',
    template: '%s | Susana La Gallega',
  },
  description:
    'El directorio gastronómico de Susana La Gallega. Descubre marisquerías, pulperías, restaurantes tradicionales y los mejores lugares donde comer en Galicia y Madrid.',
  keywords: ['restaurantes galicia', 'gastronomia gallega', 'donde comer galicia', 'marisquerias galicia', 'susana la gallega', 'saboreando con susana'],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    siteName: 'Susana La Gallega',
    images: [{ url: '/og-default.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`h-full ${poppins.variable} ${lilitaOne.variable}`}>
      <body className="min-h-full flex flex-col" style={{ background: '#F4F3E4' }}>
        <PublicLayout>{children}</PublicLayout>
      </body>
    </html>
  );
}
