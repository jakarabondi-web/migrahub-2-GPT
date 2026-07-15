import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { ApplicantRow } from "@/components/employer/ApplicantRow";
import { EmptyState } from "@/components/ui/EmptyState";
import { Users } from "lucide-react";

export const metadata = { title: "Applicants — MigraHub Employer" };
export const dynamic = "force-dynamic";

export default async function EmployerApplicantsPage({
  searchParams,
}: {
  searchParams: Promise<{ jobId?: string }>;
}) {
  const { jobId } = await searchParams;
  const session = await getServerSession(authOptions);

  const company = session?.user?.id
    ? await prisma.company.findUnique({ where: { ownerId: session.user.id } })
    : null;

  const applications = company
    ? await prisma.application.findMany({
        where: { job: { companyId: company.id, ...(jobId ? { id: jobId } : {}) } },
        orderBy: { createdAt: "desc" },
        include: {
          candidate: { select: { name: true, email: true } },
          job: { select: { title: true } },
        },
      })
    : [];

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <PageHeader
        title="Applicants"
        subtitle={jobId ? "Applicants for this role." : "Everyone who's applied across your open roles."}
      />
      {applications.length === 0 ? (
        <EmptyState
          icon={<Users className="h-6 w-6" aria-hidden="true" />}
          title="No applicants yet."
          body="Once candidates apply to your roles, they'll show up here."
        />
      ) : (
        <div className="flex flex-col gap-4">
          {applications.map((app) => (
            <ApplicantRow
              key={app.id}
              applicant={{
                id: app.id,
                candidateName: app.candidate.name,
                candidateEmail: app.candidate.email,
                jobTitle: app.job.title,
                status: app.status,
                appliedAt: app.createdAt.toISOString(),
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
