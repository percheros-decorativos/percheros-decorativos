import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#fdfaf4",
    theme_color: "#8a5a2b",
    lang: "es-CO",
    categories: ["shopping", "lifestyle"],
    icons: [
      {
        src: "/img/placeholder-product.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
