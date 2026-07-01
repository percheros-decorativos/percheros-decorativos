import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos inválidos", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const { name, phone, email, category, message } = parsed.data;

  // Guardar en Supabase si está configurado; si no, registrar y responder OK
  // (modo local) para no bloquear el formulario.
  if (supabaseAdmin) {
    const { error } = await supabaseAdmin.from("contact_messages").insert({
      name,
      phone,
      email,
      category: category || null,
      message,
    });
    if (error) console.error("[contact] insert error:", error.message);
  } else {
    console.log("[contact] mensaje recibido (sin Supabase):", { name, email });
  }

  return NextResponse.json({ ok: true });
}
