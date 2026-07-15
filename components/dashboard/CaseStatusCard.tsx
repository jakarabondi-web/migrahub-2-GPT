import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export function CaseStatusCard({
  visaType,
  receiptNumber,
  status,
  progress,
  lastUpdate,
}: {
  visaType: string;
  receiptNumber: string;
  status: string;
  progress: number;
  lastUpdate: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Case Status</CardTitle>
        <Badge tone="info">{visaType}</Badge>
      </CardHeader>
      <p className="mb-1 text-caption text-text-muted">Receipt {receiptNumber}</p>
      <p className="mb-4 text-h4 text-text-primary">{status}</p>
      <div className="mb-2 h-2 w-full overflow-hidden rounded-pill bg-background">
        <div
          className="h-full rounded-pill bg-primary transition-[width] duration-250 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-caption text-text-muted">Updated {lastUpdate}</p>
    </Card>
  );
}
