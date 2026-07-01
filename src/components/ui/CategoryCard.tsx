import Link from "next/link";
import {
  Church,
  Home,
  PawPrint,
  Bike,
  Guitar,
  Camera,
  Building2,
  Palette,
  Gift,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

// Icono por categoría (estilo PDF: icono + nombre + botón Ver).
function MotorcycleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <circle cx="5" cy="17" r="3" />
      <circle cx="19" cy="17" r="3" />
      <path d="M8 17h5l3-5h3M5 14l2-4h4l3 3M11 6h3l1 2" />
    </svg>
  );
}

const iconMap: Record<string, LucideIcon | typeof MotorcycleIcon> = {
  dedios: Church,
  hogar: Home,
  mascotas: PawPrint,
  moteros: MotorcycleIcon,
  bike: Bike,
  guitarras: Guitar,
  personalizados: Camera,
  corporativos: Building2,
  murales: Palette,
  souvenires: Gift,
  variados: Sparkles,
};

export default function CategoryCard({
  category,
}: {
  category: {
    slug: string;
    name: string;
    tagline?: string | null;
    imageUrl?: string | null;
  };
  priority?: boolean;
}) {
  const Icon = iconMap[category.slug] ?? Sparkles;
  return (
    <Link
      href={`/categoria/${category.slug}`}
      className="group flex flex-col items-center rounded-2xl border-2 border-rojo-100 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-rojo-300 hover:shadow-lg"
    >
      <span className="flex h-20 w-20 items-center justify-center rounded-full bg-rojo-50 text-rojo-500 transition-all duration-300 group-hover:scale-110 group-hover:bg-rojo-500 group-hover:text-white">
        <Icon className="h-10 w-10 transition-transform duration-500 ease-out group-hover:-rotate-6 group-hover:scale-110" />
      </span>
      {category.tagline && (
        <span className="mt-4 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-piedra">
          {category.tagline}
        </span>
      )}
      <h3 className="mt-1 font-display text-xl font-extrabold uppercase tracking-tight text-carbon group-hover:text-rojo-600">
        {category.name}
      </h3>
      <span className="mt-4 rounded-md bg-rojo-500 px-6 py-1.5 text-sm font-bold text-white transition-all duration-300 group-hover:scale-105 group-hover:bg-rojo-600 group-hover:shadow-md">
        Ver
      </span>
    </Link>
  );
}
