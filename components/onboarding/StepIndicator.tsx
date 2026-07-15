import { cn } from "@/lib/utils";

export function StepIndicator({ step, total }: { step: number; total: number }) {
  return (
    <div className="mb-6">
      <p className="mb-2 text-caption font-semibold uppercase tracking-wide text-text-muted">
        Step {step} of {total}
      </p>
      <div className="flex gap-1.5">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={cn(
              "h-1.5 flex-1 rounded-pill transition-colors duration-250",
              i < step ? "bg-primary" : "bg-border",
            )}
          />
        ))}
      </div>
    </div>
  );
}
