import { forwardRef, type ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "success" | "danger" | "ghost";
type Size = "md" | "sm" | "icon";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary: "bg-primary text-white hover:bg-primary-deep",
  secondary: "bg-card text-primary border border-primary hover:bg-background",
  success: "bg-success text-white hover:brightness-95",
  danger: "bg-danger text-white hover:brightness-95",
  ghost: "bg-transparent text-text-primary hover:bg-background",
};

const sizeClasses: Record<Size, string> = {
  md: "h-12 px-6 text-body",
  sm: "h-10 px-4 text-small",
  icon: "h-10 w-10 rounded-pill p-0 justify-center",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", loading, disabled, children, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center gap-2 rounded-button font-medium transition-transform duration-150 ease-out",
          "disabled:opacity-50 disabled:pointer-events-none",
          "active:scale-[0.98] focus-visible:scale-100",
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";

// Preset wrappers matching the Phase 7 component-naming convention.
// Same atom, same behavior — just a fixed `variant` so callers can't drift.
type PresetProps = Omit<ButtonProps, "variant">;
export const ButtonPrimary = forwardRef<HTMLButtonElement, PresetProps>((props, ref) => (
  <Button ref={ref} variant="primary" {...props} />
));
ButtonPrimary.displayName = "ButtonPrimary";

export const ButtonSecondary = forwardRef<HTMLButtonElement, PresetProps>((props, ref) => (
  <Button ref={ref} variant="secondary" {...props} />
));
ButtonSecondary.displayName = "ButtonSecondary";

export const ButtonDanger = forwardRef<HTMLButtonElement, PresetProps>((props, ref) => (
  <Button ref={ref} variant="danger" {...props} />
));
ButtonDanger.displayName = "ButtonDanger";

export const ButtonGhost = forwardRef<HTMLButtonElement, PresetProps>((props, ref) => (
  <Button ref={ref} variant="ghost" {...props} />
));
ButtonGhost.displayName = "ButtonGhost";
