import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import DeferredShell from "@/components/layout/DeferredShell";
import ToasterWrapper from "@/components/ui/ToasterWrapper";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/site";
import { getCategories } from "@/lib/queries";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategories();
  const navCategories = categories.map((c) => ({ slug: c.slug, name: c.name }));

  // Datos estructurados globales del storefront (SEO + GEO)
  const orgLd = {
    "@context": "https://schema.org",
    "@type": ["Organization", "Store", "OnlineStore"],
    "@id": `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    email: site.email,
    telephone: site.phone,
    description: site.description,
    slogan: site.slogan,
    foundingDate: String(site.foundingYear),
    logo: {
      "@type": "ImageObject",
      url: `${site.url}/icon-512.png`,
    },
    image: `${site.url}/og.png`,
    priceRange: "$$",
    currenciesAccepted: "COP",
    paymentAccepted: "Tarjetas, PSE, Nequi, Bold",
    address: {
      "@type": "PostalAddress",
      addressCountry: "CO",
    },
    areaServed: { "@type": "Country", name: "Colombia" },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.phone,
      email: site.email,
      contactType: "customer service",
      areaServed: "CO",
      availableLanguage: ["es"],
    },
    sameAs: [site.social.instagram, site.social.facebook, site.social.tiktok],
  };
  const siteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    inLanguage: "es-CO",
    potentialAction: {
      "@type": "SearchAction",
      target: `${site.url}/categorias?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <JsonLd data={[orgLd, siteLd]} />
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:shadow"
      >
        Saltar al contenido
      </a>
      <Header categories={navCategories} />
      <ToasterWrapper />
      <main id="contenido" className="page-enter flex-1">
        {children}
      </main>
      <Footer />
      <DeferredShell />
    </>
  );
}
