import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Building2, Briefcase, Users } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Employer Dashboard — MigraHub" };
export const dynamic = "force-dynamic";

export default async function EmployerDashboardPage() {
  const session = await getServerSession(authOptions);
  const firstName = session?.user?.name?.split(" ")[0] ?? "there";

  const company = session?.user?.id
    ? await prisma.company.findUnique({
        where: { ownerId: session.user.id },
        include: { jobs: { include: { _count: { select: { applications: true } } } } },
      })
    : null;

  if (!company) {
    return (
      <div className="mx-auto max-w-2xl">
        <DashboardHeader name={firstName} progress={0} nextMilestone="setting up your company" />
        <EmptyState
          icon={<Building2 className="h-6 w-6" aria-hidden="true" />}
          title="Let's set up your company profile."
          body="Add your company details so candidates know who's hiring."
        />
      </div>
    );
  }

  const jobCount = company.jobs.length;
  const applicantCount = company.jobs.reduce((sum, job) => sum + job._count.applications, 0);

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <div className="mb-2">
        <h1 className="text-h2 text-text-primary text-balance">Welcome back, {firstName}.</h1>
        <p className="mt-2 text-body text-text-secondary">
          {company.name} has {jobCount} open {jobCount === 1 ? "role" : "roles"} and {applicantCount}{" "}
          {applicantCount === 1 ? "applicant" : "applicants"}.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link href="/employer/jobs">
          <Card className="flex items-center gap-4 transition-shadow hover:shadow-md">
            <div className="flex h-11 w-11 items-center justify-center rounded-button bg-primary/10 text-primary">
              <Briefcase className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-h3 text-text-primary">{jobCount}</p>
              <p className="text-small text-text-secondary">Open roles</p>
            </div>
          </Card>
        </Link>
        <Link href="/employer/applicants">
          <Card className="flex items-center gap-4 transition-shadow hover:shadow-md">
            <div className="flex h-11 w-11 items-center justify-center rounded-button bg-secondary/10 text-secondary">
              <Users className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-h3 text-text-primary">{applicantCount}</p>
              <p className="text-small text-text-secondary">Total applicants</p>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
}
