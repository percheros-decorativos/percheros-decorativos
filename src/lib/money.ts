// Formato de moneda colombiana (COP, sin decimales).

const formatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

/** Formatea un entero en pesos a "COP $25.000". */
export function formatCop(value: number): string {
  // Intl produce "$ 25.000"; anteponemos COP para claridad.
  return `COP ${formatter.format(value)}`;
}

const plain = new Intl.NumberFormat("es-CO", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

/** Variante corta "$25.000" para tarjetas (sin espacio). */
export function formatPrice(value: number): string {
  if (!value || value <= 0) return "Consultar";
  return "$" + plain.format(value);
}
