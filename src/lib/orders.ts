import "server-only";
import { supabaseAdmin } from "@/lib/supabase";

export interface NewOrderInput {
  reference: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    department: string;
    notes?: string;
  };
  items: {
    productId: number;
    productName: string;
    productSlug: string;
    quantity: number;
    unitPrice: number;
  }[];
  subtotal: number;
  shipping: number;
  total: number;
}

/** Crea la orden en Supabase (status pending). Degrada si no está configurado. */
export async function createOrder(input: NewOrderInput): Promise<boolean> {
  if (!supabaseAdmin) return false;
  const { error: orderErr } = await supabaseAdmin.from("orders").insert({
    reference: input.reference,
    customer_name: input.customer.name,
    customer_email: input.customer.email,
    customer_phone: input.customer.phone,
    shipping_address: input.customer.address,
    shipping_city: input.customer.city,
    shipping_department: input.customer.department,
    notes: input.customer.notes || null,
    subtotal: input.subtotal,
    shipping_cost: input.shipping,
    total: input.total,
    currency: "COP",
    status: "pending",
  });
  if (orderErr) {
    console.error("[orders] insert error:", orderErr.message);
    return false;
  }
  // Buscar el id de la orden recién creada para los items
  const { data: order } = await supabaseAdmin
    .from("orders")
    .select("id")
    .eq("reference", input.reference)
    .single();
  if (order?.id && input.items.length) {
    await supabaseAdmin.from("order_items").insert(
      input.items.map((i) => ({
        order_id: order.id,
        product_id: String(i.productId),
        product_name: i.productName,
        product_slug: i.productSlug,
        quantity: i.quantity,
        unit_price: i.unitPrice,
        total_price: i.unitPrice * i.quantity,
      })),
    );
  }
  return true;
}

export async function updateOrderStatus(
  reference: string,
  status: string,
  boldTxId?: string,
): Promise<void> {
  if (!supabaseAdmin) return;
  await supabaseAdmin
    .from("orders")
    .update({ status, wompi_tx_id: boldTxId || null })
    .eq("reference", reference);
}

export async function getOrderByReference(reference: string) {
  if (!supabaseAdmin) return null;
  const { data } = await supabaseAdmin
    .from("orders")
    .select("*, order_items(*)")
    .eq("reference", reference)
    .single();
  return data;
}
