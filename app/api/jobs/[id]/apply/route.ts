import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json(
      { success: false, error: { code: "UNAUTHENTICATED", message: "Please sign in first." } },
      { status: 401 },
    );
  }

  if (session.user.role !== "candidate") {
    return NextResponse.json(
      { success: false, error: { code: "FORBIDDEN", message: "Only candidate accounts can apply to jobs." } },
      { status: 403 },
    );
  }

  const { id: jobId } = await params;

  const job = await prisma.job.findUnique({ where: { id: jobId } });
  if (!job) {
    return NextResponse.json(
      { success: false, error: { code: "NOT_FOUND", message: "We couldn't find that job." } },
      { status: 404 },
    );
  }

  const existing = await prisma.application.findUnique({
    where: { jobId_candidateId: { jobId, candidateId: session.user.id } },
  });
  if (existing) {
    return NextResponse.json({
      success: true,
      data: { application: existing },
      message: "You already applied to this role.",
    });
  }

  const application = await prisma.application.create({
    data: { jobId, candidateId: session.user.id },
  });

  return NextResponse.json({
    success: true,
    data: { application },
    message: "Your application has been submitted.",
  });
}
