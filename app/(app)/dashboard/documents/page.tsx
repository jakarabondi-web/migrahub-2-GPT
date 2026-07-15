import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { DocumentCard } from "@/components/documents/DocumentCard";
import { UploadDropzone } from "@/components/documents/UploadDropzone";
import { EmptyState } from "@/components/ui/EmptyState";
import { FolderLock } from "lucide-react";

export const metadata = { title: "My Documents — MigraHub" };

export default async function DocumentsPage() {
  const session = await getServerSession(authOptions);

  const documents = session?.user?.id
    ? await prisma.document.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" },
      })
    : [];

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <PageHeader
        title="My Documents"
        subtitle="Your secure immigration document vault."
      />
      <UploadDropzone />
      {documents.length === 0 ? (
        <EmptyState
          icon={<FolderLock className="h-6 w-6" aria-hidden="true" />}
          title="No documents uploaded yet."
          body="Start building your secure document vault by uploading your first immigration document."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {documents.map((doc) => (
            <DocumentCard
              key={doc.id}
              document={{
                id: doc.id,
                name: doc.name,
                category: doc.category,
                createdAt: doc.createdAt.toISOString(),
                sizeBytes: doc.sizeBytes,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
