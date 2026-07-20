// Helpers de formato (sin dependencias de Node — seguros para client components).

const cop = new Intl.NumberFormat("es-CO", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

/** 25000 -> "$25.000". Devuelve "Consultar precio" si es 0/inválido. */
export function formatCOP(amount?: number | null): string {
  if (!amount || amount <= 0) return "Consultar precio";
  return "$" + cop.format(amount);
}

/** Igual que formatCOP pero con prefijo COP: "COP $25.000". */
export function formatCOPLong(amount?: number | null): string {
  if (!amount || amount <= 0) return "Consultar precio";
  return "COP $" + cop.format(amount);
}

/**
 * "DeDios" se muestra como "DeDIOS" (mayúsculas solo en "DIOS"), una
 * capitalización especial que un `text-transform: uppercase` por CSS
 * rompería. Esta clase decide cuándo omitir esa transformación para que el
 * nombre se muestre tal cual viene, en vez de "uppercase" para el resto.
 */
export function categoryCaseClass(name?: string | null): string {
  return name?.toUpperCase() === "DEDIOS" ? "normal-case" : "uppercase";
}
