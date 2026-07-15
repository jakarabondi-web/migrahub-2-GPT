import { Card } from "@/components/ui/Card";
import { ButtonPrimary } from "@/components/ui/Button";
import { Clock } from "lucide-react";

export function NextActionCard({
  title,
  deadline,
  estimate,
}: {
  title: string;
  deadline: string;
  estimate: string;
}) {
  return (
    <Card className="border-torch/30 bg-torch/5">
      <p className="mb-2 text-caption font-semibold uppercase tracking-wide text-torch">
        Next Best Action
      </p>
      <h3 className="mb-3 text-h4 text-text-primary text-balance">{title}</h3>
      <div className="mb-5 flex items-center gap-4 text-small text-text-secondary">
        <span>Deadline: {deadline}</span>
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
          {estimate}
        </span>
      </div>
      <ButtonPrimary size="sm">Start</ButtonPrimary>
    </Card>
  );
}
