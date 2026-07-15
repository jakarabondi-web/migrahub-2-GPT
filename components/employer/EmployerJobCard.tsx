import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { MapPin, Users } from "lucide-react";

export interface EmployerJobData {
  id: string;
  title: string;
  location: string;
  salaryMin: number;
  salaryMax: number;
  sponsorship: boolean;
  applicantCount: number;
}

function formatSalary(min: number, max: number) {
  const fmt = (n: number) => `$${Math.round(n / 1000)}K`;
  return `${fmt(min)}–${fmt(max)}`;
}

export function EmployerJobCard({ job }: { job: EmployerJobData }) {
  return (
    <Card className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="mb-1 flex items-center gap-2">
          <h3 className="text-h4 text-text-primary">{job.title}</h3>
          {job.sponsorship && <Badge tone="success">Sponsors visas</Badge>}
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-caption text-text-muted">
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            {job.location}
          </span>
          <span>{formatSalary(job.salaryMin, job.salaryMax)}</span>
        </div>
      </div>
      <Link
        href={`/employer/applicants?jobId=${job.id}`}
        className="flex items-center gap-1.5 rounded-button border border-border px-4 py-2 text-small font-medium text-text-secondary transition-colors hover:bg-background hover:text-text-primary"
      >
        <Users className="h-4 w-4" aria-hidden="true" />
        {job.applicantCount} {job.applicantCount === 1 ? "applicant" : "applicants"}
      </Link>
    </Card>
  );
}
