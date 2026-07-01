// Datos para SEO programático de páginas de ciudad: "Percheros en [ciudad]".
// Contenido único por ciudad (no solo variables intercambiadas) para evitar
// contenido delgado y penalizaciones de Google.

export interface Ciudad {
  slug: string;
  nombre: string;
  departamento: string;
  gentilicio: string;
  // Frase única por ciudad (contexto local real)
  intro: string;
  barrios: string[];
}

export const ciudades: Ciudad[] = [
  {
    slug: "bogota",
    nombre: "Bogotá",
    departamento: "Cundinamarca",
    gentilicio: "bogotanos",
    intro:
      "Llevamos percheros decorativos a toda Bogotá: desde Usaquén y Chapinero hasta Suba, Kennedy y el sur de la ciudad. Despacho a domicilio en la capital con seguimiento.",
    barrios: ["Usaquén", "Chapinero", "Suba", "Kennedy", "Engativá", "Teusaquillo"],
  },
  {
    slug: "medellin",
    nombre: "Medellín",
    departamento: "Antioquia",
    gentilicio: "paisas",
    intro:
      "Enviamos percheros artesanales a Medellín y el Valle de Aburrá: El Poblado, Laureles, Belén, Envigado y Sabaneta. Decoración con sello paisa para tu hogar.",
    barrios: ["El Poblado", "Laureles", "Belén", "Envigado", "Sabaneta", "Itagüí"],
  },
  {
    slug: "cali",
    nombre: "Cali",
    departamento: "Valle del Cauca",
    gentilicio: "caleños",
    intro:
      "Despachamos percheros decorativos a Cali y el Valle: Granada, San Fernando, Ciudad Jardín y el norte. Organiza tu hogar con estilo caleño.",
    barrios: ["Granada", "San Fernando", "Ciudad Jardín", "El Peñón", "Pance"],
  },
  {
    slug: "barranquilla",
    nombre: "Barranquilla",
    departamento: "Atlántico",
    gentilicio: "barranquilleros",
    intro:
      "Llevamos nuestros percheros a Barranquilla y el área metropolitana: El Prado, Alto Prado, Riomar y Villa Country. Decoración cálida para la costa.",
    barrios: ["El Prado", "Alto Prado", "Riomar", "Villa Country", "Boston"],
  },
  {
    slug: "cartagena",
    nombre: "Cartagena",
    departamento: "Bolívar",
    gentilicio: "cartageneros",
    intro:
      "Enviamos percheros decorativos a Cartagena: Bocagrande, Manga, Castillogrande y el Centro Histórico. Detalles artesanales para la ciudad heroica.",
    barrios: ["Bocagrande", "Manga", "Castillogrande", "Getsemaní", "Crespo"],
  },
  {
    slug: "bucaramanga",
    nombre: "Bucaramanga",
    departamento: "Santander",
    gentilicio: "bumangueses",
    intro:
      "Despachamos a Bucaramanga y su área metropolitana: Cabecera, Floridablanca, Girón y Piedecuesta. Percheros útiles y decorativos para la ciudad bonita.",
    barrios: ["Cabecera", "Floridablanca", "Girón", "Piedecuesta", "Provenza"],
  },
  {
    slug: "pereira",
    nombre: "Pereira",
    departamento: "Risaralda",
    gentilicio: "pereiranos",
    intro:
      "Llevamos percheros artesanales al Eje Cafetero desde Pereira: Circunvalar, Pinares y Dosquebradas. Decoración con calidez cafetera.",
    barrios: ["Circunvalar", "Pinares", "Dosquebradas", "Álamos", "Cuba"],
  },
  {
    slug: "manizales",
    nombre: "Manizales",
    departamento: "Caldas",
    gentilicio: "manizaleños",
    intro:
      "Enviamos percheros decorativos a Manizales: El Cable, Palermo y Chipre. Piezas hechas a mano para los hogares de la montaña.",
    barrios: ["El Cable", "Palermo", "Chipre", "La Sultana", "Milán"],
  },
  {
    slug: "santa-marta",
    nombre: "Santa Marta",
    departamento: "Magdalena",
    gentilicio: "samarios",
    intro:
      "Despachamos percheros a Santa Marta: El Rodadero, Bello Horizonte y el Centro. Decoración costera para la perla de América.",
    barrios: ["El Rodadero", "Bello Horizonte", "Gaira", "Centro", "Pozos Colorados"],
  },
  {
    slug: "cucuta",
    nombre: "Cúcuta",
    departamento: "Norte de Santander",
    gentilicio: "cucuteños",
    intro:
      "Enviamos percheros decorativos a Cúcuta y su área: Caobos, La Riviera y El Bosque. Organiza tu hogar con diseños artesanales.",
    barrios: ["Caobos", "La Riviera", "El Bosque", "Quinta Oriental", "Ceiba"],
  },
  {
    slug: "ibague",
    nombre: "Ibagué",
    departamento: "Tolima",
    gentilicio: "ibaguereños",
    intro:
      "Llevamos percheros artesanales a Ibagué, la capital musical: La Pola, Cádiz y Piedrapintada. Decoración con ritmo para tu hogar.",
    barrios: ["La Pola", "Cádiz", "Piedrapintada", "Belén", "Jordán"],
  },
  {
    slug: "villavicencio",
    nombre: "Villavicencio",
    departamento: "Meta",
    gentilicio: "villavicenses",
    intro:
      "Despachamos percheros decorativos a Villavicencio, puerta del Llano: Barzal, La Grama y Buque. Detalles útiles para los hogares llaneros.",
    barrios: ["Barzal", "La Grama", "Buque", "Caudal", "Esperanza"],
  },
];

export function getCiudad(slug: string): Ciudad | undefined {
  return ciudades.find((c) => c.slug === slug);
}
