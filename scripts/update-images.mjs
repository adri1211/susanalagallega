/**
 * Actualiza imagen_principal en Supabase con imágenes reales
 * node scripts/update-images.mjs
 */
import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import * as url from 'url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const envFile = fs.readFileSync(path.join(__dirname, '../.env.local'), 'utf-8');
const env = Object.fromEntries(
  envFile.split('\n').filter(l => l.includes('=') && !l.startsWith('#'))
    .map(l => { const [k,...v]=l.split('='); return [k.trim(), v.join('=').trim()]; })
);

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

const IMAGES = {
  "cerveceria-australian-naron-no-3581": "https://easycdn.es/4/i/cerveceria-australian-naron_33093_cabblog.png",
  "gastrobar-nua-no-3579": "https://easycdn.es/4/i/gastrobar-nua_33090_cabblog.jpg",
  "meson-gallego-no-3575": "https://easycdn.es/4/i/meson-gallego_33080_cabblog.jpg",
  "meson-gallego-ii-no-3576": "https://easycdn.es/4/i/meson-gallego-ii_33081_cabblog.png",
  "meson-muino-kilowatio-cedeira-no-3583": "https://easycdn.es/4/i/meson-muino-kilowatio-cedeira_33095_cabblog.jpg",
  "meson-o-galo-no-3580": "https://easycdn.es/4/i/meson-o-galo_33091_cabblog.jpg",
  "restaurante-brisas-ferrol-no-3582": "https://easycdn.es/4/i/restaurante-brisas-ferrol_33094_cabblog.jpg",
  "urimare-no-3578": "https://easycdn.es/4/i/urimare_33089_cabblog.jpg",
  "a-pulpeira-no-3574": "https://easycdn.es/4/i/a-pulpeira_33079_cabblog.png",
  "camino-estrelas-no-3573": "https://easycdn.es/4/i/camino-estrelas_33078_cabblog.png",
  "o-faro-laxe-no-3571": "https://easycdn.es/4/i/o-faro-laxe_33075_cabblog.jpg",
  "carta-marina-no-3570": "https://easycdn.es/4/i/carta-marina_33074_cabblog.jpg",
  "botin-no-3568": "https://easycdn.es/4/i/botin_33072_cabblog.jpg",
  "as-pedrinas-novas-no-3567": "https://easycdn.es/4/i/as-pedrinas-novas_33071_cabblog.jpg",
  "la-castafiore-no-3569": "https://easycdn.es/4/i/la-castafiore_33073_cabblog.png",
  "parrilla-sanabresa-no-3566": "https://easycdn.es/4/i/parrilla-sanabresa_33070_cabblog.jpg",
  "los-torreznos-goya-no-3563": "https://easycdn.es/4/i/los-torreznos-goya_33065_cabblog.jpg",
  "los-torreznos-alonso-cano-no-3564": "https://easycdn.es/4/i/los-torreznos-alonso-cano_33066_cabblog.jpg",
  "los-torreznos-lopez-de-hoyos-no-3565": "https://easycdn.es/4/i/los-torreznos-lopez-de-hoyos_33067_cabblog.jpg",
};

// Correcciones de localidad y provincia
const LOCALIDADES = {
  "a-pulpeira-no-3574": { localidad: "A Coruña", provincia: "A Coruña" },
  "as-pedrinas-novas-no-3567": { localidad: "A Coruña", provincia: "A Coruña" },
  "camino-estrelas-no-3573": { localidad: "Santiago de Compostela", provincia: "A Coruña" },
  "carta-marina-no-3570": { localidad: "A Coruña", provincia: "A Coruña" },
  "cerveceria-australian-naron-no-3581": { localidad: "Narón", provincia: "A Coruña" },
  "gastrobar-nua-no-3579": { localidad: "Ferrol", provincia: "A Coruña" },
  "la-castafiore-no-3569": { localidad: "A Coruña", provincia: "A Coruña" },
  "meson-gallego-no-3575": { localidad: "Ferrol", provincia: "A Coruña" },
  "meson-gallego-ii-no-3576": { localidad: "Ferrol", provincia: "A Coruña" },
  "meson-muino-kilowatio-cedeira-no-3583": { localidad: "Cedeira", provincia: "A Coruña" },
  "meson-o-galo-no-3580": { localidad: "Ferrol", provincia: "A Coruña" },
  "o-faro-laxe-no-3571": { localidad: "Laxe", provincia: "A Coruña" },
  "restaurante-brisas-ferrol-no-3582": { localidad: "Ferrol", provincia: "A Coruña" },
  "restaurante-carta-marina-madrid-no-3534": { localidad: "Madrid", provincia: "A Coruña" },
  "urimare-no-3578": { localidad: "Narón", provincia: "A Coruña" },
  "botin-no-3568": { localidad: "Madrid", provincia: "A Coruña" },
  "parrilla-sanabresa-no-3566": { localidad: "Madrid", provincia: "A Coruña" },
};

// Los de Madrid: destacar como "Recomendados en Madrid"
const MADRID_SLUGS = [
  "bienmesabe-arturo-soria-no-3555", "bienmesabe-general-arrado-no-3561",
  "bienmesabe-goya-no-3554", "bienmesabe-mirasierra-no-3553",
  "bienmesabe-pozas-no-3551", "bienmesabe-principe-vergara-no-3558",
  "bienmesabe-santa-engracia-no-3560", "bienmesabe-soto-moraleja-no-3562",
  "bienmesabe-trafalgar-no-3559", "bienmesabe-zurbano-no-3557",
  "botin-no-3568", "parrilla-sanabresa-no-3566",
  "los-torreznos-alonso-cano-no-3564", "los-torreznos-goya-no-3563",
  "los-torreznos-lopez-de-hoyos-no-3565", "restaurante-carta-marina-madrid-no-3534",
];

async function main() {
  console.log('🖼️  Actualizando imágenes y datos en Supabase...\n');

  // Actualizar imágenes
  for (const [slug, imgUrl] of Object.entries(IMAGES)) {
    const updates = { imagen_principal: imgUrl };
    if (LOCALIDADES[slug]) Object.assign(updates, LOCALIDADES[slug]);

    const { error } = await supabase.from('restaurantes').update(updates).eq('slug', slug);
    if (error) console.log(`  ✗ ${slug}: ${error.message}`);
    else console.log(`  ✓ ${slug}`);
  }

  // Actualizar localidades sin imagen
  for (const [slug, loc] of Object.entries(LOCALIDADES)) {
    if (IMAGES[slug]) continue; // ya actualizado
    const { error } = await supabase.from('restaurantes').update(loc).eq('slug', slug);
    if (!error) console.log(`  ✓ localidad ${slug}`);
  }

  // Destacar los gallegos principales
  const DESTACADOS = [
    "meson-muino-kilowatio-cedeira-no-3583",
    "restaurante-brisas-ferrol-no-3582",
    "cerveceria-australian-naron-no-3581",
    "gastrobar-nua-no-3579",
    "meson-o-galo-no-3580",
    "urimare-no-3578",
  ];
  const { error: e2 } = await supabase.from('restaurantes').update({ destacado: true }).in('slug', DESTACADOS);
  if (!e2) console.log('\n  ✓ Destacados actualizados');

  // Etiqueta "madrid" para los de Madrid
  for (const slug of MADRID_SLUGS) {
    await supabase.from('restaurantes')
      .update({ etiquetas: ['madrid', 'recomendado'], localidad: 'Madrid', provincia: 'A Coruña' })
      .eq('slug', slug);
  }

  console.log('\n✅ ¡Todo actualizado!');
}

main().catch(console.error);
