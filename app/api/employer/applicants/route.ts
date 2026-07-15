import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || session.user.role !== "employer") {
    return NextResponse.json(
      { success: false, error: { code: "FORBIDDEN", message: "Employer account required." } },
      { status: 403 },
    );
  }

  const company = await prisma.company.findUnique({ where: { ownerId: session.user.id } });
  if (!company) {
    return NextResponse.json({ success: true, data: { applications: [] } });
  }

  const { searchParams } = new URL(request.url);
  const jobId = searchParams.get("jobId");

  const applications = await prisma.application.findMany({
    where: {
      job: { companyId: company.id, ...(jobId ? { id: jobId } : {}) },
    },
    orderBy: { createdAt: "desc" },
    include: {
      candidate: { select: { name: true, email: true } },
      job: { select: { id: true, title: true } },
    },
  });

  return NextResponse.json({ success: true, data: { applications } });
}
