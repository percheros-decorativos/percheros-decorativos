import Link from "next/link";
import { listOrders } from "@/lib/orders";
import { formatCOP } from "@/lib/format";
import { SUPABASE_CONFIGURED } from "@/lib/supabase";
import StatusBadge from "./StatusBadge";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const all = await listOrders();
  const orders = status ? all.filter((o) => o.status === status) : all;

  const filters = [
    { value: undefined, label: "Todas" },
    { value: "pending", label: "Pendientes" },
    { value: "approved", label: "Aprobadas" },
    { value: "shipped", label: "Enviadas" },
    { value: "declined", label: "Rechazadas" },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-carbon">Órdenes</h1>
      <p className="mt-1 text-sm text-carbon/60">
        {orders.length} orden{orders.length === 1 ? "" : "es"}
      </p>

      {!SUPABASE_CONFIGURED && (
        <p className="mt-4 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
          ⚠️ Supabase no está configurado en este entorno — no hay órdenes que
          mostrar aquí.
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {filters.map((f) => (
          <Link
            key={f.label}
            href={f.value ? `/admin/ordenes?status=${f.value}` : "/admin/ordenes"}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
              status === f.value || (!status && !f.value)
                ? "bg-rojo-500 text-white"
                : "bg-white text-carbon/70 ring-1 ring-carbon/10 hover:bg-crema-100"
            }`}
          >
            {f.label}
          </Link>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-carbon/10 bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-carbon/10 bg-crema-50 text-left text-xs font-semibold uppercase tracking-wide text-carbon/60">
            <tr>
              <th className="px-4 py-3">Referencia</th>
              <th className="px-4 py-3">Cliente</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-b border-carbon/5 last:border-0">
                <td className="px-4 py-2">
                  <Link
                    href={`/admin/ordenes/${o.reference}`}
                    className="font-mono text-xs font-semibold text-rojo-600 hover:underline"
                  >
                    {o.reference}
                  </Link>
                </td>
                <td className="px-4 py-2">
                  <div className="font-medium text-carbon">{o.customerName}</div>
                  <div className="text-xs text-carbon/50">{o.customerEmail}</div>
                </td>
                <td className="px-4 py-2 text-carbon/70">{formatCOP(o.total)}</td>
                <td className="px-4 py-2">
                  <StatusBadge status={o.status} />
                </td>
                <td className="px-4 py-2 text-carbon/60">
                  {new Date(o.createdAt).toLocaleDateString("es-CO", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-carbon/50">
                  No hay órdenes que mostrar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
