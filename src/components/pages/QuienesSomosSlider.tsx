"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Mini carrusel de 3 fotos para "Quiénes somos". Los puntos y textos que se
// ven en cada foto ya vienen dibujados dentro de la imagen (arte fijo), así
// que aquí solo se hace el crossfade automático entre ellas.

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

export default function QuienesSomosSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      AUTOPLAY_MS,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="hover-lift relative mx-auto aspect-[2/3] w-full max-w-[240px] overflow-hidden rounded-2xl shadow-lg ring-1 ring-crema-200">
      {slides.map((s, i) => (
        <Image
          key={s.src}
          src={s.src}
          alt={s.alt}
          fill
          sizes="(max-width: 768px) 60vw, 240px"
          className={`object-cover transition-opacity duration-700 ease-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          priority={i === 0}
        />
      ))}
    </div>
  );
}
