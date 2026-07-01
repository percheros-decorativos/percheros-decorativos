import { NextResponse } from "next/server";
import crypto from "crypto";
import { updateOrderStatus } from "@/lib/orders";

export const runtime = "nodejs";

// Webhook de Bold. Verifica la firma y actualiza el estado de la orden en Supabase.

const APPROVED = new Set(["SALE_APPROVED", "PAYMENT_APPROVED", "APPROVED"]);
const REJECTED = new Set([
  "SALE_REJECTED",
  "PAYMENT_REJECTED",
  "REJECTED",
  "VOID_APPROVED",
]);

function verifySignature(rawBody: string, signature: string | null): boolean {
  const secret = process.env.BOLD_SECRET_KEY;
  if (!secret || secret.startsWith("LLAVE_") || secret.startsWith("tu-")) {
    return true; // modo prueba
  }
  if (!signature) return false;
  const expected = crypto
    .createHmac("sha256", secret)
    .update(rawBody, "utf8")
    .digest("base64");
  try {
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  } catch {
    return false;
  }
}

function pickReference(payload: Record<string, unknown>): string | null {
  const data = (payload.data ?? {}) as Record<string, unknown>;
  const metadata = (data.metadata ?? {}) as Record<string, unknown>;
  return (
    (metadata.reference as string) ||
    (data.reference as string) ||
    (payload.reference as string) ||
    null
  );
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature =
    request.headers.get("x-bold-signature") ||
    request.headers.get("x-signature");

  if (!verifySignature(rawBody, signature)) {
    return NextResponse.json({ error: "Firma inválida" }, { status: 401 });
  }

  let payload: Record<string, unknown>;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const type = String(payload.type || "");
  const reference = pickReference(payload);
  if (!reference) return NextResponse.json({ ok: true, note: "sin referencia" });

  const data = (payload.data ?? {}) as Record<string, unknown>;
  const status = APPROVED.has(type)
    ? "approved"
    : REJECTED.has(type)
      ? "declined"
      : null;

  if (status) {
    await updateOrderStatus(reference, status, data.payment_id as string);
  }

  return NextResponse.json({ ok: true });
}
