import { prisma } from "@/lib/prisma";

interface LogEntry {
  actorId?: string | null;
  actorEmail?: string | null;
  action: string;
  targetType?: string;
  targetId?: string;
  metadata?: Record<string, unknown>;
}

// Fire-and-forget by design: an audit-log write failing should never break
// the request it's describing. Errors are swallowed after a console.error.
export async function logAudit(entry: LogEntry): Promise<void> {
  try {
    await prisma.auditLog.create({
      data: {
        actorId: entry.actorId ?? null,
        actorEmail: entry.actorEmail ?? null,
        action: entry.action,
        targetType: entry.targetType ?? null,
        targetId: entry.targetId ?? null,
        metadata: entry.metadata ? JSON.stringify(entry.metadata) : null,
      },
    });
  } catch (error) {
    console.error("Failed to write audit log", error);
  }
}
