import { UploadCloud } from "lucide-react";

export function UploadDropzone() {
  return (
    <label className="flex cursor-pointer flex-col items-center gap-2 rounded-card border-2 border-dashed border-border bg-card px-6 py-10 text-center transition-colors duration-150 hover:border-primary">
      <UploadCloud className="h-8 w-8 text-primary" aria-hidden="true" />
      <p className="text-small font-medium text-text-primary">
        Drag a file here, or click to browse
      </p>
      <p className="text-caption text-text-muted">PDF, JPG, or PNG up to 10MB</p>
      <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="sr-only" />
    </label>
  );
}
