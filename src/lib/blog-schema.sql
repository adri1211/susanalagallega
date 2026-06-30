-- ============================================================
-- TABLA: blog_posts
-- Ejecutar en Supabase SQL Editor
-- ============================================================

CREATE TABLE IF NOT EXISTS blog_posts (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug            TEXT UNIQUE NOT NULL,
  titulo          TEXT NOT NULL,
  extracto        TEXT,
  contenido       TEXT,
  imagen_portada  TEXT,
  categoria       TEXT DEFAULT 'gastronomia' CHECK (categoria IN (
    'gastronomia','ferrolterra','tv-prensa','productos','hosteleria','lifestyle'
  )),
  etiquetas       TEXT[] DEFAULT '{}',
  fuente_url      TEXT,
  fuente_tipo     TEXT CHECK (fuente_tipo IN ('facebook','instagram','youtube','web','propio')),
  destacado       BOOLEAN DEFAULT FALSE,
  publicado       BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_slug      ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_publicado ON blog_posts(publicado);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created   ON blog_posts(created_at DESC);

-- Trigger updated_at (reutiliza la función ya existente)
CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "blog_public_read" ON blog_posts FOR SELECT USING (publicado = TRUE);
CREATE POLICY "blog_admin_all"   ON blog_posts FOR ALL   USING (auth.role() = 'service_role');

-- ============================================================
-- POSTS INICIALES (6 publicaciones basadas en tus enlaces)
-- ============================================================

INSERT INTO blog_posts (slug, titulo, extracto, contenido, categoria, etiquetas, fuente_url, fuente_tipo, destacado, publicado) VALUES

('hosteleros-ferrolterra-quincemil',
 'Mi primer vídeo para Quincemil · Un homenaje a los hosteleros de Ferrolterra',
 'Con mucha ilusión presenté mi primer vídeo para Quincemil, el medio digital de El Español en Galicia. Un proyecto hecho con cariño para visibilizar a los hosteleros de Ferrolterra.',
 'Con mucha ilusión y cariño presenté mi primer vídeo para Quincemil, el reconocido medio digital de El Español dedicado a Galicia.

Este reportaje nació del deseo de poner en valor a los hosteleros de Ferrolterra, esas personas que cada día abren sus puertas para ofrecer lo mejor de nuestra gastronomía gallega. Son el alma de nuestra cultura, los guardianes de recetas que pasan de generación en generación y los embajadores del sabor atlántico.

Fue un proyecto muy especial para mí porque me permitió combinar mi pasión por la gastronomía con el periodismo, mostrando al mundo la riqueza culinaria de una tierra que merece toda la atención del mundo.

¡Espero que os guste tanto como a mí disfruté haciéndolo!',
 'tv-prensa',
 ARRAY['quincemil','ferrolterra','hosteleria','gastronomia gallega','el español'],
 'https://www.facebook.com/share/r/1GxcqyCiKE/',
 'facebook',
 TRUE, TRUE),

('sabores-atlanticos-temporada',
 'Los sabores atlánticos que me enamoraron esta temporada',
 'Mariscos frescos, vinos blancos y rincones escondidos. Esto es lo que ha llenado mis días recorriendo la costa gallega para Saboreando con Susana.',
 'Galicia tiene una capacidad infinita para sorprenderme. Cada semana, cada visita a un nuevo restaurante o mercado, descubro algo que me hace recordar por qué me enamoré de esta tierra y su gastronomía.

Esta temporada han sido los berberechos del Grove, las nécoras de Cedeira y los percebes de la Costa da Morte los que se han llevado todos los aplausos. Pero también ha habido espacio para grandes vinos: Albariños elegantes, Godellos minerales y algún tinto que me sorprendió gratamente.

Si tenéis oportunidad de visitar Galicia, no dejéis de explorar sus mercados locales. Ahí es donde se esconde la verdadera esencia de nuestra cocina.

Podéis ver el reel completo en Instagram con todas las imágenes de este recorrido.',
 'gastronomia',
 ARRAY['gastronomia gallega','marisco','vino','albariño','costa gallega'],
 'https://www.instagram.com/reel/DYkdriiG9RL/',
 'instagram',
 FALSE, TRUE),

('alvaro-gonzalez-tradicion-hostelera',
 'Álvaro González: heredero de una tradición hostelera única en Ferrolterra',
 'Una historia de pasión, familia y gastronomía. Conocemos a Álvaro González, cuya familia lleva décadas siendo referente de la hostelería en Ferrolterra.',
 'Hay personas que nacen con el don de la hospitalidad. Álvaro González es una de ellas.

Heredero de una larga tradición hostelera en Ferrolterra, Álvaro representa ese eslabón fundamental que une el pasado con el futuro de la gastronomía gallega. En su establecimiento, cada plato cuenta una historia, cada receta tiene un nombre y una memoria detrás.

Esta historia, recogida por Quincemil Ferrolterra, nos muestra cómo la hostelería puede ser mucho más que un negocio: puede ser una vocación, un legado y una forma de preservar la identidad cultural de un pueblo.

Siguiendo el ejemplo de personas como Álvaro es como la gastronomía gallega sigue brillando con luz propia. ¡Gracias por todo lo que hacéis!',
 'ferrolterra',
 ARRAY['ferrolterra','hosteleria','tradicion','quincemil','familia'],
 'https://www.facebook.com/share/p/191YidmdFu/',
 'facebook',
 FALSE, TRUE),

('gastronomia-supervivientes',
 'Gastronomía y Supervivientes: cuando la comida gallega se convierte en un lujo',
 'Los concursantes de Supervivientes sueñan con los platos de su tierra. Yo solo podría sobrevivir con pulpo, empanada y un buen Albariño. ¿Y vosotros?',
 'Viendo Supervivientes no puedo evitar pensar en lo afortunados que somos los gallegos con nuestra gastronomía.

Mientras los concursantes sueñan con cualquier cosa que comer, yo soñaría con un buen pulpo á feira, unas zamburiñas a la plancha o un caldo gallego bien caliente. Porque la cocina gallega es, sin duda, de las más completas y satisfactorias del mundo.

Esta reflexión me llevó a pensar: ¿qué platos gallegos te llevarías a una isla desierta? Cuéntamelo en los comentarios. Por mi parte, no dudaría: pulpo, empanada y una buena botella de Mar de Godalba. ¡Supervivencia de lujo!

La gastronomía gallega no es solo comida, es cultura, es identidad, es hogar. Y cuando estás lejos, es lo que más echas de menos.',
 'lifestyle',
 ARRAY['supervivientes','gastronomia gallega','lifestyle','opinion','galicia'],
 'https://share.google/4TQvTtIOqgQG4YDwC',
 'web',
 FALSE, TRUE),

('rincones-gastronomicos-galicia',
 'Mis rincones gastronómicos favoritos: lo mejor que he descubierto últimamente',
 'Recorriendo Galicia para Saboreando con Susana me he encontrado con lugares que me han emocionado. Os los comparto con todo el cariño.',
 'Hay semanas en las que Galicia te sorprende de una manera especial. Lugares que no esperabas, sabores que no olvidarás, personas que te hacen querer aún más esta tierra.

Esta ha sido una de esas semanas. He tenido la suerte de visitar algunos rincones maravillosos para Saboreando con Susana, y quiero compartir con vosotros lo que más me ha marcado.

Desde pequeñas marisquerías de pueblo hasta restaurantes con mucha historia, pasando por mercados locales llenos de producto fresco de primera calidad. Galicia no deja de sorprender a quienes saben buscar.

En próximas publicaciones os iré contando cada historia con todo el detalle. Seguid el reel en Instagram para ver las imágenes completas. ¡Estad atentos!',
 'gastronomia',
 ARRAY['galicia','gastronomia','restaurantes','saboreando con susana','descubrimientos'],
 'https://www.instagram.com/reel/DZhRilVHd2O/',
 'instagram',
 FALSE, TRUE),

('vino-marisco-maridaje-perfecto',
 'Vino gallego y marisco: el maridaje más perfecto del mundo',
 'El Albariño con las almejas, el Godello con el rodaballo, el Mar de Godalba con todo lo que el Atlántico nos regala. Galicia tiene los maridajes más perfectos de la gastronomía mundial.',
 'Si hay algo que Galicia ha perfeccionado a lo largo de los siglos es el arte de maridar sus vinos con su marisco y su pescado. No es casualidad: la tierra y el mar que dan vida a nuestros productos trabajan en perfecta sintonía.

El Albariño, con su frescura y notas cítricas, encuentra su pareja ideal en las almejas, los berberechos y los mejillones. El Godello, más mineral y complejo, eleva a la categoría de experiencia gastronómica un simple rodaballo al horno.

Y si hablamos de Mar de Godalba, mi vino favorito, su coupage de variedades nobles blancas es el compañero perfecto para cualquier marisco de nuestra costa. Cada sorbo recuerda al Atlántico: salino, fresco, mineral.

Os invito a explorar este mundo de maridajes. No necesitáis ir a un restaurante de lujo: con productos frescos del mercado y una buena botella de vino gallego, podéis crear en casa la experiencia más auténtica de nuestra gastronomía.',
 'productos',
 ARRAY['vino gallego','albariño','godello','marisco','maridaje','mar de godalba'],
 'https://www.facebook.com/share/r/1CVevrq6PV/',
 'facebook',
 FALSE, TRUE)

ON CONFLICT (slug) DO NOTHING;
