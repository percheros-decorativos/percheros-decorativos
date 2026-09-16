import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { Baby, HeartHandshake } from "lucide-react";

export const metadata: Metadata = {
  title: "Comunidad: obras sociales y compromiso",
  description:
    "Percheros Decorativos está comprometido con obras sociales para hogares geriátricos, infantiles y personas en situación de vulnerabilidad. Conoce cómo apoyamos.",
  alternates: { canonical: "/comunidad" },
};

export default function ComunidadPage() {
  return (
    <>
      <PageHero
        eyebrow="Nuestro compromiso"
        title="Comunidad"
        subtitle="Por nuestros abuel@s, niñ@s y personas vulnerables."
        breadcrumb={[{ label: "Inicio", href: "/" }, { label: "Comunidad" }]}
        bgImage="/img/obras-sociales/banner.webp"
      />

      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="mx-auto max-w-3xl space-y-4 text-center text-carbon/80">
          <p>
            Percheros Decorativos está comprometido en realizar diferentes obras
            sociales en situaciones de vulnerabilidad: <strong>hogares
            geriátricos, infantiles</strong> y personas con algún tipo de
            discapacidad o enfermedad.
          </p>
          <p>
            Brindamos asesoría jurídica en derechos fundamentales y dignidad
            humana, con el objetivo de ofrecer colaboración, solidaridad y
            esperanza a quienes más lo necesitan, con el apoyo de nuestros
            clientes.
          </p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-crema-200">
            <div className="h-1.5 bg-gradient-to-r from-sky-400 to-sky-600" />
            <div className="relative aspect-[3/2] overflow-hidden">
              <Image
                src="/img/obras/infancia-futuro.webp"
                alt="Percheros Decorativos con niños y niñas — Infancia con Futuro"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <p className="text-sm leading-relaxed text-carbon/80">
                <strong className="text-rojo-600">Percheros Decorativos</strong>{" "}
                está comprometido en realizar diferentes obras sociales en
                situaciones de vulnerabilidad; hogares geriátricos, infantiles,
                personas con algún tipo de discapacidad o enfermedad.
              </p>
              <div className="mt-4 flex items-start gap-3 border-t border-crema-100 pt-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                  <Baby size={18} />
                </span>
                <p className="text-sm leading-relaxed text-carbon/80">
                  <strong className="text-carbon">Infancia con Futuro:</strong>{" "}
                  Acompañamos a nuestros niños y niñas brindándoles herramientas
                  para su desarrollo, espacios seguros y oportunidades que
                  impulsen sus sueños desde sus primeros años.
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-crema-200">
            <div className="h-1.5 bg-gradient-to-r from-amber-400 to-amber-600" />
            <div className="relative aspect-[3/2] overflow-hidden">
              <Image
                src="/img/obras/adultos-mayores.webp"
                alt="Percheros Decorativos con adultos mayores — Dignidad para nuestros Adultos Mayores"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <p className="text-sm leading-relaxed text-carbon/80">
                Brindamos <strong className="text-rojo-600">asesoría jurídica</strong>{" "}
                en los derechos fundamentales y dignidad humana con el objetivo
                de ofrecer colaboración, solidaridad y esperanza a quienes más
                lo necesiten, con el apoyo de nuestros clientes.
              </p>
              <div className="mt-4 flex items-start gap-3 border-t border-crema-100 pt-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                  <HeartHandshake size={18} />
                </span>
                <p className="text-sm leading-relaxed text-carbon/80">
                  <strong className="text-carbon">
                    Dignidad para nuestros Adultos Mayores:
                  </strong>{" "}
                  Honramos la sabiduría de la tercera edad con actividades de
                  integración, cuidado y programas de bienestar que aseguran
                  una etapa senior plena y respetada.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          id="clasificados"
          className="mt-14 scroll-mt-24 rounded-3xl bg-crema-100 p-6 md:p-10"
        >
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl font-semibold text-madera-800">
                Clasificados sociales
              </h2>
              <p className="mt-3 text-carbon/80">
                En este espacio damos a conocer diferentes clasificados
                sociales, con el objetivo de que alguna persona pueda
                colaborar para mejorar la calidad de vida de quien lo
                necesita, sin ánimo de lucro.
              </p>
              <ButtonLink
                href="/contacto?asunto=comunidad"
                variant="green"
                className="mt-6"
              >
                Quiero colaborar
              </ButtonLink>
            </div>
            <div className="relative mx-auto h-[300px] w-full max-w-sm sm:h-[360px]">
              <div className="hover-lift absolute left-0 top-0 h-56 w-44 overflow-hidden rounded-2xl shadow-lg ring-1 ring-crema-200 sm:h-64 sm:w-52">
                <Image
                  src="/img/obras/clasificados-silla.webp"
                  alt="Clasificados de obras sociales — silla de ruedas"
                  fill
                  sizes="210px"
                  className="object-cover"
                />
              </div>
              <div className="hover-lift absolute bottom-0 left-20 h-48 w-36 overflow-hidden rounded-2xl shadow-lg ring-1 ring-crema-200 sm:left-28 sm:h-56 sm:w-44">
                <Image
                  src="/img/obras/clasificados-acompanante.webp"
                  alt="Clasificados de obras sociales — acompañante con silla de ruedas"
                  fill
                  sizes="180px"
                  className="object-cover"
                />
              </div>
              <div className="hover-lift absolute bottom-2 right-0 h-48 w-36 overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-crema-200 sm:h-56 sm:w-40">
                <Image
                  src="/img/obras/clasificados-andador.webp"
                  alt="Clasificados de obras sociales — andador"
                  fill
                  sizes="160px"
                  className="object-contain p-2"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
