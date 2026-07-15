import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { JourneyProgress, type TimelineStep } from "@/components/dashboard/JourneyProgress";
import { NextActionCard } from "@/components/dashboard/NextActionCard";
import { CaseStatusCard } from "@/components/dashboard/CaseStatusCard";
import { AIInsightCard } from "@/components/dashboard/AIInsightCard";

export const metadata = { title: "Dashboard — MigraHub" };

const journeySteps: TimelineStep[] = [
  { label: "Case Received", date: "Apr 2", status: "complete" },
  { label: "Biometrics", date: "Apr 18", status: "complete" },
  { label: "Interview Scheduled", date: "Jul 18", status: "current" },
  { label: "Decision Pending", status: "upcoming" },
  { label: "Green Card", status: "upcoming" },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <DashboardHeader name="Sarah" progress={72} nextMilestone="Interview" />

      <JourneyProgress steps={journeySteps} />

      <div className="grid gap-6 lg:grid-cols-2">
        <NextActionCard
          title="Upload your medical examination."
          deadline="August 18"
          estimate="10 minutes"
        />
        <CaseStatusCard
          visaType="I-485"
          receiptNumber="MSC2190012345"
          status="Interview Scheduled"
          progress={72}
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
