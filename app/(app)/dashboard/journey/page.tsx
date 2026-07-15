import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { TimelineEvent } from "@/components/dashboard/TimelineEvent";
import { AddCaseForm } from "@/components/journey/AddCaseForm";
import { Card } from "@/components/ui/Card";
import type { JourneyMilestone } from "@/lib/mock-data";

export const metadata = { title: "My Journey — MigraHub" };

const MILESTONE_TEMPLATE: { label: string; description: string }[] = [
  { label: "Case Received", description: "USCIS confirms receipt of your petition." },
  { label: "Biometrics", description: "Fingerprints and photo captured at your local ASC." },
  { label: "Interview Scheduled", description: "In-person interview at the local field office." },
  { label: "Decision Pending", description: "USCIS reviews your case following the interview." },
  { label: "Green Card", description: "Card production begins after approval." },
];

export default async function JourneyPage() {
  const session = await getServerSession(authOptions);
  const primaryCase = session?.user?.id
    ? await prisma.immigrationCase.findFirst({
        where: { userId: session.user.id },
        orderBy: { createdAt: "asc" },
      })
    : null;

  if (!primaryCase) {
    return (
      <div className="mx-auto max-w-2xl">
        <PageHeader
          title="My Journey"
          subtitle="Add your first case and MigraHub will start tracking it here."
        />
        <AddCaseForm />
      </div>
    );
  }

  const currentIndex = Math.max(
    MILESTONE_TEMPLATE.findIndex((m) => m.label === primaryCase.status),
    0,
  );
  const milestones: JourneyMilestone[] = MILESTONE_TEMPLATE.map((m, i) => ({
    ...m,
    status: i < currentIndex ? "complete" : i === currentIndex ? "current" : "upcoming",
  }));

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title="My Journey"
        subtitle={`${primaryCase.visaType} · Receipt ${primaryCase.receiptNumber ?? "not provided"}`}
      />
      <Card>
        <ol>
          {milestones.map((milestone, i) => (
            <TimelineEvent
              key={milestone.label}
              milestone={milestone}
              isLast={i === milestones.length - 1}
            />
          ))}
        </ol>
      </Card>
    </div>
  );
}
