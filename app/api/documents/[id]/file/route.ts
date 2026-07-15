import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { readDocumentFile } from "@/lib/document-storage";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json(
      { success: false, error: { code: "UNAUTHENTICATED", message: "Please sign in first." } },
      { status: 401 },
    );
  }

  const { id } = await params;
  const document = await prisma.document.findUnique({ where: { id } });

  if (!document || document.userId !== session.user.id) {
    return NextResponse.json(
      { success: false, error: { code: "NOT_FOUND", message: "We couldn't find that document." } },
      { status: 404 },
    );
  }

  const buffer = await readDocumentFile(document.storagePath);

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": document.mimeType,
      "Content-Disposition": `inline; filename="${encodeURIComponent(document.name)}"`,
      "Content-Length": String(document.sizeBytes),
    },
  });
}
