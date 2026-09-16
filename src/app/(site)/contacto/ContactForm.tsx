"use client";

import { useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import {
  UserIcon,
  PhoneIcon,
  MailIcon,
  TagIcon,
  MessageIcon,
  CheckIcon,
  ChevronDownIcon,
} from "@/components/ui/icons";

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
  "Servicios",
  "Comunidad",
  "Aliados",
];

const asuntoMap: Record<string, string> = {
  instalacion: "Instalación",
  envios: "Envíos",
  servicios: "Servicios",
  moteros: "Moteros",
  bike: "Bike",
  mascotas: "Mascotas",
  comunidad: "Comunidad",
  aliados: "Aliados",
};

function Field({
  label,
  hint,
  icon,
  className = "",
  children,
}: {
  label: string;
  hint?: string;
  icon: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="text-sm font-semibold text-carbon">{label}</span>
      <div className="relative mt-1.5">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-madera">
          {icon}
        </span>
        {children}
      </div>
      {hint && <p className="mt-1.5 text-xs text-carbon/50">{hint}</p>}
    </label>
  );
}

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
    "w-full rounded-xl border border-madera-200 bg-white py-3 pl-11 pr-3.5 text-sm text-carbon shadow-sm outline-none transition-all placeholder:text-carbon/35 focus:border-rojo-400 focus:ring-4 focus:ring-rojo-100";

  if (status === "ok") {
    return (
      <div className="rounded-3xl bg-white p-10 text-center shadow-[0_8px_30px_-8px_rgba(0,0,0,0.15)]">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-bosque-500 text-white">
          <CheckIcon width={30} height={30} strokeWidth={2.5} />
        </span>
        <h2 className="mt-5 font-display text-2xl font-bold text-madera-900">
          ¡Mensaje enviado!
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-carbon/70">
          Gracias por escribirnos. Nuestro equipo revisa cada mensaje y te
          contactaremos lo más pronto posible, normalmente en menos de 24
          horas hábiles.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-bold text-rojo-600 hover:text-rojo-700 hover:underline"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white p-6 shadow-[0_8px_30px_-8px_rgba(0,0,0,0.15)] sm:p-8">
      <h2 className="font-display text-xl font-bold text-madera-900">
        Escríbenos
      </h2>
      <p className="mt-1.5 text-sm text-carbon/60">
        Cuéntanos qué necesitas y con gusto te ayudamos. Si buscas un diseño
        personalizado, cuéntanos la idea, medidas o referencia que tengas en
        mente para darte una cotización más precisa.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Nombre *" icon={<UserIcon width={18} height={18} />}>
            <input
              name="name"
              required
              placeholder="Tu nombre completo"
              className={field}
            />
          </Field>
          <Field
            label="Celular *"
            icon={<PhoneIcon width={17} height={17} />}
            hint="Te contactamos por llamada o WhatsApp."
          >
            <input
              name="phone"
              type="tel"
              required
              placeholder="300 000 0000"
              className={field}
            />
          </Field>
          <Field
            label="Correo *"
            icon={<MailIcon width={17} height={17} />}
            hint="Aquí te enviamos la respuesta y la cotización si aplica."
            className="sm:col-span-2"
          >
            <input
              name="email"
              type="email"
              required
              placeholder="tucorreo@ejemplo.com"
              className={field}
            />
          </Field>
          <Field
            label="Categoría"
            icon={<TagIcon width={17} height={17} />}
            hint="Elige el tema que mejor describe tu mensaje: así te atendemos más rápido."
            className="sm:col-span-2"
          >
            <select
              className={`${field} appearance-none pr-9`}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categorias.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-carbon/40">
              <ChevronDownIcon width={16} height={16} />
            </span>
          </Field>
          <Field
            label="Mensaje *"
            icon={<MessageIcon width={17} height={17} />}
            hint="Mientras más detalle nos des (diseño, medidas, ciudad), más rápido te podemos ayudar."
            className="sm:col-span-2"
          >
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Cuéntanos qué perchero buscas, tu duda o el motivo de tu mensaje…"
              className={`${field} resize-none`}
              style={{ paddingLeft: "2.75rem" }}
            />
          </Field>
        </div>

        {status === "error" && (
          <p className="rounded-xl bg-rojo-50 px-4 py-3 text-sm text-rojo-700">
            {errorMsg}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
          <p className="text-xs text-carbon/50">* Campos obligatorios</p>
          <Button type="submit" size="lg" disabled={status === "loading"}>
            {status === "loading" ? "Enviando…" : "Enviar mensaje"}
          </Button>
        </div>
      </form>
    </div>
  );
}
