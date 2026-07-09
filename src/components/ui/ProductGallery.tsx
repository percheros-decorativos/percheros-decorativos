"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

// Galería de producto: foto principal completa (object-contain, los percheros
// son piezas anchas que no admiten recorte), miniaturas para cambiar de vista
// y lightbox a pantalla completa con zoom para ver el detalle de la pieza.

interface ProductGalleryProps {
  images: { url: string; alt: string }[];
  isNew?: boolean;
}

export default function ProductGallery({ images, isNew }: ProductGalleryProps) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const count = images.length;
  const current = images[index] ?? images[0];

  const close = useCallback(() => {
    setOpen(false);
    setZoomed(false);
  }, []);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + count) % count),
    [count],
  );
  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);

  // Teclado y bloqueo del scroll mientras el lightbox está abierto.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close, prev, next]);

  return (
    <div>
      <div className="group relative aspect-square overflow-hidden rounded-[2rem] bg-crema-100 shadow-lg ring-1 ring-carbon/10">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Ampliar imagen"
          className="absolute inset-0 cursor-zoom-in"
        >
          <Image
            key={current?.url}
            src={current?.url ?? "/img/placeholder-product.svg"}
            alt={current?.alt ?? "Producto"}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain p-6"
            priority
          />
        </button>
        {isNew && (
          <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-verde-500 px-3 py-1 text-sm font-bold text-white">
            NUEVO
          </span>
        )}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Ampliar imagen"
          className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-carbon shadow-md ring-1 ring-carbon/10 backdrop-blur transition hover:bg-white hover:text-rojo-600"
        >
          <ZoomIn size={22} />
        </button>
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

      {/* Lightbox: va en un portal al <body> porque la animación de entrada
          de página (.page-enter) deja un transform en un ancestro y eso
          convertiría el position:fixed en relativo (quedaría fuera de vista). */}
      {open &&
        createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current?.alt ?? "Imagen ampliada"}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Cerrar"
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25"
          >
            <X size={24} />
          </button>

          <div
            className={`relative h-[85vh] w-[92vw] overflow-hidden ${
              zoomed ? "cursor-zoom-out" : "cursor-zoom-in"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setZoomed((z) => !z);
            }}
          >
            <Image
              key={current?.url}
              src={current?.url ?? "/img/placeholder-product.svg"}
              alt={current?.alt ?? "Producto"}
              fill
              sizes="92vw"
              className={`object-contain transition-transform duration-300 ${
                zoomed ? "scale-[2]" : "scale-100"
              }`}
            />
          </div>

          {count > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setZoomed(false);
                  prev();
                }}
                aria-label="Foto anterior"
                className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25 sm:left-6"
              >
                <ChevronLeft size={26} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setZoomed(false);
                  next();
                }}
                aria-label="Foto siguiente"
                className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25 sm:right-6"
              >
                <ChevronRight size={26} />
              </button>
              <div className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-sm text-white">
                {index + 1} / {count}
              </div>
            </>
          )}
        </div>,
        document.body,
      )}
    </div>
  );
}
