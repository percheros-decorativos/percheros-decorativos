"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { X, Trash2, ShoppingBag } from "lucide-react";
import {
  useCartStore,
  useCartTotal,
  useCartCount,
} from "@/lib/store/cartStore";
import { formatCOP } from "@/lib/format";

export default function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const items = useCartStore((s) => s.items);
  const closeCart = useCartStore((s) => s.closeCart);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const total = useCartTotal();
  const count = useCartCount();

  // Bloquear scroll del body cuando el drawer está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-black/40 transition-opacity ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Panel */}
      <aside
        className={`fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Carrito de compras"
        aria-hidden={!isOpen}
      >
        <header className="flex items-center justify-between border-b border-rojo-100 px-5 py-4">
          <h2 className="flex items-center gap-2 font-display text-lg font-bold text-carbon">
            <ShoppingBag size={20} className="text-rojo-500" />
            Tu carrito ({count})
          </h2>
          <button
            onClick={closeCart}
            aria-label="Cerrar carrito"
            className="rounded-md p-1 text-gris hover:bg-crema-100 hover:text-carbon"
          >
            <X size={22} />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <ShoppingBag size={48} className="text-rojo-200" />
            <p className="text-gris">Tu carrito está vacío.</p>
            <Link
              href="/categorias"
              onClick={closeCart}
              className="rounded-md bg-rojo-500 px-5 py-2.5 font-semibold text-white hover:bg-rojo-600"
            >
              Explorar percheros
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 space-y-3 overflow-y-auto p-4">
              {items.map((item) => (
                <li
                  key={item.key}
                  className="flex gap-3 rounded-xl border border-crema-200 p-3"
                >
                  <Link
                    href={`/producto/${item.slug}`}
                    onClick={closeCart}
                    className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-crema-100"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <Link
                      href={`/producto/${item.slug}`}
                      onClick={closeCart}
                      className="text-sm font-semibold text-carbon hover:text-rojo-600"
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm font-bold text-rojo-600">
                      {formatCOP(item.priceCop)}
                    </p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center rounded-md border border-crema-200">
                        <button
                          onClick={() =>
                            updateQuantity(item.key, item.quantity - 1)
                          }
                          className="px-2.5 py-1 text-gris hover:text-carbon"
                          aria-label="Disminuir"
                        >
                          −
                        </button>
                        <span className="w-7 text-center text-sm font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.key, item.quantity + 1)
                          }
                          className="px-2.5 py-1 text-gris hover:text-carbon"
                          aria-label="Aumentar"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.key)}
                        aria-label={`Quitar ${item.name}`}
                        className="text-gris hover:text-rojo-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="border-t border-rojo-100 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-gris">Subtotal</span>
                <span className="text-xl font-extrabold text-carbon">
                  {formatCOP(total)}
                </span>
              </div>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="block rounded-md bg-rojo-500 py-3 text-center font-semibold text-white hover:bg-rojo-600"
              >
                Continuar al pago
              </Link>
              <button
                onClick={closeCart}
                className="mt-2 block w-full text-center text-sm text-gris hover:text-carbon"
              >
                Seguir comprando
              </button>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}
