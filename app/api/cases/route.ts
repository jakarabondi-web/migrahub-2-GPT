import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json(
      { success: false, error: { code: "UNAUTHENTICATED", message: "Please sign in first." } },
      { status: 401 },
    );
  }

  const cases = await prisma.immigrationCase.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json({ success: true, data: { cases } });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json(
      { success: false, error: { code: "UNAUTHENTICATED", message: "Please sign in first." } },
      { status: 401 },
    );
  }

  const body = await request.json().catch(() => null);
  const visaType = body?.visaType?.trim();
  const receiptNumber = body?.receiptNumber?.trim();

  if (!visaType) {
    return NextResponse.json(
      {
        success: false,
        error: { code: "MISSING_VISA_TYPE", message: "Please choose a visa category." },
      },
      { status: 400 },
    );
  }

  const createdCase = await prisma.immigrationCase.create({
    data: {
      userId: session.user.id,
      visaType,
      receiptNumber: receiptNumber || null,
    },
  });

  return NextResponse.json({
    success: true,
    data: { case: createdCase },
    message: "Your case has been added.",
  });
}
