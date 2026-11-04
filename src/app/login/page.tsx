"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { FormField } from "@/components/FormField";
import { useAuth } from "@/context/AuthContext";
import { ApiError } from "@/services/api";

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            await login(email, password);
            router.push("/dashboard");
        } catch (err) {
            if (err instanceof ApiError) {
                setError("Email ou senha inválidos");  
            } else {
                setError("Ocorreu um erro inesperado. Tente novamente mais tarde.");
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center p-4">
             <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
                  <h1 className="text-2xl font-bold text-emerald-600">Entrar no DevLog</h1>
                  <p className= "mt-1 text-sm text-slate-500"> acompanhe suas sessões de estudo</p>

                 <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <FormField
            id="email"
            label="E-mail"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormField
            id="password"
            label="Senha"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
            {error && (
            <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isSubmitting ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-slate-500">
            Não tem uma conta?{" "}
            <Link href="/register" className="font-medium text-blue-500 hover:underline">
                Cadastre-se
            </Link>
        </p>
      </div>
    </main>
  );
}