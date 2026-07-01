"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useCartStore, type CartItem } from "@/lib/store/cartStore";
import { Button } from "@/components/ui/Button";
import { CartIcon } from "@/components/ui/icons";

export default function AddToCartButton({
  product,
  withQuantity = false,
}: {
  product: Omit<CartItem, "quantity" | "key">;
  withQuantity?: boolean;
}) {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const [qty, setQty] = useState(1);
  const outOfStock = product.maxStock <= 0;

  if (outOfStock) {
    return (
      <Button variant="outline" disabled className="w-full">
        Agotado
      </Button>
    );
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      {withQuantity && (
        <div className="flex items-center rounded-md border border-rojo-200">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="px-4 py-2 text-lg text-gris hover:text-carbon"
            aria-label="Disminuir cantidad"
          >
            −
          </button>
          <span className="w-8 text-center font-semibold" aria-live="polite">
            {qty}
          </span>
          <button
            type="button"
            onClick={() => setQty((q) => Math.min(product.maxStock, q + 1))}
            className="px-4 py-2 text-lg text-gris hover:text-carbon"
            aria-label="Aumentar cantidad"
          >
            +
          </button>
        </div>
      )}
      <Button
        onClick={() => {
          addItem(product, qty);
          toast.success("Añadido al carrito");
        }}
        className="flex-1"
        size="lg"
      >
        <CartIcon width={18} height={18} /> Agregar al carrito
      </Button>
      <Button
        variant="dark"
        size="lg"
        onClick={() => {
          addItem(product, qty);
          openCart();
        }}
      >
        Comprar
      </Button>
    </div>
  );
}
