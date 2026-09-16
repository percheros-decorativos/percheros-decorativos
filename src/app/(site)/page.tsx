import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import CategoryCard from "@/components/ui/CategoryCard";
import SectionTitle from "@/components/ui/SectionTitle";
import JsonLd from "@/components/JsonLd";
import Reveal, { RevealStagger, RevealItem } from "@/components/ui/Reveal";
import { ArrowRight } from "lucide-react";
import Marquee from "@/components/ui/Marquee";
import HeroSlider from "@/components/pages/HeroSlider";
import ServicesSlider from "@/components/pages/ServicesSlider";
import ProductsSlider from "@/components/pages/ProductsSlider";
import QuienesSomosSlider from "@/components/pages/QuienesSomosSlider";
import BannerSlider from "@/components/pages/BannerSlider";
import { getCategories, getFeaturedProducts } from "@/lib/queries";

// Comunidad: Parcheros, Comunidad (obras sociales), Clasificados Sociales y Aliados.
const comunidad = [
  {
    title: "Parcheros",
    text: "Salidas moteras, bike y mascotas para vivir la aventura en comunidad.",
    icon: "icon-parcheros",
    href: "/servicios",
  },
  {
    title: "Comunidad",
    text: "Apoyamos a niños, adultos mayores y personas en situación de vulnerabilidad.",
    icon: "icon-obras-sociales",
    href: "/comunidad",
  },
  {
    title: "Clasificados Sociales",
    text: "Ayuda solidaria: conecta con quien necesita colaboración, sin ánimo de lucro.",
    icon: "icon-clasificados",
    href: "/comunidad#clasificados",
  },
  {
    title: "Aliados Comerciales",
    text: "Descubre emprendimientos y negocios aliados de nuestra red de apoyo.",
    icon: "icon-aliados",
    href: "/aliados",
  },
];

