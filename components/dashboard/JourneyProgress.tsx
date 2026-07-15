import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TimelineStep {
  label: string;
  date?: string;
  status: "complete" | "current" | "upcoming";
}

export function JourneyProgress({ steps }: { steps: TimelineStep[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Journey Progress</CardTitle>
      </CardHeader>
      <ol className="flex items-start justify-between gap-2 overflow-x-auto pb-2">
        {steps.map((step, i) => (
          <li key={step.label} className="flex flex-1 flex-col items-center gap-2 text-center">
            <div className="flex w-full items-center">
              <div
                className={cn(
                  "h-px flex-1",
                  i === 0 ? "opacity-0" : step.status === "upcoming" ? "bg-border" : "bg-primary",
                )}
              />
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-pill border-2",
                  step.status === "complete" && "border-success bg-success text-white",
                  step.status === "current" && "border-primary bg-card text-primary",
                  step.status === "upcoming" && "border-border bg-card text-text-muted",
                )}
                aria-current={step.status === "current" ? "step" : undefined}
              >
                {step.status === "complete" ? (
                  <Check className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <span className="h-2 w-2 rounded-pill bg-current" aria-hidden="true" />
                )}
              </div>
              <div
                className={cn(
                  "h-px flex-1",
                  i === steps.length - 1
                    ? "opacity-0"
                    : step.status === "complete"
                      ? "bg-primary"
                      : "bg-border",
                )}
              />
            </div>
            <p className="text-caption font-medium text-text-primary">{step.label}</p>
            {step.date && <p className="text-caption text-text-muted">{step.date}</p>}
          </li>
        ))}
      </ol>
    </Card>
  );
}
