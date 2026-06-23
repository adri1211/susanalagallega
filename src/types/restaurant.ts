export type Categoria =
  | 'marisqueria'
  | 'pulperia'
  | 'parrillada'
  | 'taperia'
  | 'tradicional'
  | 'cocina-moderna'
  | 'bar'
  | 'cafeteria'
  | 'sidreria'
  | 'bodega';

export type RangoPrecio = 'economico' | 'moderado' | 'premium' | 'lujo';

export type Provincia =
  | 'A Coruña'
  | 'Lugo'
  | 'Ourense'
  | 'Pontevedra';

export interface HorarioSemana {
  lunes?: string;
  martes?: string;
  miercoles?: string;
  jueves?: string;
  viernes?: string;
  sabado?: string;
  domingo?: string;
}

export interface Coordenadas {
  lat: number;
  lng: number;
}

export interface RedesSociales {
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  youtube?: string;
  tripadvisor?: string;
}

export interface ServiciosRestaurante {
  reservas?: boolean;
  terraza?: boolean;
  parking?: boolean;
  wifi?: boolean;
  menuDegustacion?: boolean;
  menuDelDia?: boolean;
  paraLlevar?: boolean;
  delivery?: boolean;
  accesible?: boolean;
  gruposGrandes?: boolean;
  eventosCorporativos?: boolean;
  bodas?: boolean;
}

export interface SEOFields {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
}

export interface GaleriaItem {
  id: string;
  url: string;
  alt: string;
  orden: number;
  tipo: 'imagen' | 'video';
}

export interface Restaurant {
  id: string;
  slug: string;
  nombre: string;
  descripcionCorta: string;
  descripcionLarga: string;
  experiencia?: string;
  quePedir?: string;
  porQueVisitar?: string;
  loQueLoHaceUnico?: string;
  categoria: Categoria;
  subcategoria?: string;
  etiquetas: string[];
  direccion: string;
  localidad: string;
  provincia: Provincia;
  codigoPostal?: string;
  coordenadas?: Coordenadas;
  telefono?: string;
  email?: string;
  web?: string;
  redesSociales: RedesSociales;
  horarios: HorarioSemana;
  servicios: ServiciosRestaurante;
  rangoPrecio?: RangoPrecio;
  rating?: number;
  totalReviews?: number;
  imagenPrincipal?: string;
  galeria: GaleriaItem[];
  videoPrincipal?: string;
  cartaPDF?: string;
  seo: SEOFields;
  destacado: boolean;
  activo: boolean;
  fechaCreacion: string;
  fechaActualizacion: string;
}

export interface RestaurantCard
  extends Pick<
    Restaurant,
    | 'id'
    | 'slug'
    | 'nombre'
    | 'descripcionCorta'
    | 'categoria'
    | 'localidad'
    | 'provincia'
    | 'imagenPrincipal'
    | 'rangoPrecio'
    | 'rating'
    | 'totalReviews'
    | 'etiquetas'
    | 'destacado'
  > {}

export interface FiltrosRestaurante {
  categoria?: Categoria;
  provincia?: Provincia;
  localidad?: string;
  rangoPrecio?: RangoPrecio;
  busqueda?: string;
  pagina?: number;
  porPagina?: number;
}
