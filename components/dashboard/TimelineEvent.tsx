import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { JourneyMilestone } from "@/lib/mock-data";

export function TimelineEvent({
  milestone,
  isLast,
}: {
  milestone: JourneyMilestone;
  isLast: boolean;
}) {
  const { label, date, status, description } = milestone;
  return (
    <li className="flex gap-4">
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-pill border-2",
            status === "complete" && "border-success bg-success text-white",
            status === "current" && "border-primary bg-card text-primary",
            status === "upcoming" && "border-border bg-card text-text-muted",
          )}
        >
          {status === "complete" ? (
            <Check className="h-4 w-4" aria-hidden="true" />
          ) : (
            <span className="h-2 w-2 rounded-pill bg-current" aria-hidden="true" />
          )}
        </div>
        {!isLast && (
          <div
            className={cn("mt-1 w-px flex-1", status === "complete" ? "bg-primary" : "bg-border")}
          />
        )}
      </div>
      <div className="pb-8">
        <div className="flex items-center gap-3">
          <p className="text-body font-semibold text-text-primary">{label}</p>
          {date && <p className="text-caption text-text-muted">{date}</p>}
        </div>
        <p className="mt-1 text-small text-text-secondary">{description}</p>
      </div>
    </li>
  );
}
