"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ButtonSecondary } from "@/components/ui/Button";
import { MapPin, Bookmark, BookmarkCheck } from "lucide-react";

export interface JobCardData {
  id: string;
  title: string;
  company: string;
  location: string;
  salaryMin: number;
  salaryMax: number;
  sponsorship: boolean;
  matchScore: number;
  saved: boolean;
}

function formatSalary(min: number, max: number) {
  const fmt = (n: number) => `$${Math.round(n / 1000)}K`;
  return `${fmt(min)}–${fmt(max)}`;
}

export function JobCard({ job }: { job: JobCardData }) {
  const [saved, setSaved] = useState(job.saved);
  const [pending, setPending] = useState(false);

  async function toggleSave() {
    setPending(true);
    const next = !saved;
    setSaved(next); // optimistic
    try {
      const response = await fetch(`/api/jobs/${job.id}/save`, { method: "POST" });
      if (!response.ok) throw new Error("Request failed");
    } catch {
      setSaved(!next); // revert on failure
    } finally {
      setPending(false);
    }
  }

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
          <span>{formatSalary(job.salaryMin, job.salaryMax)}</span>
        </div>
      </div>
      <div className="flex items-center gap-3 sm:flex-col sm:items-end sm:gap-3">
        <span className="text-small font-semibold text-primary">{job.matchScore}% Match</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleSave}
            disabled={pending}
            aria-pressed={saved}
            aria-label={saved ? "Remove from saved jobs" : "Save job"}
            className="flex h-9 w-9 items-center justify-center rounded-button border border-border text-text-secondary transition-colors duration-150 hover:bg-background disabled:opacity-60"
          >
            {saved ? (
              <BookmarkCheck className="h-4 w-4 text-primary" aria-hidden="true" />
            ) : (
              <Bookmark className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
          <ButtonSecondary size="sm">View Details</ButtonSecondary>
        </div>
      </div>
    </Card>
  );
}
