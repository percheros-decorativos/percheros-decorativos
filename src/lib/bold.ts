import "server-only";
import crypto from "crypto";

// Integracion con la pasarela de pago Bold (https://bold.co)
// El "Boton de Pagos" de Bold requiere una firma de integridad calculada en el
// servidor con la LLAVE SECRETA (que nunca debe exponerse al cliente).
//
// Firma = SHA-256( orderId + amount + currency + llaveSecreta )  -> hex
// Docs: https://developers.bold.co/

export const BOLD_SCRIPT_URL =
  "https://checkout.bold.co/library/boldPaymentButton.js";

export interface BoldSignatureInput {
  orderId: string;
  /** Monto entero en la unidad minima de la moneda (COP no usa decimales). */
  amount: number;
  currency: string;
}

export function boldIntegritySignature({
  orderId,
  amount,
  currency,
}: BoldSignatureInput): string {
  const secret = process.env.BOLD_SECRET_KEY;
  if (!secret) {
    throw new Error("Falta BOLD_SECRET_KEY en las variables de entorno.");
  }
  const chain = `${orderId}${amount}${currency}${secret}`;
  return crypto.createHash("sha256").update(chain, "utf8").digest("hex");
}

export interface BoldButtonConfig {
  apiKey: string; // llave de identidad (publica)
  orderId: string;
  amount: number;
  currency: string;
  integritySignature: string;
  description: string;
  redirectionUrl: string;
}

/** Construye la configuracion publica para el boton de Bold en el cliente. */
export function buildBoldConfig(input: BoldSignatureInput & {
  description: string;
  redirectionUrl: string;
}): BoldButtonConfig {
  const apiKey = process.env.NEXT_PUBLIC_BOLD_API_KEY || "";
  return {
    apiKey,
    orderId: input.orderId,
    amount: input.amount,
    currency: input.currency,
    integritySignature: boldIntegritySignature(input),
    description: input.description,
    redirectionUrl: input.redirectionUrl,
  };
}
