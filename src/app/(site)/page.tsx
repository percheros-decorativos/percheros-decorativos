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
import { stock } from "@/lib/stock";

// Banners decorativos de categoría (diseños listos con logo): franjas a ancho
// completo. Cuando hay una versión vertical dedicada para móvil (mobileSrc)
// se usa esa en teléfonos y el banner panorámico desde tablet en adelante;
// si no, el banner panorámico se muestra a su proporción nativa siempre.
function BannerDivider({
  href,
  src,
  mobileSrc,
  alt,
  ratio,
}: {
  href: string;
  src: string;
  mobileSrc?: string;
  alt: string;
  ratio: string;
}) {
  const img = (imgSrc: string) => (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      sizes="100vw"
      className="object-cover"
    />
  );

  return (
    <section>
      <Reveal>
        <Link
          href={href}
          aria-label={alt}
          className="group block overflow-hidden"
        >
          {mobileSrc ? (
            <>
              <div className="relative aspect-[5/7] w-full sm:hidden">
                {img(mobileSrc)}
              </div>
              <div
                className="relative hidden w-full sm:block"
                style={{ aspectRatio: ratio }}
              >
                {img(src)}
              </div>
            </>
          ) : (
            <div className="relative w-full" style={{ aspectRatio: ratio }}>
              {img(src)}
            </div>
          )}
        </Link>
      </Reveal>
    </section>
  );
}

