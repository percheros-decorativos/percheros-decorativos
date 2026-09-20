import nodemailer from "nodemailer";

// Envío de correo por el SMTP de Gmail. Se usa una "contraseña de aplicación"
// de Google (no la clave normal de la cuenta): requiere tener activada la
// verificación en dos pasos y generarla en myaccount.google.com/apppasswords.
//
// Variables de entorno (Vercel → Settings → Environment Variables):
//   GMAIL_USER          la cuenta que envía, p. ej. tucuenta@gmail.com
//   GMAIL_APP_PASSWORD  la contraseña de aplicación de 16 caracteres
//   CONTACT_TO          (opcional) destinatario; por defecto, GMAIL_USER
//
// Si faltan, no se envía nada y quien llama se entera por el valor devuelto —
// nunca se finge que el correo salió.

const user = process.env.GMAIL_USER;
const pass = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, "");

export const MAIL_CONFIGURED = !!(user && pass);

export const contactTo = process.env.CONTACT_TO || user || "";

// Por defecto, el SMTP de Gmail. SMTP_HOST permite apuntar a otro servidor sin
// tocar codigo: se usa para probar el envio en local contra un SMTP de mentira, y
// serviria para cambiar de proveedor mas adelante.
const host = process.env.SMTP_HOST;
const transporter = MAIL_CONFIGURED
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

export type EnvioCorreo = { ok: true } | { ok: false; motivo: string };

export async function enviarCorreo(opts: {
  asunto: string;
  texto: string;
  html: string;
  responderA?: string;
}): Promise<EnvioCorreo> {
  if (!transporter) {
    return { ok: false, motivo: "SMTP no configurado (falta GMAIL_USER o GMAIL_APP_PASSWORD)" };
  }
  try {
    await transporter.sendMail({
      // Gmail obliga a que el remitente sea la propia cuenta; el nombre visible
      // sí se puede personalizar, y replyTo permite responder al cliente
      // directamente desde la bandeja.
      from: `"Percheros Decorativos" <${user}>`,
      to: contactTo,
      replyTo: opts.responderA,
      subject: opts.asunto,
      text: opts.texto,
      html: opts.html,
    });
    return { ok: true };
  } catch (e) {
    return { ok: false, motivo: e instanceof Error ? e.message : String(e) };
  }
}
