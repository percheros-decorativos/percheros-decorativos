// Guías de contenido (SEO informacional). Contenido único y útil por página.

export interface GuiaSection {
  h2: string;
  body: string[];
}

export interface Guia {
  slug: string;
  title: string;
  description: string;
  intro: string;
  sections: GuiaSection[];
  faq: { q: string; a: string }[];
}

export const guias: Guia[] = [
  {
    slug: "como-instalar-un-perchero",
    title: "Cómo instalar un perchero decorativo paso a paso",
    description:
      "Guía práctica para instalar un perchero de pared en madera o MDF de forma segura: herramientas, altura recomendada y consejos según el tipo de muro.",
    intro:
      "Instalar un perchero decorativo es sencillo si sigues unos pasos básicos. Aquí te explicamos cómo hacerlo de forma segura y duradera, ya sea en muro de concreto, ladrillo o drywall.",
    sections: [
      {
        h2: "Herramientas que necesitas",
        body: [
          "Para una instalación firme necesitarás un taladro, brocas adecuadas al tipo de pared, chazos o anclajes, tornillos, un nivel y un lápiz para marcar.",
          "Si tu pared es de drywall, usa anclajes tipo mariposa para soportar mejor el peso de los accesorios.",
        ],
      },
      {
        h2: "Altura recomendada",
        body: [
          "La altura ideal de un perchero de pared suele estar entre 1,60 m y 1,75 m del piso, según la estatura de quienes lo usarán y el lugar (entrada, cocina, baño o habitación).",
          "Para percheros de niños, baja la altura a 1,10 m – 1,30 m para que les sea cómodo.",
        ],
      },
      {
        h2: "Paso a paso",
        body: [
          "1) Marca con lápiz los puntos de perforación usando el nivel para que quede recto. 2) Perfora e inserta los chazos. 3) Atornilla la base del perchero. 4) Verifica que quede firme antes de colgar tus accesorios.",
          "Nuestros percheros incluyen herrajes metálicos resistentes; evita colgar objetos que excedan el peso recomendado para cada referencia.",
        ],
      },
    ],
    faq: [
      {
        q: "¿Cuánto peso soporta un perchero decorativo?",
        a: "Depende de la referencia y los herrajes, pero están diseñados para accesorios livianos como llaves, bolsos, gorras o correas.",
      },
      {
        q: "¿Ofrecen servicio de instalación?",
        a: "Sí, ofrecemos instalación segura y confiable. Escríbenos para coordinarla.",
      },
    ],
  },
  {
    slug: "percheros-en-madera-vs-mdf",
    title: "Percheros en madera vs MDF: ¿cuál elegir?",
    description:
      "Comparativa entre percheros en madera y MDF: resistencia, acabado, precio y usos. Te ayudamos a elegir el material ideal para tu hogar.",
    intro:
      "Tanto la madera como el MDF son excelentes materiales para percheros decorativos. Cada uno tiene ventajas según el uso, el presupuesto y el estilo que buscas.",
    sections: [
      {
        h2: "Madera",
        body: [
          "La madera aporta calidez, durabilidad y un acabado natural único. Es ideal para piezas que buscan resaltar la veta y el carácter artesanal.",
        ],
      },
      {
        h2: "MDF",
        body: [
          "El MDF ofrece una superficie lisa y uniforme, perfecta para impresión en vinilo adhesivo full color. Es estable, económico y permite diseños muy detallados.",
        ],
      },
      {
        h2: "¿Cuál elegir?",
        body: [
          "Si priorizas el acabado natural y la durabilidad, elige madera. Si buscas diseños coloridos, gráficos o personalizados a buen precio, el MDF es una gran opción.",
          "En Percheros Decorativos trabajamos ambos materiales con herrajes metálicos de distintas referencias.",
        ],
      },
    ],
    faq: [
      {
        q: "¿El MDF es resistente a la humedad?",
        a: "El MDF estándar no es ideal para zonas muy húmedas. Para baños o exteriores cubiertos recomendamos referencias en madera o con tratamiento.",
      },
    ],
  },
  {
    slug: "ideas-percheros-para-organizar-el-hogar",
    title: "10 ideas de percheros para organizar el hogar",
    description:
      "Inspírate con 10 ideas creativas para usar percheros decorativos en la entrada, cocina, baño, habitación infantil y más. Organiza con estilo.",
    intro:
      "Un perchero no solo organiza: también decora. Aquí tienes 10 ideas para sacarle el máximo provecho en cada espacio del hogar.",
    sections: [
      {
        h2: "Entrada y recibidor",
        body: [
          "Coloca un perchero junto a la puerta para llaves, bolsos y abrigos. Un diseño con paisaje urbano o natural le da la bienvenida a tus visitas.",
        ],
      },
      {
        h2: "Cocina y zona de mascotas",
        body: [
          "Usa percheros para colgar paños, delantales o las correas y juguetes de tu mascota. Los diseños con huellas o caritas son ideales.",
        ],
      },
      {
        h2: "Habitaciones y espacios temáticos",
        body: [
          "Para los amantes de la música, las motos o la bici, hay percheros temáticos que combinan organización y personalidad.",
        ],
      },
    ],
    faq: [
      {
        q: "¿Puedo pedir un diseño personalizado?",
        a: "Sí, fabricamos percheros personalizados con nombres, fechas, frases o el logo de tu empresa.",
      },
    ],
  },
  {
    slug: "como-elegir-un-perchero-decorativo",
    title: "Cómo elegir el perchero decorativo ideal",
    description:
      "Tips para elegir el perchero decorativo perfecto según el espacio, el número de ganchos, el estilo y el material. Guía rápida y práctica.",
    intro:
      "Elegir el perchero correcto depende de dónde lo vas a usar, cuántos accesorios quieres colgar y el estilo de tu hogar. Te lo resumimos.",
    sections: [
      {
        h2: "Define el espacio y el uso",
        body: [
          "Mide la pared disponible y piensa qué colgarás. Para muchos accesorios, elige un perchero con más ganchos o un mural.",
        ],
      },
      {
        h2: "Escoge el estilo",
        body: [
          "Desde paisajes y temáticas (mascotas, moteros, bike, guitarras) hasta diseños religiosos o personalizados: hay un perchero para cada gusto.",
        ],
      },
    ],
    faq: [
      {
        q: "¿Tienen garantía los percheros?",
        a: "Sí, la mayoría de nuestros productos incluye 6 meses de garantía.",
      },
    ],
  },
];

export function getGuia(slug: string): Guia | undefined {
  return guias.find((g) => g.slug === slug);
}
