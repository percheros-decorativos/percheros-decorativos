import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Quiénes somos: percheros artesanales",
  description:
    "Percheros Decorativos es un emprendimiento artesanal 100% colombiano. Conoce nuestra historia, valores y compromiso con el trabajo hecho a mano.",
  alternates: { canonical: "/quienes-somos" },
};

const valores = [
  {
    title: "Artesanía colombiana",
    text: "Cada perchero se fabrica a mano en madera y MDF, cuidando cada detalle y acabado.",
    icon: "icon-artesania",
  },
  {
    title: "Útiles y funcionales",
    text: "Diseñamos productos que organizan tu hogar con estilo, no solo decoración.",
    icon: "icon-funcional",
  },
  {
    title: "Calidad y garantía",
    text: "Herrajes metálicos resistentes y garantía en todos nuestros productos.",
    icon: "icon-calidad",
  },
  {
    title: "Compromiso social",
    text: "Apoyamos obras sociales para personas en situación de vulnerabilidad.",
    icon: "icon-compromiso",
  },
];

const catalogoMsg = encodeURIComponent(
  "¡Hola! Quiero ver el catálogo completo de percheros decorativos.",
);

export default function QuienesSomosPage() {
  return (
    <>
      <PageHero
        eyebrow="Emprendimiento artesanal 100% colombiano"
        title="Quiénes Somos"
        subtitle={site.description}
        breadcrumb={[{ label: "Inicio", href: "/" }, { label: "Quiénes Somos" }]}
        bgImage="/img/quienes-somos/banner.webp"
      />

      <section className="mx-auto max-w-3xl px-4 py-12">
        <div className="prose-base space-y-4 text-carbon/80">
          <p>
            <strong>Percheros Decorativos</strong> nace como un emprendimiento
            artesanal colombiano con una misión clara: ofrecer productos{" "}
            <strong>útiles, funcionales y decorativos</strong> que ayuden a
            organizar el hogar de una forma bonita y práctica.
          </p>
          <p>
            Fabricamos cada perchero en <strong>madera y/o MDF</strong>, con
            impresión en vinilo adhesivo full color y herrajes metálicos de
            diferentes referencias. Así logramos piezas resistentes, con diseños
            para cada gusto, pasión y espacio.
          </p>
          <p>
            Creemos en el trabajo hecho a mano, en el comercio justo y en
            devolverle algo a la comunidad. Por eso, parte de nuestro esfuerzo se
            destina a <strong>obras sociales</strong> para abuelos, niños y
            personas en situación de vulnerabilidad.
          </p>
        </div>

        {/* CTAs: catálogo por WhatsApp + ver categorías */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <a
            href={`https://wa.me/${site.whatsapp}?text=${catalogoMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-2xl border-2 border-verde-500 bg-verde-500 p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-verde-600 hover:shadow-lg"
          >
            <Image
              src="/img/quienes-somos/icon-catalogo.webp"
              alt=""
              width={44}
              height={44}
              className="h-11 w-11 shrink-0 brightness-0 invert"
            />
            <span>
              <span className="block font-display text-lg font-bold text-white">
                Ver catálogo completo
              </span>
              <span className="text-sm text-white/85">
                Chatea por WhatsApp y te lo enviamos
              </span>
            </span>
          </a>

          <Link
            href="/categorias"
            className="group flex items-center gap-4 rounded-2xl border-2 border-rojo-500 bg-rojo-500 p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-rojo-600 hover:shadow-lg"
          >
            <Image
              src="/img/quienes-somos/icon-categorias.webp"
              alt=""
              width={44}
              height={44}
              className="h-11 w-11 shrink-0 brightness-0 invert"
            />
            <span>
              <span className="block font-display text-lg font-bold text-white">
                Ver todas las categorías
              </span>
              <span className="text-sm text-white/85">
                Explora por estilo y espacio
              </span>
            </span>
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {valores.map((v) => (
            <div
              key={v.title}
              className="flex flex-col items-center rounded-2xl bg-white p-6 text-center shadow-[0_8px_24px_-8px_rgba(0,0,0,0.15)] transition-shadow duration-300 hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.2)]"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-rojo-50">
                <Image
                  src={`/img/quienes-somos/${v.icon}.webp`}
                  alt=""
                  width={36}
                  height={36}
                  className="h-9 w-9"
                />
              </span>
              <h2 className="mt-3 font-display text-lg font-semibold text-madera-800">
                {v.title}
              </h2>
              <p className="mt-2 text-sm text-carbon/70">{v.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <ButtonLink href="/categorias" size="lg">
            Ver nuestros percheros
          </ButtonLink>
          <ButtonLink href="/contacto" variant="outline" size="lg">
            Contáctanos
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
