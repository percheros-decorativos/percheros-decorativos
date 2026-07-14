// Costo de envío por ciudad. Bogotá tiene tarifa preferencial; el resto del
// país paga tarifa nacional. Compartido entre el checkout (cliente, para
// mostrar el estimado) y la API de órdenes (servidor, fuente de verdad del
// cobro real).
export const SHIPPING_BOGOTA_COP = 9750;
export const SHIPPING_NACIONAL_COP = 17000;

// Quita tildes: descompone en NFD (letra + marca de acento) y elimina las
// marcas diacríticas (rango Unicode ̀-ͯ).
function normalize(city: string): string {
  return city
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

export function shippingCostForCity(city: string): number {
  const n = normalize(city);
  if (n.includes("bogota")) return SHIPPING_BOGOTA_COP;
  return SHIPPING_NACIONAL_COP;
}
