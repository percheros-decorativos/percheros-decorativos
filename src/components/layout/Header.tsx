"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "@/components/ui/Logo";
import {
  CartIcon,
  MenuIcon,
  CloseIcon,
  MailIcon,
  PhoneIcon,
  ChevronDownIcon,
  HeartIcon,
  WhatsAppIcon,
  FacebookIcon,
  InstagramIcon,
} from "@/components/ui/icons";
import { mainNav, site } from "@/lib/site";
import { useCartCount, useCartStore } from "@/lib/store/cartStore";

export interface NavCategory {
  slug: string;
  name: string;
}

export default function Header({ categories = [] }: { categories?: NavCategory[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [catsOpen, setCatsOpen] = useState(false);
  const count = useCartCount();
  const openCart = useCartStore((s) => s.openCart);

  useEffect(() => {
    setOpen(false);
    setCatsOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50">
      {/* Barra superior roja */}
      <div className="bg-rojo-500 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 text-sm">
          <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-white/80">
            <MailIcon width={16} height={16} />
            <span className="hidden sm:inline">{site.email}</span>
          </a>
          <a href={`tel:${site.phone}`} className="flex items-center gap-1.5 font-semibold hover:text-white/80">
            <PhoneIcon width={16} height={16} />
            {site.phoneDisplay}
          </a>
          <div className="flex items-center gap-3">
            <a href={site.social.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hover:text-white/80">
              <WhatsAppIcon width={17} height={17} />
            </a>
            <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-white/80">
              <FacebookIcon width={17} height={17} />
            </a>
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-white/80">
              <InstagramIcon width={17} height={17} />
            </a>
          </div>
        </div>
      </div>

      {/* Barra principal blanca */}
      <div className="border-b border-rojo-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
          <Logo />

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-6 text-sm font-bold uppercase tracking-wide">
              {mainNav.map((item) => {
                const active =
                  item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                const isCats = item.href === "/categorias";
                return (
                  <li
                    key={item.href}
                    className={isCats ? "relative" : ""}
                    onMouseEnter={isCats ? () => setCatsOpen(true) : undefined}
                    onMouseLeave={isCats ? () => setCatsOpen(false) : undefined}
                  >
                    <Link
                      href={item.href}
                      data-active={active}
                      className={`nav-underline flex items-center gap-1 py-1 transition-colors hover:text-rojo-500 ${
                        active ? "text-rojo-500" : "text-carbon"
                      }`}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.label}
                      {isCats && categories.length > 0 && (
                        <ChevronDownIcon width={13} height={13} />
                      )}
                    </Link>
                    {isCats && catsOpen && categories.length > 0 && (
                      <ul className="absolute left-0 top-full z-50 w-52 overflow-hidden rounded-md border border-rojo-100 bg-white py-1 shadow-xl">
                        {categories.map((c) => (
                          <li key={c.slug}>
                            <Link
                              href={`/categoria/${c.slug}`}
                              className="block px-4 py-2 text-sm font-medium normal-case tracking-normal text-carbon hover:bg-rojo-50 hover:text-rojo-600"
                            >
                              {c.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-1">
            <Link
              href="/wishlist"
              aria-label="Favoritos"
              className="hidden rounded-full p-2.5 text-rojo-600 transition-colors hover:bg-rojo-50 sm:inline-flex"
            >
              <HeartIcon width={20} height={20} />
            </Link>
            <button
              type="button"
              onClick={openCart}
              className="relative rounded-full p-2.5 text-rojo-600 transition-colors hover:bg-rojo-50"
              aria-label={`Abrir carrito, ${count} artículos`}
            >
              <CartIcon width={20} height={20} />
              {count > 0 && (
                <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-rojo-500 px-1 text-[0.62rem] font-bold text-white">
                  {count}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="rounded-full p-2.5 text-rojo-600 lg:hidden"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      {open && (
        <nav aria-label="Móvil" className="border-b border-rojo-100 bg-white lg:hidden">
          <ul className="mx-auto max-w-7xl px-4 py-2">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block border-b border-rojo-50 py-3 font-bold uppercase tracking-wide text-carbon hover:text-rojo-600"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
