import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Finalizar compra",
  robots: { index: false, follow: true },
};

export default function SegmentLayout({ children }: { children: React.ReactNode }) {
  return children;
}
