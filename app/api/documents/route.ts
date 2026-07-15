import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { ALLOWED_MIME_TYPES, MAX_FILE_BYTES, saveDocumentFile } from "@/lib/document-storage";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json(
      { success: false, error: { code: "UNAUTHENTICATED", message: "Please sign in first." } },
      { status: 401 },
    );
  }

  const documents = await prisma.document.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ success: true, data: { documents } });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json(
      { success: false, error: { code: "UNAUTHENTICATED", message: "Please sign in first." } },
      { status: 401 },
    );
  }

  const formData = await request.formData().catch(() => null);
  const file = formData?.get("file");
  const category = (formData?.get("category") as string | null) || "Other";

  if (!file || !(file instanceof File)) {
    return NextResponse.json(
      { success: false, error: { code: "MISSING_FILE", message: "Please choose a file to upload." } },
      { status: 400 },
    );
  }

  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return NextResponse.json(
      {
        success: false,
        error: { code: "UNSUPPORTED_TYPE", message: "We only accept PDF, JPG, or PNG files." },
      },
      { status: 400 },
    );
  }

  if (file.size > MAX_FILE_BYTES) {
    return NextResponse.json(
      { success: false, error: { code: "FILE_TOO_LARGE", message: "That file is larger than the 10MB limit." } },
      { status: 400 },
    );
  }

  const { storagePath } = await saveDocumentFile(session.user.id, file);

  const document = await prisma.document.create({
    data: {
      userId: session.user.id,
      name: file.name,
      category,
      mimeType: file.type,
      sizeBytes: file.size,
      storagePath,
    },
  });

  return NextResponse.json({
    success: true,
    data: { document },
    message: "Your document has been uploaded.",
  });
}
