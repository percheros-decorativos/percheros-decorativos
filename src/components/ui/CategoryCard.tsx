import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { categoryCaseClass } from "@/lib/format";

export default function CategoryCard({
  category,
  priority = false,
}: {
  category: {
    slug: string;
    name: string;
    tagline?: string | null;
    imageUrl?: string | null;
  };
  priority?: boolean;
}) {
  return (
    <Link
      href={`/categoria/${category.slug}`}
      className="group flex flex-col items-center rounded-2xl bg-white p-6 text-center shadow-[0_8px_24px_-8px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_32px_-10px_rgba(0,0,0,0.25)]"
    >
      <span className="relative flex h-24 w-24 items-center justify-center rounded-full bg-crema-50 transition-transform duration-300 group-hover:scale-110">
        {category.imageUrl && (
          <Image
            src={category.imageUrl}
            alt={`Isotipo categoría ${category.name}`}
            fill
            sizes="96px"
            quality={90}
            priority={priority}
            className="object-contain"
          />
        )}
      </span>
      {category.tagline && (
        <span className="mt-4 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-piedra">
          {category.tagline}
        </span>
      )}
      <h3
        className={`mt-1 font-display text-xl font-extrabold tracking-tight text-carbon group-hover:text-rojo-600 ${categoryCaseClass(category.name)}`}
      >
        {category.name}
      </h3>
      <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-rojo-500 px-6 py-1.5 text-sm font-bold text-white transition-all duration-300 group-hover:gap-2.5 group-hover:bg-rojo-600 group-hover:shadow-md">
        Ver
        <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
