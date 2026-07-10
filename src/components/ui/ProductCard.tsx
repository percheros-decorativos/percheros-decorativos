import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/money";
import ProductCardActions from "@/components/ui/ProductCardActions";
import TiltCard from "@/components/ui/motion/TiltCard";

export interface ProductCardData {
  id: number;
  slug: string;
  name: string;
  priceCop: number;
  compareAtCop?: number | null;
  stock: number;
  isNew?: boolean;
  shortDesc?: string | null;
  images: { url: string; alt: string | null }[];
  category?: { name: string } | null;
}

interface ProductCardProps {
  product: ProductCardData;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const img = product.images[0];
  const image = img?.url ?? "/img/placeholder-product.svg";
  return (
    <TiltCard className="h-full">
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-carbon/10 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl">
      <ProductCardActions
        product={{
          id: product.id,
          slug: product.slug,
          name: product.name,
          priceCop: product.priceCop,
          compareAtCop: product.compareAtCop,
          image,
          shortDesc: product.shortDesc,
          stock: product.stock,
          categoryName: product.category?.name,
        }}
      />
      <Link
        href={`/producto/${product.slug}`}
        className="relative block aspect-square overflow-hidden bg-white"
      >
        <Image
          src={image}
          alt={img?.alt ?? product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
          priority={priority}
        />
        {product.isNew && (
          <span className="absolute left-3 top-3 rounded-full bg-bosque-500 px-2.5 py-1 text-xs font-bold text-white">
            NUEVO
          </span>
        )}
        {product.compareAtCop && product.compareAtCop > product.priceCop && (
          <span className="absolute left-3 top-12 rounded-full bg-rojo-500 px-2.5 py-1 text-xs font-bold text-white">
            OFERTA
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-4">
        {product.category && (
          <p className="text-xs font-medium uppercase tracking-wide text-gris">
            {product.category.name}
          </p>
        )}
        <h3 className="mt-1 font-display text-base font-bold leading-snug text-carbon">
          <Link href={`/producto/${product.slug}`} className="hover:text-rojo-600">
            {product.name}
          </Link>
        </h3>
        {product.shortDesc && (
          <p className="mt-1 line-clamp-2 text-sm text-gris">{product.shortDesc}</p>
        )}
        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-extrabold text-rojo-600">
              {formatPrice(product.priceCop)}
            </span>
            {product.compareAtCop && product.compareAtCop > product.priceCop && (
              <span className="text-sm text-gris line-through">
                {formatPrice(product.compareAtCop)}
              </span>
            )}
          </div>
          <span className="rounded-md bg-rojo-500 px-3 py-1 text-sm font-bold text-white transition-colors group-hover:bg-rojo-600">
            Ver
          </span>
        </div>
      </div>
    </article>
    </TiltCard>
  );
}
