// Estados posibles de una orden. Vive aparte de actions.ts porque un archivo
// con "use server" solo puede exportar funciones async (los exports que no
// son funciones invalidan todo el módulo de acciones).
export const ORDER_STATUSES = [
  "pending",
  "approved",
  "declined",
  "shipped",
  "delivered",
  "cancelled",
] as const;
