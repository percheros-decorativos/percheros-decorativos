// Título de sección estilo PDF: banner rojo centrado con líneas a los lados.
export default function SectionTitle({
  children,
  as: Tag = "h2",
  className = "",
}: {
  children: React.ReactNode;
  eyebrow?: string;
  as?: "h1" | "h2" | "h3";
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={`section-title ${className}`}>
      <Tag className="rounded-md bg-rojo-500 px-8 py-3 text-center font-display text-xl font-extrabold uppercase tracking-wide text-white shadow-sm sm:text-2xl">
        {children}
      </Tag>
    </div>
  );
}
