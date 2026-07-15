import Link from "next/link";
import { AuthCard } from "@/components/auth/AuthCard";
import { Input } from "@/components/ui/Input";
import { ButtonPrimary } from "@/components/ui/Button";

export const metadata = { title: "Create Account — MigraHub" };

export default function RegisterPage() {
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
      <form className="flex flex-col gap-5">
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
          helperText="Use at least 8 characters."
          required
        />
        <Input label="Country" name="country" autoComplete="country-name" required />

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

        <ButtonPrimary type="submit" className="w-full justify-center">
          Create Account
        </ButtonPrimary>
      </form>
    </AuthCard>
  );
}
