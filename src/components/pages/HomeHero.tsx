import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";

// Hero cálido, fiel al PDF (rojo protagonista + percheros reales).
// Entrada por CSS (.hero-rise) → siempre visible, sin depender de JS.
const extras = ["Funcionales", "Resilientes", "Personalizados"];

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-rojo-50 via-white to-crema-50">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 md:grid-cols-2 md:py-16">
        <div>
          <p
            className="hero-rise inline-flex items-center gap-2 rounded-full bg-rojo-500 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-white"
            style={{ animationDelay: "0.05s" }}
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
            Emprendimiento artesanal 100% colombiano
          </p>

          <h1
            className="hero-rise mt-5 font-display text-4xl font-extrabold leading-[1.05] text-carbon sm:text-6xl"
            style={{ animationDelay: "0.12s" }}
          >
            Percheros
            <br />
            Útiles y <span className="text-rojo-500">Decorativos</span>
          </h1>

          <p
            className="hero-rise mt-5 max-w-md text-lg text-gris"
            style={{ animationDelay: "0.2s" }}
          >
            Fabricados a mano en madera y MDF, con diferentes diseños y herrajes
            para organizar todo tu hogar con estilo.
          </p>

          <div
            className="hero-rise mt-7 flex flex-wrap gap-3"
            style={{ animationDelay: "0.28s" }}
          >
            <ButtonLink href="/categorias" size="lg" className="shimmer relative overflow-hidden">
              Ver categorías
            </ButtonLink>
            <ButtonLink href="/contacto" variant="outline" size="lg">
              Contáctanos
            </ButtonLink>
          </div>

          <div
            className="hero-rise mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold text-carbon"
            style={{ animationDelay: "0.36s" }}
          >
            <span className="text-gris">También:</span>
            {extras.map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5">
                <span className="text-rojo-500">✦</span> Útiles y {t}
              </span>
            ))}
          </div>
        </div>

        {/* Collage de percheros reales */}
        <div
          className="hero-rise grid grid-cols-2 gap-3"
          style={{ animationDelay: "0.2s" }}
        >
          <div
            className="animate-float col-span-2 overflow-hidden rounded-2xl border-4 border-white shadow-xl ring-1 ring-rojo-100 transition-transform duration-500 hover:scale-[1.02]"
            style={{ animationDelay: "0s" }}
          >
            <div className="relative aspect-[16/9]">
              <Image
                src="/img/products/perchero-ciudad-noche.webp"
                alt="Perchero decorativo con paisaje de ciudad de noche"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
          <div
            className="animate-float overflow-hidden rounded-2xl border-4 border-white shadow-lg ring-1 ring-rojo-100 transition-transform duration-500 hover:scale-[1.03]"
            style={{ animationDelay: "1.4s" }}
          >
            <div className="relative aspect-square">
              <Image
                src="/img/products/perchero-huellas.webp"
                alt="Perchero decorativo para mascotas"
                fill
                sizes="20vw"
                className="object-cover"
              />
            </div>
          </div>
          <div
            className="animate-float overflow-hidden rounded-2xl border-4 border-white shadow-lg ring-1 ring-rojo-100 transition-transform duration-500 hover:scale-[1.03]"
            style={{ animationDelay: "2.6s" }}
          >
            <div className="relative aspect-square">
              <Image
                src="/img/products/perchero-ktm.webp"
                alt="Perchero decorativo temática motera"
                fill
                sizes="20vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
