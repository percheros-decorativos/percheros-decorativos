import type { UIProduct } from "@/lib/queries";

// Genera contenido SEO/GEO único por producto a partir de sus atributos.
// (Patrón inspirado en scentualbliss: narrativa + FAQs específicas.)

export function buildNarrative(p: UIProduct): string[] {
  const cat = (p.category?.name || "").toLowerCase();
  return [
    `${p.name} es un perchero decorativo de la categoría ${cat}, fabricado a mano en madera y/o MDF. ${p.description}`,
    `Cada pieza se elabora con ${p.materials.toLowerCase()} Los herrajes (${p.hardware.toLowerCase()}) están pensados para soportar el uso diario y mantener tus accesorios livianos siempre a la mano.`,
    `Con medidas de ${p.dimensions}, ${p.name} es ideal para la entrada, la cocina, la habitación o cualquier rincón donde quieras organizar con estilo. Es a la vez útil, funcional y decorativo: un detalle artesanal que transforma la pared.`,
    `Incluye ${p.warranty} de garantía y, con los cuidados adecuados, te acompañará por años aportando orden y decoración a tu hogar. Lo despachamos a todo Colombia con pago seguro mediante Bold.`,
  ];
}

export interface FAQ {
  q: string;
  a: string;
}

export function buildFAQs(p: UIProduct): FAQ[] {
  const cat = (p.category?.name || "").toLowerCase();
  return [
    {
      q: `¿Cómo se instala ${p.name}?`,
      a: `Instalar ${p.name} es sencillo: marca los puntos con un nivel, perfora la pared, coloca los chazos y atornilla la base. Recomendamos una altura de 1,60 m a 1,75 m del piso. Si prefieres, ofrecemos servicio de instalación segura y confiable.`,
    },
    {
      q: `¿De qué material está hecho ${p.name}?`,
      a: `${p.name} está fabricado con ${p.materials.toLowerCase()} Esto le da resistencia, un acabado de calidad y un estilo artesanal único.`,
    },
    {
      q: `¿Qué medidas tiene ${p.name}?`,
      a: `Las medidas de ${p.name} son ${p.dimensions}. Es un tamaño ideal para colgar accesorios livianos sin ocupar demasiado espacio en la pared.`,
    },
    {
      q: `¿Cuántos ganchos o herrajes trae?`,
      a: `${p.name} incluye: ${p.hardware}. Son herrajes metálicos resistentes, perfectos para llaves, bolsos, gorras, correas y otros accesorios livianos.`,
    },
    {
      q: `¿${p.name} tiene garantía?`,
      a: `Sí. ${p.name} cuenta con ${p.warranty} de garantía. Además, si tienes algún inconveniente con tu pedido, contáctanos y te ayudamos.`,
    },
    {
      q: `¿Hacen envíos de ${p.name} a toda Colombia?`,
      a: `Sí, despachamos ${p.name} a cualquier ciudad de Colombia a través de las diferentes empresas de mensajería, con seguimiento de tu envío.`,
    },
    {
      q: `¿Qué puedo colgar en un perchero ${cat}?`,
      a: `Está pensado para accesorios livianos: llaves, bolsos pequeños, gorras, correas, paños o adornos. Evita colgar objetos muy pesados para conservar los herrajes en óptimo estado.`,
    },
    {
      q: `¿Puedo pedir ${p.name} personalizado?`,
      a: `¡Claro! Fabricamos percheros personalizados con nombres, fechas, frases o el logo de tu empresa. Escríbenos para cotizar tu diseño a la medida.`,
    },
  ];
}

/** Keywords programáticas para el <head>. */
export function buildKeywords(p: UIProduct): string[] {
  const cat = (p.category?.name || "").toLowerCase();
  return [
    p.name,
    `comprar ${p.name}`,
    `${p.name} precio`,
    `perchero ${cat}`,
    `percheros ${cat}`,
    "perchero decorativo",
    "perchero en madera",
    "perchero de pared",
    "percheros Colombia",
    "organizador de pared",
  ];
}
