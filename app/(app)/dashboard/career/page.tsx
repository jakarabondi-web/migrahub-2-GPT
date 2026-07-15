import { PageHeader } from "@/components/dashboard/PageHeader";
import { JobCard } from "@/components/career/JobCard";
import { JOBS } from "@/lib/mock-data";

export const metadata = { title: "My Career — MigraHub" };

export default function CareerPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        title="My Career"
        subtitle="Sponsorship-friendly roles matched to your profile."
      />
      <div className="flex flex-col gap-4">
        {JOBS.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
