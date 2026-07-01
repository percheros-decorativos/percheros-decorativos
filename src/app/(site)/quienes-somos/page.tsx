import type { Metadata } from "next";
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
  },
  {
    title: "Útiles y funcionales",
    text: "Diseñamos productos que organizan tu hogar con estilo, no solo decoración.",
  },
  {
    title: "Calidad y garantía",
    text: "Herrajes metálicos resistentes y garantía en todos nuestros productos.",
  },
  {
    title: "Compromiso social",
    text: "Apoyamos obras sociales para personas en situación de vulnerabilidad.",
  },
];

export default function QuienesSomosPage() {
  return (
    <>
      <PageHero
        eyebrow="Emprendimiento artesanal 100% colombiano"
        title="Quiénes Somos"
        subtitle={site.description}
        breadcrumb={[{ label: "Inicio", href: "/" }, { label: "Quiénes Somos" }]}
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

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {valores.map((v) => (
            <div
              key={v.title}
              className="rounded-2xl border border-madera-100 bg-white p-5 shadow-sm"
            >
              <h2 className="font-display text-lg font-semibold text-madera-800">
                {v.title}
              </h2>
              <p className="mt-2 text-sm text-carbon/70">{v.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/categorias">Ver nuestros percheros</ButtonLink>
          <ButtonLink href="/contacto" variant="outline">
            Contáctanos
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
