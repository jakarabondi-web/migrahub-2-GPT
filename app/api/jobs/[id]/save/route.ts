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

  const { id: jobId } = await params;
  const userId = session.user.id;

  const existing = await prisma.savedJob.findUnique({
    where: { userId_jobId: { userId, jobId } },
  });

  if (existing) {
    await prisma.savedJob.delete({ where: { id: existing.id } });
    return NextResponse.json({ success: true, data: { saved: false }, message: "Removed from saved jobs." });
  }

  await prisma.savedJob.create({ data: { userId, jobId } });
  return NextResponse.json({ success: true, data: { saved: true }, message: "Job saved." });
}
