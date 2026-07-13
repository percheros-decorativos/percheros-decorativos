import "server-only";
import crypto from "crypto";

// Sesión de /admin: cookie firmada (HMAC-SHA256), httpOnly + secure, sin
// dependencias nuevas. La llave de firma es ADMIN_PASSWORD — solo el
// servidor la conoce, así que sirve igual de bien como secreto de firma.
//
// Diseño "fail closed": si ADMIN_PASSWORD no está configurada, NINGÚN
// login es válido y el proxy bloquea /admin por completo (antes, con
// Basic Auth, una variable vacía dejaba pasar a cualquiera sin pedir
// nada — ese era el bug).

export const ADMIN_COOKIE_NAME = "admin_session";
const SESSION_TTL_MS = 12 * 60 * 60 * 1000; // 12 horas

function base64url(input: Buffer): string {
  return input.toString("base64url");
}

function sign(payload: string, secret: string): string {
  return base64url(crypto.createHmac("sha256", secret).update(payload).digest());
}

export function adminConfigured(): boolean {
  return !!process.env.ADMIN_PASSWORD;
}

/** Compara en tiempo constante para no filtrar la contraseña por timing. */
export function verifyPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function createSessionToken(): string {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) throw new Error("ADMIN_PASSWORD no configurada");
  const payload = base64url(Buffer.from(JSON.stringify({ exp: Date.now() + SESSION_TTL_MS })));
  return `${payload}.${sign(payload, secret)}`;
}

export function verifySessionToken(token: string | undefined | null): boolean {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret || !token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  const expected = sign(payload, secret);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;
  try {
    const { exp } = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return typeof exp === "number" && Date.now() < exp;
  } catch {
    return false;
  }
}
