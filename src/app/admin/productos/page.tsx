import Link from "next/link";
import Image from "next/image";
import { Pencil, Plus } from "lucide-react";
import { listProductsAdmin } from "@/lib/products";
import { categories } from "@/lib/catalog";
import { formatCOP } from "@/lib/format";
import { SUPABASE_CONFIGURED } from "@/lib/supabase";
import DeleteProductButton from "./DeleteProductButton";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await listProductsAdmin();
  const catName = (slug: string) =>
    categories.find((c) => c.slug === slug)?.name ?? slug;

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-carbon">Productos</h1>
          <p className="mt-1 text-sm text-carbon/60">
            {products.length} producto{products.length === 1 ? "" : "s"}
          </p>
        </div>
        <Link
          href="/admin/productos/nuevo"
          className="inline-flex items-center gap-2 rounded-md bg-rojo-500 px-4 py-2 text-sm font-semibold text-white hover:bg-rojo-600"
        >
          <Plus size={16} /> Nuevo producto
        </Link>
      </div>

      {!SUPABASE_CONFIGURED && (
        <p className="mt-4 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
          ⚠️ Supabase no está configurado en este entorno — el panel no puede
          leer ni guardar productos aquí. El sitio público sigue funcionando
          con el catálogo de <code>catalog.ts</code>.
        </p>
      )}

      <div className="mt-6 overflow-x-auto rounded-xl border border-carbon/10 bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-carbon/10 bg-crema-50 text-left text-xs font-semibold uppercase tracking-wide text-carbon/60">
            <tr>
              <th className="px-4 py-3">Foto</th>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Categoría</th>
              <th className="px-4 py-3">Precio</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-carbon/5 last:border-0">
                <td className="px-4 py-2">
                  <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-crema-100">
                    {p.images[0] && (
                      <Image
                        src={p.images[0].url}
                        alt={p.images[0].alt}
                        fill
                        sizes="48px"
                        className="object-contain p-1"
                      />
                    )}
                  </div>
                </td>
                <td className="px-4 py-2 font-medium text-carbon">{p.name}</td>
                <td className="px-4 py-2 text-carbon/70">{catName(p.categorySlug)}</td>
                <td className="px-4 py-2 text-carbon/70">{formatCOP(p.priceCop)}</td>
                <td className="px-4 py-2 text-carbon/70">{p.stock}</td>
                <td className="px-4 py-2">
                  <div className="flex justify-end gap-1">
                    <Link
                      href={`/admin/productos/${p.id}`}
                      aria-label={`Editar ${p.name}`}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-carbon/60 hover:bg-crema-100 hover:text-rojo-600"
                    >
                      <Pencil size={16} />
                    </Link>
                    <DeleteProductButton id={p.id} name={p.name} />
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-carbon/50">
                  No hay productos todavía.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
