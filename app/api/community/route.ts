import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { isFlagEnabled } from "@/lib/feature-flags";

export async function GET() {
  const posts = await prisma.communityPost.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      author: { select: { name: true, immigrationGoal: true } },
      _count: { select: { replies: true } },
    },
  });

  return NextResponse.json({ success: true, data: { posts } });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json(
      { success: false, error: { code: "UNAUTHENTICATED", message: "Please sign in first." } },
      { status: 401 },
    );
  }

  if (!(await isFlagEnabled("community"))) {
    return NextResponse.json(
      { success: false, error: { code: "FEATURE_DISABLED", message: "Community posting is temporarily unavailable." } },
      { status: 403 },
    );
  }

  const body = await request.json().catch(() => null);
  const title = body?.title?.trim();
  const postBody = body?.body?.trim();
  const group = body?.group?.trim() || "General";

  if (!title || !postBody) {
    return NextResponse.json(
      {
        success: false,
        error: { code: "MISSING_FIELDS", message: "Please add a title and a bit of detail before posting." },
      },
      { status: 400 },
    );
  }

  const post = await prisma.communityPost.create({
    data: { authorId: session.user.id, title, body: postBody, group },
  });

  return NextResponse.json({
    success: true,
    data: { post },
    message: "Your post is live.",
  });
}
