import { PageHeader } from "@/components/dashboard/PageHeader";
import { DocumentCard } from "@/components/documents/DocumentCard";
import { UploadDropzone } from "@/components/documents/UploadDropzone";
import { EmptyState } from "@/components/ui/EmptyState";
import { FolderLock } from "lucide-react";
import { DOCUMENTS } from "@/lib/mock-data";

export const metadata = { title: "My Documents — MigraHub" };

export default function DocumentsPage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <PageHeader
        title="My Documents"
        subtitle="Your secure immigration document vault."
      />
      <UploadDropzone />
      {DOCUMENTS.length === 0 ? (
        <EmptyState
          icon={<FolderLock className="h-6 w-6" aria-hidden="true" />}
          title="No documents uploaded yet."
          body="Start building your secure document vault by uploading your first immigration document."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {DOCUMENTS.map((doc) => (
            <DocumentCard key={doc.id} document={doc} />
          ))}
        </div>
      )}
    </div>
  );
}
