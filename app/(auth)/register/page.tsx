"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AuthCard } from "@/components/auth/AuthCard";
import { Input } from "@/components/ui/Input";
import { ButtonPrimary } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Role = "candidate" | "employer";

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("candidate");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const form = new FormData(event.currentTarget);
    const payload = {
      firstName: form.get("firstName"),
      lastName: form.get("lastName"),
      email: form.get("email"),
      password: form.get("password"),
      country: form.get("country"),
      role,
      companyName: form.get("companyName"),
    };

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json();

    if (!result.success) {
      setError(result.error.message);
      setLoading(false);
      return;
    }

    const signInResult = await signIn("credentials", {
      email: payload.email,
      password: payload.password,
      redirect: false,
    });

    setLoading(false);

    if (signInResult?.error) {
      router.push("/login");
      return;
    }

    router.push(role === "employer" ? "/employer" : "/onboarding");
    router.refresh();
  }

  return (
    <AuthCard
      title="Create your account"
      subtitle="Let's begin your journey."
      footer={
        <span className="text-text-secondary">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary">
            Sign in
          </Link>
        </span>
      }
    >
      <div className="mb-5 flex gap-2 rounded-button border border-border bg-background p-1">
        {(["candidate", "employer"] as const).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setRole(option)}
            className={cn(
              "flex-1 rounded-button py-2 text-small font-medium capitalize transition-colors duration-150",
              role === option ? "bg-card text-primary shadow-sm" : "text-text-secondary",
            )}
          >
            {option === "candidate" ? "I'm job seeking" : "I'm hiring"}
          </button>
        ))}
      </div>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        {error && (
          <p role="alert" className="rounded-button bg-danger/10 px-4 py-3 text-small text-danger">
            {error}
          </p>
        )}
        <div className="grid grid-cols-2 gap-4">
          <Input label="First Name" name="firstName" autoComplete="given-name" required />
          <Input label="Last Name" name="lastName" autoComplete="family-name" required />
        </div>
        <Input label="Email" type="email" name="email" autoComplete="email" required />
        <Input
          label="Password"
          type="password"
          name="password"
          autoComplete="new-password"
          minLength={8}
          helperText="Use at least 8 characters."
          required
        />
        {role === "candidate" ? (
          <Input label="Country" name="country" autoComplete="country-name" required />
        ) : (
          <Input label="Company name" name="companyName" required />
        )}

        <label className="flex items-start gap-2 text-small text-text-secondary">
          <input type="checkbox" name="terms" required className="mt-0.5 h-4 w-4 rounded border-border" />
          I agree to the{" "}
          <Link href="/terms" className="font-medium text-primary">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="font-medium text-primary">
            Privacy Policy
          </Link>
          .
        </label>

        <ButtonPrimary type="submit" loading={loading} className="w-full justify-center">
          {role === "employer" ? "Create Employer Account" : "Create Account"}
        </ButtonPrimary>
      </form>
    </AuthCard>
  );
}
