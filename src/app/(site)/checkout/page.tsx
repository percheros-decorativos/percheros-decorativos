"use client";

import { useState } from "react";
import Link from "next/link";
import { useCartStore, useCartTotal } from "@/lib/store/cartStore";
import { Button } from "@/components/ui/Button";
import BoldButton, { type BoldConfig } from "@/components/cart/BoldButton";
import { formatCOP as formatCop } from "@/lib/format";

interface FormState {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  department: string;
  notes: string;
}

const empty: FormState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  department: "",
  notes: "",
};

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const clear = useCartStore((s) => s.clearCart);
  const subtotal = useCartTotal();
  const [form, setForm] = useState<FormState>(empty);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bold, setBold] = useState<BoldConfig | null>(null);
  const [orderRef, setOrderRef] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: { ...form },
          items: items.map((i) => ({ id: i.id, quantity: i.quantity })),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "No se pudo crear el pedido.");
        return;
      }
      setBold(data.bold);
      setOrderRef(data.orderRef);
      clear(); // el carrito ya quedó registrado como pedido
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  // Estado: pedido creado → mostrar botón de Bold
  if (bold && orderRef) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <h1 className="font-display text-3xl font-bold text-madera-900">
          ¡Casi listo!
        </h1>
        <p className="mt-2 text-carbon/70">
          Pedido <strong>{orderRef}</strong> creado. Completa tu pago de forma
          segura con Bold.
        </p>
        <div className="mt-8">
          <BoldButton config={bold} />
        </div>
        <p className="mt-6 text-sm text-carbon/60">
          ¿Problemas con el pago?{" "}
          <Link href="/contacto" className="font-semibold text-terracota-600">
            Escríbenos
          </Link>
          .
        </p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <h1 className="font-display text-2xl font-bold text-madera-900">
          Tu carrito está vacío
        </h1>
        <Link
          href="/categorias"
          className="mt-4 inline-block font-semibold text-terracota-600 hover:underline"
        >
          Explorar percheros →
        </Link>
      </div>
    );
  }

  const field =
    "w-full rounded-lg border border-madera-200 bg-white px-3 py-2.5 text-sm focus:border-terracota-400 focus:outline-none";

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="font-display text-3xl font-bold text-madera-900">
        Finalizar compra
      </h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <form onSubmit={handleSubmit} className="space-y-4 lg:col-span-2">
          <h2 className="font-display text-lg font-semibold text-madera-800">
            Datos de envío
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-carbon/80">
                Nombre completo *
              </span>
              <input
                required
                className={field}
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-carbon/80">
                Celular *
              </span>
              <input
                required
                type="tel"
                className={field}
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="text-sm font-medium text-carbon/80">
                Correo *
              </span>
              <input
                required
                type="email"
                className={field}
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="text-sm font-medium text-carbon/80">
                Dirección *
              </span>
              <input
                required
                className={field}
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-carbon/80">
                Ciudad *
              </span>
              <input
                required
                className={field}
                value={form.city}
                onChange={(e) => update("city", e.target.value)}
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-carbon/80">
                Departamento *
              </span>
              <input
                required
                className={field}
                value={form.department}
                onChange={(e) => update("department", e.target.value)}
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="text-sm font-medium text-carbon/80">
                Notas (opcional)
              </span>
              <textarea
                rows={3}
                className={field}
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
              />
            </label>
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <Button type="submit" size="lg" disabled={loading} className="w-full">
            {loading ? "Procesando…" : "Crear pedido y pagar con Bold"}
          </Button>
        </form>

        <aside className="h-fit rounded-2xl border border-madera-100 bg-crema-100 p-6">
          <h2 className="font-display text-lg font-semibold text-madera-800">
            Tu pedido
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            {items.map((i) => (
              <li key={i.id} className="flex justify-between gap-2">
                <span className="text-carbon/70">
                  {i.name} × {i.quantity}
                </span>
                <span className="font-semibold">
                  {formatCop(i.priceCop * i.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-madera-200 pt-4">
            <span className="font-semibold">Total</span>
            <span className="font-bold text-madera-800">
              {formatCop(subtotal)}
            </span>
          </div>
          <p className="mt-3 text-xs text-carbon/60">
            El costo de envío se confirma según tu ciudad. Pago seguro con Bold.
          </p>
        </aside>
      </div>
    </div>
  );
}
