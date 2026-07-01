import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";
import SectionTitle from "@/components/ui/SectionTitle";
import JsonLd from "@/components/JsonLd";
import { ButtonLink } from "@/components/ui/Button";
import { ciudades, getCiudad } from "@/lib/seo-locations";
import { getCategories, getFeaturedProducts } from "@/lib/queries";
import { site } from "@/lib/site";

export const revalidate = 86400;

export function generateStaticParams() {
  return ciudades.map((c) => ({ ciudad: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ciudad: string }>;
}): Promise<Metadata> {
  const { ciudad } = await params;
  const c = getCiudad(ciudad);
  if (!c) return {};
  const title = `Percheros decorativos en ${c.nombre}`;
  const description = `Percheros decorativos artesanales en madera y MDF con envío a ${c.nombre}, ${c.departamento}. Útiles y funcionales para tu hogar. Pago seguro con Bold.`;
  return {
    title,
    description,
    alternates: { canonical: `/percheros/${c.slug}` },
    openGraph: { title: `${title} | ${site.name}`, description },
  };
}

export default async function CiudadPage({
  params,
}: {
  params: Promise<{ ciudad: string }>;
}) {
  const { ciudad } = await params;
  const c = getCiudad(ciudad);
  if (!c) notFound();

  const [categories, featured] = await Promise.all([
    getCategories(),
    getFeaturedProducts(8),
  ]);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: `Percheros en ${c.nombre}`,
        item: `${site.url}/percheros/${c.slug}`,
      },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `¿Hacen envíos de percheros a ${c.nombre}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Sí, enviamos percheros decorativos a ${c.nombre} (${c.departamento}) y sus alrededores a través de empresas de mensajería con seguimiento.`,
        },
      },
      {
        "@type": "Question",
        name: `¿Cuánto tarda el envío a ${c.nombre}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Los envíos a ${c.nombre} suelen tardar entre 2 y 5 días hábiles según la transportadora y la zona.`,
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={[breadcrumbLd, faqLd]} />

      <section className="bg-paper border-b border-rojo-100">
        <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
          <nav aria-label="Migas de pan" className="mb-3 text-sm text-gris">
            <Link href="/" className="hover:text-rojo-600 hover:underline">
              Inicio
            </Link>{" "}
            / <span className="text-carbon">Percheros en {c.nombre}</span>
          </nav>
          <p className="text-sm font-bold uppercase tracking-wide text-rojo-500">
            Envíos a {c.departamento}
          </p>
          <h1 className="font-display text-4xl font-extrabold text-carbon sm:text-5xl">
            Percheros decorativos en {c.nombre}
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-gris">{c.intro}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href="/categorias" size="lg">
              Ver categorías
            </ButtonLink>
            <ButtonLink
              href={`/contacto?asunto=envios`}
              variant="outline"
              size="lg"
            >
              Consultar envío a {c.nombre}
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Contenido único: cobertura por zonas */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold text-carbon">
              Entregamos en {c.nombre} y alrededores
            </h2>
            <p className="mt-3 text-gris">
              Los {c.gentilicio} pueden recibir sus percheros decorativos en
              casa. Cubrimos zonas como:
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {c.barrios.map((b) => (
                <li
                  key={b}
                  className="rounded-full bg-rojo-50 px-3 py-1 text-sm font-medium text-rojo-700"
                >
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-rojo-100 bg-crema-50 p-6">
            <h2 className="font-display text-xl font-bold text-carbon">
              ¿Por qué comprar con nosotros?
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-carbon">
              <li>✓ Percheros artesanales en madera y MDF, hechos a mano</li>
              <li>✓ Envío a {c.nombre} con seguimiento</li>
              <li>✓ Pago 100% seguro con Bold (tarjetas, PSE, Nequi)</li>
              <li>✓ Garantía y servicio de instalación</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Productos */}
      {featured.length > 0 && (
        <section className="bg-crema-50">
          <div className="mx-auto max-w-7xl px-4 py-12">
            <SectionTitle>Percheros para {c.nombre}</SectionTitle>
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categorías (hub-spoke internal linking) */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="mb-6 font-display text-2xl font-bold text-carbon">
          Explora por categoría
        </h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categoria/${cat.slug}`}
              className="rounded-md border border-rojo-200 px-4 py-2 text-sm font-semibold text-rojo-700 hover:bg-rojo-50"
            >
              Percheros {cat.name}
            </Link>
          ))}
        </div>

        {/* Otras ciudades */}
        <h2 className="mb-4 mt-10 font-display text-xl font-bold text-carbon">
          También enviamos a otras ciudades
        </h2>
        <div className="flex flex-wrap gap-2">
          {ciudades
            .filter((x) => x.slug !== c.slug)
            .map((x) => (
              <Link
                key={x.slug}
                href={`/percheros/${x.slug}`}
                className="text-sm text-rojo-600 hover:underline"
              >
                Percheros en {x.nombre}
              </Link>
            ))}
        </div>
      </section>
    </>
  );
}
