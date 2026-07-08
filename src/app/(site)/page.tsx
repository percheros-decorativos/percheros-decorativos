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
import HeroSlider from "@/components/pages/HeroSlider";
import ServicesSlider from "@/components/pages/ServicesSlider";
import { getCategories, getFeaturedProducts } from "@/lib/queries";
import { stock } from "@/lib/stock";

// Banners decorativos de categoría (diseños listos con logo): divisores de
// sección a proporción nativa para que nunca se recorte el arte ni el logo.
function BannerDivider({
  href,
  src,
  alt,
  ratio,
  tone = "",
}: {
  href: string;
  src: string;
  alt: string;
  ratio: string;
  tone?: string;
}) {
  return (
    <section className={`${tone} px-4 pb-4`}>
      <div className="mx-auto max-w-7xl">
      <Reveal>
        <Link
          href={href}
          aria-label={alt}
          className="hover-lift group block overflow-hidden rounded-2xl shadow-md ring-1 ring-crema-200"
        >
          <div className="relative" style={{ aspectRatio: ratio }}>
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 1280px) 100vw, 1216px"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>
        </Link>
      </Reveal>
      </div>
    </section>
  );
}

// Salidas de la comunidad Parcheros.
const salidas = [
  { title: "Salidas Moteras", src: "/img/parcheros/salidas-moteras.webp" },
  { title: "Salidas Bike", src: "/img/parcheros/salidas-bikes.webp" },
  { title: "Salidas Mascotas", src: "/img/parcheros/salidas-mascotas.webp" },
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

      {/* ===================== BANNER HOGAR ===================== */}
      <BannerDivider
        href="/categoria/hogar"
        src="/img/decorativas/hogar.webp"
        alt="Percheros decorativos para el hogar con paisajes de ciudad"
        ratio="1800 / 465"
      />

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

      {/* ===================== BANNER DEDIOS ===================== */}
      <BannerDivider
        href="/categoria/dedios"
        src="/img/decorativas/dedios.webp"
        alt="Percheros DeDios con imágenes de fe y esperanza"
        ratio="1800 / 466"
      />

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
            <div className="hover-lift relative mx-auto aspect-[2/3] w-full max-w-xs overflow-hidden rounded-2xl shadow-lg ring-1 ring-crema-200">
              <Image
                src="/img/quienes/artesanias-1.webp"
                alt="Emprendimiento colombiano — artesanías de Colombia"
                fill
                sizes="(max-width: 768px) 100vw, 22vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== SERVICIOS ===================== */}
      <section className="bg-crema-50">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <Reveal>
            <SectionTitle eyebrow="Cómo te acompañamos">Nuestros servicios</SectionTitle>
            <p className="mx-auto mt-4 max-w-2xl text-center text-gris">
              Te acompañamos antes, durante y después de tu compra: instalación,
              envíos a toda Colombia y pago seguro con Bold.
            </p>
          </Reveal>
          <Reveal>
            <div className="mx-auto mt-8 max-w-4xl">
              <ServicesSlider />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== BANNER MOTEROS ===================== */}
      <BannerDivider
        href="/categoria/moteros"
        src="/img/decorativas/moteros.webp"
        alt="Percheros Moteros para cascos, chaquetas y accesorios de viaje"
        ratio="1800 / 470"
        tone="bg-crema-50"
      />

      {/* ===================== PARCHEROS ===================== */}
      <section className="bg-crema-50">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <Reveal>
            <SectionTitle eyebrow="Comunidad">Parcheros</SectionTitle>
            <p className="mt-6 text-center font-script text-3xl font-bold text-rojo-600 sm:text-4xl">
              ¡Únete a cualquiera de nuestras salidas según tu pasión y desparche!
            </p>
          </Reveal>
          <RevealStagger className="mt-8 grid gap-6 md:grid-cols-3">
            {salidas.map((s) => (
              <RevealItem key={s.title}>
                <Link
                  href="/parcheros"
                  aria-label={s.title}
                  className="hover-lift group block overflow-hidden rounded-2xl shadow-md ring-1 ring-crema-200"
                >
                  <div className="relative aspect-[7/3]">
                    <Image
                      src={s.src}
                      alt={`${s.title} de la comunidad Parcheros`}
                      fill
                      sizes="(max-width: 768px) 100vw, 30vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
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
