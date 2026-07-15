import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { FileText } from "lucide-react";
import type { VaultDocument } from "@/lib/mock-data";

export function DocumentCard({ document }: { document: VaultDocument }) {
  return (
    <Card className="flex items-start gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-button bg-primary/10 text-primary">
        <FileText className="h-5 w-5" aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-small font-semibold text-text-primary">{document.name}</p>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <Badge tone="neutral">{document.category}</Badge>
          <span className="text-caption text-text-muted">Uploaded {document.uploadedAt}</span>
        </div>
        {document.expiresAt && (
          <p className="mt-1 text-caption text-torch">Expires {document.expiresAt}</p>
        )}
      </div>
    </Card>
  );
}
