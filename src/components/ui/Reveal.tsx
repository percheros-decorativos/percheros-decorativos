import type { ReactNode } from "react";

// Reveal basado en CSS scroll-driven (animation-timeline). Server component.
// Si el navegador no soporta o el usuario pide reduced-motion, el contenido
// se muestra normal (sin depender de JS) → robusto y sin saltos de LCP.

type Direction = "up" | "left" | "right";
const cls: Record<Direction, string> = {
  up: "reveal",
  left: "reveal-l",
  right: "reveal-r",
};

export default function Reveal({
  children,
  direction = "up",
  className = "",
}: {
  children: ReactNode;
  direction?: Direction;
  className?: string;
}) {
  return <div className={`${cls[direction]} ${className}`}>{children}</div>;
}

export function RevealStagger({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`reveal-stagger ${className}`}>{children}</div>;
}

export function RevealItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}
