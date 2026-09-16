// Título de sección: eyebrow pequeño + título grande, con acento de color.
export default function SectionTitle({
  children,
  eyebrow,
  as: Tag = "h2",
  align = "center",
  className = "",
}: {
  children: React.ReactNode;
  eyebrow?: string;
  as?: "h1" | "h2" | "h3";
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "text-center" : "text-left"} ${className}`}>
      {eyebrow && (
        <p className="text-sm font-bold uppercase tracking-[0.15em] text-rojo-500">
          {eyebrow}
        </p>
      )}
      <Tag className="mt-2 font-display text-3xl font-extrabold tracking-tight text-madera-900 sm:text-4xl">
        {children}
      </Tag>
      <span
        className={`mt-3 block h-1 w-16 rounded-full bg-rojo-500 ${centered ? "mx-auto" : ""}`}
      />
    </div>
  );
}
