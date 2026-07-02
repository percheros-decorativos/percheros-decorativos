import Image from "next/image";
import Link from "next/link";

// Logo horizontal oficial (SVG en curvas). Sobre fondo oscuro/rojo se envuelve
// en una cápsula blanca para conservar el contraste.
export default function Logo({
  className = "",
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
}) {
  const img = (
    <Image
      src="/img/logo-horizontal.svg"
      alt="Percheros Decorativos"
      width={230}
      height={51}
      priority
      className="h-11 w-auto"
    />
  );

  return (
    <Link
      href="/"
      aria-label="Percheros Decorativos — Inicio"
      className={`inline-flex ${className}`}
    >
      {onDark ? (
        <span className="inline-flex rounded-xl bg-white px-3 py-2 shadow-sm">
          {img}
        </span>
      ) : (
        img
      )}
    </Link>
  );
}
