import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json(
      { success: false, error: { code: "UNAUTHENTICATED", message: "Please sign in first." } },
      { status: 401 },
    );
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json(
      { success: false, error: { code: "INVALID_BODY", message: "That request didn't come through right. Please try again." } },
      { status: 400 },
    );
  }

  const userId = session.user.id;

  await prisma.user.update({
    where: { id: userId },
    data: {
      country: body.country || null,
      citizenship: body.citizenship || null,
      immigrationGoal: body.immigrationGoal || null,
      onboardingComplete: true,
    },
  });

  if (!body.caseSkipped && body.visaType) {
    await prisma.immigrationCase.create({
      data: {
        userId,
        visaType: body.visaType,
        receiptNumber: body.receiptNumber || null,
      },
    });
  }

  await prisma.candidateProfile.upsert({
    where: { userId },
    create: {
      userId,
      jobTitle: body.jobTitle || null,
      experienceYears: body.experienceYears ? Number(body.experienceYears) : null,
      desiredLocation: body.desiredLocation || null,
      needsSponsorship: !!body.needsSponsorship,
    },
    update: {
      jobTitle: body.jobTitle || null,
      experienceYears: body.experienceYears ? Number(body.experienceYears) : null,
      desiredLocation: body.desiredLocation || null,
      needsSponsorship: !!body.needsSponsorship,
    },
  });

  await prisma.preferences.upsert({
    where: { userId },
    create: {
      userId,
      emailNotifications: !!body.emailNotifications,
      smsNotifications: !!body.smsNotifications,
      pushNotifications: !!body.pushNotifications,
      theme: body.theme || "system",
    },
    update: {
      emailNotifications: !!body.emailNotifications,
      smsNotifications: !!body.smsNotifications,
      pushNotifications: !!body.pushNotifications,
      theme: body.theme || "system",
    },
  });

  return NextResponse.json({
    success: true,
    message: "You're all set. Welcome to MigraHub.",
  });
}
