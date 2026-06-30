-- Actualizar el post de supervivientes con el contenido real
-- Ejecutar en Supabase → SQL Editor

UPDATE blog_posts SET
  titulo     = 'Susi de Valdoviño: la hostelera de Ferrolterra que sobrevivió en África',
  extracto   = 'Susi Pérez-Castrillón, vecina de Valdoviño y propietaria del restaurante O Barco, acaba de regresar de participar en Aventura en África (Antena 3). Doce kilos menos, picaduras de mosquito y un león rondando su tienda. Una historia de supervivencia real.',
  contenido  = 'Susi Pérez-Castrillón es una ferrolana vecina de Valdoviño que acaba de regresar de un viaje a África. Pero lo suyo no ha sido un paquete turístico cualquiera, sino una auténtica epopeya.

Susi participó en el programa Aventura en África, que emite Antena 3 desde Kenia, presentado por la también ferrolana Paula Vázquez. Es un espacio de supervivencia en el que los concursantes deben vérselas con una naturaleza salvaje y desconocida, además de la escasez de todo, incluidos los alimentos.

Susi aguantó desde el 12 de enero hasta el pasado domingo, cuando se presentó voluntaria para ser expulsada. Y el público la mandó a casa, aunque sigue apareciendo en Antena 3. Compagina de momento esa presencia televisiva con la atención a su restaurante, O Barco, situado muy cerca de Valdoviño, en la carretera de Cedeira.

La joven confiesa que ha regresado «hecha polvo» y que ha adelgazado doce kilos. Asegura que las penurias que pasan los concursantes en la pantalla son auténticas: «el programa es totalmente real». «Tengo picaduras de mosquitos por todas partes, dormíamos rodeados de escorpiones, un león merodeaba durante la noche...».

Pese a todo, asegura que la aventura ha valido la pena, por ser una experiencia nueva y porque le ha permitido valorar lo que tiene. Además de tomar conciencia sobre las desigualdades del mundo. En Kenia, explica, hay mucha pobreza, aunque ello no impide que la gente sea bastante feliz.

Una historia de valentía, superación y raíces gallegas que nos enorgullece compartir desde Ferrolterra.',
  categoria  = 'ferrolterra',
  etiquetas  = ARRAY['ferrolterra','supervivencia','antena3','aventura en africa','hosteleria','valdovino','restaurante o barco'],
  fuente_url = 'https://share.google/4TQvTtIOqgQG4YDwC',
  fuente_tipo = 'web'
WHERE slug = 'gastronomia-supervivientes';
