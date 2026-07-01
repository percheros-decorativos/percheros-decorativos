"use client";

import { useEffect, useRef } from "react";

export interface BoldConfig {
  apiKey: string;
  orderId: string;
  amount: number;
  currency: string;
  integritySignature: string;
  description: string;
  redirectionUrl: string;
}

const SCRIPT_URL = "https://checkout.bold.co/library/boldPaymentButton.js";

/**
 * Renderiza el Botón de Pagos oficial de Bold.
 * La librería de Bold detecta el <script data-bold-button> y dibuja el botón.
 */
export default function BoldButton({ config }: { config: BoldConfig }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.innerHTML = "";

    const script = document.createElement("script");
    script.src = SCRIPT_URL;
    script.setAttribute("data-bold-button", "dark-L");
    script.setAttribute("data-api-key", config.apiKey);
    script.setAttribute("data-order-id", config.orderId);
    script.setAttribute("data-amount", String(config.amount));
    script.setAttribute("data-currency", config.currency);
    script.setAttribute("data-integrity-signature", config.integritySignature);
    script.setAttribute("data-description", config.description);
    script.setAttribute("data-redirection-url", config.redirectionUrl);
    container.appendChild(script);
  }, [config]);

  const configured =
    config.apiKey && !config.apiKey.startsWith("LLAVE_");

  return (
    <div>
      <div ref={containerRef} className="flex justify-center" />
      {!configured && (
        <p className="mt-3 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
          ⚠️ Modo prueba: configura tus llaves de Bold en las variables de
          entorno (<code>NEXT_PUBLIC_BOLD_API_KEY</code> y{" "}
          <code>BOLD_SECRET_KEY</code>) para activar el pago real.
        </p>
      )}
    </div>
  );
}
