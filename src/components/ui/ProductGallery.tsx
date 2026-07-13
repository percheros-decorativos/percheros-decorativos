"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

// Galería de producto: foto principal completa (object-contain, los percheros
// son piezas anchas que no admiten recorte) en un marco compacto 4:3 —no
// cuadrado— para no dejar tanto vacío arriba/abajo con piezas alargadas.
// Miniaturas en columna a la izquierda desde tablet (como otras tiendas) y
// en fila debajo en móvil; lightbox a pantalla completa con zoom.

interface ProductGalleryProps {
  images: { url: string; alt: string }[];
  isNew?: boolean;
}

function Thumb({
  img,
  active,
  onClick,
  index,
  className = "",
}: {
  img: { url: string; alt: string };
  active: boolean;
  onClick: () => void;
  index: number;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Ver foto ${index + 1}`}
      aria-current={active}
      className={`relative h-16 w-16 flex-none overflow-hidden rounded-xl bg-white ring-2 transition sm:h-[4.5rem] sm:w-[4.5rem] ${
        active ? "ring-rojo-500" : "ring-transparent hover:ring-crema-200"
      } ${className}`}
    >
      <Image src={img.url} alt={img.alt} fill sizes="80px" className="object-contain p-1.5" />
    </button>
  );
}

export default function ProductGallery({ images, isNew }: ProductGalleryProps) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [zoomScale, setZoomScale] = useState(2.2);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const zoomBoxRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; panX: number; panY: number; moved: boolean } | null>(null);
  const count = images.length;
  const current = images[index] ?? images[0];

  const resetZoom = useCallback(() => {
    setZoomed(false);
    setZoomScale(2.2);
    setPan({ x: 0, y: 0 });
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    resetZoom();
  }, [resetZoom]);

  // Recorta el desplazamiento para que la imagen ampliada no se arrastre
  // más allá de donde su borde llega al centro del marco.
  const clampPan = useCallback((p: { x: number; y: number }, scale: number) => {
    const box = zoomBoxRef.current;
    if (!box) return p;
    const maxX = (box.clientWidth * (scale - 1)) / 2;
    const maxY = (box.clientHeight * (scale - 1)) / 2;
    return {
      x: Math.max(-maxX, Math.min(maxX, p.x)),
      y: Math.max(-maxY, Math.min(maxY, p.y)),
    };
  }, []);

  // Un clic sin arrastre alterna el zoom; arrastrar (mouse o dedo) desplaza
  // la imagen ampliada hacia los lados en vez de cerrar/abrir el zoom.
  const onDragStart = (e: React.PointerEvent<HTMLDivElement>) => {
    drag.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y, moved: false };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onDragMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x;
    const dy = e.clientY - drag.current.y;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) drag.current.moved = true;
    if (zoomed && drag.current.moved) {
      setPan(clampPan({ x: drag.current.panX + dx, y: drag.current.panY + dy }, zoomScale));
    }
  };
  const onDragEnd = () => {
    const wasDrag = drag.current?.moved;
    drag.current = null;
    if (wasDrag) return;
    if (zoomed) resetZoom();
    else setZoomed(true);
  };

  // Rueda del mouse: acerca o aleja más el zoom (entre 1.5x y 4x) sin cerrar
  // el lightbox, re-recortando el desplazamiento a los nuevos límites.
  const onWheelZoom = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!zoomed) return;
    e.preventDefault();
    setZoomScale((s) => {
      const next = Math.max(1.5, Math.min(4, s + (e.deltaY < 0 ? 0.35 : -0.35)));
      setPan((p) => clampPan(p, next));
      return next;
    });
  };
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
      else if (e.key === "ArrowLeft") {
        resetZoom();
        prev();
      } else if (e.key === "ArrowRight") {
        resetZoom();
        next();
      }
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close, prev, next, resetZoom]);

  return (
    <div className="sm:flex sm:items-start sm:gap-4">
      {/* Miniaturas: columna a la izquierda desde tablet (como otras tiendas) */}
      {images.length > 1 && (
        <div className="hidden sm:flex sm:max-h-[420px] sm:flex-col sm:gap-3 sm:overflow-y-auto">
          {images.map((img, i) => (
            <Thumb
              key={img.url}
              img={img}
              index={i}
              active={i === index}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      )}

      <div className="min-w-0 flex-1">
        <div className="group relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-white shadow-lg ring-1 ring-carbon/10">
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
              quality={90}
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

        {/* Miniaturas: fila debajo en móvil */}
        {images.length > 1 && (
          <div className="mt-4 flex gap-3 sm:hidden">
            {images.map((img, i) => (
              <Thumb
                key={img.url}
                img={img}
                index={i}
                active={i === index}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox: va en un portal al <body> porque la animación de entrada
          de página (.page-enter) deja un transform en un ancestro y eso
          convertiría el position:fixed en relativo (quedaría fuera de vista). */}
      {open &&
        createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current?.alt ?? "Imagen ampliada"}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Cerrar"
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-carbon/5 text-carbon shadow-md ring-1 ring-carbon/10 transition hover:bg-carbon/10"
          >
            <X size={24} />
          </button>

          <div
            ref={zoomBoxRef}
            className={`relative h-[85vh] w-[92vw] touch-none overflow-hidden select-none ${
              zoomed ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"
            }`}
            onClick={(e) => e.stopPropagation()}
            onPointerDown={onDragStart}
            onPointerMove={onDragMove}
            onPointerUp={onDragEnd}
            onPointerCancel={onDragEnd}
            onWheel={onWheelZoom}
          >
            <Image
              key={current?.url}
              src={current?.url ?? "/img/placeholder-product.svg"}
              alt={current?.alt ?? "Producto"}
              fill
              sizes="92vw"
              quality={95}
              draggable={false}
              className={`object-contain ${zoomed ? "" : "transition-transform duration-200 ease-out"}`}
              style={{
                transform: zoomed
                  ? `translate(${pan.x}px, ${pan.y}px) scale(${zoomScale})`
                  : "scale(1)",
              }}
            />
            {zoomed && (
              <div className="pointer-events-none absolute bottom-5 right-5 rounded-full bg-carbon/5 px-3 py-1 text-xs font-medium text-carbon shadow-md ring-1 ring-carbon/10">
                {zoomScale.toFixed(1)}× · arrastra para mover · rueda para zoom
              </div>
            )}
          </div>

          {count > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  resetZoom();
                  prev();
                }}
                aria-label="Foto anterior"
                className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-carbon/5 text-carbon shadow-md ring-1 ring-carbon/10 transition hover:bg-carbon/10 sm:left-6"
              >
                <ChevronLeft size={26} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  resetZoom();
                  next();
                }}
                aria-label="Foto siguiente"
                className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-carbon/5 text-carbon shadow-md ring-1 ring-carbon/10 transition hover:bg-carbon/10 sm:right-6"
              >
                <ChevronRight size={26} />
              </button>
              <div className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-carbon/5 px-3 py-1 text-sm text-carbon shadow-md ring-1 ring-carbon/10">
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
