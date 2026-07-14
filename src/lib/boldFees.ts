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
 * Calcula el total a cobrar para que, después de que Bold descuente su
 * comisión (tarifa% del total + fijo), el comercio reciba exactamente
 * `netAmount`.
 *
 *   T = (N + fijo) / (1 - tarifa)
 *
 * Se redondea hacia arriba (COP no tiene centavos) para no perder margen
 * por el redondeo.
 */
export function grossUpForBold(netAmount: number): BoldGrossUp {
  const total = Math.ceil((netAmount + BOLD_FEE_FIXED_COP) / (1 - BOLD_FEE_RATE));
  return { total, fee: total - netAmount };
}
