// Inserta datos estructurados JSON-LD (clave para SEO y GEO).
// Se renderiza en el servidor; no envía JS al cliente.
export default function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // El contenido es generado por nosotros (no entrada de usuario).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
