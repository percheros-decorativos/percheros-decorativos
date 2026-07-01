import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import { guias } from "@/lib/guias";

export const metadata: Metadata = {
  title: "Guías y consejos sobre percheros",
  description:
    "Aprende a instalar, elegir y aprovechar percheros decorativos. Guías prácticas sobre materiales, ideas de organización y más.",
  alternates: { canonical: "/guias" },
};

export default function GuiasPage() {
  return (
    <>
      <PageHero
        eyebrow="Aprende con nosotros"
        title="Guías y consejos"
        subtitle="Todo lo que necesitas saber sobre percheros decorativos: instalación, materiales e ideas para tu hogar."
        breadcrumb={[{ label: "Inicio", href: "/" }, { label: "Guías" }]}
      />
      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-6 md:grid-cols-2">
          {guias.map((g) => (
            <article
              key={g.slug}
              className="rounded-2xl border border-rojo-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <h2 className="font-display text-xl font-bold text-carbon">
                <Link href={`/guias/${g.slug}`} className="hover:text-rojo-600">
                  {g.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm text-gris">{g.description}</p>
              <Link
                href={`/guias/${g.slug}`}
                className="mt-3 inline-block text-sm font-semibold text-rojo-600 hover:underline"
              >
                Leer guía →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
