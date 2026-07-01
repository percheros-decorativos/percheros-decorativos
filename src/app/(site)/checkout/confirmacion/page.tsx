import type { Metadata } from "next";
import { getOrderByReference } from "@/lib/orders";
import { formatCOP } from "@/lib/format";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Confirmación de pedido",
  robots: { index: false, follow: false },
};

export default async function ConfirmacionPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string; "bold-tx-status"?: string }>;
}) {
  const sp = await searchParams;
  const ref = sp.order;
  const txStatus = sp["bold-tx-status"]; // approved | rejected | pending

  const order = ref ? await getOrderByReference(ref) : null;

  const isPaid = order?.status === "approved" || txStatus === "approved";
  const isRejected = order?.status === "declined" || txStatus === "rejected";

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      {isPaid ? (
        <>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-verde-500 text-3xl text-white">
            ✓
          </div>
          <h1 className="mt-6 font-display text-3xl font-extrabold text-carbon">
            ¡Gracias por tu compra!
          </h1>
          <p className="mt-2 text-gris">
            Tu pago fue procesado correctamente. Te contactaremos para coordinar
            el envío.
          </p>
        </>
      ) : isRejected ? (
        <>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rojo-500 text-3xl text-white">
            ✕
          </div>
          <h1 className="mt-6 font-display text-3xl font-extrabold text-carbon">
            El pago no se completó
          </h1>
          <p className="mt-2 text-gris">
            No te preocupes, no se realizó ningún cobro. Puedes intentarlo
            nuevamente.
          </p>
        </>
      ) : (
        <>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-crema-200 text-3xl text-rojo-600">
            ⏳
          </div>
          <h1 className="mt-6 font-display text-3xl font-extrabold text-carbon">
            Procesando tu pago
          </h1>
          <p className="mt-2 text-gris">
            Estamos confirmando tu pago con Bold. Recibirás la confirmación muy
            pronto.
          </p>
        </>
      )}

      {ref && (
        <div className="mt-8 rounded-2xl border border-rojo-100 bg-crema-50 p-6 text-left">
          <p className="text-sm text-gris">
            Pedido <strong className="text-carbon">{ref}</strong>
          </p>
          {order?.total != null && (
            <div className="mt-3 flex justify-between border-t border-crema-200 pt-3">
              <span className="font-semibold">Total</span>
              <span className="font-bold text-carbon">
                {formatCOP(Number(order.total))}
              </span>
            </div>
          )}
        </div>
      )}

      <div className="mt-8 flex justify-center gap-3">
        <ButtonLink href="/">Volver al inicio</ButtonLink>
        <ButtonLink href="/categorias" variant="outline">
          Seguir comprando
        </ButtonLink>
      </div>
    </div>
  );
}
