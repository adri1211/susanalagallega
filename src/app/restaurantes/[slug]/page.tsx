import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getRestauranteBySlug, getRestaurantesSimilares } from '@/lib/data';
import { generateRestaurantMetadata, generateRestaurantSchema, generateBreadcrumbSchema } from '@/lib/seo';
import { RestaurantDetail } from '@/components/restaurant/RestaurantDetail';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const restaurant = await getRestauranteBySlug(slug);
    if (!restaurant) return { title: 'Restaurante no encontrado' };
    return generateRestaurantMetadata(restaurant);
  } catch {
    return { title: 'Restaurante' };
  }
}

export default async function RestaurantePage({ params }: Props) {
  const { slug } = await params;

  let restaurant: Awaited<ReturnType<typeof getRestauranteBySlug>> = null;
  let similares: Awaited<ReturnType<typeof getRestaurantesSimilares>> = [];

  try {
    restaurant = await getRestauranteBySlug(slug);
    if (restaurant) {
      similares = await getRestaurantesSimilares(restaurant.id, restaurant.categoria);
    }
  } catch {
    // Supabase not configured, show demo
  }

  if (!restaurant) {
    // Demo data for development
    restaurant = {
      id: 'demo',
      slug,
      nombre: 'Mesón O Pote',
      descripcionCorta: 'Cocina gallega tradicional en el corazón de Santiago de Compostela',
      descripcionLarga:
        'Situado a escasos metros de la Catedral, Mesón O Pote lleva más de 40 años sirviendo la mejor cocina gallega tradicional. Sus paredes de piedra y madera antigua cuentan la historia de generaciones de familias que han compartido momentos inolvidables alrededor de su mesa.',
      experiencia:
        'Entrar en O Pote es viajar en el tiempo. El olor a puchero gallego, el sonido de la gaita en días especiales, y la calidez de una familia que te recibe como a los suyos hacen de cada visita algo único.',
      quePedir:
        'No te vayas sin probar el caldo gallego de la abuela, el lacón con grelos (especialmente en carnavales), el pulpo á feira con pimentón de La Vera, y para terminar, la tarta de Santiago casera.',
      porQueVisitar:
        'Porque en un mundo de restaurantes de temporada, O Pote representa la autenticidad. 40 años sirviendo los mismos platos, con el mismo amor, y la misma materia prima de siempre.',
      loQueLoHaceUnico:
        'La receta del caldo gallego no se ha cambiado desde 1982. La misma abuela que lo cocinaba entonces enseñó a su hija, que ahora lo cocina para ti.',
      categoria: 'tradicional' as const,
      subcategoria: 'Cocina de mercado',
      etiquetas: ['gallego', 'tradicional', 'caldo', 'pulpo', 'lacón', 'Santiago'],
      direccion: 'Rúa do Franco, 12',
      localidad: 'Santiago de Compostela',
      provincia: 'A Coruña' as const,
      codigoPostal: '15705',
      coordenadas: { lat: 42.8782, lng: -8.5448 },
      telefono: '+34 981 000 000',
      email: 'info@mesonopote.com',
      web: 'https://mesonopote.com',
      redesSociales: {
        facebook: 'https://facebook.com/mesonopote',
        instagram: 'https://instagram.com/mesonopote',
      },
      horarios: {
        lunes: 'Cerrado',
        martes: '13:00 - 16:00 / 20:00 - 23:30',
        miercoles: '13:00 - 16:00 / 20:00 - 23:30',
        jueves: '13:00 - 16:00 / 20:00 - 23:30',
        viernes: '13:00 - 16:00 / 20:00 - 23:30',
        sabado: '13:00 - 17:00 / 20:00 - 00:00',
        domingo: '13:00 - 17:00',
      },
      servicios: {
        reservas: true,
        terraza: true,
        parking: false,
        wifi: true,
        menuDegustacion: false,
        menuDelDia: true,
        paraLlevar: false,
        delivery: false,
        accesible: true,
        gruposGrandes: true,
        eventosCorporativos: false,
        bodas: false,
      },
      rangoPrecio: 'moderado' as const,
      rating: 4.7,
      totalReviews: 234,
      imagenPrincipal: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=85',
      galeria: [
        { id: '1', url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800', alt: 'Interior', orden: 1, tipo: 'imagen' as const },
        { id: '2', url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800', alt: 'Pulpo', orden: 2, tipo: 'imagen' as const },
        { id: '3', url: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=800', alt: 'Marisco', orden: 3, tipo: 'imagen' as const },
        { id: '4', url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800', alt: 'Cocina', orden: 4, tipo: 'imagen' as const },
        { id: '5', url: 'https://images.unsplash.com/photo-1543353071-873f17a7a088?w=800', alt: 'Platos', orden: 5, tipo: 'imagen' as const },
        { id: '6', url: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800', alt: 'Ambiente', orden: 6, tipo: 'imagen' as const },
      ],
      seo: {},
      destacado: true,
      activo: true,
      fechaCreacion: new Date().toISOString(),
      fechaActualizacion: new Date().toISOString(),
    };
  }

  const restaurantSchema = generateRestaurantSchema(restaurant);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Inicio', url: '/' },
    { name: 'Restaurantes', url: '/restaurantes' },
    { name: restaurant.nombre, url: `/restaurantes/${restaurant.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <RestaurantDetail restaurant={restaurant} similares={similares} />
    </>
  );
}
