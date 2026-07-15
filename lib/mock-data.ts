// Shared mock data for the dashboard shell. Swap for real API calls
// (see docs in the migrahub repo's lib/*-client.ts) once a backend exists.

export interface JourneyMilestone {
  label: string;
  date?: string;
  status: "complete" | "current" | "upcoming";
  description: string;
}

export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    label: "Case Received",
    date: "April 2, 2026",
    status: "complete",
    description: "USCIS confirmed receipt of your I-485 petition.",
  },
  {
    label: "Biometrics",
    date: "April 18, 2026",
    status: "complete",
    description: "Fingerprints and photo captured at the Nairobi ASC.",
  },
  {
    label: "Interview Scheduled",
    date: "July 18, 2026",
    status: "current",
    description: "In-person interview at the local field office.",
  },
  {
    label: "Decision Pending",
    status: "upcoming",
    description: "USCIS reviews your case following the interview.",
  },
  {
    label: "Green Card",
    status: "upcoming",
    description: "Card production begins after approval.",
  },
];

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salaryRange: string;
  sponsorship: boolean;
  matchScore: number;
}

export const JOBS: Job[] = [
  {
    id: "1",
    title: "Senior Software Engineer",
    company: "Microsoft",
    location: "Seattle, WA",
    salaryRange: "$180K–$240K",
    sponsorship: true,
    matchScore: 92,
  },
  {
    id: "2",
    title: "Data Analyst",
    company: "Stripe",
    location: "Remote (US)",
    salaryRange: "$120K–$150K",
    sponsorship: true,
    matchScore: 87,
  },
  {
    id: "3",
    title: "Product Designer",
    company: "Ramp",
    location: "New York, NY",
    salaryRange: "$140K–$175K",
    sponsorship: false,
    matchScore: 74,
  },
];

export interface VaultDocument {
  id: string;
  name: string;
  category: string;
  uploadedAt: string;
  expiresAt?: string;
}

export const DOCUMENTS: VaultDocument[] = [
  { id: "1", name: "Passport.pdf", category: "Identity", uploadedAt: "Mar 2, 2026", expiresAt: "Jan 2031" },
  { id: "2", name: "I-797 Receipt Notice.pdf", category: "USCIS", uploadedAt: "Apr 2, 2026" },
  { id: "3", name: "Employment Offer Letter.pdf", category: "Employment", uploadedAt: "Feb 14, 2026" },
];

export interface CommunityPost {
  id: string;
  author: string;
  pathway: string;
  title: string;
  replies: number;
  group: string;
}

export const COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: "1",
    author: "Amina K.",
    pathway: "I-485 Applicant",
    title: "What to expect at the Nairobi ASC biometrics appointment",
    replies: 24,
    group: "Green Card Journeys",
  },
  {
    id: "2",
    author: "David O.",
    pathway: "H-1B Holder",
    title: "Timeline from OPT to H-1B approval — my experience",
    replies: 41,
    group: "H-1B Professionals",
  },
  {
    id: "3",
    author: "Grace M.",
    pathway: "F-1 Student",
    title: "STEM OPT extension: documents that got mine approved fast",
    replies: 12,
    group: "Students",
  },
];

export const SUGGESTED_QUESTIONS = [
  "What happens after my biometrics appointment?",
  "How long until my interview after biometrics?",
  "What documents should I bring to my interview?",
];
