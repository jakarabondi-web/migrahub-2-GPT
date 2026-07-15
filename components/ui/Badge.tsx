import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Tone = "neutral" | "success" | "warning" | "danger" | "info";

const toneClasses: Record<Tone, string> = {
  neutral: "bg-background text-text-secondary border-border",
  success: "bg-success/10 text-success border-success/20",
  warning: "bg-torch/10 text-torch border-torch/20",
  danger: "bg-danger/10 text-danger border-danger/20",
  info: "bg-secondary/10 text-secondary border-secondary/20",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

export function Badge({ className, tone = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill border px-3 py-1 text-caption font-medium",
        toneClasses[tone],
        className,
      )}
      {...props}
    />
  );
}
