import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Aliados Comerciales",
  description:
    "Conoce los aliados comerciales y emprendimientos que recomienda Percheros Decorativos en distintos sectores. Si te interesa alguno, contáctanos y te referimos.",
  alternates: { canonical: "/aliados" },
};

export default function AliadosPage() {
  return (
    <>
      <PageHero
        eyebrow="Red de apoyo"
        title="Aliados Comerciales"
        subtitle="En esta sección encontrarás nuestros aliados comerciales y emprendimientos de diferentes sectores."
        breadcrumb={[{ label: "Inicio", href: "/" }, { label: "Aliados" }]}
      />

      <section className="mx-auto max-w-3xl px-4 py-12">
        <p className="text-carbon/80">
          Si algún ofrecimiento es de tu interés, puedes contactarnos para más
          información y que seas referido por parte de Percheros Decorativos.
        </p>

        <div className="mt-8 rounded-2xl border border-madera-100 bg-white p-6 shadow-sm">
          <h2 className="font-display text-xl font-semibold text-madera-800">
            ¿Tienes un emprendimiento?
          </h2>
          <p className="mt-2 text-sm text-carbon/70">
            Súmate a nuestra red de aliados comerciales y llega a más personas.
          </p>
          <ButtonLink href="/contacto?asunto=aliados" className="mt-4">
            Quiero ser aliado
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
