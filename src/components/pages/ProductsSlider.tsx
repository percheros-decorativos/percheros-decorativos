"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard, { type ProductCardData } from "@/components/ui/ProductCard";

// Carrusel de productos destacados: scroll-snap nativo (swipe fluido en
// móvil, sin JS extra) + capa de pulido profesional encima: flechas que
// aparecen/desaparecen con spring, arrastre con mouse en escritorio, barra
// de progreso y máscaras de borde que insinúan que hay más contenido.

interface ProductsSliderProps {
  products: ProductCardData[];
}

const easeOut = [0.22, 1, 0.36, 1] as const;
// Umbral en px antes de considerar que el mouse está arrastrando (no dando
// clic). Capturar el puntero desde el primer pixel rompe la navegación de
// los <Link> de ProductCard: el mouseup/click queda retargeteado al
// contenedor en vez de al link, y el navegador nunca dispara la navegación.
const DRAG_THRESHOLD = 6;

export default function ProductsSlider({ products }: ProductsSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; scroll: number; dragging: boolean; pointerId: number } | null>(
    null,
  );
  const reduceMotion = useReducedMotion();
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const updateEdges = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft >= max - 4);
    setProgress(max <= 0 ? 1 : Math.min(1, Math.max(0, el.scrollLeft / max)));
  }, []);

  useEffect(() => {
    updateEdges();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, [updateEdges]);

  const scrollByPage = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: "smooth" });
  };

  // Arrastre con mouse: los usuarios de escritorio sin trackpad también
  // pueden deslizar el carrusel tomándolo con el cursor.
  const onPointerDown = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el || e.pointerType !== "mouse") return;
    drag.current = { x: e.clientX, scroll: el.scrollLeft, dragging: false, pointerId: e.pointerId };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el || !drag.current) return;
    const dx = e.clientX - drag.current.x;
    if (!drag.current.dragging) {
      if (Math.abs(dx) < DRAG_THRESHOLD) return;
      drag.current.dragging = true;
      setIsDragging(true);
      el.setPointerCapture(drag.current.pointerId);
    }
    el.scrollLeft = drag.current.scroll - dx;
  };
  const endDrag = () => {
    drag.current = null;
    setIsDragging(false);
  };

  if (products.length === 0) return null;

  return (
    <div className="relative">
      <div
        ref={trackRef}
        role="region"
        aria-label="Productos destacados"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") scrollByPage(1);
          else if (e.key === "ArrowLeft") scrollByPage(-1);
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        className={`no-scrollbar reveal-stagger flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-1 pb-2 pt-1 focus-visible:outline-none ${
          isDragging ? "cursor-grabbing snap-none scroll-auto select-none" : "cursor-grab"
        }`}
      >
        {products.map((p) => (
          <div
            key={p.id}
            className="w-[72%] flex-none snap-start sm:w-[44%] lg:w-[27%]"
          >
            <ProductCard product={p} />
          </div>
        ))}
      </div>

      {/* Máscaras de borde: insinúan que hay más productos a cada lado */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-crema-50 to-transparent transition-opacity duration-300 sm:w-16 ${
          atStart ? "opacity-0" : "opacity-100"
        }`}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-crema-50 to-transparent transition-opacity duration-300 sm:w-16 ${
          atEnd ? "opacity-0" : "opacity-100"
        }`}
      />

      <AnimatePresence>
        {!atStart && (
          <motion.button
            key="prev"
            type="button"
            onClick={() => scrollByPage(-1)}
            aria-label="Productos anteriores"
            initial={{ opacity: 0, scale: 0.7, x: -6 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.7, x: -6 }}
            whileHover={reduceMotion ? undefined : { scale: 1.08 }}
            whileTap={reduceMotion ? undefined : { scale: 0.94 }}
            transition={{ duration: 0.25, ease: easeOut }}
            className="absolute -left-3 top-[38%] z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-carbon shadow-lg ring-1 ring-carbon/10 hover:text-rojo-600 sm:-left-5"
          >
            <ChevronLeft size={22} />
          </motion.button>
        )}
        {!atEnd && (
          <motion.button
            key="next"
            type="button"
            onClick={() => scrollByPage(1)}
            aria-label="Más productos"
            initial={{ opacity: 0, scale: 0.7, x: 6 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.7, x: 6 }}
            whileHover={reduceMotion ? undefined : { scale: 1.08 }}
            whileTap={reduceMotion ? undefined : { scale: 0.94 }}
            transition={{ duration: 0.25, ease: easeOut }}
            className="absolute -right-3 top-[38%] z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-carbon shadow-lg ring-1 ring-carbon/10 hover:text-rojo-600 sm:-right-5"
          >
            <ChevronRight size={22} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Barra de progreso: refleja la posición real del scroll */}
      <div className="mx-auto mt-5 h-1 w-24 overflow-hidden rounded-full bg-crema-200">
        <motion.div
          className="h-full rounded-full bg-rojo-500"
          animate={{ width: `${Math.max(12, progress * 100)}%` }}
          transition={{ duration: 0.2, ease: easeOut }}
        />
      </div>
    </div>
  );
}
