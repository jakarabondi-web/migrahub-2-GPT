import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SocialLoginButton({
  icon,
  children,
  className,
  ...props
}: { icon: ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(
        "flex h-12 w-full items-center justify-center gap-3 rounded-button border border-border",
        "bg-card text-small font-medium text-text-primary transition-colors duration-150",
        "hover:bg-background focus-visible:ring-2 focus-visible:ring-primary",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-card",
        className,
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
