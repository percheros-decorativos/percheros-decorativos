import JsonLd from "@/components/JsonLd";
import { buildNarrative, buildFAQs } from "@/lib/product-seo";
import type { UIProduct } from "@/lib/queries";

// Contenido editorial largo + FAQ (SEO/GEO). Server component, sin JS:
// el acordeón usa <details>/<summary> nativo (accesible y rastreable).
export default function ProductSeoContent({ product }: { product: UIProduct }) {
  const narrative = buildNarrative(product);
  const faqs = buildFAQs(product);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const specs: [string, string][] = [
    ["Referencia", product.reference],
    ["Medidas", product.dimensions],
    ["Herrajes", product.hardware],
    ["Materiales", product.materials],
    ["Garantía", product.warranty],
    ["Categoría", product.category?.name ?? ""],
  ].filter(([, v]) => v) as [string, string][];

  return (
    <section
      aria-label={`Información detallada de ${product.name}`}
      className="border-t border-carbon/10 bg-white"
    >
      <div className="mx-auto max-w-3xl px-4 py-16">
        {/* Narrativa */}
        <article className="mb-14">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-rojo-500">
            Sobre esta pieza
          </p>
          <h2 className="mt-2 font-display text-3xl font-extrabold text-carbon">
            Conoce {product.name}
          </h2>
          <div className="mt-5 space-y-4 text-[1.05rem] leading-8 text-carbon/80">
            {narrative.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </article>

        {/* Ficha técnica */}
        <article className="mb-14">
          <h2 className="font-display text-2xl font-bold text-carbon">
            Especificaciones
          </h2>
          <dl className="mt-5 overflow-hidden rounded-2xl border border-carbon/10">
            {specs.map(([k, v], i) => (
              <div
                key={k}
                className={`flex flex-col gap-1 px-5 py-4 sm:flex-row sm:gap-6 ${
                  i % 2 ? "bg-crema-50" : "bg-white"
                }`}
              >
                <dt className="w-40 shrink-0 font-semibold text-carbon">{k}</dt>
                <dd className="text-carbon/75">{v}</dd>
              </div>
            ))}
          </dl>
        </article>

        {/* FAQ */}
        <article>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-rojo-500">
            Preguntas frecuentes
          </p>
          <h2 className="mt-2 font-display text-3xl font-extrabold text-carbon">
            ¿Tienes dudas?
          </h2>
          <div className="mt-6 divide-y divide-carbon/10 overflow-hidden rounded-2xl border border-carbon/10 bg-white">
            {faqs.map((f) => (
              <details key={f.q} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-carbon transition-colors hover:bg-crema-50">
                  {f.q}
                  <span className="shrink-0 text-rojo-500 transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="px-5 pb-5 text-carbon/75">{f.a}</p>
              </details>
            ))}
          </div>
        </article>
      </div>

      <JsonLd data={faqSchema} />
    </section>
  );
}
