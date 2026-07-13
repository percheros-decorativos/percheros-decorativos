import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getAllProducts, getCategories } from "@/lib/queries";
import { ciudades } from "@/lib/seo-locations";
import { guias } from "@/lib/guias";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = site.url;
  const now = new Date();
  const [categories, products] = await Promise.all([getCategories(), getAllProducts()]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/categorias`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/galeria`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${base}/quienes-somos`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/parcheros`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/obras-sociales`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/aliados`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/contacto`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/guias`, changeFrequency: "monthly", priority: 0.6 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${base}/categoria/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${base}/producto/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // SEO programático: páginas de ciudad
  const locationRoutes: MetadataRoute.Sitemap = ciudades.map((c) => ({
    url: `${base}/percheros/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const guiaRoutes: MetadataRoute.Sitemap = guias.map((g) => ({
    url: `${base}/guias/${g.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...productRoutes,
    ...locationRoutes,
    ...guiaRoutes,
  ];
}
