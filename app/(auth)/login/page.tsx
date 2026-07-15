import Link from "next/link";
import { AuthCard } from "@/components/auth/AuthCard";
import { SocialLoginButton } from "@/components/auth/SocialLoginButton";
import { Input } from "@/components/ui/Input";
import { ButtonPrimary } from "@/components/ui/Button";

export const metadata = { title: "Sign In — MigraHub" };

export default function LoginPage() {
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
      <form className="flex flex-col gap-5">
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
        <ButtonPrimary type="submit" className="w-full justify-center">
          Sign In
        </ButtonPrimary>
      </form>

      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-border" />
        <span className="text-caption text-text-muted">or</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <div className="flex flex-col gap-3">
        <SocialLoginButton icon={<span aria-hidden="true">G</span>}>
          Continue with Google
        </SocialLoginButton>
        <SocialLoginButton icon={<span aria-hidden="true"></span>}>
          Continue with Microsoft
        </SocialLoginButton>
        <SocialLoginButton icon={<span aria-hidden="true"></span>}>
          Continue with Apple
        </SocialLoginButton>
      </div>
    </AuthCard>
  );
}
