import Link from "next/link";
import { ButtonPrimary, ButtonSecondary } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Bell, Briefcase, Sparkles, TrendingUp } from "lucide-react";

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-16 px-6 py-24 lg:grid-cols-2">
      <div className="flex flex-col gap-6">
        <h1 className="text-h1 text-text-primary text-balance">
          Your Journey.
          <br />
          <span className="text-primary">Your Future.</span>
        </h1>
        <p className="max-w-lg text-body text-text-secondary">
          Track your immigration case, discover H-1B opportunities, and receive
          AI-powered guidance — all in one platform.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/register">
            <ButtonPrimary size="md">Get Started Free</ButtonPrimary>
          </Link>
          <Link href="/#demo">
            <ButtonSecondary size="md">Watch Demo</ButtonSecondary>
          </Link>
        </div>
      </div>

      <div className="relative h-[420px]" aria-hidden="true">
        <svg viewBox="0 0 400 420" className="h-full w-full">
          <path
            d="M60 400 C 120 380, 140 300, 180 260 C 230 210, 250 140, 240 60"
            fill="none"
            stroke="var(--color-border)"
            strokeWidth="4"
            strokeDasharray="2 10"
            strokeLinecap="round"
          />
          <circle cx="60" cy="400" r="6" fill="var(--color-success)" />
          <circle cx="180" cy="260" r="6" fill="var(--color-primary)" />
          <circle cx="240" cy="60" r="10" fill="var(--color-torch)" />
          <path
            d="M240 60 C 232 60 228 52 240 42 C 252 52 248 60 240 60 Z"
            fill="var(--color-torch)"
          />
        </svg>

        <Card className="absolute left-0 top-10 flex w-48 items-center gap-3 py-3">
          <Bell className="h-5 w-5 text-primary" aria-hidden="true" />
          <div>
            <p className="text-caption font-semibold text-text-primary">USCIS Update</p>
            <p className="text-caption text-text-muted">Interview scheduled</p>
          </div>
        </Card>

        <Card className="absolute right-0 top-32 flex w-48 items-center gap-3 py-3">
          <Briefcase className="h-5 w-5 text-secondary" aria-hidden="true" />
          <div>
            <p className="text-caption font-semibold text-text-primary">Job Match</p>
            <p className="text-caption text-text-muted">92% · H-1B sponsor</p>
          </div>
        </Card>

        <Card className="absolute left-8 bottom-16 flex w-52 items-center gap-3 py-3">
          <TrendingUp className="h-5 w-5 text-success" aria-hidden="true" />
          <div>
            <p className="text-caption font-semibold text-text-primary">Visa Bulletin</p>
            <p className="text-caption text-text-muted">Moved forward 3 weeks</p>
          </div>
        </Card>

        <Card className="absolute bottom-0 right-4 flex w-48 items-center gap-3 py-3">
          <Sparkles className="h-5 w-5 text-torch" aria-hidden="true" />
          <div>
            <p className="text-caption font-semibold text-text-primary">AI Recommendation</p>
            <p className="text-caption text-text-muted">Upload medical exam</p>
          </div>
        </Card>
      </div>
    </section>
  );
}
