"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_COOKIE_NAME,
  adminConfigured,
  createSessionToken,
  verifyPassword,
} from "@/lib/adminAuth";

export interface LoginState {
  error?: string;
}

// Retraso artificial en intentos fallidos: no es un rate-limit real (no hay
// almacén persistente en un entorno serverless), pero encarece un poco el
// fuerza-bruta automatizado sin agregar infraestructura nueva (Redis/KV).
function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  if (!adminConfigured()) {
    return { error: "ADMIN_PASSWORD no está configurada en el servidor. Ningún login es válido hasta que se defina." };
  }

  const password = (formData.get("password") as string) || "";
  if (!verifyPassword(password)) {
    await delay(700);
    return { error: "Contraseña incorrecta." };
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, createSessionToken(), {
    httpOnly: true,
    // "Secure" exige HTTPS: en local (http://localhost) el navegador
    // descarta la cookie en silencio si esto queda fijo en true. Producción
    // en Vercel siempre es HTTPS, así que ahí sigue protegida igual.
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: 60 * 60 * 12, // 12 horas, igual al TTL del token
  });

  redirect("/admin/productos");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete({ name: ADMIN_COOKIE_NAME, path: "/admin" });
  redirect("/admin/login");
}
