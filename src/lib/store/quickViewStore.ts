"use client";
import { create } from "zustand";

export interface QuickViewProduct {
  id: number;
  slug: string;
  name: string;
  priceCop: number;
  compareAtCop?: number | null;
  image: string;
  shortDesc?: string | null;
  stock: number;
  categoryName?: string | null;
}

interface QuickViewState {
  product: QuickViewProduct | null;
  open: (product: QuickViewProduct) => void;
  close: () => void;
}

// Volátil (no se persiste): al recargar, el modal arranca cerrado.
export const useQuickViewStore = create<QuickViewState>((set) => ({
  product: null,
  open: (product) => set({ product }),
  close: () => set({ product: null }),
}));
