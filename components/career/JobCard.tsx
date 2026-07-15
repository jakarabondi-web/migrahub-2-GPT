"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ButtonPrimary } from "@/components/ui/Button";
import { MapPin, Bookmark, BookmarkCheck, Check } from "lucide-react";

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
  applied: boolean;
}

function formatSalary(min: number, max: number) {
  const fmt = (n: number) => `$${Math.round(n / 1000)}K`;
  return `${fmt(min)}–${fmt(max)}`;
}

export function JobCard({ job }: { job: JobCardData }) {
  const [saved, setSaved] = useState(job.saved);
  const [savePending, setSavePending] = useState(false);
  const [applied, setApplied] = useState(job.applied);
  const [applyPending, setApplyPending] = useState(false);
  const [applyError, setApplyError] = useState<string | null>(null);

  async function toggleSave() {
    setSavePending(true);
    const next = !saved;
    setSaved(next); // optimistic
    try {
      const response = await fetch(`/api/jobs/${job.id}/save`, { method: "POST" });
      if (!response.ok) throw new Error("Request failed");
    } catch {
      setSaved(!next); // revert on failure
    } finally {
      setSavePending(false);
    }
  }

  async function apply() {
    setApplyPending(true);
    setApplyError(null);
    try {
      const response = await fetch(`/api/jobs/${job.id}/apply`, { method: "POST" });
      const result = await response.json();
      if (!result.success) throw new Error(result.error?.message ?? "Something went wrong.");
      setApplied(true);
    } catch (err) {
      setApplyError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setApplyPending(false);
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
        {applyError && <p className="mt-2 text-caption text-danger">{applyError}</p>}
      </div>
      <div className="flex items-center gap-3 sm:flex-col sm:items-end sm:gap-3">
        <span className="text-small font-semibold text-primary">{job.matchScore}% Match</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleSave}
            disabled={savePending}
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
          {applied ? (
            <span className="flex items-center gap-1.5 rounded-button border border-success/30 bg-success/10 px-4 py-2 text-small font-medium text-success">
              <Check className="h-4 w-4" aria-hidden="true" />
              Applied
            </span>
          ) : (
            <ButtonPrimary size="sm" onClick={apply} loading={applyPending}>
              Apply
            </ButtonPrimary>
          )}
        </div>
      </div>
    </Card>
  );
}
