import { PageHeader } from "@/components/dashboard/PageHeader";
import { TimelineEvent } from "@/components/dashboard/TimelineEvent";
import { Card } from "@/components/ui/Card";
import { JOURNEY_MILESTONES } from "@/lib/mock-data";

export const metadata = { title: "My Journey — MigraHub" };

export default function JourneyPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title="My Journey"
        subtitle="Every milestone in your I-485 case, from receipt to green card."
      />
      <Card>
        <ol>
          {JOURNEY_MILESTONES.map((milestone, i) => (
            <TimelineEvent
              key={milestone.label}
              milestone={milestone}
              isLast={i === JOURNEY_MILESTONES.length - 1}
            />
          ))}
        </ol>
      </Card>
    </div>
  );
}
