import { mkdir, writeFile, readFile, unlink } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

// Local disk for now — every path here is the only place that would need
// to change to move to S3/blob storage (write/read/delete + the
// DB storagePath column, nothing in the API contract).
const UPLOAD_DIR = path.join(process.cwd(), "uploads");

export const ALLOWED_MIME_TYPES = ["application/pdf", "image/jpeg", "image/png"];
export const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10MB, per the spec's upload limit

export async function saveDocumentFile(userId: string, file: File): Promise<{ storagePath: string }> {
  const userDir = path.join(UPLOAD_DIR, userId);
  await mkdir(userDir, { recursive: true });

  const ext = path.extname(file.name) || "";
  const storagePath = path.join(userId, `${randomUUID()}${ext}`);
  const buffer = Buffer.from(await file.arrayBuffer());

  await writeFile(path.join(UPLOAD_DIR, storagePath), buffer);
  return { storagePath };
}

export async function readDocumentFile(storagePath: string): Promise<Buffer> {
  return readFile(path.join(UPLOAD_DIR, storagePath));
}

export async function deleteDocumentFile(storagePath: string): Promise<void> {
  await unlink(path.join(UPLOAD_DIR, storagePath)).catch(() => {});
}
