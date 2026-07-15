import { getServerSession } from "next-auth";
import { Compass } from "lucide-react";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { JourneyProgress, type TimelineStep } from "@/components/dashboard/JourneyProgress";
import { NextActionCard } from "@/components/dashboard/NextActionCard";
import { CaseStatusCard } from "@/components/dashboard/CaseStatusCard";
import { AIInsightCard } from "@/components/dashboard/AIInsightCard";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata = { title: "Dashboard — MigraHub" };

// Generic milestone template shown once a user has an active case.
// Real per-milestone dates come once USCIS status polling is wired in.
function journeyStepsFor(status: string): TimelineStep[] {
  const order = ["Case Received", "Biometrics", "Interview Scheduled", "Decision Pending", "Green Card"];
  const currentIndex = Math.max(order.indexOf(status), 0);
  return order.map((label, i): TimelineStep => {
    const stepStatus: TimelineStep["status"] =
      i < currentIndex ? "complete" : i === currentIndex ? "current" : "upcoming";
    return { label, status: stepStatus };
  });
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const firstName = session?.user?.name?.split(" ")[0] ?? "there";

  const primaryCase = session?.user?.id
    ? await prisma.immigrationCase.findFirst({
        where: { userId: session.user.id },
        orderBy: { createdAt: "asc" },
      })
    : null;

  if (!primaryCase) {
    return (
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <DashboardHeader name={firstName} progress={0} nextMilestone="your first case" />
        <EmptyState
          icon={<Compass className="h-6 w-6" aria-hidden="true" />}
          title="You're ready to add your first case."
          body="Add your receipt number from My Journey and MigraHub will start tracking your USCIS status automatically."
        />
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <DashboardHeader name={firstName} progress={primaryCase.progress} nextMilestone={primaryCase.status} />

      <JourneyProgress steps={journeyStepsFor(primaryCase.status)} />

      <div className="grid gap-6 lg:grid-cols-2">
        <NextActionCard
          title="Upload your medical examination."
          deadline="August 18"
          estimate="10 minutes"
        />
        <CaseStatusCard
          visaType={primaryCase.visaType}
          receiptNumber={primaryCase.receiptNumber ?? "Not provided"}
          status={primaryCase.status}
          progress={primaryCase.progress}
          lastUpdate="Today"
        />
      </div>

      <AIInsightCard
        message="Based on current processing trends, your interview may occur within the next 4–8 weeks."
        confidence={96}
      />
    </div>
  );
}
