// Acceso al catálogo (en código). Mantiene la misma API que antes para no
// tocar las páginas. Vercel-ready: no requiere base de datos.

import { categories, products, type CatProduct } from "@/lib/catalog";

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

export async function getCategories(): Promise<UICategory[]> {
  return categories.map((c) => mapCategory(c.slug)!);
}

export async function getCategoryBySlug(slug: string): Promise<UICategory | null> {
  return mapCategory(slug);
}

export async function getProductsByCategory(categoryId: number): Promise<UIProduct[]> {
  const cat = categories[categoryId - 1];
  if (!cat) return [];
  return products
    .filter((p) => p.categorySlug === cat.slug)
    .map(mapProduct)
    .sort((a, b) => Number(b.featured) - Number(a.featured));
}

export async function getFeaturedProducts(limit = 8): Promise<UIProduct[]> {
  return products
    .filter((p) => p.featured)
    .map(mapProduct)
    .slice(0, limit);
}

export async function getNewProducts(limit = 8): Promise<UIProduct[]> {
  return products
    .filter((p) => p.isNew)
    .map(mapProduct)
    .slice(0, limit);
}

export async function getProductBySlug(slug: string): Promise<UIProduct | null> {
  const p = products.find((x) => x.slug === slug);
  return p ? mapProduct(p) : null;
}

export async function getRelatedProducts(
  categoryId: number,
  excludeId: number,
  limit = 4,
): Promise<UIProduct[]> {
  const cat = categories[categoryId - 1];
  if (!cat) return [];
  return products
    .filter((p) => p.categorySlug === cat.slug && p.id !== excludeId)
    .map(mapProduct)
    .slice(0, limit);
}

export async function searchProducts(q: string): Promise<UIProduct[]> {
  const term = q.toLowerCase();
  return products
    .filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.reference.toLowerCase().includes(term),
    )
    .map(mapProduct);
}

export async function getAllProducts(): Promise<UIProduct[]> {
  return products.map(mapProduct);
}

export type ProductWithRelations = UIProduct;
