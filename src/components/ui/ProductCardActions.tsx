"use client";

import { Heart, Eye } from "lucide-react";
import { useWishlistStore } from "@/lib/store/wishlistStore";
import { useQuickViewStore, type QuickViewProduct } from "@/lib/store/quickViewStore";

export default function ProductCardActions({
  product,
}: {
  product: QuickViewProduct;
}) {
  const rawItems = useWishlistStore((s) => s.items);
  const items = Array.isArray(rawItems) ? rawItems : [];
  const toggle = useWishlistStore((s) => s.toggle);
  const openQuickView = useQuickViewStore((s) => s.open);
  const inWishlist = items.some((i) => i.id === product.id);

  return (
    <div className="absolute right-3 top-3 z-10 flex flex-col gap-2">
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          toggle({
            id: product.id,
            slug: product.slug,
            name: product.name,
            priceCop: product.priceCop,
            image: product.image,
          });
        }}
        aria-label={inWishlist ? "Quitar de favoritos" : "Agregar a favoritos"}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-carbon shadow hover:bg-white"
      >
        <Heart
          size={18}
          className={inWishlist ? "fill-rojo-500 text-rojo-500" : ""}
        />
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          openQuickView(product);
        }}
        aria-label="Vista rápida"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-carbon shadow hover:bg-white"
      >
        <Eye size={18} />
      </button>
    </div>
  );
}
