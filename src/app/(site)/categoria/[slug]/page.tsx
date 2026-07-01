import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";
import JsonLd from "@/components/JsonLd";
import {
  getCategoryBySlug,
  getProductsByCategory,
  getCategories,
} from "@/lib/queries";
import { site } from "@/lib/site";

export const revalidate = 300; // ISR: revalida cada 5 min

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: category.metaTitle ?? `Percheros ${category.name}`,
    description:
      category.metaDescription ?? category.description ?? undefined,
    alternates: { canonical: `/categoria/${category.slug}` },
    openGraph: {
      title: `Percheros ${category.name} | ${site.name}`,
      description: category.description ?? undefined,
    },
  };
}

export default async function CategoriaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const products = await getProductsByCategory(category.id);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Categorías",
        item: `${site.url}/categorias`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: category.name,
        item: `${site.url}/categoria/${category.slug}`,
      },
    ],
  };

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Percheros ${category.name}`,
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${site.url}/producto/${p.slug}`,
      name: p.name,
    })),
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <JsonLd data={[breadcrumbLd, itemListLd]} />

      <nav aria-label="Migas de pan" className="mb-4 text-sm text-carbon/60">
        <Link href="/" className="hover:underline">
          Inicio
        </Link>{" "}
        /{" "}
        <Link href="/categorias" className="hover:underline">
          Categorías
        </Link>{" "}
        / <span className="text-carbon">{category.name}</span>
      </nav>

      <header className="mb-8 max-w-2xl">
        {category.tagline && (
          <p className="text-sm font-semibold uppercase tracking-wide text-terracota-500">
            {category.tagline}
          </p>
        )}
        <h1 className="font-display text-4xl font-bold text-madera-900">
          Percheros {category.name}
        </h1>
        {category.description && (
          <p className="mt-3 text-lg text-carbon/75">{category.description}</p>
        )}
      </header>

      {products.length === 0 ? (
        <p className="rounded-xl bg-crema-100 p-8 text-center text-carbon/70">
          Pronto tendremos productos en esta categoría.{" "}
          <Link href="/contacto" className="font-semibold text-terracota-600">
            Escríbenos
          </Link>{" "}
          para conocer disponibilidad.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} priority={i < 4} />
          ))}
        </div>
      )}
    </div>
  );
}
