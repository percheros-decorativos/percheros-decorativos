"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Slider simple de banners panorámicos a ancho completo: crossfade
// automático entre varias piezas, cada una con su propio destino.

export interface BannerSlide {
  href: string;
  src: string;
  alt: string;
}

const AUTOPLAY_MS = 4500;

export default function BannerSlider({
  slides,
  ratio,
}: {
  slides: BannerSlide[];
  ratio: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      AUTOPLAY_MS,
    );
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <section>
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: ratio }}>
        {slides.map((s, i) => (
          <Link
            key={s.href}
            href={s.href}
            aria-hidden={i !== index}
            tabIndex={i === index ? 0 : -1}
            aria-label={s.alt}
            className={`group absolute inset-0 block overflow-hidden transition-opacity duration-700 ease-out ${
              i === index ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <Image
              src={s.src}
              alt={s.alt}
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
