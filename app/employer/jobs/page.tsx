import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { NewJobForm } from "@/components/employer/NewJobForm";
import { EmployerJobCard } from "@/components/employer/EmployerJobCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Briefcase } from "lucide-react";

export const metadata = { title: "Jobs — MigraHub Employer" };
export const dynamic = "force-dynamic";

export default async function EmployerJobsPage() {
  const session = await getServerSession(authOptions);

  const company = session?.user?.id
    ? await prisma.company.findUnique({ where: { ownerId: session.user.id } })
    : null;

  const jobs = company
    ? await prisma.job.findMany({
        where: { companyId: company.id },
        orderBy: { createdAt: "desc" },
        include: { _count: { select: { applications: true } } },
      })
    : [];

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <PageHeader title="Jobs" subtitle="Roles you've posted to the MigraHub marketplace." />
      <NewJobForm />
      {jobs.length === 0 ? (
        <EmptyState
          icon={<Briefcase className="h-6 w-6" aria-hidden="true" />}
          title="You haven't posted a job yet."
          body="Post your first sponsorship-friendly role to start reaching candidates."
        />
      ) : (
        <div className="flex flex-col gap-4">
          {jobs.map((job) => (
            <EmployerJobCard
              key={job.id}
              job={{
                id: job.id,
                title: job.title,
                location: job.location,
                salaryMin: job.salaryMin,
                salaryMax: job.salaryMax,
                sponsorship: job.sponsorship,
                applicantCount: job._count.applications,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
