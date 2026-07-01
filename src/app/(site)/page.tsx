import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import ProductCard from "@/components/ui/ProductCard";
import CategoryCard from "@/components/ui/CategoryCard";
import SectionTitle from "@/components/ui/SectionTitle";
import JsonLd from "@/components/JsonLd";
import Reveal, { RevealStagger, RevealItem } from "@/components/ui/Reveal";
import Marquee from "@/components/ui/Marquee";
import HomeHero from "@/components/pages/HomeHero";
import { iconMap } from "@/components/ui/icons";
import { getCategories, getFeaturedProducts } from "@/lib/queries";
import { site } from "@/lib/site";
import { stock } from "@/lib/stock";

const servicios = [
  {
    title: "Servicio al Cliente",
    text: "Asistencia a nuestros clientes antes, durante y después de la compra.",
    cta: "Contáctanos",
    href: "/contacto",
    icon: "support" as const,
    color: "text-verde-600",
  },
  {
    title: "Instalación",
    text: "Servicio de instalación seguro y confiable, con calidad y durabilidad.",
    cta: "Programa tu instalación",
    href: "/contacto?asunto=instalacion",
    icon: "install" as const,
    color: "text-naranja-500",
  },
  {
    title: "Envíos",
    text: "Despachamos a cualquier destino del país por empresas de mensajería.",
    cta: "Rastrea tu envío",
    href: "/contacto?asunto=envios",
    icon: "shipping" as const,
    color: "text-carbon",
  },
  {
    title: "Formas de Pago",
    text: "Aceptamos todos los medios de pago digitales con Bold: tarjetas, PSE, Nequi.",
    cta: "Paga fácil tu pedido",
    href: "/categorias",
    icon: "payment" as const,
    color: "text-azul-500",
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
    getFeaturedProducts(8),
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

      <HomeHero />
      <Marquee />

      {/* ===================== CATEGORÍAS ===================== */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <Reveal>
          <SectionTitle eyebrow="Explora">Nuestras categorías</SectionTitle>
          <p className="mt-4 max-w-2xl text-gris">
            Encuentra el perchero ideal según tu pasión y tu espacio.
          </p>
        </Reveal>
        <RevealStagger className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {categories.slice(0, 8).map((c, i) => (
            <RevealItem key={c.id}>
              <CategoryCard category={c} priority={i < 4} />
            </RevealItem>
          ))}
        </RevealStagger>
        <div className="mt-8 text-center">
          <ButtonLink href="/categorias" variant="outline">
            Ver todas las categorías
          </ButtonLink>
        </div>
      </section>

      {/* ===================== DESTACADOS ===================== */}
      {featured.length > 0 && (
        <section className="bg-crema-50">
          <div className="mx-auto max-w-7xl px-4 py-16">
            <Reveal>
              <SectionTitle eyebrow="Catálogo">Encuentra tu perchero</SectionTitle>
            </Reveal>
            <RevealStagger className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
              {featured.map((p) => (
                <RevealItem key={p.id}>
                  <ProductCard product={p} />
                </RevealItem>
              ))}
            </RevealStagger>
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
        <div className="mt-8 grid items-center gap-10 md:grid-cols-2">
          <Reveal direction="right">
            <p className="text-lg leading-relaxed text-carbon">
              <strong className="text-rojo-600">Percheros Decorativos</strong> es
              un Emprendimiento Artesanal; ofrecemos productos{" "}
              <strong className="text-rojo-600">
                Útiles, Funcionales y Decorativos
              </strong>
              , fabricados en madera y/o MDF, con diferentes diseños y herrajes,
              para una mejor{" "}
              <strong className="text-rojo-600">organización</strong> en todo el
              hogar.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <span className="rounded-md bg-carbon px-4 py-2 text-sm font-bold uppercase tracking-wide text-white">
                Emprendimiento Artesanal
              </span>
              <span className="font-display text-sm font-extrabold uppercase text-rojo-600">
                100% Colombiano
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
            <ButtonLink href="/quienes-somos" className="mt-6">
              Conoce nuestra historia
            </ButtonLink>
          </Reveal>
          <Reveal direction="left">
            <div className="hover-lift relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-2xl shadow-lg">
              <Image
                src={stock.atelier}
                alt="Emprendimiento colombiano — artesanías de Colombia"
                fill
                sizes="(max-width: 768px) 100vw, 30vw"
                className="object-cover"
              />
              <span className="absolute left-4 top-4 rounded-md bg-rojo-500 px-3 py-1 text-sm font-bold text-white">
                Emprendimiento Colombiano
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== SERVICIO AL CLIENTE ===================== */}
      <section className="bg-verde-600 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-14 md:grid-cols-[auto_1fr]">
          <Reveal direction="right">
            <div className="animate-float relative mx-auto aspect-square w-56 overflow-hidden rounded-full bg-white/10 ring-4 ring-white/20 md:w-72">
              <Image
                src={stock.comunidad}
                alt="Servicio al cliente Percheros Decorativos"
                fill
                sizes="288px"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal direction="left">
            <h2 className="font-display text-3xl font-extrabold text-white">
              Servicio al Cliente
            </h2>
            <p className="mt-3 max-w-xl text-lg text-white/90">
              Asistencia a nuestros clientes{" "}
              <strong className="text-white">antes, durante y después</strong> de
              la compra. Nuestro objetivo: una{" "}
              <strong className="text-white">experiencia positiva</strong> con
              nuestra marca.
            </p>
            <a
              href={site.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="shimmer relative mt-5 inline-flex items-center gap-2 overflow-hidden rounded-md bg-rojo-500 px-6 py-3 font-semibold text-white hover:bg-rojo-600"
            >
              Contáctanos
            </a>
          </Reveal>
        </div>
      </section>

      {/* Iconos de servicio */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <RevealStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {servicios.map((s) => {
            const Icon = iconMap[s.icon];
            return (
              <RevealItem key={s.title}>
                <Link
                  href={s.href}
                  className="hover-lift group block h-full rounded-xl border border-crema-200 bg-white p-6 text-center shadow-sm"
                >
                  <span
                    className={`inline-flex transition-transform duration-300 group-hover:scale-110 ${s.color}`}
                  >
                    <Icon width={44} height={44} />
                  </span>
                  <h3 className={`mt-3 font-display text-lg font-bold ${s.color}`}>
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm text-gris">{s.text}</p>
                  <span className="mt-3 inline-block text-sm font-semibold text-rojo-600 group-hover:underline">
                    {s.cta} →
                  </span>
                </Link>
              </RevealItem>
            );
          })}
        </RevealStagger>
      </section>

      {/* ===================== PARCHEROS ===================== */}
      <section className="bg-crema-50">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <Reveal>
            <SectionTitle eyebrow="Comunidad">Parcheros</SectionTitle>
            <p className="mt-6 text-center font-script text-3xl font-bold text-rojo-600 sm:text-4xl">
              ¡Únete a cualquiera de nuestras salidas según tu pasión y desparche!
            </p>
          </Reveal>
          <div className="mt-8 grid items-center gap-8 md:grid-cols-2">
            <Reveal direction="right">
              <div className="hover-lift relative aspect-[16/10] overflow-hidden rounded-2xl shadow-md">
                <Image
                  src={stock.motociclistas}
                  alt="Salidas moteras de Parcheros"
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal direction="left">
              <p className="text-lg text-carbon">
                Si te gusta el <strong>deporte</strong>, la{" "}
                <strong>cultura bici</strong>, salir a <strong>rodar</strong>,
                disfrutar de paisajes y compartir una{" "}
                <strong>sana aventura</strong>… puedes hacer parte de nuestras
                salidas de Parcheros: <strong>Moteros</strong>,{" "}
                <strong>Bike</strong> y <strong>Mascotas</strong>.
              </p>
              <ButtonLink href="/parcheros" className="mt-6">
                Quiero unirme
              </ButtonLink>
            </Reveal>
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
            <div className="hover-lift relative aspect-[16/11] overflow-hidden rounded-2xl shadow-md">
              <Image
                src={stock.obras}
                alt="Obras sociales con adultos mayores"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover"
              />
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
