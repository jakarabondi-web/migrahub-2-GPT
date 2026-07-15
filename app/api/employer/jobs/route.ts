import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { logAudit } from "@/lib/audit-log";
import { isFlagEnabled } from "@/lib/feature-flags";

async function requireCompany(userId: string) {
  return prisma.company.findUnique({ where: { ownerId: userId } });
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || session.user.role !== "employer") {
    return NextResponse.json(
      { success: false, error: { code: "FORBIDDEN", message: "Employer account required." } },
      { status: 403 },
    );
  }

  const company = await requireCompany(session.user.id);
  if (!company) {
    return NextResponse.json({ success: true, data: { jobs: [] } });
  }

  const jobs = await prisma.job.findMany({
    where: { companyId: company.id },
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { applications: true } } },
  });

  return NextResponse.json({ success: true, data: { jobs } });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || session.user.role !== "employer") {
    return NextResponse.json(
      { success: false, error: { code: "FORBIDDEN", message: "Employer account required." } },
      { status: 403 },
    );
  }

  if (!(await isFlagEnabled("employer_job_posting"))) {
    return NextResponse.json(
      { success: false, error: { code: "FEATURE_DISABLED", message: "Job posting is temporarily paused." } },
      { status: 403 },
    );
  }

  const company = await requireCompany(session.user.id);
  if (!company) {
    return NextResponse.json(
      {
        success: false,
        error: { code: "NO_COMPANY", message: "Please set up your company profile before posting a job." },
      },
      { status: 400 },
    );
  }

  const body = await request.json().catch(() => null);
  const title = body?.title?.trim();
  const location = body?.location?.trim();
  const salaryMin = Number(body?.salaryMin);
  const salaryMax = Number(body?.salaryMax);

  if (!title || !location || !Number.isFinite(salaryMin) || !Number.isFinite(salaryMax)) {
    return NextResponse.json(
      {
        success: false,
        error: { code: "MISSING_FIELDS", message: "Please fill in the title, location, and salary range." },
      },
      { status: 400 },
    );
  }

  if (salaryMax < salaryMin) {
    return NextResponse.json(
      { success: false, error: { code: "INVALID_RANGE", message: "Max salary should be at or above min salary." } },
      { status: 400 },
    );
  }

  const job = await prisma.job.create({
    data: {
      title,
      company: company.name,
      companyId: company.id,
      location,
      salaryMin,
      salaryMax,
      sponsorship: !!body?.sponsorship,
      remote: !!body?.remote,
      industry: body?.industry?.trim() || company.industry || "Other",
    },
  });

  await logAudit({
    actorId: session.user.id,
    actorEmail: session.user.email,
    action: "job.posted",
    targetType: "Job",
    targetId: job.id,
    metadata: { title: job.title, company: company.name },
  });

  return NextResponse.json({ success: true, data: { job }, message: "Job posted." });
}
