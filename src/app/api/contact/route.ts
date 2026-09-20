import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";
import { supabaseAdmin } from "@/lib/supabase";
import { enviarCorreo } from "@/lib/mailer";
import { site } from "@/lib/site";

export const runtime = "nodejs";

const escapar = (s: string) =>
  s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

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

  // El mensaje se manda a dos sitios independientes: el correo (que es como
  // realmente se entera el equipo) y la tabla de Supabase (que queda como
  // registro). Se intentan los dos y basta con que uno funcione.
  const [correo, guardado] = await Promise.all([
    enviarCorreo({
      asunto: `Contacto web — ${name}${category ? ` (${category})` : ""}`,
      responderA: email,
      texto: [
        `Nombre:   ${name}`,
        `Correo:   ${email}`,
        `Teléfono: ${phone}`,
        `Asunto:   ${category || "—"}`,
        "",
        message,
      ].join("\n"),
      html: `
        <h2 style="font-family:system-ui,sans-serif">Nuevo mensaje desde ${escapar(site.name)}</h2>
        <table style="font-family:system-ui,sans-serif;border-collapse:collapse">
          <tr><td style="padding:4px 12px 4px 0"><b>Nombre</b></td><td>${escapar(name)}</td></tr>
          <tr><td style="padding:4px 12px 4px 0"><b>Correo</b></td><td><a href="mailto:${escapar(email)}">${escapar(email)}</a></td></tr>
          <tr><td style="padding:4px 12px 4px 0"><b>Teléfono</b></td><td><a href="tel:${escapar(phone)}">${escapar(phone)}</a></td></tr>
          <tr><td style="padding:4px 12px 4px 0"><b>Asunto</b></td><td>${escapar(category || "—")}</td></tr>
        </table>
        <p style="font-family:system-ui,sans-serif;white-space:pre-wrap;border-left:3px solid #d81e34;padding-left:12px">${escapar(message)}</p>
      `,
    }),
    guardarEnSupabase({ name, phone, email, category, message }),
  ]);

  if (!correo.ok) console.error("[contact] correo no enviado:", correo.motivo);
  if (!guardado.ok) console.error("[contact] no se pudo guardar:", guardado.motivo);

  // Antes se respondía ok siempre y el visitante veía "¡Mensaje enviado!"
  // aunque el mensaje no hubiera llegado a ninguna parte. Si fallan los dos
  // destinos, se devuelve error para que pueda escribir por WhatsApp.
  if (!correo.ok && !guardado.ok) {
    return NextResponse.json(
      {
        error: `No pudimos enviar tu mensaje. Escríbenos por WhatsApp al ${site.phoneDisplay}.`,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

async function guardarEnSupabase(fila: {
  name: string;
  phone: string;
  email: string;
  category?: string;
  message: string;
}): Promise<{ ok: true } | { ok: false; motivo: string }> {
  if (!supabaseAdmin) return { ok: false, motivo: "Supabase no configurado" };
  const { error } = await supabaseAdmin.from("contact_messages").insert({
    name: fila.name,
    phone: fila.phone,
    email: fila.email,
    category: fila.category || null,
    message: fila.message,
  });
  return error ? { ok: false, motivo: error.message } : { ok: true };
}
