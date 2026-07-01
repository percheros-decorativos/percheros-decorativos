"use client";

import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { Heart, Trash2 } from "lucide-react";
import { useWishlistStore } from "@/lib/store/wishlistStore";
import { useCartStore } from "@/lib/store/cartStore";
import { ButtonLink } from "@/components/ui/Button";
import { formatCOP } from "@/lib/format";

export default function WishlistPage() {
  const rawItems = useWishlistStore((s) => s.items);
  const items = Array.isArray(rawItems) ? rawItems : [];
  const toggle = useWishlistStore((s) => s.toggle);
  const addItem = useCartStore((s) => s.addItem);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="flex items-center gap-2 font-display text-3xl font-extrabold text-carbon">
        <Heart className="text-rojo-500" /> Tus favoritos
      </h1>

      {items.length === 0 ? (
        <div className="mt-8 rounded-2xl bg-crema-50 p-10 text-center">
          <p className="text-lg text-gris">Aún no tienes favoritos.</p>
          <ButtonLink href="/categorias" className="mt-5">
            Explorar percheros
          </ButtonLink>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <article
              key={item.id}
              className="flex flex-col overflow-hidden rounded-xl border border-rojo-100 bg-white shadow-sm"
            >
              <Link
                href={`/producto/${item.slug}`}
                className="relative block aspect-square bg-crema-100"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover"
                />
              </Link>
              <div className="flex flex-1 flex-col p-4">
                <Link
                  href={`/producto/${item.slug}`}
                  className="font-display text-sm font-bold text-carbon hover:text-rojo-600"
                >
                  {item.name}
                </Link>
                <p className="mt-1 font-extrabold text-rojo-600">
                  {formatCOP(item.priceCop)}
                </p>
                <div className="mt-auto flex items-center gap-2 pt-3">
                  <button
                    onClick={() => {
                      addItem({
                        id: item.id,
                        slug: item.slug,
                        name: item.name,
                        priceCop: item.priceCop,
                        image: item.image,
                        maxStock: 99,
                      });
                      toast.success("Añadido al carrito");
                    }}
                    className="flex-1 rounded-md bg-rojo-500 py-2 text-sm font-semibold text-white hover:bg-rojo-600"
                  >
                    Agregar
                  </button>
                  <button
                    onClick={() => toggle(item)}
                    aria-label="Quitar de favoritos"
                    className="rounded-md border border-rojo-200 p-2 text-gris hover:text-rojo-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
