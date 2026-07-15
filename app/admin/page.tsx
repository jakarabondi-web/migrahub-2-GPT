import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/Card";
import { Users, Building2, Briefcase, FileText, MessageSquare, ClipboardList } from "lucide-react";

export const metadata = { title: "Admin — MigraHub" };
export const dynamic = "force-dynamic";

async function getStats() {
  const [candidates, employers, companies, jobs, applications, documents, posts] = await Promise.all([
    prisma.user.count({ where: { role: "candidate" } }),
    prisma.user.count({ where: { role: "employer" } }),
    prisma.company.count(),
    prisma.job.count(),
    prisma.application.count(),
    prisma.document.count(),
    prisma.communityPost.count(),
  ]);
  return { candidates, employers, companies, jobs, applications, documents, posts };
}

export default async function AdminDashboardPage() {
  const stats = await getStats();

  const tiles = [
    { label: "Candidates", value: stats.candidates, icon: Users, tone: "text-primary bg-primary/10" },
    { label: "Employers", value: stats.employers, icon: Building2, tone: "text-secondary bg-secondary/10" },
    { label: "Companies", value: stats.companies, icon: Building2, tone: "text-secondary bg-secondary/10" },
    { label: "Job postings", value: stats.jobs, icon: Briefcase, tone: "text-torch bg-torch/10" },
    { label: "Applications", value: stats.applications, icon: ClipboardList, tone: "text-success bg-success/10" },
    { label: "Documents uploaded", value: stats.documents, icon: FileText, tone: "text-primary bg-primary/10" },
    { label: "Community posts", value: stats.posts, icon: MessageSquare, tone: "text-secondary bg-secondary/10" },
  ];

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <div>
        <h1 className="text-h2 text-text-primary text-balance">Platform overview</h1>
        <p className="mt-2 text-body text-text-secondary">
          Live counts across every module — no sampling, no caching lag.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map(({ label, value, icon: Icon, tone }) => (
          <Card key={label} className="flex items-center gap-4">
            <div className={`flex h-11 w-11 items-center justify-center rounded-button ${tone}`}>
              <Icon className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-h3 text-text-primary tabular-nums">{value}</p>
              <p className="text-small text-text-secondary">{label}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
