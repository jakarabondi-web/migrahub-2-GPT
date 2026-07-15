import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

const VALID_STATUSES = ["Applied", "Reviewing", "Interview", "Offer", "Rejected"];

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || session.user.role !== "employer") {
    return NextResponse.json(
      { success: false, error: { code: "FORBIDDEN", message: "Employer account required." } },
      { status: 403 },
    );
  }

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const status = body?.status;

  if (!VALID_STATUSES.includes(status)) {
    return NextResponse.json(
      { success: false, error: { code: "INVALID_STATUS", message: "That's not a valid application status." } },
      { status: 400 },
    );
  }

  const application = await prisma.application.findUnique({
    where: { id },
    include: { job: { select: { companyId: true } } },
  });

  const company = await prisma.company.findUnique({ where: { ownerId: session.user.id } });

  if (!application || !company || application.job.companyId !== company.id) {
    return NextResponse.json(
      { success: false, error: { code: "NOT_FOUND", message: "We couldn't find that application." } },
      { status: 404 },
    );
  }

  const updated = await prisma.application.update({ where: { id }, data: { status } });

  return NextResponse.json({
    success: true,
    data: { application: updated },
    message: "Application updated.",
  });
}
