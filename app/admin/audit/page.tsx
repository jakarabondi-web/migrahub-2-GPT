import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { ClipboardList } from "lucide-react";

export const metadata = { title: "Audit Log — MigraHub Admin" };
export const dynamic = "force-dynamic";

const ACTION_TONE: Record<string, "info" | "success" | "warning" | "danger"> = {
  "account.created": "info",
  "job.posted": "success",
  "application.status_changed": "warning",
  "document.deleted": "danger",
  "company.updated": "info",
  "feature_flag.toggled": "warning",
};

function describe(action: string, metadata: Record<string, unknown> | null) {
  switch (action) {
    case "account.created":
      return `Created a ${metadata?.role ?? "candidate"} account`;
    case "job.posted":
      return `Posted "${metadata?.title}" at ${metadata?.company}`;
    case "application.status_changed":
      return `Changed application status: ${metadata?.from} → ${metadata?.to}`;
    case "document.deleted":
      return `Deleted document "${metadata?.name}" (${metadata?.category})`;
    case "company.updated":
      return `Updated company profile for ${metadata?.name}`;
    case "feature_flag.toggled":
      return `Set flag "${metadata?.key}" to ${metadata?.enabled ? "on" : "off"}`;
    default:
      return action;
  }
}

export default async function AdminAuditPage() {
  const entries = await prisma.auditLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader title="Audit Log" subtitle="The last 100 security-relevant actions across the platform." />
      {entries.length === 0 ? (
        <EmptyState
          icon={<ClipboardList className="h-6 w-6" aria-hidden="true" />}
          title="Nothing logged yet."
          body="Actions like account creation, job postings, and document deletions will appear here as they happen."
        />
      ) : (
        <Card className="overflow-x-auto p-0">
          <table className="w-full min-w-[640px] border-collapse text-small">
            <thead>
              <tr className="border-b border-border text-left text-caption font-semibold uppercase tracking-wide text-text-muted">
                <th className="px-6 py-3">When</th>
                <th className="px-6 py-3">Actor</th>
                <th className="px-6 py-3">Action</th>
                <th className="px-6 py-3">Detail</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => {
                const metadata = entry.metadata ? JSON.parse(entry.metadata) : null;
                return (
                  <tr key={entry.id} className="border-b border-border last:border-0 align-top">
                    <td className="whitespace-nowrap px-6 py-3 text-text-muted">
                      {entry.createdAt.toLocaleString(undefined, {
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-6 py-3 text-text-secondary">{entry.actorEmail ?? "—"}</td>
                    <td className="px-6 py-3">
                      <Badge tone={ACTION_TONE[entry.action] ?? "neutral"}>{entry.action}</Badge>
                    </td>
                    <td className="px-6 py-3 text-text-secondary">{describe(entry.action, metadata)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}
