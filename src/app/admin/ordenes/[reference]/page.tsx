import { notFound } from "next/navigation";
import Link from "next/link";
import { getOrderByReference } from "@/lib/orders";
import { formatCOP } from "@/lib/format";
import { updateOrderStatusAction } from "../actions";
import { ORDER_STATUSES } from "../order-status";
import StatusBadge from "../StatusBadge";

export const dynamic = "force-dynamic";

interface OrderItemRow {
  id: string;
  product_name: string;
  product_slug: string | null;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ reference: string }>;
}) {
  const { reference } = await params;
  const order = await getOrderByReference(reference);
  if (!order) notFound();

  const items = (order.order_items ?? []) as OrderItemRow[];

  return (
    <div>
      <Link href="/admin/ordenes" className="text-sm text-carbon/50 hover:text-carbon">
        ← Todas las órdenes
      </Link>

      <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-mono font-display text-2xl font-bold text-carbon">
            {order.reference}
          </h1>
          <p className="mt-1 text-sm text-carbon/60">
            {new Date(order.created_at).toLocaleString("es-CO")}
          </p>
        </div>
        <StatusBadge status={order.status} />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="font-display text-lg font-semibold text-carbon">Productos</h2>
          <div className="mt-3 divide-y divide-carbon/10 rounded-xl border border-carbon/10 bg-white">
            {items.map((it) => (
              <div key={it.id} className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
                <div>
                  <p className="font-medium text-carbon">{it.product_name}</p>
                  <p className="text-carbon/50">
                    {it.quantity} × {formatCOP(it.unit_price)}
                  </p>
                </div>
                <p className="font-semibold text-carbon">{formatCOP(it.total_price)}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-xl border border-carbon/10 bg-white p-4 text-sm">
            <div className="flex justify-between py-1">
              <span className="text-carbon/60">Subtotal</span>
              <span>{formatCOP(order.subtotal)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-carbon/60">Envío</span>
              <span>{formatCOP(order.shipping_cost)}</span>
            </div>
            <div className="flex justify-between border-t border-carbon/10 py-2 font-bold text-carbon">
              <span>Total</span>
              <span>{formatCOP(order.total)}</span>
            </div>
          </div>

          {order.notes && (
            <div className="mt-4 rounded-xl border border-carbon/10 bg-white p-4 text-sm">
              <p className="font-semibold text-carbon">Notas del cliente</p>
              <p className="mt-1 text-carbon/70">{order.notes}</p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-carbon/10 bg-white p-4 text-sm">
            <h2 className="font-display font-semibold text-carbon">Cliente</h2>
            <p className="mt-2 font-medium text-carbon">{order.customer_name}</p>
            <p className="text-carbon/70">{order.customer_email}</p>
            <p className="text-carbon/70">{order.customer_phone}</p>
            <hr className="my-3 border-carbon/10" />
            <p className="text-carbon/70">{order.shipping_address}</p>
            <p className="text-carbon/70">
              {order.shipping_city}, {order.shipping_department}
            </p>
          </div>

          <form action={updateOrderStatusAction} className="rounded-xl border border-carbon/10 bg-white p-4 text-sm">
            <input type="hidden" name="reference" value={order.reference} />
            <label className="block">
              <span className="font-semibold text-carbon">Cambiar estado</span>
              <select
                name="status"
                defaultValue={order.status}
                className="mt-2 w-full rounded-lg border border-carbon/15 px-3 py-2 text-sm"
              >
                {ORDER_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="submit"
              className="mt-3 w-full rounded-md bg-rojo-500 px-4 py-2 font-semibold text-white hover:bg-rojo-600"
            >
              Actualizar
            </button>
          </form>

          {order.wompi_tx_id && (
            <p className="text-xs text-carbon/50">
              ID de transacción Bold: <span className="font-mono">{order.wompi_tx_id}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
