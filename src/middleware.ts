import { NextResponse, type NextRequest } from "next/server";

// Middleware (patrón scentualbliss):
// 1) Protege /admin con HTTP Basic Auth (usuario: admin, clave: ADMIN_PASSWORD).
// 2) Limpia parámetros de tracking que generan URLs duplicadas (SEO).

const TRACKING_PARAMS = ["srsltid", "_gl", "igshid", "mc_eid", "fbclid", "gclid"];

export function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  // --- 1) Admin Basic Auth ---
  if (pathname.startsWith("/admin")) {
    const auth = req.headers.get("authorization");
    const expected = process.env.ADMIN_PASSWORD || "";
    if (expected) {
      const ok =
        auth &&
        (() => {
          try {
            const [scheme, encoded] = auth.split(" ");
            if (scheme !== "Basic" || !encoded) return false;
            const decoded = atob(encoded);
            const [user, pass] = decoded.split(":");
            return user === "admin" && pass === expected;
          } catch {
            return false;
          }
        })();
      if (!ok) {
        return new NextResponse("Autenticación requerida", {
          status: 401,
          headers: {
            "WWW-Authenticate": 'Basic realm="Percheros Admin"',
          },
        });
      }
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
