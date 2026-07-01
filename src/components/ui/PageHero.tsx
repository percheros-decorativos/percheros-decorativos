import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/site";

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  breadcrumb,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  breadcrumb?: { label: string; href?: string }[];
}) {
  const breadcrumbLd =
    breadcrumb && breadcrumb.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: breadcrumb.map((b, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: b.label,
            ...(b.href ? { item: `${site.url}${b.href}` } : {}),
          })),
        }
      : null;

  return (
    <header className="bg-paper border-b border-rojo-100">
      {breadcrumbLd && <JsonLd data={breadcrumbLd} />}
      <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        {breadcrumb && (
          <nav aria-label="Migas de pan" className="mb-3 text-sm text-gris">
            {breadcrumb.map((b, i) => (
              <span key={b.label}>
                {b.href ? (
                  <Link href={b.href} className="hover:text-rojo-600 hover:underline">
                    {b.label}
                  </Link>
                ) : (
                  <span className="text-carbon">{b.label}</span>
                )}
                {i < breadcrumb.length - 1 && " / "}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && (
          <p className="text-sm font-bold uppercase tracking-wide text-rojo-500">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-4xl font-extrabold text-carbon sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 max-w-2xl text-lg text-gris">{subtitle}</p>
        )}
      </div>
    </header>
  );
}
