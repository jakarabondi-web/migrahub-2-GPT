import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { computeMatchScore } from "@/lib/job-matching";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { JobCard } from "@/components/career/JobCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Briefcase } from "lucide-react";

export const metadata = { title: "My Career — MigraHub" };

export default async function CareerPage() {
  const session = await getServerSession(authOptions);

  const [jobs, profile, savedJobs] = await Promise.all([
    prisma.job.findMany({ orderBy: { createdAt: "asc" } }),
    session?.user?.id
      ? prisma.candidateProfile.findUnique({ where: { userId: session.user.id } })
      : Promise.resolve(null),
    session?.user?.id
      ? prisma.savedJob.findMany({ where: { userId: session.user.id }, select: { jobId: true } })
      : Promise.resolve([]),
  ]);

  const savedIds = new Set(savedJobs.map((s) => s.jobId));
  const ranked = jobs
    .map((job) => ({
      id: job.id,
      title: job.title,
      company: job.company,
      location: job.location,
      salaryMin: job.salaryMin,
      salaryMax: job.salaryMax,
      sponsorship: job.sponsorship,
      matchScore: computeMatchScore(job, profile),
      saved: savedIds.has(job.id),
    }))
    .sort((a, b) => b.matchScore - a.matchScore);

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        title="My Career"
        subtitle={
          profile
            ? "Sponsorship-friendly roles matched to your profile."
            : "Sponsorship-friendly roles. Complete your career goals in Settings for personalized matches."
        }
      />
      {ranked.length === 0 ? (
        <EmptyState
          icon={<Briefcase className="h-6 w-6" aria-hidden="true" />}
          title="No openings right now."
          body="Check back soon — new sponsorship-friendly roles are added regularly."
        />
      ) : (
        <div className="flex flex-col gap-4">
          {ranked.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
