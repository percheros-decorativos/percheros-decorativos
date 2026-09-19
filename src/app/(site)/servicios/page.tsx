import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import ServiceExpand from "@/components/pages/ServiceExpand";

export const metadata: Metadata = {
  title: "Servicios: asistencia bike y paseo de mascotas",
  description:
    "Servicios de Percheros Decorativos: asistencia técnica para ciclistas y paseo/cuidado profesional de mascotas. Tarifas y qué incluye cada servicio.",
  alternates: { canonical: "/servicios" },
};

const cardClass =
  "flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_20px_35px_-15px_rgba(0,0,0,0.3)] transition-transform duration-300 hover:-translate-y-1";

export default function ServiciosPage() {
  return (
    <>
      <PageHero
        eyebrow="Comunidad"
        title="Servicios"
        subtitle="Asistencia para ciclistas y paseo de mascotas: seguridad y compañía en cada salida."
        breadcrumb={[{ label: "Inicio", href: "/" }, { label: "Servicios" }]}
        bgImage="/img/parcheros/banner.webp"
      />

      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="grid items-start gap-6 sm:grid-cols-2">
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
              <div className="flex items-center gap-3">
                <Image
                  src="/img/categories/bike.webp"
                  alt=""
                  width={40}
                  height={40}
                  className="h-10 w-10 shrink-0"
                />
                <h2 className="font-display text-lg font-semibold text-madera-800">
                  Asistencia Bike
                </h2>
              </div>
              <div className="mt-4">
                <ServiceExpand summary="Servicio Asistencia Bike">
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
              <div className="flex items-center gap-3">
                <Image
                  src="/img/categories/mascotas.webp"
                  alt=""
                  width={40}
                  height={40}
                  className="h-10 w-10 shrink-0"
                />
                <h2 className="font-display text-lg font-semibold text-madera-800">
                  Paseo Mascotas
                </h2>
              </div>
              <div className="mt-4">
                <ServiceExpand summary="Servicio Paseo Mascotas">
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
