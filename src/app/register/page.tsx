"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { FormField } from "@/components/FormField";
import { useAuth } from "@/context/AuthContext";
import { register } from "@/services/auth";
import { ApiError } from "@/services/api";

export default function RegisterPage() {
    const router = useRouter();
    const { login } = useAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            await register({ name, email, password });
            await login(email, password);
            router.push("/dashbboard"); 
        } catch (err) {
            if (err instanceof ApiError && err.status === 409) {
                setError("Este e-mail já está em uso. Por favor, escolha outro.");
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
        <h1 className="text-2xl font-bold text-emerald-600">Criar conta</h1>
        <p className="mt-1 text-sm text-slate-500">Comece a registrar seus estudos.</p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <FormField
            id="name"
            label="Nome"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
            minLength={6}
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
            className="rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white transition hover:bg-emerald-700 disabled:opacity-60"
          >
            {isSubmitting ? "Criando conta..." : "Cadastrar"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Já tem conta?{" "}
          <Link href="/login" className="font-medium text-indigo-600 hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </main>
  );
}
