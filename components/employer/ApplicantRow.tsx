"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Select } from "@/components/ui/Select";

const STATUSES = ["Applied", "Reviewing", "Interview", "Offer", "Rejected"];

export interface ApplicantData {
  id: string;
  candidateName: string;
  candidateEmail: string;
  jobTitle: string;
  status: string;
  appliedAt: string;
}

export function ApplicantRow({ applicant }: { applicant: ApplicantData }) {
  const router = useRouter();
  const [status, setStatus] = useState(applicant.status);
  const [pending, setPending] = useState(false);

  async function handleChange(next: string) {
    const previous = status;
    setStatus(next);
    setPending(true);

    const response = await fetch(`/api/employer/applicants/${applicant.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });

    setPending(false);

    if (!response.ok) {
      setStatus(previous);
      return;
    }

    router.refresh();
  }

  const appliedDate = new Date(applicant.appliedAt).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Card className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-body font-semibold text-text-primary">{applicant.candidateName}</p>
        <p className="text-small text-text-secondary">{applicant.candidateEmail}</p>
        <p className="mt-1 text-caption text-text-muted">
          Applied to {applicant.jobTitle} · {appliedDate}
        </p>
      </div>
      <div className="w-full sm:w-48">
        <Select
          aria-label={`Status for ${applicant.candidateName}`}
          value={status}
          disabled={pending}
          onChange={(e) => handleChange(e.target.value)}
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </Select>
      </div>
    </Card>
  );
}
