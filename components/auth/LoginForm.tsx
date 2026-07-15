"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthCard } from "@/components/auth/AuthCard";
import { SocialLoginButton } from "@/components/auth/SocialLoginButton";
import { Input } from "@/components/ui/Input";
import { ButtonPrimary } from "@/components/ui/Button";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const form = new FormData(event.currentTarget);
    const result = await signIn("credentials", {
      email: form.get("email"),
      password: form.get("password"),
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("We couldn't sign you in with that email and password. Please try again.");
      return;
    }

    router.push(searchParams.get("callbackUrl") || "/dashboard");
    router.refresh();
  }

  return (
    <AuthCard
      title="Welcome Back"
      footer={
        <span className="text-text-secondary">
          Need an account?{" "}
          <Link href="/register" className="font-medium text-primary">
            Create one
          </Link>
        </span>
      }
    >
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        {error && (
          <p role="alert" className="rounded-button bg-danger/10 px-4 py-3 text-small text-danger">
            {error}
          </p>
        )}
        <Input label="Email" type="email" name="email" autoComplete="email" required />
        <Input
          label="Password"
          type="password"
          name="password"
          autoComplete="current-password"
          required
        />
        <div className="flex items-center justify-between text-small">
          <label className="flex items-center gap-2 text-text-secondary">
            <input type="checkbox" name="remember" className="h-4 w-4 rounded border-border" />
            Remember Me
          </label>
          <Link href="/forgot-password" className="font-medium text-primary">
            Forgot Password
          </Link>
        </div>
        <ButtonPrimary type="submit" loading={loading} className="w-full justify-center">
          Sign In
        </ButtonPrimary>
      </form>

      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-border" />
        <span className="text-caption text-text-muted">or</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <div className="flex flex-col gap-3">
        <SocialLoginButton icon={<span aria-hidden="true">G</span>} disabled title="Coming soon">
          Continue with Google
        </SocialLoginButton>
        <SocialLoginButton icon={<span aria-hidden="true"></span>} disabled title="Coming soon">
          Continue with Microsoft
        </SocialLoginButton>
        <SocialLoginButton icon={<span aria-hidden="true"></span>} disabled title="Coming soon">
          Continue with Apple
        </SocialLoginButton>
      </div>
    </AuthCard>
  );
}
