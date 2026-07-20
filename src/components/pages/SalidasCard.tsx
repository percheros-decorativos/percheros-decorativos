"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, X } from "lucide-react";

export interface SalidasCardData {
  title: string;
  src: string;
  accent: string;
  boxes: { bg: string; text: string }[];
}

export default function SalidasCard({ title, src, accent, boxes }: SalidasCardData) {
  const [open, setOpen] = useState(false);

  return (
    <div className="hover-lift">
      <Link href="/parcheros" aria-label={`Salidas ${title}`} className="group block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-md">
          <Image
            src={src}
            alt={`Salidas ${title} de la comunidad Parcheros`}
            fill
            sizes="(max-width: 768px) 100vw, 30vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </div>
      </Link>

      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="font-display text-2xl font-black uppercase leading-none tracking-tight">
          <span className={accent}>¡Salidas</span> <span className="text-carbon">{title}!</span>
        </p>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={open ? "Ocultar detalles" : "Ver detalles"}
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white shadow transition-colors duration-200 ${
            open ? "bg-rojo-500" : "bg-carbon"
          }`}
        >
          {open ? <X size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="mt-4 space-y-2">
            {boxes.map((b, i) => (
              <p
                key={i}
                className={`rounded-lg px-4 py-3 text-center text-sm font-semibold text-white ${b.bg}`}
              >
                {b.text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
