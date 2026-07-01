"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";

const categorias = [
  "Información general",
  "Hogar",
  "Mascotas",
  "Moteros",
  "Bike",
  "Guitarras",
  "Personalizados",
  "Corporativos",
  "Instalación",
  "Envíos",
  "Parcheros",
  "Obras sociales",
  "Aliados",
];

const asuntoMap: Record<string, string> = {
  instalacion: "Instalación",
  envios: "Envíos",
  parcheros: "Parcheros",
  "obras-sociales": "Obras sociales",
  aliados: "Aliados",
};

export default function ContactForm() {
  const sp = useSearchParams();
  const asunto = sp.get("asunto");
  const [category, setCategory] = useState(
    (asunto && asuntoMap[asunto]) || "Información general",
  );
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || ""),
      phone: String(fd.get("phone") || ""),
      email: String(fd.get("email") || ""),
      category,
      message: String(fd.get("message") || ""),
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error || "No se pudo enviar el mensaje.");
        setStatus("error");
        return;
      }
      setStatus("ok");
      e.currentTarget.reset();
    } catch {
      setErrorMsg("Error de conexión. Intenta de nuevo.");
      setStatus("error");
    }
  }

  const field =
    "w-full rounded-lg border border-madera-200 bg-white px-3 py-2.5 text-sm focus:border-terracota-400 focus:outline-none";

  if (status === "ok") {
    return (
      <div className="rounded-2xl bg-bosque-500 p-8 text-center text-crema-100">
        <p className="text-2xl">✓</p>
        <h2 className="mt-2 font-display text-xl font-bold text-white">
          ¡Mensaje enviado!
        </h2>
        <p className="mt-2 text-crema-100/90">
          Gracias por escribirnos. Nos contactaremos contigo lo más pronto
          posible.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-carbon/80">Nombre *</span>
          <input name="name" required className={field} />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-carbon/80">Celular *</span>
          <input name="phone" type="tel" required className={field} />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-sm font-medium text-carbon/80">Correo *</span>
          <input name="email" type="email" required className={field} />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-sm font-medium text-carbon/80">Categoría</span>
          <select
            className={field}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categorias.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label className="block sm:col-span-2">
          <span className="text-sm font-medium text-carbon/80">Mensaje *</span>
          <textarea name="message" required rows={5} className={field} />
        </label>
      </div>

      {status === "error" && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMsg}
        </p>
      )}

      <p className="text-xs text-carbon/50">* Campos obligatorios</p>
      <Button type="submit" size="lg" disabled={status === "loading"}>
        {status === "loading" ? "Enviando…" : "Enviar mensaje"}
      </Button>
    </form>
  );
}
