import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Servicios: Parcheros, asistencia bike y paseo de mascotas",
  description:
    "Servicios de Percheros Decorativos: salidas Parcheros moteras, asistencia técnica para ciclistas y paseo/cuidado de mascotas. Tarifas y qué incluye cada servicio.",
  alternates: { canonical: "/servicios" },
};

export default function ServiciosPage() {
  return (
    <>
      <PageHero
        eyebrow="Comunidad"
        title="Servicios"
        subtitle="Salidas Parcheros, asistencia para ciclistas y paseo de mascotas: aventura, seguridad y compañía."
        breadcrumb={[{ label: "Inicio", href: "/" }, { label: "Servicios" }]}
        bgImage="/img/parcheros/banner.webp"
      />

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-6 md:grid-cols-3">
          {/* ===== Salidas Moter@s ===== */}
          <article className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_8px_24px_-8px_rgba(0,0,0,0.15)]">
            <div className="flex items-center justify-center gap-2 bg-rojo-500 px-4 py-3">
              <Image
                src="/img/categories/moteros.webp"
                alt=""
                width={28}
                height={28}
                className="h-7 w-7 brightness-0 invert"
              />
              <h2 className="font-display text-lg font-bold text-white">
                Salidas Moter@s
              </h2>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <p className="text-sm leading-relaxed text-carbon/80">
                Venta de percheros temáticos para cascos y accesorios; servicio
                de personalización de percheros con la marca o modelo de la
                moto.
              </p>
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

          {/* ===== Servicio Bike ===== */}
          <article className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_8px_24px_-8px_rgba(0,0,0,0.15)]">
            <div className="flex items-center justify-center gap-2 bg-rojo-500 px-4 py-3">
              <Image
                src="/img/categories/bike.webp"
                alt=""
                width={28}
                height={28}
                className="h-7 w-7 brightness-0 invert"
              />
              <h2 className="font-display text-lg font-bold text-white">
                Servicio Bike
              </h2>
            </div>
            <div className="flex flex-1 flex-col p-6 text-sm leading-relaxed text-carbon/80">
              <p className="text-center font-bold text-madera-900">
                SERVICIO ASISTENCIA BIKE
              </p>
              <p className="mt-3 text-center font-semibold text-madera-800">
                TARIFAS BIKE:
              </p>
              <p className="mt-1">Servicio de grúa, recogida o retorno bike:</p>
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
                  Recogida con amarre y protección especial para no rayar el
                  marco o componentes.
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

          {/* ===== Servicios/Accesorios Mascotas ===== */}
          <article className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_8px_24px_-8px_rgba(0,0,0,0.15)]">
            <div className="flex items-center justify-center gap-2 bg-rojo-500 px-4 py-3">
              <Image
                src="/img/categories/mascotas.webp"
                alt=""
                width={28}
                height={28}
                className="h-7 w-7 brightness-0 invert"
              />
              <h2 className="font-display text-lg font-bold text-white">
                Servicios/Accesorios Mascotas
              </h2>
            </div>
            <div className="flex flex-1 flex-col p-6 text-sm leading-relaxed text-carbon/80">
              <p>
                Percheros organizadores para correas, pecheras y dispensadores
                de bolsas; servicio de paseos programados, &ldquo;Caminatas
                Caninas&rdquo;, adiestramiento básico e hidratación para la
                mascota.
              </p>
              <p className="mt-4 text-center font-bold text-madera-900">
                SERVICIO PASEO MASCOTAS
              </p>
              <p className="mt-3 text-center font-semibold text-madera-800">
                TARIFAS MASCOTAS:
              </p>
              <ol className="mt-2 list-decimal space-y-2 pl-5">
                <li>
                  Paseo x día personalizado + hidratación (1 hora) = $ 15.000
                </li>
                <li>
                  Paseo grupal (máx. 6 mascotas) + hidratación (1 hora) = $
                  8.000 x mascota
                </li>
                <li>
                  Paseo mensual personalizado + hidratación (4 días/semana, 1
                  hora) = $ 160.000
                </li>
              </ol>
              <p className="mt-4 text-center font-semibold text-madera-800">
                ¿Qué incluye?
              </p>
              <ul className="mt-2 list-disc space-y-2 pl-5">
                <li>
                  Caminata o recorrido seguro de 50 a 60 minutos, adaptado al
                  ritmo de tu perro.
                </li>
                <li>
                  Refuerzo de comandos básicos (servicio personalizado).
                </li>
                <li>
                  Fotos/videos de la actividad y ubicación durante el
                  recorrido.
                </li>
              </ul>
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

        <div className="mt-10 rounded-3xl bg-bosque-500 p-8 text-center text-crema-100">
          <h2 className="font-display text-2xl font-bold text-white">
            ¿Quieres unirte?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-crema-100/90">
            Diligencia el formulario y nos pondremos en contacto contigo para
            que seas parte de nuestras próximas salidas o agendes tu servicio.
          </p>
          <ButtonLink href="/contacto?asunto=servicios" className="mt-5">
            Quiero unirme
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
