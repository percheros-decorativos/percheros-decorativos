"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCartStore,
  useCartTotal,
  useCartCount,
} from "@/lib/store/cartStore";
import { ButtonLink } from "@/components/ui/Button";
import { formatCOP } from "@/lib/format";

export default function CarritoPage() {
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const subtotal = useCartTotal();
  const count = useCartCount();

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="font-display text-3xl font-extrabold text-carbon">
        Tu carrito
      </h1>

      {items.length === 0 ? (
        <div className="mt-8 rounded-2xl bg-crema-50 p-10 text-center">
          <p className="text-lg text-gris">Tu carrito está vacío.</p>
          <ButtonLink href="/categorias" className="mt-5">
            Explorar percheros
          </ButtonLink>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <ul className="space-y-4 lg:col-span-2">
            {items.map((item) => (
              <li
                key={item.key}
                className="flex gap-4 rounded-2xl border border-rojo-100 bg-white p-4"
              >
                <Link
                  href={`/producto/${item.slug}`}
                  className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-crema-100"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </Link>
                <div className="flex flex-1 flex-col">
                  <Link
                    href={`/producto/${item.slug}`}
                    className="font-display font-semibold text-carbon hover:text-rojo-600"
                  >
                    {item.name}
                  </Link>
                  <p className="text-sm text-gris">
                    {formatCOP(item.priceCop)} c/u
                  </p>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center rounded-md border border-rojo-200">
                      <button
                        onClick={() => updateQuantity(item.key, item.quantity - 1)}
                        className="px-3 py-1 text-gris hover:text-carbon"
                        aria-label="Disminuir"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.key, item.quantity + 1)}
                        className="px-3 py-1 text-gris hover:text-carbon"
                        aria-label="Aumentar"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.key)}
                      className="text-sm text-rojo-600 hover:underline"
                    >
                      Quitar
                    </button>
                  </div>
                </div>
                <p className="font-bold text-carbon">
                  {formatCOP(item.priceCop * item.quantity)}
                </p>
              </li>
            ))}
          </ul>

          <aside className="h-fit rounded-2xl border border-rojo-100 bg-crema-50 p-6">
            <h2 className="font-display text-lg font-semibold text-carbon">
              Resumen
            </h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-gris">Productos ({count})</dt>
                <dd className="font-semibold">{formatCOP(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gris">Envío</dt>
                <dd className="text-gris">Se calcula al pagar</dd>
              </div>
            </dl>
            <div className="mt-4 flex justify-between border-t border-rojo-100 pt-4 text-base">
              <span className="font-semibold">Subtotal</span>
              <span className="font-bold text-carbon">{formatCOP(subtotal)}</span>
            </div>
            <ButtonLink href="/checkout" size="lg" className="mt-5 w-full">
              Continuar al pago
            </ButtonLink>
            <Link
              href="/categorias"
              className="mt-3 block text-center text-sm text-rojo-600 hover:underline"
            >
              Seguir comprando
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
