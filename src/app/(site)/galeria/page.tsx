import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import { getAllProducts } from "@/lib/queries";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Galería de percheros decorativos",
  description:
    "Galería de percheros decorativos artesanales en madera y MDF. Inspírate con nuestros diseños para el hogar, mascotas, moteros y más.",
  alternates: { canonical: "/galeria" },
};

export default async function GaleriaPage() {
  const products = await getAllProducts();

  return (
    <>
      <PageHero
        eyebrow="Inspiración"
        title="Galería"
        subtitle="Una muestra de nuestros percheros decorativos hechos a mano."
        breadcrumb={[{ label: "Inicio", href: "/" }, { label: "Galería" }]}
      />

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
          {products.map((p, i) => (
            <Link
              key={p.id}
              href={`/producto/${p.slug}`}
              className="group relative block overflow-hidden rounded-2xl border border-madera-100 bg-crema-100"
            >
              <Image
                src={p.images[0]?.url ?? "/img/placeholder-product.svg"}
                alt={p.images[0]?.alt ?? p.name}
                width={500}
                height={500}
                sizes="(max-width: 640px) 50vw, 25vw"
                className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
                priority={i < 4}
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-madera-900/80 to-transparent p-3 text-sm font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">
                {p.name}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
