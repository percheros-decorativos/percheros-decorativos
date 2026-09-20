import nodemailer from "nodemailer";
import { CONTACT_INBOX } from "@/lib/site";

// Envío del correo de contacto. Hay dos caminos y se elige solo:
//
//   1. SMTP directo (preferido). Se usa si están GMAIL_USER y
//      GMAIL_APP_PASSWORD. Nada pasa por terceros. La clave es una
//      "contraseña de aplicación" de Google, no la de la cuenta:
//      myaccount.google.com/apppasswords (exige verificación en dos pasos).
//
//   2. FormSubmit (respaldo, sin configurar nada). Reenvía el mensaje al
//      buzón indicado sin cuenta ni claves. Pide activar el buzón una única
//      vez: con el primer mensaje llega un correo con un botón que hay que
//      pulsar; hasta entonces no reenvía nada.
//
// Se llama desde el servidor, así que la dirección de destino nunca viaja al
// navegador ni queda expuesta a rastreadores de spam.

const user = process.env.GMAIL_USER;
const pass = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, "");

export const SMTP_CONFIGURED = !!(user && pass);

// Buzón que recibe los mensajes del formulario.
export const contactTo = process.env.CONTACT_TO || CONTACT_INBOX;

// Por defecto, el SMTP de Gmail. SMTP_HOST permite apuntar a otro servidor sin
// tocar codigo: se usa para probar el envio en local contra un SMTP de mentira, y
// serviria para cambiar de proveedor mas adelante.
const host = process.env.SMTP_HOST;
const transporter = SMTP_CONFIGURED
  ? nodemailer.createTransport(
      host
        ? {
            host,
            port: Number(process.env.SMTP_PORT || 587),
            secure: process.env.SMTP_SECURE === "true",
            auth: { user, pass },
            tls: { rejectUnauthorized: false },
          }
        : { service: "gmail", auth: { user, pass } },
    )
  : null;

export type EnvioCorreo = { ok: true; via: string } | { ok: false; motivo: string };

export interface CorreoContacto {
  asunto: string;
  texto: string;
  html: string;
  responderA?: string;
  /** Pares etiqueta/valor; FormSubmit los pinta como filas de una tabla. */
  campos: Record<string, string>;
}

export async function enviarCorreo(opts: CorreoContacto): Promise<EnvioCorreo> {
  if (!contactTo) {
    return { ok: false, motivo: "Sin buzón de destino (CONTACT_INBOX en lib/site)" };
  }
  if (transporter) {
    try {
      await transporter.sendMail({
        // Gmail obliga a que el remitente sea la propia cuenta; el nombre
        // visible sí se puede personalizar, y replyTo permite responder al
        // cliente directamente desde la bandeja.
        from: `"Percheros Decorativos" <${user}>`,
        to: contactTo,
        replyTo: opts.responderA,
        subject: opts.asunto,
        text: opts.texto,
        html: opts.html,
      });
      return { ok: true, via: "smtp" };
    } catch (e) {
      return { ok: false, motivo: `SMTP: ${e instanceof Error ? e.message : String(e)}` };
    }
  }
  return enviarPorFormSubmit(opts);
}

async function enviarPorFormSubmit(opts: CorreoContacto): Promise<EnvioCorreo> {
  try {
    const base = process.env.FORMSUBMIT_URL || "https://formsubmit.co/ajax";
    const res = await fetch(`${base}/${encodeURIComponent(contactTo)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: opts.asunto,
        // Responder desde la bandeja escribe al cliente, no a FormSubmit.
        _replyto: opts.responderA,
        _template: "table",
        _captcha: "false",
        ...opts.campos,
      }),
      // Si el servicio tarda, no se deja al visitante esperando: el mensaje
      // igualmente queda guardado en la base de datos.
      signal: AbortSignal.timeout(10_000),
    });
    const datos = (await res.json().catch(() => ({}))) as { success?: string; message?: string };
    if (!res.ok || datos.success === "false") {
      return { ok: false, motivo: `FormSubmit: ${datos.message || res.status}` };
    }
    return { ok: true, via: "formsubmit" };
  } catch (e) {
    return { ok: false, motivo: `FormSubmit: ${e instanceof Error ? e.message : String(e)}` };
  }
}
