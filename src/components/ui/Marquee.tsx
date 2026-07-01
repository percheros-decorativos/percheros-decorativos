// Cinta animada con las taglines "Útiles y ..." del documento (CSS puro).
const taglines = [
  "Útiles y Decorativos",
  "Útiles y Funcionales",
  "Útiles y Resilientes",
  "Útiles y Prácticos",
  "Útiles y Seguros",
  "Útiles y Cómodos",
  "Útiles y Familiares",
];

export default function Marquee() {
  const items = [...taglines, ...taglines];
  return (
    <div className="marquee-mask overflow-hidden border-y border-rojo-600/40 bg-rojo-500 py-3 text-white">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {items.map((t, i) => (
          <span key={i} className="flex items-center">
            <span className="px-6 font-display text-sm font-bold uppercase tracking-[0.2em]">
              {t}
            </span>
            <span aria-hidden className="text-rojo-200">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
