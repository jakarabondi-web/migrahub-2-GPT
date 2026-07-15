import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { SignupsChart, type SignupsChartPoint } from "@/components/admin/SignupsChart";
import {
  ApplicationsByStatusChart,
  type StatusCount,
} from "@/components/admin/ApplicationsByStatusChart";

export const metadata = { title: "Reports — MigraHub Admin" };
export const dynamic = "force-dynamic";

const DAYS = 14;
const STATUS_ORDER = ["Applied", "Reviewing", "Interview", "Offer", "Rejected"];

function dayKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function dayLabel(date: Date) {
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

async function getSignupSeries(): Promise<SignupsChartPoint[]> {
  const since = new Date();
  since.setDate(since.getDate() - (DAYS - 1));
  since.setHours(0, 0, 0, 0);

  const users = await prisma.user.findMany({
    where: { createdAt: { gte: since }, role: { in: ["candidate", "employer"] } },
    select: { createdAt: true, role: true },
  });

  const buckets = new Map<string, { candidates: number; employers: number }>();
  for (let i = 0; i < DAYS; i++) {
    const d = new Date(since);
    d.setDate(d.getDate() + i);
    buckets.set(dayKey(d), { candidates: 0, employers: 0 });
  }

  for (const user of users) {
    const key = dayKey(user.createdAt);
    const bucket = buckets.get(key);
    if (!bucket) continue;
    if (user.role === "candidate") bucket.candidates += 1;
    else bucket.employers += 1;
  }

  return Array.from(buckets.entries()).map(([key, counts]) => ({
    date: dayLabel(new Date(key)),
    ...counts,
  }));
}

async function getApplicationsByStatus(): Promise<StatusCount[]> {
  const applications = await prisma.application.groupBy({
    by: ["status"],
    _count: { status: true },
  });

  const counts = new Map(applications.map((a) => [a.status, a._count.status]));
  return STATUS_ORDER.map((status) => ({ status, count: counts.get(status) ?? 0 }));
}

export default async function AdminReportsPage() {
  const [signupSeries, applicationStatus] = await Promise.all([
    getSignupSeries(),
    getApplicationsByStatus(),
  ]);

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <PageHeader title="Reports" subtitle="Live from the database — nothing here is sampled." />

      <Card>
        <CardHeader>
          <CardTitle>Signups, last {DAYS} days</CardTitle>
        </CardHeader>
        <SignupsChart points={signupSeries} />
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Applications by status</CardTitle>
        </CardHeader>
        <ApplicationsByStatusChart data={applicationStatus} />
      </Card>
    </div>
  );
}
