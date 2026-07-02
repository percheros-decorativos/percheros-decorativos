import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { site } from "@/lib/site";
import { ciudades } from "@/lib/seo-locations";
import { WhatsAppIcon, FacebookIcon, InstagramIcon, MailIcon } from "@/components/ui/icons";

const cols = [
  {
    title: "Percheros",
    links: [
      { label: "Inicio", href: "/" },
      { label: "Categorías", href: "/categorias" },
      { label: "Quiénes Somos", href: "/quienes-somos" },
      { label: "Galería", href: "/galeria" },
    ],
  },
  {
    title: "Servicio",
    links: [
      { label: "Servicio al cliente", href: "/contacto" },
      { label: "Instalación", href: "/contacto?asunto=instalacion" },
      { label: "Envíos", href: "/contacto?asunto=envios" },
      { label: "Formas de pago", href: "/categorias" },
    ],
  },
  {
    title: "Comunidad",
    links: [
      { label: "Parcheros", href: "/parcheros" },
      { label: "Obras Sociales", href: "/obras-sociales" },
      { label: "Aliados", href: "/aliados" },
      { label: "Guías", href: "/guias" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 bg-rojo-500 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[1.4fr_2fr]">
        <div>
          <Logo onDark />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/85">
            {site.description}
          </p>
          <div className="mt-5 flex gap-3">
            <a href={site.social.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="rounded-full border border-white/40 p-2.5 hover:bg-white/15">
              <WhatsAppIcon width={18} height={18} />
            </a>
            <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="rounded-full border border-white/40 p-2.5 hover:bg-white/15">
              <FacebookIcon width={18} height={18} />
            </a>
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="rounded-full border border-white/40 p-2.5 hover:bg-white/15">
              <InstagramIcon width={18} height={18} />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {cols.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="font-display text-sm font-bold uppercase tracking-wider text-white">
                {col.title}
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link href={l.href} className="text-white/85 transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      {/* Cobertura: ciudades (SEO local) */}
      <div className="border-t border-white/20">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.15em] text-white/80">
            <MailIcon width={16} height={16} /> Envíos a toda Colombia
          </div>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-white/75">
            {ciudades.map((c) => (
              <Link key={c.slug} href={`/percheros/${c.slug}`} className="hover:text-white hover:underline">
                Percheros en {c.nombre}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white text-carbon">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-1 px-6 py-4 text-sm sm:flex-row">
          <p>Copyright — Percheros Decorativos {year}</p>
          <p className="text-gris">Hecho con 🤎 en {site.country} · {site.email}</p>
        </div>
      </div>
    </footer>
  );
}
