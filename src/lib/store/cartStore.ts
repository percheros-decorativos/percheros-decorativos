"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Patrón inspirado en scentualbliss: store de carrito con persistencia en
// localStorage y defensas contra datos corruptos.

export interface CartItem {
  id: number;
  slug: string;
  name: string;
  priceCop: number;
  image: string;
  maxStock: number;
  quantity: number;
  key: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Omit<CartItem, "quantity" | "key">, qty?: number) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, qty: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

// Defensa: si items se hidrata corrupto, no rompemos toda la app.
const safeItems = (items: unknown): CartItem[] =>
  Array.isArray(items) ? (items as CartItem[]) : [];

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, qty = 1) => {
        const items = safeItems(get().items);
        const key = String(product.id);
        const max = product.maxStock || 99;
        const existing = items.find((i) => i.key === key);
        if (existing) {
          set({
            items: items.map((i) =>
              i.key === key
                ? { ...i, quantity: Math.min((i.quantity || 0) + qty, max) }
                : i,
            ),
          });
        } else {
          set({
            items: [
              ...items,
              { ...product, key, quantity: Math.min(qty, max) },
            ],
          });
        }
        set({ isOpen: true });
      },

      removeItem: (key) =>
        set({ items: safeItems(get().items).filter((i) => i.key !== key) }),

      updateQuantity: (key, qty) => {
        if (qty < 1) {
          get().removeItem(key);
          return;
        }
        set({
          items: safeItems(get().items).map((i) =>
            i.key === key
              ? { ...i, quantity: Math.min(qty, i.maxStock || 99) }
              : i,
          ),
        });
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set({ isOpen: !get().isOpen }),
    }),
    {
      name: "percheros-cart",
      partialize: (state) => ({
        items: safeItems(state.items),
        isOpen: false,
      }),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          if (typeof localStorage !== "undefined") {
            localStorage.removeItem("percheros-cart");
          }
          return;
        }
        if (state && !Array.isArray(state.items)) {
          state.items = [];
        }
      },
    },
  ),
);

// Selectores defensivos
export const useCartTotal = () =>
  useCartStore((s) =>
    safeItems(s.items).reduce(
      (sum, i) => sum + (i.priceCop || 0) * (i.quantity || 0),
      0,
    ),
  );

export const useCartCount = () =>
  useCartStore((s) =>
    safeItems(s.items).reduce((sum, i) => sum + (i.quantity || 0), 0),
  );
