"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, X } from "lucide-react";

export interface SalidasCardData {
  title: string;
  src: string;
  accent: string;
  texts: string[];
}

export default function SalidasCard({ title, src, accent, texts }: SalidasCardData) {
  const [open, setOpen] = useState(false);

  return (
    <div className="hover-lift overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-carbon/5">
      <Link href="/parcheros" aria-label={`Salidas ${title}`} className="group block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={src}
            alt={`Salidas ${title} de la comunidad Parcheros`}
            fill
            sizes="(max-width: 768px) 100vw, 30vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </div>
      </Link>

      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
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
            <div className="mt-4 space-y-3 border-t border-carbon/10 pt-4">
              {texts.map((t, i) => (
                <p key={i} className="text-sm leading-relaxed text-carbon/80">
                  {t}
                </p>
              ))}
              <Link
                href="/parcheros"
                className="inline-block rounded-md bg-rojo-500 px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-rojo-600"
              >
                Leer más
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
