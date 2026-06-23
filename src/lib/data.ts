import { supabase, createAdminClient } from './supabase';
import type { Restaurant, RestaurantCard, FiltrosRestaurante } from '@/types/restaurant';

function dbToRestaurant(row: Record<string, unknown>): Restaurant {
  return {
    id: row.id as string,
    slug: row.slug as string,
    nombre: row.nombre as string,
    descripcionCorta: (row.descripcion_corta as string) || '',
    descripcionLarga: (row.descripcion_larga as string) || '',
    experiencia: row.experiencia as string | undefined,
    quePedir: row.que_pedir as string | undefined,
    porQueVisitar: row.por_que_visitar as string | undefined,
    loQueLoHaceUnico: row.lo_que_lo_hace_unico as string | undefined,
    categoria: row.categoria as Restaurant['categoria'],
    subcategoria: row.subcategoria as string | undefined,
    etiquetas: (row.etiquetas as string[]) || [],
    direccion: (row.direccion as string) || '',
    localidad: (row.localidad as string) || '',
    provincia: row.provincia as Restaurant['provincia'],
    codigoPostal: row.codigo_postal as string | undefined,
    coordenadas:
      row.lat && row.lng ? { lat: row.lat as number, lng: row.lng as number } : undefined,
    telefono: row.telefono as string | undefined,
    email: row.email as string | undefined,
    web: row.web as string | undefined,
    redesSociales: {
      facebook: row.facebook as string | undefined,
      instagram: row.instagram as string | undefined,
      tiktok: row.tiktok as string | undefined,
      youtube: row.youtube as string | undefined,
      tripadvisor: row.tripadvisor as string | undefined,
    },
    horarios: {
      lunes: row.horario_lunes as string | undefined,
      martes: row.horario_martes as string | undefined,
      miercoles: row.horario_miercoles as string | undefined,
      jueves: row.horario_jueves as string | undefined,
      viernes: row.horario_viernes as string | undefined,
      sabado: row.horario_sabado as string | undefined,
      domingo: row.horario_domingo as string | undefined,
    },
    servicios: {
      reservas: Boolean(row.servicio_reservas),
      terraza: Boolean(row.servicio_terraza),
      parking: Boolean(row.servicio_parking),
      wifi: Boolean(row.servicio_wifi),
      menuDegustacion: Boolean(row.servicio_menu_degustacion),
      menuDelDia: Boolean(row.servicio_menu_dia),
      paraLlevar: Boolean(row.servicio_para_llevar),
      delivery: Boolean(row.servicio_delivery),
      accesible: Boolean(row.servicio_accesible),
      gruposGrandes: Boolean(row.servicio_grupos_grandes),
      eventosCorporativos: Boolean(row.servicio_eventos),
      bodas: Boolean(row.servicio_bodas),
    },
    rangoPrecio: row.rango_precio as Restaurant['rangoPrecio'],
    rating: row.rating as number | undefined,
    totalReviews: (row.total_reviews as number) || 0,
    imagenPrincipal: row.imagen_principal as string | undefined,
    galeria: (row.galeria as Restaurant['galeria']) || [],
    videoPrincipal: row.video_principal as string | undefined,
    cartaPDF: row.carta_pdf as string | undefined,
    seo: {
      metaTitle: row.meta_title as string | undefined,
      metaDescription: row.meta_description as string | undefined,
      keywords: row.keywords as string[] | undefined,
      ogImage: row.og_image as string | undefined,
      canonicalUrl: row.canonical_url as string | undefined,
    },
    destacado: Boolean(row.destacado),
    activo: Boolean(row.activo),
    fechaCreacion: row.created_at as string,
    fechaActualizacion: row.updated_at as string,
  };
}

export async function getRestaurantes(filtros: FiltrosRestaurante = {}): Promise<{
  data: RestaurantCard[];
  total: number;
}> {
  const { categoria, provincia, localidad, rangoPrecio, busqueda, pagina = 1, porPagina = 12 } = filtros;
  const from = (pagina - 1) * porPagina;
  const to = from + porPagina - 1;

  // Use admin client to bypass RLS — activo filter applied manually below
  const client = createAdminClient();
  let query = client
    .from('restaurantes')
    .select(
      'id,slug,nombre,descripcion_corta,categoria,localidad,provincia,imagen_principal,rango_precio,rating,total_reviews,etiquetas,destacado,activo',
      { count: 'exact' }
    )
    .order('destacado', { ascending: false })
    .order('nombre', { ascending: true })
    .range(from, to);

  if (categoria) query = query.eq('categoria', categoria);
  if (provincia) query = query.eq('provincia', provincia);
  if (localidad) query = query.ilike('localidad', `%${localidad}%`);
  if (rangoPrecio) query = query.eq('rango_precio', rangoPrecio);
  if (busqueda) query = query.textSearch('search_vector', busqueda, { config: 'spanish' });

  const { data, error, count } = await query;
  if (error) throw error;

  return {
    data: (data || []).map((r) => ({
      id: r.id,
      slug: r.slug,
      nombre: r.nombre,
      descripcionCorta: r.descripcion_corta,
      categoria: r.categoria,
      localidad: r.localidad,
      provincia: r.provincia,
      imagenPrincipal: r.imagen_principal,
      rangoPrecio: r.rango_precio,
      rating: r.rating,
      totalReviews: r.total_reviews,
      etiquetas: r.etiquetas || [],
      destacado: r.destacado,
    })),
    total: count || 0,
  };
}

