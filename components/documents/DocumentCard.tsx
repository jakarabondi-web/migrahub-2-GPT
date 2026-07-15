"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { FileText, Trash2, Loader2 } from "lucide-react";

export interface DocumentCardData {
  id: string;
  name: string;
  category: string;
  createdAt: string;
  sizeBytes: number;
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function DocumentCard({ document }: { document: DocumentCardData }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    setDeleting(true);
    const response = await fetch(`/api/documents/${document.id}`, { method: "DELETE" });
    if (response.ok) {
      router.refresh();
    } else {
      setDeleting(false);
    }
  }

  const uploadedAt = new Date(document.createdAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Card className="flex items-start gap-4">
      <a
        href={`/api/documents/${document.id}/file`}
        target="_blank"
        rel="noreferrer"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-button bg-primary/10 text-primary transition-colors hover:bg-primary/20"
        aria-label={`Open ${document.name}`}
      >
        <FileText className="h-5 w-5" aria-hidden="true" />
      </a>
      <div className="min-w-0 flex-1">
        <a
          href={`/api/documents/${document.id}/file`}
          target="_blank"
          rel="noreferrer"
          className="truncate text-small font-semibold text-text-primary hover:underline"
        >
          {document.name}
        </a>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <Badge tone="neutral">{document.category}</Badge>
          <span className="text-caption text-text-muted">
            {formatSize(document.sizeBytes)} · Uploaded {uploadedAt}
          </span>
        </div>
      </div>
      <button
        type="button"
        onClick={handleDelete}
        disabled={deleting}
        aria-label={`Delete ${document.name}`}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-button text-text-muted transition-colors hover:bg-danger/10 hover:text-danger disabled:opacity-60"
      >
        {deleting ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <Trash2 className="h-4 w-4" aria-hidden="true" />
        )}
      </button>
    </Card>
  );
}
