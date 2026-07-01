import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Cliente de Supabase. Si no hay variables de entorno configuradas, los
// clientes son null y el código degrada con elegancia (modo local/simulado).
const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || "")
  .replace(/\/+$/, "")
  .replace(/\/rest\/v1\/?$/, "");
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Cliente público (lecturas que respetan RLS)
export const supabase: SupabaseClient | null =
  url && anonKey ? createClient(url, anonKey) : null;

// Cliente admin (escrituras desde API routes / server). NUNCA en cliente.
export const supabaseAdmin: SupabaseClient | null = url
  ? createClient(url, serviceKey || anonKey || "", {
      auth: { persistSession: false },
    })
  : null;

export const SUPABASE_CONFIGURED = !!supabaseAdmin;