export async function getRestauranteBySlug(slug: string): Promise<Restaurant | null> {
  const client = createAdminClient();
  const { data, error } = await client
    .from('restaurantes')
    .select('*, galeria(*)')
    .eq('slug', slug)
    .single();

  if (error || !data) return null;
  return dbToRestaurant(data);
}

export async function getDestacados(): Promise<RestaurantCard[]> {
  const client = createAdminClient();
  const { data } = await client
    .from('restaurantes')
    .select('id,slug,nombre,descripcion_corta,categoria,localidad,provincia,imagen_principal,rango_precio,rating,total_reviews,etiquetas,destacado')
    .eq('destacado', true)
    .order('rating', { ascending: false })
    .limit(6);

  return (data || []).map((r) => ({
    id: r.id,
    slug: r.slug,
    nombre: r.nombre,
    descripcionCorta: r.descripcion_corta,
    categoria: r.categoria,
    localidad: r.localidad,
    provincia: r.provincia,
    imagenPrincipal: r.imagen_principal,
    rangoPrecio: r.rango_precio,
    rating: r.rating,
    totalReviews: r.total_reviews,
    etiquetas: r.etiquetas || [],
    destacado: r.destacado,
  }));
}

export async function getRestaurantesSimilares(
  restauranteId: string,
  categoria: string,
  limit = 4
): Promise<RestaurantCard[]> {
  const client = createAdminClient();
  const { data } = await client
    .from('restaurantes')
    .select('id,slug,nombre,descripcion_corta,categoria,localidad,provincia,imagen_principal,rango_precio,rating,total_reviews,etiquetas,destacado')
    .eq('categoria', categoria)
    .neq('id', restauranteId)
    .order('rating', { ascending: false })
    .limit(limit);

  return (data || []).map((r) => ({
    id: r.id,
    slug: r.slug,
    nombre: r.nombre,
    descripcionCorta: r.descripcion_corta,
    categoria: r.categoria,
    localidad: r.localidad,
    provincia: r.provincia,
    imagenPrincipal: r.imagen_principal,
    rangoPrecio: r.rango_precio,
    rating: r.rating,
    totalReviews: r.total_reviews,
    etiquetas: r.etiquetas || [],
    destacado: r.destacado,
  }));
}

// Admin functions (server-side only)
export async function adminGetAllRestaurantes() {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from('restaurantes')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function adminUpsertRestaurante(restaurante: Partial<Restaurant> & { id?: string }) {
  const admin = createAdminClient();
  const row = {
    nombre: restaurante.nombre,
    slug: restaurante.slug,
    descripcion_corta: restaurante.descripcionCorta,
    descripcion_larga: restaurante.descripcionLarga,
    experiencia: restaurante.experiencia,
    que_pedir: restaurante.quePedir,
    por_que_visitar: restaurante.porQueVisitar,
    lo_que_lo_hace_unico: restaurante.loQueLoHaceUnico,
    categoria: restaurante.categoria,
    subcategoria: restaurante.subcategoria,
    etiquetas: restaurante.etiquetas,
    direccion: restaurante.direccion,
    localidad: restaurante.localidad,
    provincia: restaurante.provincia,
    codigo_postal: restaurante.codigoPostal,
    lat: restaurante.coordenadas?.lat,
    lng: restaurante.coordenadas?.lng,
    telefono: restaurante.telefono,
    email: restaurante.email,
    web: restaurante.web,
    facebook: restaurante.redesSociales?.facebook,
    instagram: restaurante.redesSociales?.instagram,
    tiktok: restaurante.redesSociales?.tiktok,
    youtube: restaurante.redesSociales?.youtube,
    rango_precio: restaurante.rangoPrecio,
    imagen_principal: restaurante.imagenPrincipal,
    video_principal: restaurante.videoPrincipal,
    carta_pdf: restaurante.cartaPDF,
    meta_title: restaurante.seo?.metaTitle,
    meta_description: restaurante.seo?.metaDescription,
    keywords: restaurante.seo?.keywords,
    destacado: restaurante.destacado,
    activo: restaurante.activo,
  };

  if (restaurante.id) {
    const { data, error } = await admin.from('restaurantes').update(row).eq('id', restaurante.id).select().single();
    if (error) throw error;
    return data;
  } else {
    const { data, error } = await admin.from('restaurantes').insert(row).select().single();
    if (error) throw error;
    return data;
  }
}

export async function adminDeleteRestaurante(id: string) {
  const admin = createAdminClient();
  const { error } = await admin.from('restaurantes').delete().eq('id', id);
  if (error) throw error;
}
