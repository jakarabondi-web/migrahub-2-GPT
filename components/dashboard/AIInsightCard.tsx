import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Sparkles } from "lucide-react";

export function AIInsightCard({
  message,
  confidence,
}: {
  message: string;
  confidence: number;
}) {
  return (
    <Card>
      <div className="mb-3 flex items-center justify-between">
        <Badge tone="info" className="gap-1.5">
          <Sparkles className="h-3 w-3" aria-hidden="true" />
          AI Insight
        </Badge>
        <span className="text-caption text-text-muted">{confidence}% confidence</span>
      </div>
      <p className="mb-4 text-body text-text-secondary">{message}</p>
      <div className="flex flex-wrap gap-4 text-small font-medium text-primary">
        <button type="button" className="hover:underline">
          Learn why
        </button>
        <button type="button" className="hover:underline">
          View historical trends
        </button>
        <button type="button" className="hover:underline">
          Ask AI a follow-up
        </button>
      </div>
    </Card>
  );
}
