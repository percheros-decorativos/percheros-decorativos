// Acceso al catálogo. Categorías siguen viviendo en código (@/lib/catalog,
// son solo 11 y casi no cambian). Productos ahora viven en Supabase (tabla
// `products`, editable desde /admin) — pero si Supabase no está configurado
// (por ejemplo en desarrollo local sin credenciales), se degrada de vuelta
// al array de catalog.ts para que el sitio nunca se rompa. Mismo criterio de
// degradación elegante que ya usa @/lib/orders.

import { categories, products as fallbackProducts, type CatProduct } from "@/lib/catalog";
import { supabaseAdmin, SUPABASE_CONFIGURED } from "@/lib/supabase";

export interface UIProduct {
  id: number;
  slug: string;
  name: string;
  reference: string;
  shortDesc: string;
  description: string;
  materials: string;
  dimensions: string;
  hardware: string;
  warranty: string;
  priceCop: number;
  compareAtCop: number | null;
  stock: number;
  featured: boolean;
  isNew: boolean;
  categoryId: number;
  images: { url: string; alt: string }[];
  category: { name: string; slug: string };
  metaTitle: string;
  metaDescription: string;
}

export interface UICategory {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  imageUrl: string;
  metaTitle: string;
  metaDescription: string;
}

const catId = (slug: string) => categories.findIndex((c) => c.slug === slug) + 1;
const catBySlug = (slug: string) => categories.find((c) => c.slug === slug);

function mapCategory(slug: string): UICategory | null {
  const idx = categories.findIndex((c) => c.slug === slug);
  if (idx < 0) return null;
  const c = categories[idx];
  return {
    id: idx + 1,
    slug: c.slug,
    name: c.name,
    tagline: c.tagline,
    description: c.description,
    imageUrl: c.image,
    metaTitle: `Percheros ${c.name} | Percheros Decorativos`,
    metaDescription: c.description.slice(0, 155),
  };
}

// ---- Modo código (fallback sin Supabase) ----

function productImages(p: CatProduct): { url: string; alt: string }[] {
  const count = Math.max(1, p.photos ?? 1);
  const base = p.image.replace(/\.webp$/, "");
  return Array.from({ length: count }, (_, i) => ({
    url: i === 0 ? p.image : `${base}-${i + 1}.webp`,
    alt: i === 0 ? p.name : `${p.name} — vista ${i + 1}`,
  }));
}

function mapProduct(p: CatProduct): UIProduct {
  const cat = catBySlug(p.categorySlug);
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    reference: p.reference,
    shortDesc: p.shortDesc,
    description: p.description,
    materials: p.materials,
    dimensions: p.dimensions,
    hardware: p.hardware,
    warranty: p.warranty,
    priceCop: p.priceCop,
    compareAtCop: p.compareAtCop ?? null,
    stock: p.stock,
    featured: !!p.featured,
    isNew: !!p.isNew,
    categoryId: catId(p.categorySlug),
    images: productImages(p),
    category: { name: cat?.name ?? "", slug: p.categorySlug },
    metaTitle: `${p.name} | Percheros Decorativos`,
    metaDescription: p.shortDesc,
  };
}

// ---- Modo Supabase ----

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapDbProduct(row: any): UIProduct {
  const cat = catBySlug(row.category_slug);
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    reference: row.reference ?? "",
    shortDesc: row.short_desc ?? "",
    description: row.description ?? "",
    materials: row.materials ?? "",
    dimensions: row.dimensions ?? "",
    hardware: row.hardware ?? "",
    warranty: row.warranty ?? "6 meses",
    priceCop: Number(row.price_cop),
    compareAtCop: row.compare_at_cop === null ? null : Number(row.compare_at_cop),
    stock: row.stock,
    featured: !!row.featured,
    isNew: !!row.is_new,
    categoryId: catId(row.category_slug),
    images: row.images && row.images.length ? row.images : [],
    category: { name: cat?.name ?? "", slug: row.category_slug },
    metaTitle: `${row.name} | Percheros Decorativos`,
    metaDescription: row.short_desc ?? "",
  };
}

// Sin caché propia a nivel de módulo: en un runtime serverless ese estado
// sobrevive entre requests del mismo contenedor y dejaría el catálogo
// "congelado" tras la primera consulta, ignorando ediciones hechas desde
// /admin. El cacheo real ya lo hace Next a nivel de ruta (revalidate en cada
// page.tsx); las Server Actions de /admin además llaman revalidatePath tras
// cada cambio para refrescar de inmediato.

/** Fuente única de productos: Supabase si está configurado, si no catalog.ts. */
async function loadProducts(): Promise<UIProduct[]> {
  if (SUPABASE_CONFIGURED && supabaseAdmin) {
    const { data, error } = await supabaseAdmin.from("products").select("*").order("id");
    if (!error && data) {
      return data.map(mapDbProduct);
    }
    console.error("[queries] fallo leyendo products de Supabase, usando catalog.ts:", error?.message);
  }
  return fallbackProducts.map(mapProduct);
}

export async function getCategories(): Promise<UICategory[]> {
  return categories.map((c) => mapCategory(c.slug)!);
}

export async function getCategoryBySlug(slug: string): Promise<UICategory | null> {
  return mapCategory(slug);
}

export async function getProductsByCategory(categoryId: number): Promise<UIProduct[]> {
  const cat = categories[categoryId - 1];
  if (!cat) return [];
  const all = await loadProducts();
  return all
    .filter((p) => p.category.slug === cat.slug)
    .sort((a, b) => Number(b.featured) - Number(a.featured));
}

export async function getFeaturedProducts(limit = 8): Promise<UIProduct[]> {
  const all = await loadProducts();
  return all.filter((p) => p.featured).slice(0, limit);
}

export async function getNewProducts(limit = 8): Promise<UIProduct[]> {
  const all = await loadProducts();
  return all.filter((p) => p.isNew).slice(0, limit);
}

export async function getProductBySlug(slug: string): Promise<UIProduct | null> {
  const all = await loadProducts();
  return all.find((p) => p.slug === slug) ?? null;
}

export async function getRelatedProducts(
  categoryId: number,
  excludeId: number,
  limit = 4,
): Promise<UIProduct[]> {
  const cat = categories[categoryId - 1];
  if (!cat) return [];
  const all = await loadProducts();
  return all
    .filter((p) => p.category.slug === cat.slug && p.id !== excludeId)
    .slice(0, limit);
}

export async function searchProducts(q: string): Promise<UIProduct[]> {
  const term = q.toLowerCase();
  const all = await loadProducts();
  return all.filter(
    (p) =>
      p.name.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term) ||
      p.reference.toLowerCase().includes(term),
  );
}

export async function getAllProducts(): Promise<UIProduct[]> {
  return loadProducts();
}

export type ProductWithRelations = UIProduct;
