"use client";

import { useState } from "react";
import Image from "next/image";

// Galería de producto: foto principal completa (object-contain, los percheros
// son piezas anchas que no admiten recorte) + miniaturas para cambiar de vista.

interface ProductGalleryProps {
  images: { url: string; alt: string }[];
  isNew?: boolean;
}

export default function ProductGallery({ images, isNew }: ProductGalleryProps) {
  const [index, setIndex] = useState(0);
  const current = images[index] ?? images[0];

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-crema-100 shadow-lg ring-1 ring-carbon/10">
        <Image
          key={current?.url}
          src={current?.url ?? "/img/placeholder-product.svg"}
          alt={current?.alt ?? "Producto"}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain p-6"
          priority
        />
        {isNew && (
          <span className="absolute left-4 top-4 rounded-full bg-verde-500 px-3 py-1 text-sm font-bold text-white">
            NUEVO
          </span>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-4 flex gap-3">
          {images.map((img, i) => (
            <button
              key={img.url}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Ver foto ${i + 1}`}
              aria-current={i === index}
              className={`relative h-20 w-20 overflow-hidden rounded-xl bg-crema-100 ring-2 transition ${
                i === index
                  ? "ring-rojo-500"
                  : "ring-transparent hover:ring-crema-200"
              }`}
            >
              <Image
                src={img.url}
                alt={img.alt}
                fill
                sizes="80px"
                className="object-contain p-1.5"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
