import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { computeMatchScore } from "@/lib/job-matching";

export async function GET() {
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

  const data = jobs
    .map((job) => ({
      ...job,
      matchScore: computeMatchScore(job, profile),
      saved: savedIds.has(job.id),
    }))
    .sort((a, b) => b.matchScore - a.matchScore);

  return NextResponse.json({ success: true, data: { jobs: data } });
}
