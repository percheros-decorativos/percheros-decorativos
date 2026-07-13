import Link from "next/link";
import type { ReactNode } from "react";
import { logoutAction } from "../login/actions";

// Layout del panel /admin (rutas protegidas). Vive en el grupo (dashboard)
// para que /admin/login, que no debe llevar este nav ni requiere sesión,
// quede fuera de este layout. La sesión la verifica src/proxy.ts para todo
// lo que empieza en /admin salvo /admin/login.

export const metadata = {
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-crema-50">
      <header className="border-b border-carbon/10 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/admin/productos" className="font-display text-lg font-bold text-rojo-600">
            Percheros — Admin
          </Link>
          <nav className="flex gap-1 text-sm font-semibold">
            <Link
              href="/admin/productos"
              className="rounded-md px-3 py-1.5 text-carbon/70 hover:bg-crema-100 hover:text-carbon"
            >
              Productos
            </Link>
            <Link
              href="/admin/ordenes"
              className="rounded-md px-3 py-1.5 text-carbon/70 hover:bg-crema-100 hover:text-carbon"
            >
              Órdenes
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-carbon/50 hover:text-carbon">
              Ver sitio →
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="text-sm font-semibold text-carbon/50 hover:text-red-600"
              >
                Cerrar sesión
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}
