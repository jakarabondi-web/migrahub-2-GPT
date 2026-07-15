import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { logAudit } from "@/lib/audit-log";

// Response envelope follows the {success, data|error, message} contract
// from the API architecture spec (Phase 10) so every endpoint reads the same.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const firstName = body?.firstName?.trim();
  const lastName = body?.lastName?.trim();
  const email = body?.email?.trim().toLowerCase();
  const password = body?.password;
  const country = body?.country?.trim();
  const role = body?.role === "employer" ? "employer" : "candidate";
  const companyName = body?.companyName?.trim();

  if (!firstName || !lastName || !email || !password) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "MISSING_FIELDS",
          message: "We need your name, email, and a password to create your account.",
        },
      },
      { status: 400 },
    );
  }

  if (role === "employer" && !companyName) {
    return NextResponse.json(
      {
        success: false,
        error: { code: "MISSING_COMPANY_NAME", message: "Please tell us your company's name." },
      },
      { status: 400 },
    );
  }

  if (password.length < 8) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "WEAK_PASSWORD",
          message: "Your password should be at least 8 characters.",
        },
      },
      { status: 400 },
    );
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "EMAIL_TAKEN",
          message: "An account with that email already exists. Try signing in instead.",
        },
      },
      { status: 409 },
    );
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      name: `${firstName} ${lastName}`,
      email,
      passwordHash,
      role,
      country: country || null,
      // Employers don't go through the candidate onboarding wizard.
      onboardingComplete: role === "employer",
      ...(role === "employer" && companyName
        ? { company: { create: { name: companyName } } }
        : {}),
    },
  });

  await logAudit({
    actorId: user.id,
    actorEmail: user.email,
    action: "account.created",
    targetType: "User",
    targetId: user.id,
    metadata: { role },
  });

  return NextResponse.json({
    success: true,
    message: "Account created. You can now sign in.",
  });
}
