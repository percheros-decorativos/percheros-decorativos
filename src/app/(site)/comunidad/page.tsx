import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import ServiceExpand from "@/components/pages/ServiceExpand";
import { Baby, HeartHandshake, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Comunidad: obras sociales, clasificados y salidas Parcheros",
  description:
    "Percheros Decorativos está comprometido con obras sociales para hogares geriátricos, infantiles y personas en situación de vulnerabilidad, clasificados solidarios y salidas Parcheros con la comunidad motera.",
  alternates: { canonical: "/comunidad" },
};

const cardClass =
  "flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_20px_35px_-15px_rgba(0,0,0,0.3)] transition-transform duration-300 hover:-translate-y-1";

export default function ComunidadPage() {
  return (
    <>
      <PageHero
        eyebrow="Nuestro compromiso"
        title="Comunidad"
        subtitle="Por nuestros abuel@s, niñ@s, personas vulnerables y toda la comunidad Parchera."
        breadcrumb={[{ label: "Inicio", href: "/" }, { label: "Comunidad" }]}
        bgImage="/img/obras-sociales/banner.webp"
      />

      <section className="mx-auto max-w-6xl px-4 py-12">
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

        <div className="mt-10 grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* ===== Infancia con Futuro ===== */}
          <article className={cardClass}>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/img/obras/infancia-futuro.webp"
                alt="Percheros Decorativos con niños y niñas — Infancia con Futuro"
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <div className="flex min-h-14 items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center text-madera-800">
                  <Baby size={28} />
                </span>
                <h2 className="font-display text-lg font-semibold text-madera-800">
                  Infancia con Futuro
                </h2>
              </div>
              <div className="mt-4">
                <ServiceExpand
                  summary="Acompañamiento a niños y niñas en vulnerabilidad"
                  className="min-h-12"
                >
                  <p className="text-sm leading-relaxed text-carbon/80">
                    Acompañamos a nuestros niños y niñas brindándoles
                    herramientas para su desarrollo, espacios seguros y
                    oportunidades que impulsen sus sueños desde sus primeros
                    años.
                  </p>
                </ServiceExpand>
              </div>
              <div className="mt-auto pt-6 text-center">
                <ButtonLink
                  href="/contacto?asunto=comunidad"
                  variant="dark"
                  className="w-full"
                >
                  Quiero colaborar
                </ButtonLink>
              </div>
            </div>
          </article>

          {/* ===== Dignidad para Adultos Mayores ===== */}
          <article className={cardClass}>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/img/obras/adultos-mayores.webp"
                alt="Percheros Decorativos con adultos mayores — Dignidad para nuestros Adultos Mayores"
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <div className="flex min-h-14 items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center text-madera-800">
                  <HeartHandshake size={28} />
                </span>
                <h2 className="font-display text-lg font-semibold text-madera-800">
                  Adultos Mayores
                </h2>
              </div>
              <div className="mt-4">
                <ServiceExpand
                  summary="Asesoría jurídica y dignidad para la tercera edad"
                  className="min-h-12"
                >
                  <p className="text-sm leading-relaxed text-carbon/80">
                    Brindamos asesoría jurídica en los derechos fundamentales y
                    dignidad humana, y honramos la sabiduría de la tercera edad
                    con actividades de integración, cuidado y programas de
                    bienestar que aseguran una etapa senior plena y respetada.
                  </p>
                </ServiceExpand>
              </div>
              <div className="mt-auto pt-6 text-center">
                <ButtonLink
                  href="/contacto?asunto=comunidad"
                  variant="dark"
                  className="w-full"
                >
                  Quiero colaborar
                </ButtonLink>
              </div>
            </div>
          </article>

          {/* ===== Clasificados Sociales ===== */}
          <article id="clasificados" className={`scroll-mt-24 ${cardClass}`}>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/img/obras/clasificados-silla.webp"
                alt="Clasificados sociales — silla de ruedas"
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <div className="flex min-h-14 items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center text-madera-800">
                  <Users size={28} />
                </span>
                <h2 className="font-display text-lg font-semibold text-madera-800">
                  Clasificados Sociales
                </h2>
              </div>
              <div className="mt-4">
                <ServiceExpand
                  summary="Clasificados solidarios sin ánimo de lucro"
                  className="min-h-12"
                >
                  <p className="text-sm leading-relaxed text-carbon/80">
                    En este espacio damos a conocer diferentes clasificados
                    sociales, con el objetivo de que alguna persona pueda
                    colaborar para mejorar la calidad de vida de quien lo
                    necesita, sin ánimo de lucro.
                  </p>
                </ServiceExpand>
              </div>
              <div className="mt-auto pt-6 text-center">
                <ButtonLink
                  href="/contacto?asunto=comunidad"
                  variant="dark"
                  className="w-full"
                >
                  Quiero colaborar
                </ButtonLink>
              </div>
            </div>
          </article>

          {/* ===== Salidas Moter@ ===== */}
          <article className={cardClass}>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/img/servicios/salidas-moteras-2.webp"
                alt="Grupo de moteros rodando al atardecer"
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <div className="flex min-h-14 items-center gap-3">
                <Image
                  src="/img/categories/moteros.webp"
                  alt=""
                  width={40}
                  height={40}
                  className="h-10 w-10 shrink-0"
                />
                <h2 className="font-display text-lg font-semibold text-madera-800">
                  Salidas Moter@
                </h2>
              </div>
              <div className="mt-4">
                <ServiceExpand
                  summary="Percheros temáticos para casco y accesorios"
                  className="min-h-12"
                >
                  <p className="text-sm leading-relaxed text-carbon/80">
                    Venta de percheros temáticos para cascos y accesorios;
                    servicio de personalización de percheros con la marca o
                    modelo de la moto.
                  </p>
                </ServiceExpand>
              </div>
              <div className="mt-auto pt-6 text-center">
                <ButtonLink
                  href="/contacto?asunto=moteros"
                  variant="dark"
                  className="w-full"
                >
                  Unirme a Salidas
                </ButtonLink>
              </div>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
