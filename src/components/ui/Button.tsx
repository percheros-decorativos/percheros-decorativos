import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "green" | "blue" | "orange" | "outline" | "dark";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-rojo-500 text-white hover:bg-rojo-600 shadow-sm",
  green: "bg-verde-500 text-white hover:bg-verde-600 shadow-sm",
  blue: "bg-azul-500 text-white hover:bg-azul-600 shadow-sm",
  orange: "bg-naranja-500 text-white hover:bg-naranja-600 shadow-sm",
  outline: "border-2 border-rojo-500 text-rojo-600 hover:bg-rojo-50",
  dark: "bg-carbon text-white hover:bg-black",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3 text-base",
};

const baseClass =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0";

export function buttonClass(variant: Variant = "primary", size: Size = "md") {
  return `${baseClass} ${variants[variant]} ${sizes[size]}`;
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className">) {
  return (
    <Link
      href={href}
      className={`${buttonClass(variant, size)} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
} & ComponentProps<"button">) {
  return (
    <button className={`${buttonClass(variant, size)} ${className}`} {...props}>
      {children}
    </button>
  );
}
