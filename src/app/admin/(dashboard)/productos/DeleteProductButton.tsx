"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteProductAction } from "./actions";

export default function DeleteProductButton({
  id,
  name,
}: {
  id: number;
  name: string;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (!confirm(`¿Eliminar "${name}"? Esta acción no se puede deshacer.`)) return;
        startTransition(() => deleteProductAction(id));
      }}
      aria-label={`Eliminar ${name}`}
      className="flex h-8 w-8 items-center justify-center rounded-lg text-carbon/60 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-40"
    >
      <Trash2 size={16} />
    </button>
  );
}
