import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Building2 } from "lucide-react";

export const metadata = { title: "Companies — MigraHub Admin" };
export const dynamic = "force-dynamic";

export default async function AdminCompaniesPage() {
  const companies = await prisma.company.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      owner: { select: { name: true, email: true } },
      _count: { select: { jobs: true } },
    },
  });

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader title="Companies" subtitle={`${companies.length} employer accounts.`} />
      {companies.length === 0 ? (
        <EmptyState
          icon={<Building2 className="h-6 w-6" aria-hidden="true" />}
          title="No companies yet."
          body="Companies appear here as soon as an employer registers."
        />
      ) : (
        <div className="flex flex-col gap-4">
          {companies.map((company) => (
            <Card key={company.id} className="flex items-center justify-between gap-4">
              <div>
                <p className="text-body font-semibold text-text-primary">{company.name}</p>
                <p className="text-small text-text-secondary">
                  {company.owner.name} · {company.owner.email}
                </p>
                {company.industry && (
                  <p className="mt-1 text-caption text-text-muted">{company.industry}</p>
                )}
              </div>
              <div className="shrink-0 text-right">
                <p className="text-h4 text-text-primary tabular-nums">{company._count.jobs}</p>
                <p className="text-caption text-text-muted">
                  {company._count.jobs === 1 ? "job posted" : "jobs posted"}
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
