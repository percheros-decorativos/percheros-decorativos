"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  deleteProductImages,
  uploadProductImages,
  type ProductImage,
} from "@/lib/products";

export interface ProductFormState {
  error?: string;
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // quita tildes tras normalizar (NFD)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function revalidateCatalog(slug?: string) {
  revalidatePath("/");
  revalidatePath("/categorias");
  revalidatePath("/admin/productos");
  if (slug) {
    revalidatePath(`/producto/${slug}`);
  }
  // Todas las páginas de categoría comparten el mismo layout de listado;
  // revalidar la ruta dinámica completa cubre cualquier categoría afectada.
  revalidatePath("/categoria/[slug]", "page");
}

export async function saveProductAction(
  _prev: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  const id = formData.get("id") as string;
  const name = (formData.get("name") as string)?.trim();
  let slug = (formData.get("slug") as string)?.trim();
  const categorySlug = formData.get("categorySlug") as string;
  const priceCop = Number(formData.get("priceCop"));
  const compareAtCopRaw = formData.get("compareAtCop") as string;
  const stock = Number(formData.get("stock"));

  if (!name) return { error: "El nombre es obligatorio." };
  if (!categorySlug) return { error: "Elige una categoría." };
  if (!priceCop || priceCop <= 0) return { error: "El precio debe ser mayor a 0." };
  if (Number.isNaN(stock) || stock < 0) return { error: "El stock no es válido." };

  slug = slug ? slugify(slug) : slugify(name);
  if (!slug) return { error: "El slug quedó vacío, ajusta el nombre." };

  const existingImagesRaw = formData.get("existingImages") as string;
  let keptImages: ProductImage[] = [];
  try {
    keptImages = existingImagesRaw ? JSON.parse(existingImagesRaw) : [];
  } catch {
    keptImages = [];
  }

  const removedRaw = formData.get("removedImages") as string;
  let removedUrls: string[] = [];
  try {
    removedUrls = removedRaw ? JSON.parse(removedRaw) : [];
  } catch {
    removedUrls = [];
  }

  const files = (formData.getAll("images") as File[]).filter((f) => f && f.size > 0);
  const newImages = files.length ? await uploadProductImages(files, slug) : [];

  const input = {
    slug,
    name,
    categorySlug,
    reference: (formData.get("reference") as string) || undefined,
    shortDesc: (formData.get("shortDesc") as string) || undefined,
    description: (formData.get("description") as string) || undefined,
    materials: (formData.get("materials") as string) || undefined,
    dimensions: (formData.get("dimensions") as string) || undefined,
    hardware: (formData.get("hardware") as string) || undefined,
    warranty: (formData.get("warranty") as string) || undefined,
    priceCop,
    compareAtCop: compareAtCopRaw ? Number(compareAtCopRaw) : null,
    stock,
    featured: formData.get("featured") === "on",
    isNew: formData.get("isNew") === "on",
    images: [...keptImages, ...newImages],
  };

  const result = id
    ? await updateProduct(Number(id), input)
    : await createProduct(input);

  if (!result.ok) {
    return { error: result.error || "No se pudo guardar el producto." };
  }

  if (removedUrls.length) await deleteProductImages(removedUrls);
  revalidateCatalog(slug);
  redirect("/admin/productos");
}

export async function deleteProductAction(id: number) {
  await deleteProduct(id);
  revalidateCatalog();
}
