// Tarifas de Bold "Link de pago" (panel de Bold → Tarifas): 3,29% + $900 COP
// por transacción con tarjeta nacional — la más alta entre los medios que
// ofrece el link (PSE y Daviplata cobran 2,89%+$300, tarjeta internacional
// suma 1% extra). El cliente elige el medio de pago ya dentro del checkout
// de Bold, después de generado el cobro, así que se usa esta tarifa "peor
// caso" para el traslado: el comercio nunca recibe menos de lo esperado: si
// el cliente paga por PSE/Daviplata, el margen de sobra es un poco mayor.
//
// No incluye retenciones de impuestos de ley (ReteFuente/ReteICA/ReteIVA):
// Bold las descuenta del giro al comercio, pero la tarifa varía según el
// régimen tributario y el municipio, así que no hay un número fijo para
// trasladarla al precio del cliente.
export const BOLD_FEE_RATE = 0.0329;
export const BOLD_FEE_FIXED_COP = 900;

export interface BoldGrossUp {
  /** Total a cobrarle al cliente (incluye la comisión de Bold). */
  total: number;
  /** Comisión de Bold incluida en ese total. */
  fee: number;
}

/**
 * Redondea hacia ARRIBA al siguiente precio terminado en 900 (precio
 * "psicológico" de vitrina: 24.900, 26.900, etc.), nunca hacia abajo — así
 * el negocio nunca recibe menos de lo esperado por culpa del redondeo.
 */
function roundToCharmPrice(n: number): number {
  const base900 = Math.floor(n / 1000) * 1000 + 900;
  return base900 >= n ? base900 : base900 + 1000;
}

/**
 * Le suma la comisión de Bold (3,29% + $900) directo a un monto — cada
 * artículo, o el envío, lleva su propia comisión completa e independiente
 * (si el pedido tiene 3 artículos, el fijo de $900 se cuenta 3 veces, una
 * por cada uno).
 *
 *   T = N + N×tarifa + fijo
 */
export function grossUpForBold(netAmount: number): BoldGrossUp {
  const raw = netAmount + netAmount * BOLD_FEE_RATE + BOLD_FEE_FIXED_COP;
  const total = roundToCharmPrice(raw);
  return { total, fee: total - netAmount };
}

/** Markup por artículo: mismo cálculo que grossUpForBold, ya redondeado. */
export function markupPriceForBold(basePrice: number): number {
  return grossUpForBold(basePrice).total;
}
