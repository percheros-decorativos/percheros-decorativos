import { categories } from "@/lib/catalog";
import ProductForm from "../ProductForm";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-carbon">Nuevo producto</h1>
      <div className="mt-6 max-w-3xl">
        <ProductForm categories={categories} />
      </div>
    </div>
  );
}
