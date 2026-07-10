"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { X } from "lucide-react";
import { useQuickViewStore } from "@/lib/store/quickViewStore";
import { useCartStore } from "@/lib/store/cartStore";
import { formatCOP } from "@/lib/format";

export default function QuickViewModal() {
  const product = useQuickViewStore((s) => s.product);
  const close = useQuickViewStore((s) => s.close);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    if (product) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [product]);

  if (!product) return null;

  const inStock = product.stock > 0;

  function handleAdd() {
    if (!product) return;
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      priceCop: product.priceCop,
      image: product.image,
      maxStock: product.stock,
    });
    toast.success("Añadido al carrito");
    close();
  }

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 p-4"
      onClick={close}
      role="dialog"
      aria-label={`Vista rápida: ${product.name}`}
    >
      <div
        className="relative flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={close}
          aria-label="Cerrar"
          className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-1.5 text-carbon shadow hover:bg-white"
        >
          <X size={20} />
        </button>
        <div className="relative aspect-square w-full bg-white md:w-1/2">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain p-4"
          />
        </div>
        <div className="flex flex-1 flex-col p-6">
          {product.categoryName && (
            <p className="text-xs font-medium uppercase tracking-wide text-gris">
              {product.categoryName}
            </p>
          )}
          <h2 className="mt-1 font-display text-2xl font-bold text-carbon">
            {product.name}
          </h2>
          <p className="mt-3 text-2xl font-extrabold text-rojo-600">
            {formatCOP(product.priceCop)}
          </p>
          {product.shortDesc && (
            <p className="mt-3 text-sm text-gris">{product.shortDesc}</p>
          )}
          <div className="mt-auto pt-6">
            <button
              onClick={handleAdd}
              disabled={!inStock}
              className="w-full rounded-md bg-rojo-500 py-3 font-semibold text-white hover:bg-rojo-600 disabled:opacity-50"
            >
              {inStock ? "Agregar al carrito" : "Agotado"}
            </button>
            <Link
              href={`/producto/${product.slug}`}
              onClick={close}
              className="mt-2 block text-center text-sm font-semibold text-rojo-600 hover:underline"
            >
              Ver detalle completo →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
