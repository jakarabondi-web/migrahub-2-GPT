import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ButtonSecondary } from "@/components/ui/Button";
import { MapPin } from "lucide-react";
import type { Job } from "@/lib/mock-data";

export function JobCard({ job }: { job: Job }) {
  return (
    <Card className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="mb-1 flex items-center gap-2">
          <h3 className="text-h4 text-text-primary">{job.title}</h3>
          {job.sponsorship && <Badge tone="success">Sponsors visas</Badge>}
        </div>
        <p className="text-small text-text-secondary">{job.company}</p>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-caption text-text-muted">
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            {job.location}
          </span>
          <span>{job.salaryRange}</span>
        </div>
      </div>
      <div className="flex items-center gap-4 sm:flex-col sm:items-end sm:gap-3">
        <span className="text-small font-semibold text-primary">{job.matchScore}% Match</span>
        <ButtonSecondary size="sm">View Details</ButtonSecondary>
      </div>
    </Card>
  );
}
