"use client";

import { useEffect, useRef } from "react";

const SCRIPT_URL = "https://bold.co/library/ui-kit.js?layout=vertical&type=slider";

/**
 * Widget de medios de pago de Bold. A diferencia de next/script, este script
 * se inserta dentro de un contenedor propio (no al final de <body>, que es
 * donde next/script con strategy lazyOnload/afterInteractive lo pondría sin
 * importar la posición en el JSX) para que aparezca justo debajo del botón
 * de compra.
 */
export default function BoldUiKitWidget() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.innerHTML = "";

    const script = document.createElement("script");
    script.src = SCRIPT_URL;
    container.appendChild(script);
  }, []);

  return (
    <div className="mt-4 flex justify-center">
      <div ref={containerRef} className="scale-125 sm:scale-[1.35]" />
    </div>
  );
}
