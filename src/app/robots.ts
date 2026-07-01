import type { MetadataRoute } from "next";
import { site, allowIndexing } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Sin dominio definitivo: bloquear todo el rastreo.
  if (!allowIndexing) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/", "/carrito", "/checkout", "/wishlist"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
