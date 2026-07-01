// Configuracion central del sitio. Un solo lugar para datos de marca, contacto,
// navegacion y SEO por defecto.

export const site = {
  name: "Percheros Decorativos",
  shortName: "Percheros Decorativos",
  legalName: "Percheros Decorativos",
  description:
    "Emprendimiento artesanal colombiano. Fabricamos percheros decorativos en madera y MDF: útiles, funcionales y decorativos, con diseños y herrajes para organizar todo el hogar.",
  slogan: "Útiles, Funcionales y Decorativos",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  locale: "es_CO",
  currency: "COP",
  email: "info@percherosdecorativos.com",
  phone: "+57 318 6044049",
  phoneDisplay: "318 6044049",
  whatsapp: "573186044049", // sin + para enlaces wa.me
  country: "Colombia",
  city: "Colombia",
  foundingYear: 2025,
  social: {
    instagram: "https://instagram.com/percherosdecorativos",
    facebook: "https://facebook.com/percherosdecorativos",
    tiktok: "https://tiktok.com/@percherosdecorativos",
    whatsapp: "https://wa.me/573186044049",
  },
} as const;

// Navegacion principal (header)
export const mainNav = [
  { label: "Inicio", href: "/" },
  { label: "Categorías", href: "/categorias" },
  { label: "Quiénes Somos", href: "/quienes-somos" },
  { label: "Galería", href: "/galeria" },
  { label: "Parcheros", href: "/parcheros" },
  { label: "Obras Sociales", href: "/obras-sociales" },
  { label: "Contáctenos", href: "/contacto" },
] as const;

// Bloques de servicio (footer / home)
export const servicios = [
  {
    title: "Servicio al Cliente",
    text: "Asistencia a nuestros clientes antes, durante y después de la compra. Nuestro objetivo: una experiencia positiva con nuestra marca.",
    cta: "Contáctanos",
    href: "/contacto",
    icon: "support",
  },
  {
    title: "Instalación",
    text: "Te ofrecemos nuestro servicio de instalación, de forma segura y confiable, con calidad y durabilidad.",
    cta: "Programa tu instalación",
    href: "/contacto?asunto=instalacion",
    icon: "install",
  },
  {
    title: "Envíos",
    text: "Despachamos a cualquier destino por las diferentes empresas de mensajería y mercancías.",
    cta: "Rastrea tu envío",
    href: "/contacto?asunto=envios",
    icon: "shipping",
  },
  {
    title: "Formas de Pago",
    text: "Para tu comodidad aceptamos todos los medios de pago digitales con Bold: tarjetas, PSE, Nequi y más.",
    cta: "Paga fácil tu pedido",
    href: "/categorias",
    icon: "payment",
  },
] as const;