export const metadata: Metadata = {
  title: {
    absolute: "Percheros Decorativos artesanales en madera y MDF | Colombia",
  },
  description:
    "Percheros decorativos hechos a mano en madera y MDF: útiles, funcionales y decorativos para organizar tu hogar. Envío a toda Colombia y pago seguro con Bold.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const [categories, featured] = await Promise.all([
    getCategories(),
    getFeaturedProducts(12),
  ]);

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿De qué materiales están hechos los percheros?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Nuestros percheros se fabrican en madera y/o MDF, con impresión en vinilo adhesivo full color y herrajes metálicos de diferentes referencias.",
        },
      },
      {
        "@type": "Question",
        name: "¿Hacen envíos a todo Colombia?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí. Despachamos a cualquier destino del país a través de las diferentes empresas de mensajería y mercancías.",
        },
      },
      {
        "@type": "Question",
        name: "¿Qué medios de pago aceptan?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Aceptamos todos los medios de pago digitales con la pasarela Bold: tarjetas de crédito y débito, PSE, Nequi y más.",
        },
      },
      {
        "@type": "Question",
        name: "¿Puedo pedir un perchero personalizado?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Claro. Fabricamos percheros personalizados con nombres, fechas, frases o el logo de tu empresa. Contáctanos para cotizar tu diseño.",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={faqLd} />

      <h1 className="sr-only">
        Percheros decorativos artesanales en madera y MDF — útiles, funcionales y
        decorativos, hechos a mano en Colombia
      </h1>
      <HeroSlider />
      <Marquee />

      {/* ===================== CATEGORÍAS ===================== */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <Reveal>
          <SectionTitle eyebrow="Explora">Nuestras categorías</SectionTitle>
        </Reveal>
        <RevealStagger className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {categories.slice(0, 7).map((c, i) => (
            <RevealItem key={c.id}>
              <CategoryCard category={c} priority={i < 4} />
            </RevealItem>
          ))}
          <RevealItem>
            <Link
              href="/categorias"
              className="group flex h-full flex-col items-center justify-center gap-4 rounded-2xl border-2 border-rojo-500 bg-rojo-500 p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-rojo-600 hover:shadow-lg"
            >
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/15 text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-rojo-600">
                <ArrowRight className="h-9 w-9 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <span>
                <span className="block font-display text-xl font-extrabold uppercase tracking-tight text-white">
                  Ver todas
                </span>
                <span className="mt-1 block text-sm font-medium text-white/80">
                  Todas las categorías
                </span>
              </span>
            </Link>
          </RevealItem>
        </RevealStagger>
      </section>

      {/* ===================== DESTACADOS ===================== */}
      {featured.length > 0 && (
        <section className="bg-crema-50">
          <div className="mx-auto max-w-7xl px-4 py-16">
            <Reveal>
              <SectionTitle eyebrow="Catálogo">Encuentra tu perchero</SectionTitle>
            </Reveal>
            <Reveal>
              <div className="mt-8">
                <ProductsSlider products={featured} />
              </div>
            </Reveal>
            <div className="mt-10 text-center">
              <ButtonLink href="/categorias" variant="outline">
                Ver todo el catálogo
              </ButtonLink>
            </div>
          </div>
        </section>
      )}

      {/* ===================== QUIÉNES SOMOS ===================== */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <Reveal>
          <SectionTitle eyebrow="Nuestra esencia">Quiénes somos</SectionTitle>
        </Reveal>
        <div className="mt-8 flex flex-col items-center justify-center gap-10 md:flex-row md:gap-20 lg:gap-28">
          <Reveal direction="right" className="w-full md:max-w-xl">
            <p className="text-center text-lg leading-relaxed text-carbon">
              <strong className="text-rojo-600">Percheros Decorativos</strong> es
              un Emprendimiento Artesanal; ofrecemos productos{" "}
              <strong className="text-rojo-600">
                Útiles, Funcionales y Decorativos
              </strong>
              , fabricados en madera de re-origen y/o MDF, con diferentes
              diseños y herrajes,
              para una mejor{" "}
              <strong className="text-rojo-600">organización</strong> en todo el
              hogar.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <span className="inline-flex items-center gap-2.5 rounded-md bg-carbon px-5 py-3 text-sm font-bold uppercase tracking-wide text-white">
                Emprendimiento{" "}
                <span
                  className="font-script text-xl normal-case leading-none tracking-normal"
                >
                  Artesanal
                </span>
              </span>
              <Image
                src="/img/badges/made-in-colombia.webp"
                alt="Made in Colombia"
                width={64}
                height={64}
                className="h-16 w-16 object-contain"
              />
              <Image
                src="/img/badges/artesanias-colombia.webp"
                alt="Artesanías de Colombia"
                width={120}
                height={64}
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="mt-2 text-center font-display text-sm font-extrabold uppercase text-rojo-600">
              100% Colombiano
            </p>
            <div className="text-center">
              <ButtonLink href="/quienes-somos" className="mt-6">
                Conoce nuestra historia
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal direction="left" className="w-full max-w-[280px] shrink-0">
            <QuienesSomosSlider />
          </Reveal>
        </div>
      </section>

      {/* ===================== SERVICIOS ===================== */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <Reveal>
            <SectionTitle eyebrow="Cómo te acompañamos">Nuestros servicios</SectionTitle>
            <p className="mx-auto mt-4 max-w-2xl text-center text-gris">
              Te acompañamos antes, durante y después de tu compra
              <br />
              Envíos a toda Colombia
            </p>
          </Reveal>
        </div>
        <Reveal>
          <div className="mt-8">
            <ServicesSlider />
          </div>
        </Reveal>
        <RevealStagger className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-6 px-4 sm:grid-cols-4 sm:gap-4">
          {[
            { slug: "servicio-al-cliente", label: "Servicio al Cliente", href: "/contacto", color: "#005f2c", w: 247, h: 320 },
            { slug: "instalacion", label: "Instalación", href: "/contacto?asunto=instalacion", color: "#d24000", w: 320, h: 320 },
            { slug: "envios", label: "Envíos", href: "/contacto?asunto=envios", color: "#47372a", w: 320, h: 190 },
            { slug: "formas-de-pago", label: "Formas de Pago", href: "/categorias", color: "#056daa", w: 184, h: 320 },
          ].map((s) => (
            <RevealItem key={s.slug}>
              <Link
                href={s.href}
                className="group flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1"
              >
                <span className="relative flex h-24 w-full items-end justify-center sm:h-28">
                  <Image
                    src={`/img/servicios/iconos/${s.slug}.webp`}
                    alt=""
                    width={s.w}
                    height={s.h}
                    className="h-auto max-h-full w-auto max-w-full object-contain"
                  />
                </span>
                <span
                  className="mt-3 whitespace-nowrap font-display text-xs font-extrabold uppercase tracking-tight sm:text-sm"
                  style={{ color: s.color }}
                >
                  {s.label}
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealStagger>
      </section>

      {/* ===================== BANNER HOGAR / DEDIOS (slider) ===================== */}
      <BannerSlider
        ratio="1800 / 542"
        slides={[
          {
            href: "/categoria/hogar",
            src: "/img/decorativas/hogar.webp",
            alt: "Percheros decorativos para el hogar con paisajes de ciudad",
          },
          {
            href: "/categoria/dedios",
            src: "/img/decorativas/dedios.webp",
            alt: "Percheros DeDIOS con imágenes de fe y esperanza",
          },
        ]}
      />

      {/* ===================== COMUNIDAD ===================== */}
      <section className="bg-crema-50">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <Reveal>
            <SectionTitle eyebrow="Comunidad">
              Más que percheros
            </SectionTitle>
            <p className="mx-auto mt-2 max-w-2xl text-center text-carbon/75">
              Salidas, obras sociales, ayuda solidaria y aliados: así vivimos
              la comunidad Percheros Decorativos.
            </p>
          </Reveal>
          <RevealStagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {comunidad.map((c) => (
              <RevealItem key={c.title}>
                <div className="flex h-full flex-col items-center rounded-2xl bg-white p-6 text-center shadow-[0_8px_24px_-8px_rgba(0,0,0,0.15)] transition-shadow duration-300 hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.2)]">
                  <Image
                    src={`/img/comunidad/${c.icon}.webp`}
                    alt=""
                    width={56}
                    height={56}
                    className="h-14 w-14"
                  />
                  <h3 className="mt-3 font-display text-lg font-semibold text-madera-800">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm text-carbon/70">{c.text}</p>
                  <Link
                    href={c.href}
                    className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-bold text-rojo-600 hover:text-rojo-700 hover:underline"
                  >
                    Más info <ArrowRight size={14} />
                  </Link>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      {/* ===================== CONTACTO CTA ===================== */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <Reveal>
          <SectionTitle eyebrow="Hablemos">Contáctenos</SectionTitle>
          <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-rojo-100 bg-crema-50 p-8 text-center">
            <p className="text-lg text-carbon">
              Escríbenos y nos contactaremos lo más pronto. ¿Tienes una idea
              para un perchero personalizado?
            </p>
            <ButtonLink href="/contacto" size="lg" className="mt-6">
              ¡Cuéntanos!
            </ButtonLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
