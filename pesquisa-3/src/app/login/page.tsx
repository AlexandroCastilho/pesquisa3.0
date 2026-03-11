"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const trimmedEmail = email.trim().toLowerCase();

      if (!trimmedEmail || !password) {
        setError("Preencha e-mail e senha.");
        setLoading(false);
        return;
      }

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: trimmedEmail,
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Erro ao fazer login.");
        setLoading(false);
        return;
      }

      setMessage("Login realizado com sucesso.");
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("ERRO NO LOGIN:", err);
      setError("Não foi possível realizar login.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setGoogleLoading(true);
    setError("");
    setMessage("");

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/login/callback`,
        },
      });

      if (error) {
        setError(error.message);
        setGoogleLoading(false);
      }
    } catch (err) {
      console.error("ERRO NO GOOGLE LOGIN:", err);
      setError("Não foi possível iniciar o login com Google.");
      setGoogleLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-lg p-8">
        <h1 className="text-3xl font-bold text-slate-900">Entrar</h1>

        <p className="mt-2 text-sm text-slate-600">
          Acesse sua conta com segurança
        </p>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={googleLoading}
          className="mt-6 flex w-full items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-800 transition hover:bg-slate-50 disabled:opacity-60"
        >
          {googleLoading ? "Redirecionando..." : "Entrar com Google"}
        </button>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-xs uppercase tracking-wide text-slate-400">ou</span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              E-mail
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-500"
              placeholder="email@empresa.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Senha
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-500"
              placeholder="Digite sua senha"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-800 disabled:opacity-60"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="mt-4 flex justify-between text-sm">
          <a href="/cadastro" className="text-slate-700 hover:underline">
            Criar conta
          </a>

          <a href="/esqueci-senha" className="text-slate-700 hover:underline">
            Esqueci minha senha
          </a>
        </div>

        {error && (
          <p className="mt-4 text-sm text-red-600">
            {error}
          </p>
        )}

        {message && (
          <p className="mt-4 text-sm text-green-600">
            {message}
          </p>
        )}
      </div>
    </main>
  );
}