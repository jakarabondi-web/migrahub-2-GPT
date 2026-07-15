// Everything that had mock data here (jobs, documents, community posts,
// journey milestones) has been replaced by real DB-backed models — see
// prisma/schema.prisma and the corresponding /api routes. What's left is
// genuinely still mock: the AI assistant has canned answers because there's
// no LLM provider wired up yet, and JourneyMilestone is a shared shape used
// by both the dashboard's generic template and TimelineEvent's rendering.

export interface JourneyMilestone {
  label: string;
  date?: string;
  status: "complete" | "current" | "upcoming";
  description: string;
}

export const SUGGESTED_QUESTIONS = [
  "What happens after my biometrics appointment?",
  "How long until my interview after biometrics?",
  "What documents should I bring to my interview?",
];
