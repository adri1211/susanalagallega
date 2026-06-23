import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://susanalagallega.com'),
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
    <html lang="es" className="h-full">
      <body className="min-h-full flex flex-col" style={{ background: '#F4F3E4' }}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
