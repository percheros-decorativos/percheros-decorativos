import { z } from "zod";

export const checkoutSchema = z.object({
  customer: z.object({
    name: z.string().min(2, "Ingresa tu nombre completo").max(120),
    email: z.string().email("Correo inválido"),
    phone: z.string().min(7, "Teléfono inválido").max(20),
    address: z.string().min(5, "Ingresa la dirección").max(200),
    city: z.string().min(2, "Ingresa la ciudad").max(80),
    department: z.string().min(2, "Ingresa el departamento").max(80),
    notes: z.string().max(500).optional().or(z.literal("")),
  }),
  items: z
    .array(
      z.object({
        id: z.number().int().positive(),
        quantity: z.number().int().min(1).max(99),
      }),
    )
    .min(1, "El carrito está vacío"),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;

export const contactSchema = z.object({
  name: z.string().min(2, "Ingresa tu nombre").max(120),
  phone: z.string().min(7, "Celular inválido").max(20),
  email: z.string().email("Correo inválido"),
  category: z.string().max(80).optional().or(z.literal("")),
  message: z.string().min(5, "Escribe tu mensaje").max(1000),
});

export type ContactInput = z.infer<typeof contactSchema>;
