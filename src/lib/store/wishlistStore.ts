"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface WishlistItem {
  id: number;
  slug: string;
  name: string;
  priceCop: number;
  image: string;
}

interface WishlistState {
  items: WishlistItem[];
  toggle: (product: WishlistItem) => void;
  has: (id: number) => boolean;
  clear: () => void;
}

const safeItems = (items: unknown): WishlistItem[] =>
  Array.isArray(items) ? (items as WishlistItem[]) : [];

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (product) => {
        const items = safeItems(get().items);
        const exists = items.some((i) => i.id === product.id);
        set({
          items: exists
            ? items.filter((i) => i.id !== product.id)
            : [...items, product],
        });
      },
      has: (id) => safeItems(get().items).some((i) => i.id === id),
      clear: () => set({ items: [] }),
    }),
    {
      name: "percheros-wishlist",
      partialize: (state) => ({ items: safeItems(state.items) }),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          if (typeof localStorage !== "undefined") {
            localStorage.removeItem("percheros-wishlist");
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
