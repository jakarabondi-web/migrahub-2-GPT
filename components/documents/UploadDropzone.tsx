"use client";

import { useRef, useState, type ChangeEvent, type DragEvent } from "react";
import { useRouter } from "next/navigation";
import { UploadCloud, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = ["Identity", "USCIS", "Employment", "Education", "Other"];

export function UploadDropzone() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  async function upload(file: File) {
    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", category);

    const response = await fetch("/api/documents", { method: "POST", body: formData });
    const result = await response.json();

    setUploading(false);

    if (!result.success) {
      setError(result.error.message);
      return;
    }

    router.refresh();
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) upload(file);
    event.target.value = "";
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragOver(false);
    const file = event.dataTransfer.files?.[0];
    if (file) upload(file);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <label htmlFor="doc-category" className="text-small font-medium text-text-secondary">
          Category
        </label>
        <select
          id="doc-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="h-9 rounded-button border border-border bg-card px-3 text-small text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={cn(
          "flex flex-col items-center gap-2 rounded-card border-2 border-dashed px-6 py-10 text-center transition-colors duration-150",
          dragOver ? "border-primary bg-primary/5" : "border-border bg-card",
        )}
      >
        {uploading ? (
          <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden="true" />
        ) : (
          <UploadCloud className="h-8 w-8 text-primary" aria-hidden="true" />
        )}
        <p className="text-small font-medium text-text-primary">
          {uploading ? "Uploading…" : "Drag a file here, or click to browse"}
        </p>
        <p className="text-caption text-text-muted">PDF, JPG, or PNG up to 10MB</p>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-1 text-small font-medium text-primary hover:underline"
        >
          Choose file
        </button>
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
          onChange={handleChange}
          className="sr-only"
        />
      </div>

      {error && (
        <p role="alert" className="rounded-button bg-danger/10 px-4 py-3 text-small text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
