import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { categoryCaseClass } from "@/lib/format";
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
        <RevealStagger className="-mx-4 mt-10 flex snap-x snap-mandatory gap-x-8 gap-y-6 overflow-x-auto px-4 pb-4 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 sm:pb-0">
          {categories.slice(0, 7).map((c, i) => (
            <RevealItem key={c.id}>
              <Link
                href={`/categoria/${c.slug}`}
                className="group flex w-24 shrink-0 snap-start flex-col items-center gap-3 text-center sm:w-28"
              >
                <span className="relative flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-[0_8px_20px_-8px_rgba(0,0,0,0.18)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_14px_28px_-10px_rgba(0,0,0,0.28)] sm:h-28 sm:w-28">
                  {c.imageUrl && (
                    <Image
                      src={c.imageUrl}
                      alt={`Isotipo categoría ${c.name}`}
                      fill
                      sizes="112px"
                      quality={90}
                      priority={i < 4}
                      className="object-contain p-4"
                    />
                  )}
                </span>
                <span
                  className={`font-display text-sm font-bold leading-tight text-carbon transition-colors duration-300 group-hover:text-rojo-600 ${categoryCaseClass(c.name)}`}
                >
                  {c.name}
                </span>
              </Link>
            </RevealItem>
          ))}
          <RevealItem>
            <Link
              href="/categorias"
              className="group flex w-24 shrink-0 snap-start flex-col items-center gap-3 text-center sm:w-28"
            >
              <span className="flex h-24 w-24 items-center justify-center rounded-full bg-rojo-500 text-white shadow-[0_8px_20px_-8px_rgba(0,0,0,0.18)] transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-rojo-600 group-hover:shadow-[0_14px_28px_-10px_rgba(0,0,0,0.28)] sm:h-28 sm:w-28">
                <ArrowRight className="h-8 w-8 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <span className="font-display text-sm font-bold leading-tight text-carbon transition-colors duration-300 group-hover:text-rojo-600">
                Ver todas
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
              <ButtonLink href="/categorias">
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
                    width={72}
                    height={72}
                    className="h-[72px] w-[72px]"
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
      <section className="bg-carbon">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center">
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-[0.15em] text-rojo-400">
              Hablemos
            </p>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Contáctenos
            </h2>
            <span className="mx-auto mt-3 block h-1 w-16 rounded-full bg-rojo-500" />
            <p className="mx-auto mt-6 max-w-xl text-lg text-white/75">
              Escríbenos y nos contactaremos lo más pronto. ¿Tienes una idea
              para un perchero personalizado?
            </p>
            <ButtonLink href="/contacto" size="lg" className="mt-8">
              ¡Cuéntanos!
            </ButtonLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
