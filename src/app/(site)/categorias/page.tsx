import type { Metadata } from "next";
import Link from "next/link";
import CategoryCard from "@/components/ui/CategoryCard";
import SectionTitle from "@/components/ui/SectionTitle";
import JsonLd from "@/components/JsonLd";
import Reveal, { RevealStagger, RevealItem } from "@/components/ui/Reveal";
import { getCategories } from "@/lib/queries";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Categorías de percheros decorativos",
  description:
    "Explora nuestras categorías de percheros artesanales: Hogar, Mascotas, Moteros, Bike, Guitarras, Personalizados, Corporativos, Murales y más.",
  alternates: { canonical: "/categorias" },
};

export default async function CategoriasPage() {
  const categories = await getCategories();

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
    ],
  };
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Categorías de percheros decorativos",
    numberOfItems: categories.length,
    itemListElement: categories.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `Percheros ${c.name}`,
      url: `${site.url}/categoria/${c.slug}`,
    })),
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-14">
      <JsonLd data={[breadcrumbLd, itemListLd]} />

      <nav aria-label="Migas de pan" className="mb-4 text-sm text-gris">
        <Link href="/" className="hover:text-rojo-600 hover:underline">
          Inicio
        </Link>{" "}
        / <span className="text-carbon">Categorías</span>
      </nav>

      <Reveal>
        <SectionTitle as="h1" eyebrow="Catálogo">
          Todas las categorías
        </SectionTitle>
        <p className="mt-4 max-w-2xl text-lg text-gris">
          Percheros decorativos en madera y MDF para cada pasión y cada espacio
          del hogar. Elige una categoría y descubre nuestros diseños.
        </p>
      </Reveal>

      <RevealStagger className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((c, i) => (
          <RevealItem key={c.id}>
            <CategoryCard category={c} priority={i < 4} />
          </RevealItem>
        ))}
      </RevealStagger>
    </div>
  );
}
