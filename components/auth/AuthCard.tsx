import Link from "next/link";
import { type ReactNode } from "react";
import { LibertyMark } from "@/components/ui/LibertyMark";
import { Card } from "@/components/ui/Card";

export function AuthCard({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-16">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2">
          <LibertyMark />
          <span className="text-h4 font-bold text-text-primary">
            Migra<span className="text-primary">Hub</span>
          </span>
        </Link>
        <Card className="shadow-md">
          <div className="mb-6 text-center">
            <h1 className="text-h3 text-text-primary">{title}</h1>
            {subtitle && <p className="mt-2 text-small text-text-secondary">{subtitle}</p>}
          </div>
          {children}
        </Card>
        {footer && <div className="mt-6 text-center text-small">{footer}</div>}
      </div>
    </main>
  );
}
