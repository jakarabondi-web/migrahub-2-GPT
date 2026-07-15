import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export const metadata = { title: "Users — MigraHub Admin" };
export const dynamic = "force-dynamic";

const ROLE_TONE: Record<string, "info" | "success" | "warning"> = {
  candidate: "info",
  employer: "success",
  admin: "warning",
};

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      country: true,
      onboardingComplete: true,
      createdAt: true,
    },
  });

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader title="Users" subtitle={`${users.length} accounts across all roles.`} />
      <Card className="overflow-x-auto p-0">
        <table className="w-full min-w-[640px] border-collapse text-small">
          <thead>
            <tr className="border-b border-border text-left text-caption font-semibold uppercase tracking-wide text-text-muted">
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Country</th>
              <th className="px-6 py-3">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-border last:border-0">
                <td className="px-6 py-3 font-medium text-text-primary">{user.name}</td>
                <td className="px-6 py-3 text-text-secondary">{user.email}</td>
                <td className="px-6 py-3">
                  <Badge tone={ROLE_TONE[user.role] ?? "neutral"}>{user.role}</Badge>
                </td>
                <td className="px-6 py-3 text-text-secondary">{user.country ?? "—"}</td>
                <td className="px-6 py-3 text-text-muted">
                  {user.createdAt.toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
