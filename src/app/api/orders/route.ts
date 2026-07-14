import { NextResponse } from "next/server";
import { checkoutSchema } from "@/lib/validation";
import { boldIntegritySignature } from "@/lib/bold";
import { createOrder } from "@/lib/orders";
import { getAllProducts } from "@/lib/queries";
import { shippingCostForCity } from "@/lib/shipping";
import { grossUpForBold } from "@/lib/boldFees";
import { site } from "@/lib/site";

export const runtime = "nodejs";

function generateOrderRef(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rnd = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `PD-${ts}-${rnd}`;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const parsed = checkoutSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos inválidos", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const { customer, items } = parsed.data;

  // Precios SIEMPRE desde el catálogo del servidor (nunca confiar en el cliente).
  const products = await getAllProducts();
  const lines = [];
  for (const item of items) {
    const product = products.find((p) => p.id === item.id);
    if (!product) {
      return NextResponse.json(
        { error: `Producto ${item.id} no disponible` },
        { status: 409 },
      );
    }
    lines.push({
      productId: product.id,
      productName: product.name,
      productSlug: product.slug,
      unitPrice: product.priceCop,
      quantity: item.quantity,
    });
  }

  const subtotal = lines.reduce((n, l) => n + l.unitPrice * l.quantity, 0);
  const shipping = shippingCostForCity(customer.city);
  // El total se "engrosa" para que, tras el descuento de la comisión de
  // Bold, al negocio le llegue exactamente subtotal + envío.
  const { total, fee: boldFee } = grossUpForBold(subtotal + shipping);
  const orderRef = generateOrderRef();

  // Persistir en Supabase (si está configurado; si no, sigue para no bloquear el pago).
  await createOrder({
    reference: orderRef,
    customer,
    items: lines,
    subtotal,
    shipping,
    boldFee,
    total,
  });

  const currency = process.env.NEXT_PUBLIC_BOLD_CURRENCY || "COP";
  const signature = boldIntegritySignature({
    orderId: orderRef,
    amount: total,
    currency,
  });

  return NextResponse.json({
    orderRef,
    bold: {
      apiKey: process.env.NEXT_PUBLIC_BOLD_API_KEY || "",
      orderId: orderRef,
      amount: total,
      currency,
      integritySignature: signature,
      description: `Pedido ${orderRef} - ${site.name}`,
      redirectionUrl: `${site.url}/checkout/confirmacion?order=${orderRef}`,
    },
    totals: { subtotal, shipping, boldFee, total },
  });
}
