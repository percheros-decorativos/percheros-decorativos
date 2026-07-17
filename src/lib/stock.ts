// Imágenes de stock descargadas a /public/img/stock (WebP optimizado).
// Locales = siempre cargan, rápidas y sin depender de red en runtime.

const s = (name: string) => `/img/stock/${name}.webp`;

export const stock = {
  heroInterior: s("heroInterior"),
  entrada: s("entrada"),
  estante: s("estante"),
  interiorDeco: s("interiorDeco"),
  hogar: s("hogar"),
  atelier: s("atelier"), // carpintería (taladro sobre madera)
  manosMadera: s("manosMadera"), // insumos de manualidad
  manosMayor: s("manosMayor"), // manos sostenidas (cuidado)
  comunidad: s("comunidad"), // retrato (servicio al cliente)
  obras: s("obras"), // voluntariado / donación
  motociclistas: s("motociclistas"),
  moteros: s("moteros"),
  buceo: s("buceo"),
  fe: s("fe"),
} as const;

