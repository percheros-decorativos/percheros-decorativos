"use client";

import { useActionState, useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { saveProductAction, type ProductFormState } from "./actions";
import type { AdminProduct, ProductImage } from "@/lib/products";

const field =
  "w-full rounded-lg border border-carbon/15 bg-white px-3 py-2.5 text-sm focus:border-rojo-400 focus:outline-none";
const label = "text-sm font-medium text-carbon/80";

export default function ProductForm({
  product,
  categories,
}: {
  product?: AdminProduct;
  categories: { slug: string; name: string }[];
}) {
  const initialState: ProductFormState = {};
  const [state, formAction, pending] = useActionState(saveProductAction, initialState);
  const [images, setImages] = useState<ProductImage[]>(product?.images ?? []);
  const [removed, setRemoved] = useState<string[]>([]);

  function removeImage(url: string) {
    setImages((imgs) => imgs.filter((i) => i.url !== url));
    setRemoved((r) => [...r, url]);
  }

  return (
    <form action={formAction} className="space-y-6">
      {product && <input type="hidden" name="id" value={product.id} />}
      <input type="hidden" name="existingImages" value={JSON.stringify(images)} />
      <input type="hidden" name="removedImages" value={JSON.stringify(removed)} />

      {state.error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className={label}>Nombre *</span>
          <input
            name="name"
            required
            defaultValue={product?.name}
            className={`${field} mt-1`}
          />
        </label>

        <label className="block">
          <span className={label}>
            Slug (URL) — vacío = se genera del nombre
          </span>
          <input
            name="slug"
            defaultValue={product?.slug}
            placeholder="perchero-mi-producto"
            className={`${field} mt-1`}
          />
        </label>

        <label className="block">
          <span className={label}>Categoría *</span>
          <select
            name="categorySlug"
            required
            defaultValue={product?.categorySlug ?? categories[0]?.slug}
            className={`${field} mt-1`}
          >
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className={label}>Referencia</span>
          <input
            name="reference"
            defaultValue={product?.reference ?? ""}
            className={`${field} mt-1`}
          />
        </label>

        <label className="block">
          <span className={label}>Garantía</span>
          <input
            name="warranty"
            defaultValue={product?.warranty ?? "6 meses"}
            className={`${field} mt-1`}
          />
        </label>

        <label className="block">
          <span className={label}>Precio de venta (COP) *</span>
          <input
            name="priceCop"
            type="number"
            min={1}
            required
            defaultValue={product?.priceCop}
            className={`${field} mt-1`}
          />
        </label>

        <label className="block">
          <span className={label}>Precio antes de descuento (opcional)</span>
          <input
            name="compareAtCop"
            type="number"
            min={0}
            defaultValue={product?.compareAtCop ?? ""}
            className={`${field} mt-1`}
          />
        </label>

        <label className="block">
          <span className={label}>Stock disponible *</span>
          <input
            name="stock"
            type="number"
            min={0}
            required
            defaultValue={product?.stock ?? 0}
            className={`${field} mt-1`}
          />
        </label>

        <label className="block">
          <span className={label}>Medidas</span>
          <input
            name="dimensions"
            defaultValue={product?.dimensions ?? ""}
            placeholder="Aprox. 30 x 7,5 x 1,5 cms"
            className={`${field} mt-1`}
          />
        </label>

        <label className="block sm:col-span-2">
          <span className={label}>Herrajes</span>
          <input
            name="hardware"
            defaultValue={product?.hardware ?? ""}
            className={`${field} mt-1`}
          />
        </label>

        <label className="block sm:col-span-2">
          <span className={label}>Descripción corta (tarjetas/listados)</span>
          <input
            name="shortDesc"
            defaultValue={product?.shortDesc ?? ""}
            className={`${field} mt-1`}
          />
        </label>

        <label className="block sm:col-span-2">
          <span className={label}>Descripción completa</span>
          <textarea
            name="description"
            rows={4}
            defaultValue={product?.description ?? ""}
            className={`${field} mt-1`}
          />
        </label>

        <label className="block sm:col-span-2">
          <span className={label}>Materiales</span>
          <textarea
            name="materials"
            rows={2}
            defaultValue={product?.materials ?? ""}
            className={`${field} mt-1`}
          />
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={product?.featured}
            className="h-4 w-4 rounded border-carbon/30 text-rojo-500"
          />
          <span className={label}>Destacado (carrusel del home)</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isNew"
            defaultChecked={product?.isNew}
            className="h-4 w-4 rounded border-carbon/30 text-rojo-500"
          />
          <span className={label}>Marcar como &quot;Nuevo&quot;</span>
        </label>
      </div>

      <div>
        <span className={label}>Fotos</span>
        {images.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-3">
            {images.map((img) => (
              <div
                key={img.url}
                className="relative h-20 w-20 overflow-hidden rounded-lg bg-crema-100 ring-1 ring-carbon/10"
              >
                <Image src={img.url} alt={img.alt} fill sizes="80px" className="object-contain p-1" />
                <button
                  type="button"
                  onClick={() => removeImage(img.url)}
                  aria-label="Quitar foto"
                  className="absolute right-0.5 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-carbon/70 text-white hover:bg-red-600"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
        <input
          type="file"
          name="images"
          accept="image/*"
          multiple
          className="mt-3 block text-sm"
        />
        <p className="mt-1 text-xs text-carbon/50">
          Puedes subir varias fotos a la vez. La primera queda como foto
          principal.
        </p>
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Guardando…" : product ? "Guardar cambios" : "Crear producto"}
        </Button>
      </div>
    </form>
  );
}
