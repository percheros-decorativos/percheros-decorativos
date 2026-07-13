const STYLES: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700",
  approved: "bg-green-50 text-green-700",
  declined: "bg-red-50 text-red-700",
  shipped: "bg-blue-50 text-blue-700",
  delivered: "bg-emerald-50 text-emerald-700",
  cancelled: "bg-carbon/10 text-carbon/60",
  error: "bg-red-50 text-red-700",
};

const LABELS: Record<string, string> = {
  pending: "Pendiente",
  approved: "Aprobado",
  declined: "Rechazado",
  shipped: "Enviado",
  delivered: "Entregado",
  cancelled: "Cancelado",
  error: "Error",
};

export default function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${
        STYLES[status] ?? "bg-carbon/10 text-carbon/60"
      }`}
    >
      {LABELS[status] ?? status}
    </span>
  );
}
