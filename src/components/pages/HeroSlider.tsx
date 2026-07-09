"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRightIcon } from "@/components/ui/icons";

// Slider principal fiel al PDF: banners "Útiles y ..." que rotan.
// Reproducción automática siempre activa, con flechas, puntos, swipe y
// teclado. Degrada a la 1ª slide sin JS.
//
// Arte dirigido: en vez de recortar el banner panorámico de escritorio para
// que quepa en una pantalla angosta, se muestran DOS versiones — una
// vertical diseñada para móvil (mobileSrc) y la panorámica original desde
// tablet en adelante — cada una en su propio contenedor con la proporción
// que le corresponde, intercambiadas por CSS (sin JS) según el ancho de
// pantalla.

type Slide = {
  src: string;
  alt: string;
  href: string;
  label: string;
  /** Versión vertical (500×700) diseñada para móvil. Si falta, el banner de
   * escritorio se muestra completo (object-contain) en vez de recortarse. */
  mobileSrc?: string;
  /* Lado donde vive el texto del banner: en escritorio ancla el recorte
     para que el mensaje "Útiles y ..." nunca quede fuera de cuadro. */
  pos: "object-left" | "object-center" | "object-right";
};

const slides: Slide[] = [
  {
    src: "/img/hero/banner-resilientes.webp",
    mobileSrc: "/img/hero/mobile/dedios-movil.webp",
    alt: "Percheros decorativos útiles y resilientes, con mensajes de fe y esperanza",
    href: "/categoria/dedios",
    label: "Útiles y Resilientes",
    pos: "object-left",
  },
  {
    src: "/img/hero/banner-decorativos.webp",
    mobileSrc: "/img/hero/mobile/hogar-movil.webp",
    alt: "Percheros decorativos con paisajes de ciudad para el hogar",
    href: "/categoria/hogar",
    label: "Útiles y Decorativos",
    pos: "object-center",
  },
  {
    src: "/img/hero/banner-practicos.webp",
    mobileSrc: "/img/hero/mobile/mascotas-movil.webp",
    alt: "Percheros útiles y prácticos para organizar accesorios de mascotas",
    href: "/categoria/mascotas",
    label: "Útiles y Prácticos",
    pos: "object-left",
  },
  {
    src: "/img/hero/banner-funcionales.webp",
    mobileSrc: "/img/hero/mobile/moteros-movil.webp",
    alt: "Percheros útiles y funcionales con temática motera",
    href: "/categoria/moteros",
    label: "Útiles y Funcionales",
    pos: "object-left",
  },
  {
    src: "/img/hero/banner-seguros.webp",
    mobileSrc: "/img/hero/mobile/bike-movil.webp",
    alt: "Percheros útiles y seguros para ciclistas y amantes de la bici",
    href: "/categoria/bike",
    label: "Útiles y Seguros",
    pos: "object-right",
  },
  {
    src: "/img/hero/banner-comodos.webp",
    mobileSrc: "/img/hero/mobile/guitarras-movil.webp",
    alt: "Percheros útiles y cómodos con temática musical de guitarras",
    href: "/categoria/guitarras",
    label: "Útiles y Cómodos",
    pos: "object-center",
  },
  {
    src: "/img/hero/banner-familiares.webp",
    alt: "Percheros útiles, familiares y personalizados para toda ocasión",
    href: "/categoria/personalizados",
    label: "Útiles y Familiares",
    pos: "object-center",
  },
];

const AUTOPLAY_MS = 5500;

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);
  const count = slides.length;

  const go = useCallback(
    (n: number) => setIndex((prev) => (n + count) % count),
    [count],
  );
  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  // Reproducción automática incondicional; cualquier interacción (flechas,
  // puntos, swipe) reinicia el conteo porque el efecto depende de `index`.
  useEffect(() => {
    const id = setInterval(() => go(index + 1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [index, go]);

  return (
    <section
      className="hero-rise relative bg-carbon"
      aria-roledescription="carrusel"
      aria-label="Percheros útiles y decorativos"
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (dx > 50) prev();
        else if (dx < -50) next();
        touchX.current = null;
      }}
    >
      <div className="relative mx-auto w-full max-w-[1800px]">
        {/* Versión móvil: arte vertical dedicado (o el banner completo sin
            recortar si un slide todavía no tiene versión móvil). */}
        <div className="relative aspect-[5/7] w-full overflow-hidden sm:hidden">
          {slides.map((s, i) => (
            <Link
              key={s.src}
              href={s.href}
              aria-hidden={i !== index}
              tabIndex={i === index ? 0 : -1}
              aria-label={`Ver categoría — ${s.label}`}
              className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                i === index ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              {s.mobileSrc ? (
                <Image
                  src={s.mobileSrc}
                  alt={s.alt}
                  fill
                  sizes="100vw"
                  priority={i === 0}
                  className="object-cover"
                />
              ) : (
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  sizes="100vw"
                  priority={i === 0}
                  className="bg-crema-50 object-contain"
                />
              )}
            </Link>
          ))}
        </div>

        {/* Versión escritorio/tablet: banner panorámico original. */}
        <div className="relative hidden aspect-[4/1] w-full overflow-hidden sm:block">
          {slides.map((s, i) => (
            <Link
              key={s.src}
              href={s.href}
              aria-hidden={i !== index}
              tabIndex={i === index ? 0 : -1}
              aria-label={`Ver categoría — ${s.label}`}
              className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                i === index ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <Image
                src={s.src}
                alt={s.alt}
                fill
                sizes="100vw"
                priority={i === 0}
                className={`object-cover ${s.pos}`}
              />
            </Link>
          ))}
        </div>

        {/* Flechas */}
        <button
          type="button"
          onClick={prev}
          aria-label="Banner anterior"
          className="absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-carbon shadow-md backdrop-blur transition hover:bg-white sm:left-4 sm:h-10 sm:w-10"
        >
          <ChevronRightIcon width={22} height={22} className="rotate-180" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Banner siguiente"
          className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-carbon shadow-md backdrop-blur transition hover:bg-white sm:right-4 sm:h-10 sm:w-10"
        >
          <ChevronRightIcon width={22} height={22} />
        </button>

        {/* Puntos */}
        <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2 sm:bottom-5">
          {slides.map((s, i) => (
            <button
              key={s.src}
              type="button"
              onClick={() => go(i)}
              aria-label={`Ir al banner ${i + 1}: ${s.label}`}
              aria-current={i === index}
              className={`h-2.5 rounded-full transition-all ${
                i === index
                  ? "w-7 bg-white"
                  : "w-2.5 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
