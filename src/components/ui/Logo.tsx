import Link from "next/link";

export default function Logo({
  className = "",
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="Percheros Decorativos — Inicio"
      className={`inline-flex items-center gap-2.5 rounded-lg border-2 border-rojo-500 px-2.5 py-1.5 ${className}`}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-rojo-500 font-display text-2xl font-extrabold leading-none text-white">
        P
      </span>
      <span className="leading-none">
        <span
          className={`block font-display text-lg font-extrabold tracking-tight ${
            light ? "text-white" : "text-rojo-500"
          }`}
        >
          PERCHEROS
        </span>
        <span
          className={`block font-display text-[0.7rem] font-bold tracking-[0.3em] ${
            light ? "text-white/90" : "text-carbon"
          }`}
        >
          DEC<span className="text-rojo-500">O</span>RATIV
          <span className="text-rojo-500">O</span>S
        </span>
      </span>
    </Link>
  );
}
