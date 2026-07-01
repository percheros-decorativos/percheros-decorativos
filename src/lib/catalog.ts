// === Catálogo de productos EN CÓDIGO (Vercel-ready, sin base de datos) ===
// Patrón inspirado en scentualbliss: el catálogo cambia poco, así que vive en
// código. Esto hace que la tienda sea estática/ISR y funcione en Vercel sin DB.
// Lo dinámico (órdenes) va en Supabase.

export interface CatCategory {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
}

export interface CatProduct {
  id: number;
  slug: string;
  name: string;
  categorySlug: string;
  reference: string;
  shortDesc: string;
  description: string;
  materials: string;
  dimensions: string;
  hardware: string;
  warranty: string;
  priceCop: number;
  compareAtCop?: number;
  stock: number;
  featured?: boolean;
  isNew?: boolean;
  image: string;
}

const MATERIALES =
  "Fabricados con madera y/o MDF, impresión en vinilo adhesivo full color, herrajes metálicos de diferentes referencias.";

import { categoryStock } from "@/lib/stock";

const catImg = (slug: string) => categoryStock[slug] ?? `/img/categories/${slug}.webp`;
const prodImg = (name: string) => `/img/products/${name}.webp`;

export const categories: CatCategory[] = [
  { slug: "hogar", name: "Hogar", tagline: "Útiles y Decorativos", description: "Percheros decorativos con imágenes de paisajes y diferentes temáticas, útiles para colgar accesorios livianos, ofreciendo organización, funcionalidad y decoración en el hogar.", image: catImg("hogar") },
  { slug: "mascotas", name: "Mascotas", tagline: "Útiles y Familiares", description: "Percheros diseñados para los amantes de las mascotas: organiza correas, juguetes y accesorios de tu compañero con estilo.", image: catImg("mascotas") },
  { slug: "moteros", name: "Moteros", tagline: "Útiles y Seguros", description: "Percheros con temática motera para colgar cascos, chaquetas y accesorios de viaje. Vive la pasión por las carreteras.", image: catImg("moteros") },
  { slug: "bike", name: "Bike", tagline: "Útiles y Resilientes", description: "Percheros para ciclistas: organiza cascos, guantes y accesorios de tu bici con diseños llenos de aventura.", image: catImg("bike") },
  { slug: "guitarras", name: "Guitarras", tagline: "Útiles y Cómodos", description: "Percheros inspirados en la música, ideales para colgar accesorios y decorar el espacio de los amantes de la guitarra.", image: catImg("guitarras") },
  { slug: "personalizados", name: "Personalizados", tagline: "Útiles y Prácticos", description: "Percheros hechos a tu medida: nombres, fechas, logos o diseños únicos para regalar o decorar a tu estilo.", image: catImg("personalizados") },
  { slug: "corporativos", name: "Corporativos", tagline: "Útiles y Funcionales", description: "Percheros con la imagen de tu marca o empresa. Detalles corporativos útiles, funcionales y memorables.", image: catImg("corporativos") },
  { slug: "murales", name: "Murales", tagline: "Útiles y Decorativos", description: "Murales decorativos en madera que transforman cualquier pared en un espacio con personalidad y organización.", image: catImg("murales") },
  { slug: "souvenires", name: "Souvenires", tagline: "Útiles y Cómodos", description: "Recuerdos y detalles artesanales en madera, perfectos para sorprender en cualquier ocasión.", image: catImg("souvenires") },
  { slug: "dedios", name: "DeDios", tagline: "Útiles y Resilientes", description: "Percheros con mensajes e imágenes de fe y esperanza, para acompañar y decorar tu hogar.", image: catImg("dedios") },
  { slug: "variados", name: "Variados", tagline: "Útiles y Funcionales", description: "Diseños variados para todos los gustos: una selección versátil de percheros artesanales.", image: catImg("variados") },
];

export const products: CatProduct[] = [
  { id: 1, slug: "perchero-ciudad-de-noche", name: "Perchero Ciudad de Noche", categorySlug: "hogar", reference: "PD-HOG-001", shortDesc: "Perchero decorativo con paisaje urbano nocturno.", description: "Perchero decorativo con imagen de ciudad de noche, útil para colgar accesorios livianos. Ofrece organización, funcionalidad y decoración en el hogar.", dimensions: "37 x 6 x 1 cms", hardware: "Verticales sencillos · Cant. 3", warranty: "6 meses", priceCop: 25000, stock: 3, featured: true, image: prodImg("perchero-ciudad-noche"), materials: MATERIALES },
  { id: 5, slug: "perchero-huellas-mascota", name: "Perchero Huellas Mascota", categorySlug: "mascotas", reference: "PD-MAS-001", shortDesc: "Organiza correas y accesorios de tu mascota.", description: "Perchero con diseño de huellas, perfecto para colgar correas, arneses y juguetes de tu mascota. Útil y familiar.", dimensions: "35 x 8 x 1 cms", hardware: "Ganchos en forma de hueso · Cant. 3", warranty: "6 meses", priceCop: 28000, stock: 6, featured: true, image: prodImg("perchero-huellas"), materials: MATERIALES },
];
