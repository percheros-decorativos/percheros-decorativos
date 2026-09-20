import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import ServiceExpand from "@/components/pages/ServiceExpand";
import { Wrench, PackageOpen } from "lucide-react";
import { INSTALLATION_SERVICE_COP } from "@/lib/addons";
import { formatCop } from "@/lib/money";

export const metadata: Metadata = {
  title: "Servicios: instalación, armado a domicilio, bike y mascotas",
  description:
    "Servicios de Percheros Decorativos: instalación profesional del perchero, armado e instalación de mobiliario a domicilio, asistencia técnica para ciclistas y paseo/cuidado profesional de mascotas.",
  alternates: { canonical: "/servicios" },
};

const titleClass =
  "font-display text-xl font-extrabold tracking-tight text-rojo-600";

const cardClass =
  "flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_20px_35px_-15px_rgba(0,0,0,0.3)] transition-transform duration-300 hover:-translate-y-1";

export default function ServiciosPage() {
  return (
    <>
      <PageHero
        eyebrow="Comunidad"
        title="Servicios"
        subtitle="Instalación de tu perchero, armado a domicilio, asistencia para ciclistas y paseo de mascotas: seguridad y compañía en cada servicio."
        breadcrumb={[{ label: "Inicio", href: "/" }, { label: "Servicios" }]}
        bgImage="/img/parcheros/banner.webp"
      />

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* ===== Instalación de Percheros ===== */}
          <article className={cardClass}>
            <div className="relative aspect-[4/3] overflow-hidden bg-crema-100">
              <Image
                src="/img/servicios/instalacion-cutout.webp"
                alt="Técnico instalando un perchero decorativo"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-contain object-bottom p-2"
              />
            </div>
            <div className="flex flex-1 flex-col p-6 text-sm leading-relaxed text-carbon/80">
              <div className="flex min-h-[5.25rem] items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center text-rojo-600">
                  <Wrench size={28} />
                </span>
                <h2 className={titleClass}>Instalación de Percheros</h2>
              </div>
              <div className="mt-4">
                <ServiceExpand
                  summary={`Instalación por ${formatCop(INSTALLATION_SERVICE_COP)}`}
                  className="min-h-[4.5rem]"
                >
                  <p>
                    Te ofrecemos nuestro servicio de instalación de forma
                    segura y confiable, con calidad y durabilidad, de manera
                    cumplida y eficiente.
                  </p>
                  <p className="mt-4 text-center font-semibold text-madera-800">
                    ¿Qué incluye?
                  </p>
                  <ul className="mt-2 list-disc space-y-2 pl-5">
                    <li>
                      Anclaje firme según el tipo de pared (concreto,
                      ladrillo o drywall).
                    </li>
                    <li>Nivelación y ubicación a la altura ideal.</li>
                    <li>
                      Herramientas y anclajes incluidos en el servicio.
                    </li>
                  </ul>
                  <p className="mt-4 text-center text-xs text-carbon/60">
                    Puedes agregarlo directamente al pagar tu pedido, o
                    escribirnos para coordinarlo.
                  </p>
                </ServiceExpand>
              </div>
              <div className="mt-auto pt-6 text-center">
                <ButtonLink
                  href="/contacto?asunto=instalacion"
                  variant="dark"
                  className="w-full"
                >
                  Solicitar Instalación
                </ButtonLink>
              </div>
            </div>
          </article>

          {/* ===== Armado e Instalación a Domicilio ===== */}
          <article className={cardClass}>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/img/servicios/armado-domicilio.webp"
                alt="Hombre armando una estantería de madera en casa"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col p-6 text-sm leading-relaxed text-carbon/80">
              <div className="flex min-h-[5.25rem] items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center text-rojo-600">
                  <PackageOpen size={28} />
                </span>
                <h2 className={titleClass}>
                  Armado a Domicilio
                </h2>
              </div>
              <div className="mt-4">
                <ServiceExpand
                  summary="Servicio de Armado a Domicilio"
                  className="min-h-[4.5rem]"
                >
                  <p>
                    ¿Prefieres dejar el armado en manos de expertos? Te
                    ofrecemos nuestro servicio de montaje e instalación
                    profesional a domicilio para que no tengas que
                    preocuparte por nada.
                  </p>
                  <p className="mt-4 text-center font-semibold text-madera-800">
                    TARIFAS ARMADO:
                  </p>
                  <ul className="mt-2 space-y-2 text-center">
                    <li>
                      <strong>Servicios básicos</strong> (muebles pequeños y
                      livianos):
                      <br />$ 35.000 – $ 50.000
                    </li>
                    <li>
                      <strong>Muebles medianos</strong> (armado intermedio):
                      <br />$ 50.000 – $ 85.000
                    </li>
                    <li>
                      <strong>Muebles grandes o complejos</strong>:
                      <br />$ 85.000 – $ 150.000+
                    </li>
                  </ul>
                  <p className="mt-2 text-center text-xs text-carbon/60">
                    El valor final depende del tamaño y la complejidad del
                    mueble.
                  </p>
                  <p className="mt-4 text-center font-semibold text-madera-800">
                    ¿Qué incluye?
                  </p>
                  <ul className="mt-2 list-disc space-y-2 pl-5">
                    <li>
                      <strong>Fácil y rápido:</strong> coordinamos la visita
                      en el día y horario que mejor te convenga.
                    </li>
                    <li>
                      <strong>Garantía y seguridad:</strong> instalación
                      impecable, firme y lista para usar desde el primer
                      momento.
                    </li>
                    <li>
                      <strong>Sin enredos:</strong> nos encargamos de dejar
                      tu espacio ordenado y listo para disfrutar.
                    </li>
                  </ul>
                </ServiceExpand>
              </div>
              <div className="mt-auto pt-6 text-center">
                <ButtonLink
                  href="/contacto?asunto=armado"
                  variant="dark"
                  className="w-full"
                >
                  Solicitar Armado
                </ButtonLink>
              </div>
            </div>
          </article>

          {/* ===== Asistencia Bike ===== */}
          <article className={cardClass}>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/img/servicios/grua-bici-2.webp"
                alt="Recogida de bicicleta en portabicicletas de vehículo"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col p-6 text-sm leading-relaxed text-carbon/80">
              <div className="flex min-h-[5.25rem] items-center gap-3">
                <Image
                  src="/img/categories/bike.webp"
                  alt=""
                  width={40}
                  height={40}
                  className="h-10 w-10 shrink-0"
                />
                <h2 className={titleClass}>
                  Asistencia
                  <br />
                  Bike
                </h2>
              </div>
              <div className="mt-4">
                <ServiceExpand
                  summary="Servicio Asistencia Bike"
                  className="min-h-[4.5rem]"
                >
                  <p className="text-center font-semibold text-madera-800">
                    TARIFAS BIKE:
                  </p>
                  <p className="mt-1">
                    Servicio de grúa, recogida o retorno bike:
                  </p>
                  <ul className="mt-2 space-y-2 text-center">
                    <li>
                      <strong>Perímetro urbano</strong> (un trayecto):
                      <br />
                      $ 40.000 (1 bici) · $ 60.000 (2 bicis)
                    </li>
                    <li>
                      <strong>Perímetro rural</strong> (un trayecto):
                      <br />
                      $ 60.000 (1 bici) · $ 90.000 (2 bicis)
                    </li>
                  </ul>
                  <p className="mt-2 text-center text-xs text-carbon/60">
                    Los precios pueden variar según kilometraje y peajes.
                  </p>
                  <p className="mt-4 text-center font-semibold text-madera-800">
                    ¿Qué incluye?
                  </p>
                  <ul className="mt-2 list-disc space-y-2 pl-5">
                    <li>
                      Recogida con amarre y protección especial para no rayar
                      el marco o componentes.
                    </li>
                    <li>
                      Traslado de la bicicleta y ciclista hasta tu punto de
                      residencia o taller de confianza.
                    </li>
                    <li>
                      Herramientas básicas de emergencia (si el problema es
                      solucionable en ruta).
                    </li>
                  </ul>
                </ServiceExpand>
              </div>
              <div className="mt-auto pt-6 text-center">
                <ButtonLink
                  href="/contacto?asunto=bike"
                  variant="dark"
                  className="w-full"
                >
                  Solicitar Asistencia
                </ButtonLink>
              </div>
            </div>
          </article>

          {/* ===== Paseo Mascotas ===== */}
          <article className={cardClass}>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/img/servicios/paseo-canino-1.webp"
                alt="Paseador con varios perros en caminata grupal"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col p-6 text-sm leading-relaxed text-carbon/80">
              <div className="flex min-h-[5.25rem] items-center gap-3">
                <Image
                  src="/img/categories/mascotas.webp"
                  alt=""
                  width={40}
                  height={40}
                  className="h-10 w-10 shrink-0"
                />
                <h2 className={titleClass}>Paseo Mascotas</h2>
              </div>
              <div className="mt-4">
                <ServiceExpand
                  summary="Servicio Paseo Mascotas"
                  className="min-h-[4.5rem]"
                >
                  <p>
                    Percheros organizadores para correas, pecheras y
                    dispensadores de bolsas; servicio de paseos programados,
                    &ldquo;Caminatas Caninas&rdquo;, adiestramiento básico e
                    hidratación para la mascota.
                  </p>
                  <p className="mt-4 text-center font-semibold text-madera-800">
                    TARIFAS MASCOTAS:
                  </p>
                  <ol className="mt-2 list-decimal space-y-2 pl-5">
                    <li>
                      Paseo x día personalizado + hidratación (1 hora) = $
                      15.000
                    </li>
                    <li>
                      Paseo grupal (máx. 6 mascotas) + hidratación (1 hora) =
                      $ 8.000 x mascota
                    </li>
                    <li>
                      Paseo mensual personalizado + hidratación (4
                      días/semana, 1 hora) = $ 160.000
                    </li>
                  </ol>
                  <p className="mt-4 text-center font-semibold text-madera-800">
                    ¿Qué incluye?
                  </p>
                  <ul className="mt-2 list-disc space-y-2 pl-5">
                    <li>
                      Caminata o recorrido seguro de 50 a 60 minutos,
                      adaptado al ritmo de tu perro.
                    </li>
                    <li>
                      Refuerzo de comandos básicos (servicio personalizado).
                    </li>
                    <li>
                      Fotos/videos de la actividad y ubicación durante el
                      recorrido.
                    </li>
                  </ul>
                </ServiceExpand>
              </div>
              <div className="mt-auto pt-6 text-center">
                <ButtonLink
                  href="/contacto?asunto=mascotas"
                  variant="dark"
                  className="w-full"
                >
                  Agendar Paseo
                </ButtonLink>
              </div>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
