import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { logAudit } from "@/lib/audit-log";

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || session.user.role !== "employer") {
    return NextResponse.json(
      { success: false, error: { code: "FORBIDDEN", message: "Only employer accounts can edit a company profile." } },
      { status: 403 },
    );
  }

  const body = await request.json().catch(() => null);
  const name = body?.name?.trim();
  if (!name) {
    return NextResponse.json(
      { success: false, error: { code: "MISSING_NAME", message: "Please give your company a name." } },
      { status: 400 },
    );
  }

  const company = await prisma.company.upsert({
    where: { ownerId: session.user.id },
    create: {
      ownerId: session.user.id,
      name,
      industry: body?.industry || null,
      website: body?.website || null,
      description: body?.description || null,
    },
    update: {
      name,
      industry: body?.industry || null,
      website: body?.website || null,
      description: body?.description || null,
    },
  });

  await logAudit({
    actorId: session.user.id,
    actorEmail: session.user.email,
    action: "company.updated",
    targetType: "Company",
    targetId: company.id,
    metadata: { name: company.name },
  });

  return NextResponse.json({ success: true, data: { company }, message: "Company profile saved." });
}
