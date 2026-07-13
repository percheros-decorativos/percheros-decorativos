"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { loginAction, type LoginState } from "./actions";

const initialState: LoginState = {};

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="space-y-4">
      {state.error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </p>
      )}
      <label className="block">
        <span className="text-sm font-medium text-carbon/80">Contraseña</span>
        <input
          type="password"
          name="password"
          required
          autoFocus
          className="mt-1 w-full rounded-lg border border-carbon/15 bg-white px-3 py-2.5 text-sm focus:border-rojo-400 focus:outline-none"
        />
      </label>
      <Button type="submit" disabled={pending} className="w-full justify-center">
        {pending ? "Entrando…" : "Entrar"}
      </Button>
    </form>
  );
}
