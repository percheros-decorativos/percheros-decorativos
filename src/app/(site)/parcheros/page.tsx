import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Parcheros: nuestra comunidad de salidas",
  description:
    "Únete a las salidas de Parcheros de Percheros Decorativos: moteros, bike y mascotas. Vive la pasión por las carreteras y la aventura con seguridad y respeto.",
  alternates: { canonical: "/parcheros" },
};

const salidas = [
  {
    title: "Parcheros Moteros",
    text: "Vive la pasión por las carreteras y las actividades relacionadas con las motocicletas, fomentando la seguridad, solidaridad, colaboración y respeto.",
  },
  {
    title: "Parcheros Bike",
    text: "Si te gusta el deporte, la cultura bici, salir a rodar y disfrutar de los paisajes, puedes hacer parte de nuestras salidas en una sana aventura.",
  },
  {
    title: "Parcheros Mascotas",
    text: "Salidas pensadas para compartir con tu mejor amigo de cuatro patas y otros amantes de las mascotas.",
  },
];

export default function ParcherosPage() {
  return (
    <>
      <PageHero
        eyebrow="Comunidad"
        title="Parcheros"
        subtitle="¡Únete a cualquiera de nuestras salidas según tu pasión y desparcha! Aventura sana, seguridad y buena compañía."
        breadcrumb={[{ label: "Inicio", href: "/" }, { label: "Parcheros" }]}
      />

      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-6 md:grid-cols-3">
          {salidas.map((s) => (
            <article
              key={s.title}
              className="rounded-2xl border border-madera-100 bg-white p-6 shadow-sm"
            >
              <h2 className="font-display text-xl font-semibold text-madera-800">
                {s.title}
              </h2>
              <p className="mt-3 text-sm text-carbon/70">{s.text}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-3xl bg-bosque-500 p-8 text-center text-crema-100">
          <h2 className="font-display text-2xl font-bold text-white">
            ¿Quieres unirte?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-crema-100/90">
            Diligencia el formulario y nos pondremos en contacto contigo para que
            seas parte de nuestras próximas salidas.
          </p>
          <ButtonLink
            href="/contacto?asunto=parcheros"
            className="mt-5"
          >
            Quiero unirme
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
