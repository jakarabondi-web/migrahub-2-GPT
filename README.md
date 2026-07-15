# MigraHub

Your Journey. Your Future.

A fresh Next.js implementation of the MigraHub design system: token-driven
UI (`tailwind.config.ts` + `app/globals.css`), a reusable atom/molecule
component library under `components/`, a marketing homepage, auth screens,
and a journey-centered dashboard shell.

This is a separate, ground-up build from the design specification — it does
not share code with the existing `migrahub` repo (which has the live USCIS,
job-matching, and AI integrations). See that repo's `docs/` for product
context; this repo is where the design system and component architecture
get implemented cleanly before functionality is ported over.

## Structure

```
app/
  page.tsx                 marketing homepage
  (auth)/login, register   auth screens
  (app)/dashboard          authenticated shell + dashboard
components/
  ui/                      atoms — Button, Card, Badge, Input, LibertyMark
  marketing/                molecules/organisms for the homepage
  auth/                     AuthCard, SocialLoginButton
  navigation/                SidebarNav, TopNavigation
  dashboard/                 DashboardHeader, JourneyProgress, NextActionCard,
                              CaseStatusCard, AIInsightCard
lib/
  utils.ts                  cn() class helper
```

## Design tokens

All colors, spacing, radii, and shadows live in `tailwind.config.ts` and are
backed by CSS variables in `app/globals.css` (light + dark). Never hardcode
a hex value or a spacing number in a component — extend the token set
instead.

## Getting started

```bash
npm install
npm run dev
```

## Status

Foundation release: design tokens, UI atoms, marketing homepage, auth UI,
and the dashboard shell are in place. Next up: real auth, a database behind
the mock data, and porting the USCIS/jobs/AI integrations from `migrahub`.
