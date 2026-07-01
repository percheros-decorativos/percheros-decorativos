import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/cart/AddToCartButton";
import ProductCard from "@/components/ui/ProductCard";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/ui/Reveal";
import ProductSeoContent from "@/components/seo/ProductSeoContent";
import { formatCop } from "@/lib/money";
import { buildKeywords } from "@/lib/product-seo";
import { site } from "@/lib/site";
import {
  TruckIcon,
  CheckIcon,
  PaymentIcon,
  ToolIcon,
} from "@/components/ui/icons";
import {
  getProductBySlug,
  getRelatedProducts,
  getCategories,
  getProductsByCategory,
} from "@/lib/queries";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const categories = await getCategories();
  const all = await Promise.all(
    categories.map((c) => getProductsByCategory(c.id)),
  );
  return all.flat().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  const image = product.images[0]?.url;
  const cat = product.category?.name ?? "";
  const title = `Comprar ${product.name} | Perchero ${cat} en madera`;
  const description =
    `${product.shortDesc} Medidas ${product.dimensions}, ${product.hardware.toLowerCase()}. ${product.warranty} de garantía. Envío a toda Colombia con pago seguro.`.slice(
      0,
      160,
    );
  return {
    title,
    description,
    keywords: buildKeywords(product),
    alternates: { canonical: `/producto/${product.slug}` },
    openGraph: {
      type: "website",
      title: `${product.name} | ${site.name}`,
      description: product.shortDesc ?? undefined,
      url: `${site.url}/producto/${product.slug}`,
      images: image
        ? [{ url: image, width: 800, height: 800, alt: product.name }]
        : undefined,
      locale: "es_CO",
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.shortDesc ?? undefined,
      images: image ? [image] : undefined,
    },
    other: {
      "product:brand": site.name,
      "product:availability": product.stock > 0 ? "in stock" : "out of stock",
      "product:condition": "new",
      "product:price:amount": String(product.priceCop),
      "product:price:currency": "COP",
    },
  };
}

const beneficios = [
  { icon: CheckIcon, t: "Hecho a mano", d: "Artesanía colombiana" },
  { icon: TruckIcon, t: "Envío nacional", d: "A todo Colombia" },
  { icon: ToolIcon, t: "Instalación", d: "Servicio disponible" },
  { icon: PaymentIcon, t: "Pago seguro", d: "con Bold" },
];

export default async function ProductoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product.categoryId, product.id, 4);
  const image = product.images[0];
  const inStock = product.stock > 0;
  const url = `${site.url}/producto/${product.slug}`;
  const nextYearEnd = new Date(new Date().getFullYear() + 1, 11, 31)
    .toISOString()
    .split("T")[0];

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": url,
    name: product.name,
    description: product.description,
    image: product.images.map((i) =>
      i.url.startsWith("http") ? i.url : `${site.url}${i.url}`,
    ),
    sku: product.reference || product.slug,
    mpn: product.slug,
    brand: { "@type": "Brand", name: site.name },
    material: "Madera / MDF",
    category: `Perchero ${product.category?.name}`,
    offers: {
      "@type": "Offer",
      url,
      price: product.priceCop,
      priceCurrency: "COP",
      priceValidUntil: nextYearEnd,
      availability: inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@type": "Organization", name: site.name },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "CO",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 2,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 2,
            maxValue: 5,
            unitCode: "DAY",
          },
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "CO",
        returnPolicyCategory:
          "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 5,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
    },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Medidas", value: product.dimensions },
      { "@type": "PropertyValue", name: "Herrajes", value: product.hardware },
      { "@type": "PropertyValue", name: "Garantía", value: product.warranty },
    ],
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: product.category?.name ?? "Categoría",
        item: `${site.url}/categoria/${product.category?.slug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: url,
      },
    ],
  };

  return (
    <>
      <JsonLd data={[productLd, breadcrumbLd]} />

      <div className="mx-auto max-w-7xl px-4 py-8 md:py-12">
        <nav aria-label="Migas de pan" className="mb-6 text-sm text-gris">
          <Link href="/" className="hover:text-rojo-600 hover:underline">
            Inicio
          </Link>{" "}
          /{" "}
          <Link
            href={`/categoria/${product.category?.slug}`}
            className="hover:text-rojo-600 hover:underline"
          >
            {product.category?.name}
          </Link>{" "}
          / <span className="text-carbon">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Galería sticky */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-crema-100 shadow-lg ring-1 ring-carbon/10">
              <Image
                src={image?.url ?? "/img/placeholder-product.svg"}
                alt={image?.alt ?? product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              {product.isNew && (
                <span className="absolute left-4 top-4 rounded-full bg-verde-500 px-3 py-1 text-sm font-bold text-white">
                  NUEVO
                </span>
              )}
            </div>
          </div>

          {/* Info */}
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-rojo-500">
              {product.category?.name}
            </p>
            <h1 className="mt-2 font-display text-4xl font-extrabold leading-tight text-carbon sm:text-5xl">
              {product.name}
            </h1>

            <p className="mt-4 font-display text-3xl font-extrabold text-rojo-600">
              {formatCop(product.priceCop)}
            </p>
            <p
              className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${
                inStock
                  ? "bg-verde-500/10 text-verde-600"
                  : "bg-rojo-500/10 text-rojo-600"
              }`}
            >
              {inStock
                ? `✓ ${product.stock} disponible${product.stock === 1 ? "" : "s"}`
                : "Agotado temporalmente"}
            </p>

            {product.shortDesc && (
              <p className="mt-5 text-lg leading-relaxed text-carbon/80">
                {product.shortDesc}
              </p>
            )}

            {/* Ficha rápida */}
            <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
              {[
                ["Medidas", product.dimensions],
                ["Herrajes", product.hardware],
                ["Garantía", product.warranty],
                ["Referencia", product.reference],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="rounded-xl border border-carbon/10 bg-white px-4 py-3"
                >
                  <dt className="text-xs uppercase tracking-wide text-gris">
                    {k}
                  </dt>
                  <dd className="font-semibold text-carbon">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-7">
              <AddToCartButton
                withQuantity
                product={{
                  id: product.id,
                  slug: product.slug,
                  name: product.name,
                  priceCop: product.priceCop,
                  image: image?.url ?? "/img/placeholder-product.svg",
                  maxStock: product.stock,
                }}
              />
            </div>

            {/* Prueba social / beneficios */}
            <div className="mt-8 grid grid-cols-2 gap-3 rounded-2xl border border-carbon/10 bg-white p-4 sm:grid-cols-4">
              {beneficios.map((b) => (
                <div key={b.t} className="text-center">
                  <span className="inline-flex text-rojo-500">
                    <b.icon width={24} height={24} />
                  </span>
                  <p className="mt-1 text-sm font-bold text-carbon">{b.t}</p>
                  <p className="text-xs text-gris">{b.d}</p>
                </div>
              ))}
            </div>

            <p className="mt-4 text-sm text-gris">
              ¿Dudas o quieres personalizarlo?{" "}
              <Link
                href="/contacto"
                className="font-semibold text-rojo-600 hover:underline"
              >
                Escríbenos
              </Link>
              .
            </p>
          </div>
        </div>
      </div>

      {/* Contenido SEO/GEO: narrativa + ficha + FAQ */}
      <ProductSeoContent product={product} />

      {/* Relacionados */}
      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16">
          <Reveal>
            <h2 className="mb-8 text-center font-display text-3xl font-extrabold text-carbon">
              También te puede gustar
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
