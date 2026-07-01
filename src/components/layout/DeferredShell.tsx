"use client";

import dynamic from "next/dynamic";

// Componentes no críticos para el primer paint: se cargan diferidos
// (solo en cliente) para mejorar la velocidad percibida y Core Web Vitals.
const CartDrawer = dynamic(() => import("@/components/cart/CartDrawer"), {
  ssr: false,
});
const QuickViewModal = dynamic(
  () => import("@/components/ui/QuickViewModal"),
  { ssr: false },
);
const WhatsAppFab = dynamic(() => import("@/components/layout/WhatsAppFab"), {
  ssr: false,
});
const ScrollToTop = dynamic(() => import("@/components/ui/ScrollToTop"), {
  ssr: false,
});

export default function DeferredShell() {
  return (
    <>
      <CartDrawer />
      <QuickViewModal />
      <WhatsAppFab />
      <ScrollToTop />
    </>
  );
}
