import type { NextConfig } from "next";

// Indexación desactivada hasta tener dominio definitivo.
const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    // Formatos modernos para mejores Core Web Vitals
    formats: ["image/avif", "image/webp"],
    // Permitir imágenes remotas (las que el admin pegue como URL).
    remotePatterns: [{ protocol: "https", hostname: "**" }],
    // Necesario para procesar los placeholders SVG locales de forma segura.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          // Bloqueo total de indexación mientras no haya dominio definitivo.
          ...(allowIndexing
            ? []
            : [{ key: "X-Robots-Tag", value: "noindex, nofollow" }]),
        ],
      },
    ];
  },
};

export default nextConfig;
