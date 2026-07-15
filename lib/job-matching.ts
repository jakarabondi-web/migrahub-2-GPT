import type { Job, CandidateProfile } from "@prisma/client";

// Deterministic scoring, not an LLM call — cheap, explainable, and doesn't
// depend on an API key we don't have yet. Swap for a real model later
// without changing the JobCard/AIInsightCard contract that consumes it.
export function computeMatchScore(job: Job, profile: CandidateProfile | null): number {
  if (!profile) return 50;

  let score = 40;

  if (profile.needsSponsorship) {
    score += job.sponsorship ? 30 : -20;
  } else {
    score += 10;
  }

  if (profile.desiredLocation) {
    const wantsRemote = /remote/i.test(profile.desiredLocation);
    if (job.remote && wantsRemote) score += 20;
    else if (job.location.toLowerCase().includes(profile.desiredLocation.toLowerCase())) score += 20;
    else if (job.remote) score += 5;
  }

  if (profile.jobTitle) {
    const wanted = profile.jobTitle.toLowerCase().split(/\s+/).filter(Boolean);
    const title = job.title.toLowerCase();
    const overlap = wanted.filter((word) => title.includes(word)).length;
    score += Math.min(overlap * 8, 20);
  }

  return Math.max(0, Math.min(100, Math.round(score)));
}
