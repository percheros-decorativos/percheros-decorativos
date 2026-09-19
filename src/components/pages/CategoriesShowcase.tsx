"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";
import { categoryCaseClass } from "@/lib/format";

interface Cat {
  id: number;
  slug: string;
  name: string;
  imageUrl?: string | null;
}

const VISIBLE_COUNT = 7;

export default function CategoriesShowcase({ categories }: { categories: Cat[] }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? categories : categories.slice(0, VISIBLE_COUNT);
  const hasMore = categories.length > VISIBLE_COUNT;

  return (
    <div
      id="categorias"
      className="-mx-4 mt-10 flex scroll-mt-24 snap-x snap-mandatory gap-x-8 gap-y-6 overflow-x-auto px-4 pb-4 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 sm:pb-0"
    >
      {visible.map((c, i) => (
        <Link
          key={c.id}
          href={`/categoria/${c.slug}`}
          className="group flex w-28 shrink-0 snap-start flex-col items-center gap-3 text-center sm:w-32"
        >
          <span className="relative flex h-28 w-28 items-center justify-center rounded-2xl bg-white shadow-[0_8px_20px_-8px_rgba(0,0,0,0.18)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_14px_28px_-10px_rgba(0,0,0,0.28)] sm:h-32 sm:w-32">
            {c.imageUrl && (
              <Image
                src={c.imageUrl}
                alt={`Isotipo categoría ${c.name}`}
                fill
                sizes="128px"
                quality={90}
                priority={i < 4}
                className="object-contain p-2.5"
              />
            )}
          </span>
          <span
            className={`font-display text-sm font-bold leading-tight text-carbon transition-colors duration-300 group-hover:text-rojo-600 ${categoryCaseClass(c.name)}`}
          >
            {c.name}
          </span>
        </Link>
      ))}
      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="group flex w-28 shrink-0 snap-start flex-col items-center gap-3 text-center sm:w-32"
        >
          <span className="flex h-28 w-28 items-center justify-center rounded-2xl bg-rojo-500 text-white shadow-[0_8px_20px_-8px_rgba(0,0,0,0.18)] transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-rojo-600 group-hover:shadow-[0_14px_28px_-10px_rgba(0,0,0,0.28)] sm:h-32 sm:w-32">
            {expanded ? (
              <ChevronDown className="h-9 w-9 rotate-180 transition-transform duration-300" />
            ) : (
              <ArrowRight className="h-9 w-9 transition-transform duration-300 group-hover:translate-x-0.5" />
            )}
          </span>
          <span className="font-display text-sm font-bold leading-tight text-carbon transition-colors duration-300 group-hover:text-rojo-600">
            {expanded ? "Ver menos" : "Ver todas"}
          </span>
        </button>
      )}
    </div>
  );
}
