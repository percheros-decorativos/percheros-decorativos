"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronRightIcon } from "@/components/ui/icons";

// Mini carrusel de 3 fotos para "Quiénes somos". Los textos y sellos que se
// ven en cada foto ya vienen dibujados dentro de la imagen (arte fijo), así
// que aquí solo se maneja el crossfade y los controles (flechas + puntos).

const slides = [
  {
    src: "/img/quienes/artesanias-1.webp",
    alt: "Emprendimiento colombiano — artesanías de Colombia",
  },
  {
    src: "/img/quienes/artesanias-2.webp",
    alt: "Lugares de Colombia — artesanías con identidad local",
  },
  {
    src: "/img/quienes/artesanias-3.webp",
    alt: "Percheros Decorativos, hecho en Colombia",
  },
];

const AUTOPLAY_MS = 4500;
const count = slides.length;

export default function QuienesSomosSlider() {
  const [index, setIndex] = useState(0);

  const go = useCallback((n: number) => setIndex((n + count) % count), []);
  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  useEffect(() => {
    const id = setInterval(() => go(index + 1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [index, go]);

  return (
    <div
      className="hover-lift group relative mx-auto aspect-[2/3] w-full max-w-[240px] overflow-hidden rounded-2xl shadow-lg ring-1 ring-crema-200"
      aria-roledescription="carrusel"
      aria-label="Percheros Decorativos, artesanía colombiana"
    >
      {slides.map((s, i) => (
        <Image
          key={s.src}
          src={s.src}
          alt={s.alt}
          fill
          sizes="(max-width: 768px) 60vw, 240px"
          aria-hidden={i !== index}
          className={`object-cover transition-opacity duration-700 ease-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          priority={i === 0}
        />
      ))}

      {/* Flechas: sutiles, aparecen con más fuerza al pasar el mouse */}
      <button
        type="button"
        onClick={prev}
        aria-label="Foto anterior"
        className="absolute left-2 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/70 text-carbon opacity-80 shadow-sm backdrop-blur transition hover:bg-white hover:opacity-100 group-hover:opacity-100"
      >
        <ChevronRightIcon width={16} height={16} className="rotate-180" />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Foto siguiente"
        className="absolute right-2 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/70 text-carbon opacity-80 shadow-sm backdrop-blur transition hover:bg-white hover:opacity-100 group-hover:opacity-100"
      >
        <ChevronRightIcon width={16} height={16} />
      </button>

      {/* Puntos */}
      <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={() => go(i)}
            aria-label={`Ir a la foto ${i + 1}`}
            aria-current={i === index}
            className={`h-1.5 rounded-full shadow-sm transition-all ${
              i === index ? "w-5 bg-white" : "w-1.5 bg-white/60 hover:bg-white/85"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
