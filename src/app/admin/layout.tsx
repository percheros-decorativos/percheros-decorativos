import Link from "next/link";
import type { ReactNode } from "react";

// Layout del panel /admin. La autenticación (Basic Auth) ya la resuelve
// src/middleware.ts para todo lo que empieza en /admin — nada que hacer acá.

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
          <Link href="/" className="text-sm text-carbon/50 hover:text-carbon">
            Ver sitio →
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}