// Salidas de la comunidad Parcheros.
const salidas = [
  {
    title: "Moteras",
    src: "/img/parcheros/salidas-moteras.webp",
    accent: "text-[#c8703a]",
    boxes: [
      {
        bg: "bg-[#c8703a]",
        text: "El objetivo de las salidas moter@s es vivir la pasión por la libertad y las actividades relacionadas con las motocicletas.",
      },
      {
        bg: "bg-[#dba172]",
        text: "Fomentando siempre la seguridad, solidaridad, respeto y colaboración.",
      },
    ],
  },
  {
    title: "Bike",
    src: "/img/parcheros/salidas-bikes.webp",
    accent: "text-[#2f9fd1]",
    boxes: [
      {
        bg: "bg-[#2f9fd1]",
        text: "El objetivo de las salidas MTB (Mountain Bike) es compartir la pasión por la bicicleta, la cultura bici y salir a rodar por caminos de trocha y montaña.",
      },
    ],
  },
  {
    title: "Mascotas",
    src: "/img/parcheros/salidas-mascotas.webp",
    accent: "text-[#4a8f3c]",
    boxes: [
      {
        bg: "bg-[#4a8f3c]",
        text: "La finalidad de las salidas es caminar y compartir con nuestras mascotas.",
      },
      {
        bg: "bg-[#7ab86a]",
        text: "En un espacio diferente acompañados de la naturaleza.",
      },
    ],
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
          <Reveal direction="right" className="w-full md:max-w-md">
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
              <span className="flex items-baseline gap-1.5 rounded-md bg-carbon px-4 py-2 text-sm font-bold uppercase tracking-wide text-white">
                Emprendimiento{" "}
                <span
                  className="text-lg normal-case tracking-normal"
                  style={{ fontFamily: '"Chiller", var(--font-script), cursive' }}
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
          <Reveal direction="left" className="w-full max-w-[240px] shrink-0">
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

      {/* ===================== PARCHEROS ===================== */}
      <section className="bg-crema-50">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <Reveal>
            <SectionTitle eyebrow="Comunidad">Parcheros</SectionTitle>
            <p
              className="mt-6 text-center text-3xl font-bold italic text-rojo-600 sm:text-4xl"
              style={{ fontFamily: '"Calibri", sans-serif' }}
            >
              ¡Únete a cualquiera de nuestras salidas según tu pasión y desparche!
            </p>
          </Reveal>
          <RevealStagger className="mt-8 grid gap-8 md:grid-cols-3">
            {salidas.map((s) => (
              <RevealItem key={s.title}>
                <Link href="/parcheros" aria-label={s.title} className="hover-lift group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-md">
                    <Image
                      src={s.src}
                      alt={`Salidas ${s.title} de la comunidad Parcheros`}
                      fill
                      sizes="(max-width: 768px) 100vw, 30vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <p className="mt-4 text-center font-display text-2xl font-black uppercase leading-none tracking-tight">
                    <span className={s.accent}>¡Salidas</span>{" "}
                    <span className="text-carbon">{s.title}!</span>
                  </p>
                  <div className="mt-4 space-y-2">
                    {s.boxes.map((b, i) => (
                      <p
                        key={i}
                        className={`rounded-lg px-4 py-3 text-center text-sm font-semibold text-white ${b.bg}`}
                      >
                        {b.text}
                      </p>
                    ))}
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealStagger>
          <div className="mt-8 text-center">
            <ButtonLink href="/parcheros">Quiero unirme</ButtonLink>
          </div>
        </div>
      </section>

      {/* ===================== OBRAS SOCIALES ===================== */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <Reveal>
          <SectionTitle eyebrow="Compromiso">Obras sociales</SectionTitle>
        </Reveal>
        <div className="mt-8 grid items-center gap-8 md:grid-cols-2">
          <Reveal direction="right">
            <div className="grid grid-cols-2 gap-4">
              <div className="hover-lift relative aspect-[3/4] overflow-hidden rounded-2xl shadow-md ring-1 ring-crema-200">
                <Image
                  src="/img/obras/obras-sociales-1.webp"
                  alt="Obra social con niños en situación de vulnerabilidad"
                  fill
                  sizes="(max-width: 768px) 50vw, 22vw"
                  className="object-cover"
                />
              </div>
              <div className="hover-lift relative mt-8 aspect-[3/4] overflow-hidden rounded-2xl shadow-md ring-1 ring-crema-200">
                <Image
                  src="/img/obras/obras-sociales-2.webp"
                  alt="Obra social con adultos mayores"
                  fill
                  sizes="(max-width: 768px) 50vw, 22vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
          <Reveal direction="left">
            <p className="text-carbon">
              <strong className="text-rojo-600">Percheros Decorativos</strong>{" "}
              está comprometido en realizar diferentes obras sociales en
              situaciones de vulnerabilidad: hogares geriátricos, infantiles y
              personas con algún tipo de discapacidad o enfermedad.
            </p>
            <p className="mt-4 font-script text-2xl font-bold text-carbon">
              ¡Por nuestros abuel@s, niñ@s y personas vulnerables!
            </p>
            <ButtonLink href="/obras-sociales" variant="blue" className="mt-6">
              Más info
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      {/* ===================== BANNER BIKE ===================== */}
      <BannerDivider
        href="/categoria/bike"
        src="/img/decorativas/bike.webp"
        mobileSrc="/img/decorativas/mobile/bike-movil.webp"
        alt="Percheros Bike para ciclistas y amantes de la aventura"
        ratio="1800 / 470"
      />

      {/* ===================== ALIADOS ===================== */}
      <section className="bg-crema-50">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <Reveal>
            <SectionTitle eyebrow="Red de apoyo">Aliados comerciales</SectionTitle>
          </Reveal>
          <div className="mt-8 grid items-center gap-8 md:grid-cols-2">
            <Reveal direction="right">
              <div className="hover-lift relative aspect-[16/10] overflow-hidden rounded-2xl shadow-md">
                <Image
                  src={stock.buceo}
                  alt="Aliados comerciales — club de buceo"
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal direction="left">
              <p className="text-carbon">
                En esta sección encontrarás publicados nuestros aliados
                comerciales y/o emprendimientos de diferentes sectores. Si algún
                ofrecimiento es de tu interés, puedes contactarnos para más
                información y que seas referido por parte de Percheros
                Decorativos.
              </p>
              <ButtonLink href="/aliados" className="mt-6">
                Más info
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===================== CONTACTO CTA ===================== */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <Reveal>
          <SectionTitle eyebrow="Hablemos">Contáctenos</SectionTitle>
          <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-rojo-100 bg-crema-50 p-8 text-center">
            <p className="text-lg text-carbon">
              Escríbenos y nos contactaremos lo más pronto. ¿Tienes una idea para
              un perchero personalizado? ¡Cuéntanos!
            </p>
            <ButtonLink href="/contacto" size="lg" className="mt-6">
              Ir al formulario de contacto
            </ButtonLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
