import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { guias, getGuia } from "@/lib/guias";
import { site } from "@/lib/site";

export const revalidate = 86400;

export function generateStaticParams() {
  return guias.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuia(slug);
  if (!g) return {};
  return {
    title: g.title,
    description: g.description,
    alternates: { canonical: `/guias/${g.slug}` },
    openGraph: { title: `${g.title} | ${site.name}`, description: g.description },
  };
}

export default async function GuiaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const g = getGuia(slug);
  if (!g) notFound();

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.title,
    description: g.description,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: `${site.url}/guias/${g.slug}`,
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: g.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: site.url },
      { "@type": "ListItem", position: 2, name: "Guías", item: `${site.url}/guias` },
      {
        "@type": "ListItem",
        position: 3,
        name: g.title,
        item: `${site.url}/guias/${g.slug}`,
      },
    ],
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <JsonLd data={[articleLd, faqLd, breadcrumbLd]} />

      <nav aria-label="Migas de pan" className="mb-4 text-sm text-gris">
        <Link href="/" className="hover:text-rojo-600 hover:underline">
          Inicio
        </Link>{" "}
        /{" "}
        <Link href="/guias" className="hover:text-rojo-600 hover:underline">
          Guías
        </Link>{" "}
        / <span className="text-carbon">{g.title}</span>
      </nav>

      <h1 className="font-display text-3xl font-extrabold text-carbon sm:text-4xl">
        {g.title}
      </h1>
      <p className="mt-4 text-lg text-gris">{g.intro}</p>

      <div className="mt-8 space-y-8">
        {g.sections.map((s) => (
          <section key={s.h2}>
            <h2 className="font-display text-xl font-bold text-carbon">
              {s.h2}
            </h2>
            {s.body.map((p, i) => (
              <p key={i} className="mt-2 text-carbon/85">
                {p}
              </p>
            ))}
          </section>
        ))}
      </div>

      <section className="mt-10">
        <h2 className="font-display text-xl font-bold text-carbon">
          Preguntas frecuentes
        </h2>
        <dl className="mt-4 space-y-4">
          {g.faq.map((f) => (
            <div key={f.q} className="rounded-xl border border-rojo-100 p-4">
              <dt className="font-semibold text-carbon">{f.q}</dt>
              <dd className="mt-1 text-sm text-gris">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="mt-10 rounded-2xl bg-crema-50 p-6 text-center">
        <p className="font-display text-lg font-bold text-carbon">
          ¿Listo para elegir tu perchero?
        </p>
        <ButtonLink href="/categorias" className="mt-4">
          Ver categorías
        </ButtonLink>
      </div>

      <div className="mt-10">
        <h2 className="mb-3 font-display text-lg font-bold text-carbon">
          Más guías
        </h2>
        <ul className="space-y-1">
          {guias
            .filter((x) => x.slug !== g.slug)
            .map((x) => (
              <li key={x.slug}>
                <Link
                  href={`/guias/${x.slug}`}
                  className="text-sm text-rojo-600 hover:underline"
                >
                  {x.title}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </article>
  );
}
