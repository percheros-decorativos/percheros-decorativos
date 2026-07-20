import Link from "next/link";
import Image from "next/image";
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
      className="group flex flex-col items-center rounded-2xl border-2 border-rojo-100 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-rojo-300 hover:shadow-lg"
    >
      <span className="relative block h-24 w-24 transition-transform duration-300 group-hover:scale-110">
        {category.imageUrl && (
          <Image
            src={category.imageUrl}
            alt={`Isotipo categoría ${category.name}`}
            fill
            sizes="96px"
            quality={90}
            priority={priority}
            className="object-contain transition-transform duration-500 ease-out group-hover:scale-110"
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
      <span className="mt-4 rounded-md bg-rojo-500 px-6 py-1.5 text-sm font-bold text-white transition-all duration-300 group-hover:scale-105 group-hover:bg-rojo-600 group-hover:shadow-md">
        Ver
      </span>
    </Link>
  );
}
