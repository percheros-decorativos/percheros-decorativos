import type { Metadata } from "next";
import { Suspense } from "react";
import PageHero from "@/components/ui/PageHero";
import ContactForm from "./ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contáctenos: dudas, envíos y pedidos",
  description:
    "¿Tienes dudas o quieres un perchero personalizado? Escríbenos y te contactaremos lo más pronto. Atención al cliente de Percheros Decorativos.",
  alternates: { canonical: "/contacto" },
};

export default function ContactoPage() {
  return (
    <>
      <PageHero
        eyebrow="Estamos para ayudarte"
        title="Contáctenos"
        subtitle="Escríbenos y nos contactaremos lo más pronto posible."
        breadcrumb={[{ label: "Inicio", href: "/" }, { label: "Contáctenos" }]}
      />

      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Suspense fallback={<p>Cargando formulario…</p>}>
              <ContactForm />
            </Suspense>
          </div>

          <aside className="h-fit space-y-4 rounded-2xl border border-madera-100 bg-crema-100 p-6">
            <h2 className="font-display text-lg font-semibold text-madera-800">
              Datos de contacto
            </h2>
            <div className="text-sm">
              <p className="font-semibold text-madera-700">Correo</p>
              <a href={`mailto:${site.email}`} className="text-terracota-600 hover:underline">
                {site.email}
              </a>
            </div>
            <div className="text-sm">
              <p className="font-semibold text-madera-700">Teléfono / WhatsApp</p>
              <a href={`tel:${site.phone}`} className="text-terracota-600 hover:underline">
                {site.phoneDisplay}
              </a>
            </div>
            <div className="text-sm">
              <p className="font-semibold text-madera-700">Cobertura</p>
              <p className="text-carbon/70">Envíos a todo Colombia 🇨🇴</p>
            </div>
            <a
              href={site.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90"
            >
              Escribir por WhatsApp
            </a>
          </aside>
        </div>
      </section>
    </>
  );
}
