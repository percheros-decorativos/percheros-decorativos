"use server";

import { revalidatePath } from "next/cache";
import { updateOrderStatus } from "@/lib/orders";

export async function updateOrderStatusAction(formData: FormData) {
  const reference = formData.get("reference") as string;
  const status = formData.get("status") as string;
  if (!reference || !status) return;
  await updateOrderStatus(reference, status);
  revalidatePath("/admin/ordenes");
  revalidatePath(`/admin/ordenes/${reference}`);
}
