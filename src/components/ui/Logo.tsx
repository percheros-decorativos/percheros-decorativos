import Image from "next/image";
import Link from "next/link";

// Logo horizontal oficial (SVG en curvas).
// onDark = usa la versión en negativo (blanca) para fondos oscuros/rojos.
export default function Logo({
  className = "",
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="Percheros Decorativos — Inicio"
      className={`inline-flex ${className}`}
    >
      <Image
        src={onDark ? "/img/logo-horizontal-blanco.svg" : "/img/logo-horizontal.svg"}
        alt="Percheros Decorativos"
        width={230}
        height={51}
        priority
        className="h-11 w-auto"
      />
    </Link>
  );
}
