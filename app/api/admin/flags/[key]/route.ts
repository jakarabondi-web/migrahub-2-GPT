import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { logAudit } from "@/lib/audit-log";
import { FLAG_DEFINITIONS, type FlagKey } from "@/lib/feature-flags";

export async function PATCH(request: Request, { params }: { params: Promise<{ key: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || session.user.role !== "admin") {
    return NextResponse.json(
      { success: false, error: { code: "FORBIDDEN", message: "Admin account required." } },
      { status: 403 },
    );
  }

  const { key } = await params;
  if (!(key in FLAG_DEFINITIONS)) {
    return NextResponse.json(
      { success: false, error: { code: "NOT_FOUND", message: "That flag doesn't exist." } },
      { status: 404 },
    );
  }

  const body = await request.json().catch(() => null);
  const enabled = !!body?.enabled;
  const def = FLAG_DEFINITIONS[key as FlagKey];

  const flag = await prisma.featureFlag.upsert({
    where: { key },
    create: { key, name: def.name, description: def.description, enabled },
    update: { enabled },
  });

  await logAudit({
    actorId: session.user.id,
    actorEmail: session.user.email,
    action: "feature_flag.toggled",
    targetType: "FeatureFlag",
    targetId: key,
    metadata: { key, enabled },
  });

  return NextResponse.json({ success: true, data: { flag }, message: "Feature flag updated." });
}
