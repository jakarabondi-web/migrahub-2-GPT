# MigraHub

Your Journey. Your Future.

A fresh Next.js implementation of the MigraHub design system: token-driven
UI (`tailwind.config.ts` + `app/globals.css`), a reusable atom/molecule
component library under `components/`, a marketing homepage, real auth,
onboarding, and a journey-centered dashboard backed by a real database.

This is a separate, ground-up build from the design specification — it does
not share code with the existing `migrahub` repo (which has the live USCIS
and Adzuna integrations). See that repo's `docs/` for product context; this
repo is where the design system and component architecture get implemented
cleanly, with real auth/data wired in module by module.

## Structure

```
app/
  page.tsx                    marketing homepage
  (auth)/login, register      auth screens
  onboarding/                 5-step onboarding wizard
  (app)/dashboard             authenticated shell + dashboard, My Journey,
                               My Career, My Documents, My Assistant,
                               My Community, Settings
  api/
    auth/[...nextauth]        NextAuth credentials provider
    auth/register             account creation (bcrypt-hashed passwords)
    onboarding                writes onboarding answers to the DB
    cases                     create/list a user's immigration cases
    jobs, jobs/[id]/save      job listing + match score + save toggle
components/
  ui/                         atoms — Button, Card, Badge, Input, Select,
                               Switch, EmptyState, LibertyMark
  marketing/                  molecules/organisms for the homepage
  auth/                       AuthCard, LoginForm, SocialLoginButton
  onboarding/                 OnboardingWizard, StepIndicator
  navigation/                 SidebarNav, TopNavigation
  dashboard/                  DashboardHeader, JourneyProgress,
                               NextActionCard, CaseStatusCard, AIInsightCard
  career/, documents/, assistant/, community/, journey/
lib/
  auth-options.ts             NextAuth config (credentials + JWT sessions)
  prisma.ts                   Prisma client singleton
  job-matching.ts             deterministic match-score heuristic
  utils.ts                    cn() class helper
prisma/
  schema.prisma                User, ImmigrationCase, CandidateProfile,
                               Preferences, Job, SavedJob
  seed.ts                     sample job postings
proxy.ts                      Next 16's middleware convention — gates
                               /dashboard/* and /onboarding, redirects
                               signed-in users away from /login, /register
```

## Design tokens

All colors, spacing, radii, and shadows live in `tailwind.config.ts` and are
backed by CSS variables in `app/globals.css` (light + dark). Never hardcode
a hex value or a spacing number in a component — extend the token set
instead.

## Getting started

```bash
cp .env.example .env   # fill in AUTH_SECRET (openssl rand -base64 32)
npm install             # also runs `prisma generate`
npm run db:push          # creates the local SQLite database
npm run db:seed          # seeds sample job postings
npm run dev
```

`DATABASE_URL` points at a local SQLite file by default. Point it at
Postgres for a real deployment — nothing in `prisma/schema.prisma` needs to
change to make that switch.

## Status

Real: auth (register/login/logout, route gating), onboarding (writes to the
DB), My Journey (real case + add-case form), My Career (real jobs + match
scoring + save), Settings (real profile).

Still mock/static: My Documents (upload UI doesn't persist yet), My
Assistant (canned answers — needs an LLM provider/API key), My Community.
Not started: employer portal, billing, admin, real USCIS status polling.
