"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown, X } from "lucide-react";

// Mismo patrón desplegable que SalidasCard (home): teaser visible + botón
// circular que expande el detalle con transición de grid-template-rows.
export default function ServiceExpand({
  summary,
  children,
  className = "",
}: {
  summary: string;
  children: ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-4">
      <div className={`flex items-center justify-between gap-3 ${className}`}>
        <p className="font-display text-base font-bold text-madera-900">
          {summary}
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
          <div className="mt-4 border-t border-carbon/10 pt-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
