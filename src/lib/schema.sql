-- ============================================================
-- SUSANA LA GALLEGA - Schema de Base de Datos (Supabase/PostgreSQL)
-- ============================================================

-- Extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- ============================================================
-- TABLA PRINCIPAL: restaurantes
-- ============================================================
CREATE TABLE IF NOT EXISTS restaurantes (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug            TEXT UNIQUE NOT NULL,
  nombre          TEXT NOT NULL,
  descripcion_corta TEXT,
  descripcion_larga TEXT,
  experiencia     TEXT,
  que_pedir       TEXT,
  por_que_visitar TEXT,
  lo_que_lo_hace_unico TEXT,
  categoria       TEXT NOT NULL CHECK (categoria IN (
    'marisqueria','pulperia','parrillada','taperia','tradicional',
    'cocina-moderna','bar','cafeteria','sidreria','bodega'
  )),
  subcategoria    TEXT,
  etiquetas       TEXT[] DEFAULT '{}',
  direccion       TEXT,
  localidad       TEXT,
  provincia       TEXT CHECK (provincia IN ('A Coruña','Lugo','Ourense','Pontevedra')),
  codigo_postal   TEXT,
  lat             DECIMAL(10, 8),
  lng             DECIMAL(11, 8),
  telefono        TEXT,
  email           TEXT,
  web             TEXT,
  facebook        TEXT,
  instagram       TEXT,
  tiktok          TEXT,
  youtube         TEXT,
  tripadvisor     TEXT,
  horario_lunes   TEXT,
  horario_martes  TEXT,
  horario_miercoles TEXT,
  horario_jueves  TEXT,
  horario_viernes TEXT,
  horario_sabado  TEXT,
  horario_domingo TEXT,
  servicio_reservas BOOLEAN DEFAULT FALSE,
  servicio_terraza  BOOLEAN DEFAULT FALSE,
  servicio_parking  BOOLEAN DEFAULT FALSE,
  servicio_wifi     BOOLEAN DEFAULT FALSE,
  servicio_menu_degustacion BOOLEAN DEFAULT FALSE,
  servicio_menu_dia BOOLEAN DEFAULT FALSE,
  servicio_para_llevar BOOLEAN DEFAULT FALSE,
  servicio_delivery BOOLEAN DEFAULT FALSE,
  servicio_accesible BOOLEAN DEFAULT FALSE,
  servicio_grupos_grandes BOOLEAN DEFAULT FALSE,
  servicio_eventos BOOLEAN DEFAULT FALSE,
  servicio_bodas  BOOLEAN DEFAULT FALSE,
  rango_precio    TEXT CHECK (rango_precio IN ('economico','moderado','premium','lujo')),
  rating          DECIMAL(2,1) CHECK (rating >= 0 AND rating <= 5),
  total_reviews   INTEGER DEFAULT 0,
  imagen_principal TEXT,
  video_principal  TEXT,
  carta_pdf        TEXT,
  meta_title       TEXT,
  meta_description TEXT,
  keywords         TEXT[],
  og_image         TEXT,
  canonical_url    TEXT,
  destacado       BOOLEAN DEFAULT FALSE,
  activo          BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLA: galeria
-- ============================================================
CREATE TABLE IF NOT EXISTS galeria (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  restaurante_id  UUID REFERENCES restaurantes(id) ON DELETE CASCADE,
  url             TEXT NOT NULL,
  alt             TEXT,
  orden           INTEGER DEFAULT 0,
  tipo            TEXT DEFAULT 'imagen' CHECK (tipo IN ('imagen','video')),
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLA: categorias (para gestión desde admin)
-- ============================================================
CREATE TABLE IF NOT EXISTS categorias (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug            TEXT UNIQUE NOT NULL,
  nombre          TEXT NOT NULL,
  descripcion     TEXT,
  icono           TEXT,
  imagen          TEXT,
  orden           INTEGER DEFAULT 0,
  activo          BOOLEAN DEFAULT TRUE
);

-- ============================================================
-- TABLA: favoritos (usuarios anónimos via localStorage token)
-- ============================================================
CREATE TABLE IF NOT EXISTS favoritos (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  session_token   TEXT NOT NULL,
  restaurante_id  UUID REFERENCES restaurantes(id) ON DELETE CASCADE,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(session_token, restaurante_id)
);

-- ============================================================
-- ÍNDICES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_restaurantes_slug ON restaurantes(slug);
CREATE INDEX IF NOT EXISTS idx_restaurantes_categoria ON restaurantes(categoria);
CREATE INDEX IF NOT EXISTS idx_restaurantes_provincia ON restaurantes(provincia);
CREATE INDEX IF NOT EXISTS idx_restaurantes_localidad ON restaurantes(localidad);
CREATE INDEX IF NOT EXISTS idx_restaurantes_destacado ON restaurantes(destacado);
CREATE INDEX IF NOT EXISTS idx_restaurantes_activo ON restaurantes(activo);
CREATE INDEX IF NOT EXISTS idx_galeria_restaurante ON galeria(restaurante_id);

-- Full-text search en español
ALTER TABLE restaurantes ADD COLUMN IF NOT EXISTS search_vector TSVECTOR;
CREATE INDEX IF NOT EXISTS idx_search_vector ON restaurantes USING GIN(search_vector);

-- Función para actualizar search_vector
CREATE OR REPLACE FUNCTION update_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector = to_tsvector('spanish',
    COALESCE(NEW.nombre, '') || ' ' ||
    COALESCE(NEW.descripcion_corta, '') || ' ' ||
    COALESCE(NEW.localidad, '') || ' ' ||
    COALESCE(array_to_string(NEW.etiquetas, ' '), '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER restaurantes_search_vector_update
  BEFORE INSERT OR UPDATE ON restaurantes
  FOR EACH ROW EXECUTE FUNCTION update_search_vector();

-- Trigger para updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER restaurantes_updated_at
  BEFORE UPDATE ON restaurantes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- DATOS INICIALES: categorías
-- ============================================================
INSERT INTO categorias (slug, nombre, descripcion, icono, orden) VALUES
  ('marisqueria',   'Marisquerías',         'El mejor marisco gallego fresco del día', '🦞', 1),
  ('pulperia',      'Pulperías',            'El auténtico pulpo á feira gallego',       '🐙', 2),
  ('parrillada',    'Parrilladas',          'Carnes y pescados a la brasa',             '🔥', 3),
  ('taperia',       'Taperías',             'Las mejores tapas y raciones gallegas',    '🍽️', 4),
  ('tradicional',   'Tradicionales',        'Cocina gallega de toda la vida',           '🏠', 5),
  ('cocina-moderna','Cocina Moderna',       'Fusión y vanguardia con producto gallego', '⭐', 6),
  ('bar',           'Bares',                'Los mejores bares de Galicia',             '🍺', 7),
  ('cafeteria',     'Cafeterías',           'Desayunos y meriendas gallegas',           '☕', 8),
  ('sidreria',      'Sidrerías',            'Sidra natural y cocina asturiana-gallega', '🍶', 9),
  ('bodega',        'Bodegas',              'Vino Albariño y gastronomía',              '🍷', 10)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- ROW LEVEL SECURITY (Supabase)
-- ============================================================
ALTER TABLE restaurantes ENABLE ROW LEVEL SECURITY;
ALTER TABLE galeria ENABLE ROW LEVEL SECURITY;
ALTER TABLE favoritos ENABLE ROW LEVEL SECURITY;

-- Lectura pública
CREATE POLICY "restaurantes_public_read" ON restaurantes FOR SELECT USING (activo = TRUE);
CREATE POLICY "galeria_public_read" ON galeria FOR SELECT USING (TRUE);

-- Solo admin puede escribir (via service_role key)
CREATE POLICY "restaurantes_admin_all" ON restaurantes
  FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "galeria_admin_all" ON galeria
  FOR ALL USING (auth.role() = 'service_role');

-- Favoritos: lectura y escritura por session_token
CREATE POLICY "favoritos_own" ON favoritos
  FOR ALL USING (TRUE);
