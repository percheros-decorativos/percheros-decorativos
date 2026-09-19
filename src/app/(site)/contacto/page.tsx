import type { Metadata } from "next";
import { Suspense } from "react";
import PageHero from "@/components/ui/PageHero";
import ContactForm from "./ContactForm";
import { site } from "@/lib/site";
import {
  MailIcon,
  PhoneIcon,
  TruckIcon,
  SupportIcon,
  ToolIcon,
  ClockIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Contáctenos: dudas, envíos y pedidos",
  description:
    "¿Tienes dudas o quieres un perchero personalizado? Escríbenos y te contactaremos lo más pronto. Atención al cliente de Percheros Decorativos.",
  alternates: { canonical: "/contacto" },
};

const trust = [
  {
    icon: ClockIcon,
    title: "Respuesta rápida",
    text: "Normalmente en menos de 24 horas hábiles.",
  },
  {
    icon: SupportIcon,
    title: "Atención personalizada",
    text: "Te ayudamos a elegir o diseñar tu perchero ideal.",
  },
  {
    icon: TruckIcon,
    title: "Envíos a toda Colombia",
    text: "Despachamos a cualquier ciudad del país.",
  },
];

export default function ContactoPage() {
  return (
    <>
      <PageHero
        eyebrow="Estamos para ayudarte"
        title="Contáctenos"
        subtitle="Escríbenos y nos contactaremos lo más pronto posible."
        breadcrumb={[{ label: "Inicio", href: "/" }, { label: "Contáctenos" }]}
        bgImage="/img/contacto/banner.webp"
      />

      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-4 sm:grid-cols-3">
          {trust.map((t) => (
            <div
              key={t.title}
              className="flex items-center gap-3 rounded-2xl bg-crema-50 p-4"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rojo-500 text-white">
                <t.icon width={19} height={19} />
              </span>
              <span>
                <span className="block text-sm font-bold text-madera-900">
                  {t.title}
                </span>
                <span className="block text-xs text-carbon/60">{t.text}</span>
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Suspense fallback={<p>Cargando formulario…</p>}>
              <ContactForm />
            </Suspense>
          </div>

          <aside className="h-fit space-y-5 rounded-3xl bg-madera-800 p-6 text-crema-50 sm:p-7">
            <div>
              <h2 className="font-display text-lg font-bold text-white">
                Datos de contacto
              </h2>
              <p className="mt-1 text-sm text-crema-50/70">
                También puedes escribirnos directo por estos medios.
              </p>
            </div>

            <a
              href={`mailto:${site.email}`}
              className="flex items-start gap-3 rounded-2xl bg-white/5 p-3.5 transition-colors hover:bg-white/10"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-rojo-300">
                <MailIcon width={16} height={16} />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-semibold uppercase tracking-wide text-crema-50/60">
                  Correo
                </span>
                <span className="block break-all text-sm font-medium text-white">
                  {site.email}
                </span>
              </span>
            </a>

            <a
              href={`tel:${site.phone}`}
              className="flex items-start gap-3 rounded-2xl bg-white/5 p-3.5 transition-colors hover:bg-white/10"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-rojo-300">
                <PhoneIcon width={15} height={15} />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-semibold uppercase tracking-wide text-crema-50/60">
                  Teléfono / WhatsApp
                </span>
                <span className="block text-sm font-medium text-white">
                  {site.phoneDisplay}
                </span>
              </span>
            </a>

            <div className="flex items-start gap-3 rounded-2xl bg-white/5 p-3.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-rojo-300">
                <ToolIcon width={16} height={16} />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-semibold uppercase tracking-wide text-crema-50/60">
                  Cobertura
                </span>
                <span className="block text-sm font-medium text-white">
                  Envíos a todo Colombia 🇨🇴
                </span>
              </span>
            </div>

            <a
              href={site.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-bold text-white shadow-md transition-transform hover:scale-[1.02] hover:opacity-95"
            >
              <WhatsAppIcon width={18} height={18} />
              Escribir por WhatsApp
            </a>
          </aside>
        </div>
      </section>
    </>
  );
}
