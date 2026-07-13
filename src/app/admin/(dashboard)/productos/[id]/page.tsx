import { notFound } from "next/navigation";
import { getProductByIdAdmin } from "@/lib/products";
import { categories } from "@/lib/catalog";
import ProductForm from "../ProductForm";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductByIdAdmin(Number(id));
  if (!product) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-carbon">
        Editar: {product.name}
      </h1>
      <div className="mt-6 max-w-3xl">
        <ProductForm product={product} categories={categories} />
      </div>
    </div>
  );
}
