import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Obras sociales y compromiso comunitario",
  description:
    "Percheros Decorativos está comprometido con obras sociales para hogares geriátricos, infantiles y personas en situación de vulnerabilidad. Conoce cómo apoyamos.",
  alternates: { canonical: "/obras-sociales" },
};

export default function ObrasSocialesPage() {
  return (
    <>
      <PageHero
        eyebrow="Nuestro compromiso"
        title="Obras Sociales"
        subtitle="Por nuestros abuel@s, niñ@s y personas vulnerables."
        breadcrumb={[
          { label: "Inicio", href: "/" },
          { label: "Obras Sociales" },
        ]}
      />

      <section className="mx-auto max-w-3xl px-4 py-12">
        <div className="space-y-4 text-carbon/80">
          <p>
            Percheros Decorativos está comprometido en realizar diferentes obras
            sociales en situaciones de vulnerabilidad: <strong>hogares
            geriátricos, infantiles</strong> y personas con algún tipo de
            discapacidad o enfermedad.
          </p>
          <p>
            Brindamos asesoría jurídica en derechos fundamentales y dignidad
            humana, con el objetivo de ofrecer colaboración, solidaridad y
            esperanza a quienes más lo necesitan, con el apoyo de nuestros
            clientes.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3 text-center">
          {["1ra y 2da Infancia", "Adolescentes", "Adultos Mayores"].map((g) => (
            <div
              key={g}
              className="rounded-2xl border border-madera-100 bg-white p-5 font-semibold text-madera-800 shadow-sm"
            >
              {g}
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl bg-crema-100 p-6">
          <h2 className="font-display text-xl font-semibold text-madera-800">
            Clasificados sociales
          </h2>
          <p className="mt-2 text-sm text-carbon/70">
            En este espacio damos a conocer diferentes clasificados sociales, con
            el objetivo de que alguna persona pueda colaborar para mejorar la
            calidad de vida de quien lo necesita, sin ánimo de lucro.
          </p>
          <ButtonLink href="/contacto?asunto=obras-sociales" className="mt-4">
            Quiero colaborar
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
