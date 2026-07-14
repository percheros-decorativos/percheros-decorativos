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
 * Redondea hacia ARRIBA al siguiente mil (nunca al más cercano): así el
 * precio siempre queda limpio en COP y el negocio nunca recibe menos de lo
 * esperado por culpa del redondeo.
 */
function roundToThousand(n: number): number {
  return Math.ceil(n / 1000) * 1000;
}

/**
 * Calcula el total a cobrar para que, después de que Bold descuente su
 * comisión (tarifa% del total + fijo), al comercio le llegue al menos
 * `netAmount` (el redondeo hacia arriba a miles puede dejar unos pocos
 * cientos de pesos de más, nunca de menos).
 *
 *   T = (N + fijo) / (1 - tarifa)
 */
export function grossUpForBold(netAmount: number): BoldGrossUp {
  const raw = (netAmount + BOLD_FEE_FIXED_COP) / (1 - BOLD_FEE_RATE);
  const total = roundToThousand(raw);
  return { total, fee: total - netAmount };
}

/**
 * Markup por artículo: solo la parte porcentual de la comisión (sin el fijo
 * de $900, que es por transacción, no por unidad — se le suma una sola vez
 * a la orden a través del envío, en grossUpForBold). Así el precio que ve
 * el cliente en cada producto ya trae la comisión incluida, como un
 * aumento normal de precio, redondeado a miles para que se vea limpio
 * (ej. 25.888 → 26.000).
 *
 *   P' = P / (1 - tarifa)
 */
export function markupPriceForBold(basePrice: number): number {
  return roundToThousand(basePrice / (1 - BOLD_FEE_RATE));
}
