import "server-only";
import { supabaseAdmin } from "@/lib/supabase";

// CRUD de productos sobre Supabase, usado solo por el panel /admin.
// El sitio público sigue leyendo por @/lib/queries (que cae de vuelta al
// catálogo en código si Supabase no está configurado — ver ese archivo).

export interface ProductImage {
  url: string;
  alt: string;
}

export interface AdminProduct {
  id: number;
  slug: string;
  name: string;
  categorySlug: string;
  reference: string | null;
  shortDesc: string | null;
  description: string | null;
  materials: string | null;
  dimensions: string | null;
  hardware: string | null;
  warranty: string | null;
  priceCop: number;
  compareAtCop: number | null;
  stock: number;
  featured: boolean;
  isNew: boolean;
  images: ProductImage[];
}

export interface ProductInput {
  slug: string;
  name: string;
  categorySlug: string;
  reference?: string;
  shortDesc?: string;
  description?: string;
  materials?: string;
  dimensions?: string;
  hardware?: string;
  warranty?: string;
  priceCop: number;
  compareAtCop?: number | null;
  stock: number;
  featured?: boolean;
  isNew?: boolean;
  images: ProductImage[];
}

const BUCKET = "product-images";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapRow(row: any): AdminProduct {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    categorySlug: row.category_slug,
    reference: row.reference,
    shortDesc: row.short_desc,
    description: row.description,
    materials: row.materials,
    dimensions: row.dimensions,
    hardware: row.hardware,
    warranty: row.warranty,
    priceCop: Number(row.price_cop),
    compareAtCop: row.compare_at_cop === null ? null : Number(row.compare_at_cop),
    stock: row.stock,
    featured: !!row.featured,
    isNew: !!row.is_new,
    images: row.images ?? [],
  };
}

function toRow(input: ProductInput) {
  return {
    slug: input.slug,
    name: input.name,
    category_slug: input.categorySlug,
    reference: input.reference || null,
    short_desc: input.shortDesc || null,
    description: input.description || null,
    materials: input.materials || null,
    dimensions: input.dimensions || null,
    hardware: input.hardware || null,
    warranty: input.warranty || "6 meses",
    price_cop: input.priceCop,
    compare_at_cop: input.compareAtCop ?? null,
    stock: input.stock,
    featured: !!input.featured,
    is_new: !!input.isNew,
    images: input.images,
  };
}

export async function listProductsAdmin(): Promise<AdminProduct[]> {
  if (!supabaseAdmin) return [];
  const { data, error } = await supabaseAdmin
    .from("products")
    .select("*")
    .order("id", { ascending: true });
  if (error) {
    console.error("[products] list error:", error.message);
    return [];
  }
  return (data ?? []).map(mapRow);
}

export async function getProductByIdAdmin(id: number): Promise<AdminProduct | null> {
  if (!supabaseAdmin) return null;
  const { data, error } = await supabaseAdmin
    .from("products")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !data) return null;
  return mapRow(data);
}

export async function createProduct(
  input: ProductInput,
): Promise<{ ok: boolean; error?: string; id?: number }> {
  if (!supabaseAdmin) return { ok: false, error: "Supabase no configurado" };
  const { data, error } = await supabaseAdmin
    .from("products")
    .insert(toRow(input))
    .select("id")
    .single();
  if (error) return { ok: false, error: error.message };
  return { ok: true, id: data.id };
}

export async function updateProduct(
  id: number,
  input: ProductInput,
): Promise<{ ok: boolean; error?: string }> {
  if (!supabaseAdmin) return { ok: false, error: "Supabase no configurado" };
  const { error } = await supabaseAdmin.from("products").update(toRow(input)).eq("id", id);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

function storagePathFromUrl(url: string): string | null {
  const marker = `/storage/v1/object/public/${BUCKET}/`;
  const idx = url.indexOf(marker);
  if (idx === -1) return null;
  return url.slice(idx + marker.length);
}

export async function deleteProduct(id: number): Promise<{ ok: boolean; error?: string }> {
  if (!supabaseAdmin) return { ok: false, error: "Supabase no configurado" };
  const existing = await getProductByIdAdmin(id);
  const { error } = await supabaseAdmin.from("products").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };

  // Limpieza de Storage: no bloquea la respuesta si falla.
  if (existing) {
    const paths = existing.images
      .map((i) => storagePathFromUrl(i.url))
      .filter((p): p is string => !!p);
    if (paths.length) {
      const { error: removeErr } = await supabaseAdmin.storage.from(BUCKET).remove(paths);
      if (removeErr) console.error("[products] storage cleanup error:", removeErr.message);
    }
  }
  return { ok: true };
}

/** Borra fotos puntuales de Storage (usado al quitar una imagen en el editor). */
export async function deleteProductImages(urls: string[]): Promise<void> {
  if (!supabaseAdmin || urls.length === 0) return;
  const paths = urls.map(storagePathFromUrl).filter((p): p is string => !!p);
  if (!paths.length) return;
  const { error } = await supabaseAdmin.storage.from(BUCKET).remove(paths);
  if (error) console.error("[products] storage delete error:", error.message);
}

export async function uploadProductImages(
  files: File[],
  slug: string,
): Promise<ProductImage[]> {
  if (!supabaseAdmin || files.length === 0) return [];
  const uploaded: ProductImage[] = [];
  for (const file of files) {
    if (!file || file.size === 0) continue;
    const ext = (file.name.split(".").pop() || "webp").toLowerCase();
    const path = `${slug}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await supabaseAdmin.storage
      .from(BUCKET)
      .upload(path, file, { contentType: file.type || undefined, upsert: false });
    if (error) {
      console.error("[products] upload error:", error.message);
      continue;
    }
    const { data } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(path);
    uploaded.push({ url: data.publicUrl, alt: slug });
  }
  return uploaded;
}
