import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE_NAME, adminConfigured, verifySessionToken } from "@/lib/adminAuth";

// Proxy (antes "middleware", renombrado en Next 16):
// 1) Protege /admin con sesión de login (ver /admin/login) — "fail closed":
//    si ADMIN_PASSWORD no está configurada, NADIE entra (antes, con Basic
//    Auth, una variable vacía dejaba pasar a cualquiera sin pedir nada).
// 2) Limpia parámetros de tracking que generan URLs duplicadas (SEO).

const TRACKING_PARAMS = ["srsltid", "_gl", "igshid", "mc_eid", "fbclid", "gclid"];

export function proxy(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  // --- 1) Sesión de /admin ---
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!adminConfigured() || !verifySessionToken(req.cookies.get(ADMIN_COOKIE_NAME)?.value)) {
      const loginUrl = new URL("/admin/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // --- 2) Limpieza de params de tracking ---
  let dirty = false;
  for (const p of TRACKING_PARAMS) {
    if (searchParams.has(p)) {
      searchParams.delete(p);
      dirty = true;
    }
  }
  if (dirty) {
    const url = req.nextUrl.clone();
    url.search = searchParams.toString();
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  // Corre en todas las rutas excepto assets estáticos y API.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|img/|api/).*)"],
};
