"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRightIcon } from "@/components/ui/icons";

// Slider de servicios: rota los banners de servicio (diseños listos con texto).
// Mismo comportamiento que el HeroSlider: reproducción automática siempre
// activa, con flechas, puntos, swipe y teclado.
// Arte dirigido: versión casi cuadrada diseñada para móvil (mobileSrc) y el
// banner panorámico original desde tablet en adelante — cada uno a su propia
// proporción nativa, sin recortar el texto.

type Slide = {
  src: string;
  mobileSrc: string;
  alt: string;
  href: string;
  label: string;
};

const slides: Slide[] = [
  {
    src: "/img/servicios/servicio-al-cliente.webp",
    mobileSrc: "/img/servicios/mobile/servicio-al-cliente-movil.webp",
    alt: "Servicio al cliente antes, durante y después de la compra",
    href: "/contacto",
    label: "Servicio al Cliente",
  },
  {
    src: "/img/servicios/instalacion.webp",
    mobileSrc: "/img/servicios/mobile/instalacion-movil.webp",
    alt: "Servicio de instalación segura, confiable y con calidad",
    href: "/contacto?asunto=instalacion",
    label: "Instalación",
  },
  {
    src: "/img/servicios/envios.webp",
    mobileSrc: "/img/servicios/mobile/envios-movil.webp",
    alt: "Envíos a cualquier destino de Colombia por empresas de mensajería",
    href: "/contacto?asunto=envios",
    label: "Envíos",
  },
  {
    src: "/img/servicios/formas-de-pago.webp",
    mobileSrc: "/img/servicios/mobile/formas-de-pago-movil.webp",
    alt: "Formas de pago: todos los medios presenciales y digitales",
    href: "/categorias",
    label: "Formas de Pago",
  },
];

const AUTOPLAY_MS = 5000;

export default function ServicesSlider() {
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);
  const count = slides.length;

  const go = useCallback(
    (n: number) => setIndex(() => (n + count) % count),
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
    <div
      className="relative"
      aria-roledescription="carrusel"
      aria-label="Nuestros servicios"
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (dx > 50) prev();
        else if (dx < -50) next();
        touchX.current = null;
      }}
    >
      <div className="relative">
        {/* Móvil: versión casi cuadrada diseñada para pantallas angostas */}
        <div
          className="relative w-full overflow-hidden bg-white sm:hidden"
          style={{ aspectRatio: "852 / 753" }}
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
                src={s.mobileSrc}
                alt={s.alt}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </Link>
          ))}
        </div>

        {/* Tablet/escritorio: banner panorámico original */}
        <div
          className="relative hidden w-full overflow-hidden bg-white sm:block"
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
        </div>

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
