"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRightIcon } from "@/components/ui/icons";

// Slider de servicios: rota los banners de servicio (diseños listos con texto).
// Mismo comportamiento que el HeroSlider: autoplay con pausa al pasar el
// cursor, flechas, puntos, swipe y teclado; respeta prefers-reduced-motion.
// Los banners se muestran completos (object-contain sobre blanco) porque cada
// arte trae su propia proporción y el texto no admite recortes.

type Slide = {
  src: string;
  alt: string;
  href: string;
  label: string;
};

const slides: Slide[] = [
  {
    src: "/img/servicios/servicio-al-cliente.webp",
    alt: "Servicio al cliente antes, durante y después de la compra",
    href: "/contacto",
    label: "Servicio al Cliente",
  },
  {
    src: "/img/servicios/instalacion.webp",
    alt: "Servicio de instalación segura, confiable y con calidad",
    href: "/contacto?asunto=instalacion",
    label: "Instalación",
  },
  {
    src: "/img/servicios/envios.webp",
    alt: "Envíos a cualquier destino de Colombia por empresas de mensajería",
    href: "/contacto?asunto=envios",
    label: "Envíos",
  },
  {
    src: "/img/servicios/formas-de-pago.webp",
    alt: "Formas de pago: todos los medios presenciales y digitales",
    href: "/categorias",
    label: "Formas de Pago",
  },
];

const AUTOPLAY_MS = 5000;

export default function ServicesSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const count = slides.length;

  const go = useCallback(
    (n: number) => setIndex(() => (n + count) % count),
    [count],
  );
  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  useEffect(() => {
    if (paused) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setInterval(() => go(index + 1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [index, paused, go]);

  return (
    <div
      className="relative"
      aria-roledescription="carrusel"
      aria-label="Nuestros servicios"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (dx > 50) prev();
        else if (dx < -50) next();
        touchX.current = null;
      }}
    >
      <div
        className="relative overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-crema-200"
        style={{ aspectRatio: "1800 / 596" }}
      >
        {slides.map((s, i) => (
          <Link
            key={s.src}
            href={s.href}
            aria-hidden={i !== index}
            tabIndex={i === index ? 0 : -1}
            aria-label={s.label}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              i === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <Image
              src={s.src}
              alt={s.alt}
              fill
              sizes="(max-width: 1280px) 100vw, 1216px"
              className="object-contain"
            />
          </Link>
        ))}

        {/* Flechas */}
        <button
          type="button"
          onClick={prev}
          aria-label="Servicio anterior"
          className="absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-carbon shadow-md backdrop-blur transition hover:bg-white sm:left-4 sm:h-10 sm:w-10"
        >
          <ChevronRightIcon width={22} height={22} className="rotate-180" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Servicio siguiente"
          className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-carbon shadow-md backdrop-blur transition hover:bg-white sm:right-4 sm:h-10 sm:w-10"
        >
          <ChevronRightIcon width={22} height={22} />
        </button>
      </div>

      {/* Puntos (fuera del arte para no tapar el texto de los banners) */}
      <div className="mt-4 flex justify-center gap-2">
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={() => go(i)}
            aria-label={`Ir al servicio ${i + 1}: ${s.label}`}
            aria-current={i === index}
            className={`h-2.5 rounded-full transition-all ${
              i === index
                ? "w-7 bg-rojo-500"
                : "w-2.5 bg-rojo-200 hover:bg-rojo-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
