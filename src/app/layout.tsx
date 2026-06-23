import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://susanalagallega.com'),
  title: {
    default: 'Susana La Gallega | Guía Gastronómica de Galicia',
    template: '%s | Susana La Gallega',
  },
  description:
    'El directorio gastronómico de referencia en Galicia. Descubre marisquerías, pulperías, restaurantes tradicionales y los mejores lugares donde comer en Galicia.',
  keywords: ['restaurantes galicia', 'gastronomia gallega', 'donde comer galicia', 'marisquerias galicia'],
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
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FAF7F0]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
