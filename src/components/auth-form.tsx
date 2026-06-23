"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/env";
import { Button, Field, Input } from "@/components/ui";
import { SetupNotice } from "@/components/setup-notice";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const configured = isSupabaseConfigured();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const isSignup = mode === "signup";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!configured) return;
    setLoading(true);
    setError(null);
    setInfo(null);

    const supabase = createClient();

    if (isSignup) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo:
            typeof window !== "undefined"
              ? `${window.location.origin}/auth/callback`
              : undefined,
        },
      });
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
      if (data.session) {
        router.push("/app");
        router.refresh();
        return;
      }
      setInfo("Check your email to confirm your account, then log in.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    router.push("/app");
    router.refresh();
  }

  return (
    <div className="w-full max-w-sm">
      <h1 className="text-2xl font-semibold tracking-tight">
        {isSignup ? "Create your account" : "Welcome back"}
      </h1>
      <p className="mt-2 text-sm text-muted">
        {isSignup
          ? "Start building proof walls in minutes."
          : "Log in to manage your proof walls."}
      </p>

      {!configured ? (
        <div className="mt-6">
          <SetupNotice />
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <Field label="Email" htmlFor="email">
          <Input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            disabled={!configured}
          />
        </Field>
        <Field label="Password" htmlFor="password">
          <Input
            id="password"
            type="password"
            required
            minLength={6}
            autoComplete={isSignup ? "new-password" : "current-password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            disabled={!configured}
          />
        </Field>

        {error ? (
          <p className="rounded-lg bg-[#fdecec] px-3 py-2 text-sm text-danger">
            {error}
          </p>
        ) : null}
        {info ? (
          <p className="rounded-lg bg-[#e8f7ee] px-3 py-2 text-sm text-success">
            {info}
          </p>
        ) : null}

        <Button
          type="submit"
          className="w-full"
          disabled={!configured || loading}
        >
          {loading
            ? "Please wait…"
            : isSignup
              ? "Create account"
              : "Log in"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        {isSignup ? (
          <>
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-brand">
              Log in
            </Link>
          </>
        ) : (
          <>
            New to Castio?{" "}
            <Link href="/signup" className="font-medium text-brand">
              Create an account
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
