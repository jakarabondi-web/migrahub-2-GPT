"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { LibertyMark } from "@/components/ui/LibertyMark";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Switch } from "@/components/ui/Switch";
import { ButtonPrimary, ButtonGhost } from "@/components/ui/Button";
import { StepIndicator } from "@/components/onboarding/StepIndicator";

const TOTAL_STEPS = 5;

interface FormState {
  country: string;
  citizenship: string;
  currentStatus: string;
  immigrationGoal: string;
  caseSkipped: boolean;
  visaType: string;
  receiptNumber: string;
  jobTitle: string;
  experienceYears: string;
  desiredLocation: string;
  needsSponsorship: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  theme: "light" | "dark" | "system";
}

const initialState: FormState = {
  country: "",
  citizenship: "",
  currentStatus: "",
  immigrationGoal: "",
  caseSkipped: false,
  visaType: "",
  receiptNumber: "",
  jobTitle: "",
  experienceYears: "",
  desiredLocation: "",
  needsSponsorship: true,
  emailNotifications: true,
  smsNotifications: false,
  pushNotifications: true,
  theme: "system",
};

export function OnboardingWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function finish() {
    setSubmitting(true);
    setError(null);

    const response = await fetch("/api/onboarding", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const result = await response.json();

    if (!result.success) {
      setError(result.error?.message ?? "Something went wrong. Please try again.");
      setSubmitting(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (step < TOTAL_STEPS) {
      setStep((s) => s + 1);
      return;
    }
    finish();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-16">
      <div className="w-full max-w-lg">
        <div className="mb-8 flex items-center justify-center gap-2">
          <LibertyMark />
          <span className="text-h4 font-bold text-text-primary">
            Migra<span className="text-primary">Hub</span>
          </span>
        </div>

        <Card className="shadow-md">
          <StepIndicator step={step} total={TOTAL_STEPS} />

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {error && (
              <p role="alert" className="rounded-button bg-danger/10 px-4 py-3 text-small text-danger">
                {error}
              </p>
            )}

            {step === 1 && (
              <div className="flex flex-col gap-2 text-center">
                <h1 className="text-h3 text-text-primary">Welcome to MigraHub.</h1>
                <p className="text-body text-text-secondary">Let&apos;s personalize your journey.</p>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-4">
                <h1 className="text-h3 text-text-primary">Your immigration profile</h1>
                <Input
                  label="Current country"
                  value={form.country}
                  onChange={(e) => update("country", e.target.value)}
                  required
                />
                <Input
                  label="Citizenship"
                  value={form.citizenship}
                  onChange={(e) => update("citizenship", e.target.value)}
                  required
                />
                <Input
                  label="Current U.S. status"
                  placeholder="e.g. F-1, H-1B, none"
                  value={form.currentStatus}
                  onChange={(e) => update("currentStatus", e.target.value)}
                />
                <Select
                  label="Your goal"
                  value={form.immigrationGoal}
                  onChange={(e) => update("immigrationGoal", e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select a goal
                  </option>
                  <option value="Study">Study</option>
                  <option value="Work">Work</option>
                  <option value="Green Card">Green Card</option>
                  <option value="Family">Family</option>
                  <option value="Citizenship">Citizenship</option>
                </Select>
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-col gap-4">
                <h1 className="text-h3 text-text-primary">Add your first case</h1>
                {form.caseSkipped ? (
                  <p className="text-small text-text-secondary">
                    No problem — you can add it later from My Journey.
                  </p>
                ) : (
                  <>
                    <Select
                      label="Visa category"
                      value={form.visaType}
                      onChange={(e) => update("visaType", e.target.value)}
                    >
                      <option value="">Select a category</option>
                      <option value="H-1B">H-1B</option>
                      <option value="F-1">F-1</option>
                      <option value="OPT">OPT</option>
                      <option value="STEM OPT">STEM OPT</option>
                      <option value="I-130">I-130</option>
                      <option value="I-485">I-485</option>
                    </Select>
                    <Input
                      label="Receipt number (optional)"
                      placeholder="e.g. MSC2190012345"
                      value={form.receiptNumber}
                      onChange={(e) => update("receiptNumber", e.target.value)}
                    />
                  </>
                )}
                <ButtonGhost
                  type="button"
                  size="sm"
                  className="self-start"
                  onClick={() => update("caseSkipped", !form.caseSkipped)}
                >
                  {form.caseSkipped ? "Add case details" : "Skip for now"}
                </ButtonGhost>
              </div>
            )}

            {step === 4 && (
              <div className="flex flex-col gap-4">
                <h1 className="text-h3 text-text-primary">Your career goals</h1>
                <Input
                  label="Job title"
                  value={form.jobTitle}
                  onChange={(e) => update("jobTitle", e.target.value)}
                />
                <Input
                  label="Years of experience"
                  type="number"
                  min={0}
                  value={form.experienceYears}
                  onChange={(e) => update("experienceYears", e.target.value)}
                />
                <Input
                  label="Desired location"
                  placeholder="e.g. Seattle, WA or Remote"
                  value={form.desiredLocation}
                  onChange={(e) => update("desiredLocation", e.target.value)}
                />
                <Switch
                  label="I need visa sponsorship"
                  checked={form.needsSponsorship}
                  onCheckedChange={(value) => update("needsSponsorship", value)}
                />
              </div>
            )}

            {step === 5 && (
              <div className="flex flex-col gap-2">
                <h1 className="mb-2 text-h3 text-text-primary">Preferences</h1>
                <p className="mb-2 text-small font-medium text-text-secondary">
                  Notification methods
                </p>
                <div className="divide-y divide-border">
                  <Switch
                    label="Email"
                    checked={form.emailNotifications}
                    onCheckedChange={(value) => update("emailNotifications", value)}
                  />
                  <Switch
                    label="SMS"
                    checked={form.smsNotifications}
                    onCheckedChange={(value) => update("smsNotifications", value)}
                  />
                  <Switch
                    label="Push"
                    checked={form.pushNotifications}
                    onCheckedChange={(value) => update("pushNotifications", value)}
                  />
                </div>
                <p className="mb-2 mt-4 text-small font-medium text-text-secondary">Theme</p>
                <div className="flex gap-2">
                  {(["light", "dark", "system"] as const).map((theme) => (
                    <button
                      key={theme}
                      type="button"
                      onClick={() => update("theme", theme)}
                      className={`flex-1 rounded-button border px-4 py-2 text-small font-medium capitalize transition-colors duration-150 ${
                        form.theme === theme
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-text-secondary hover:bg-background"
                      }`}
                    >
                      {theme}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              {step > 1 ? (
                <ButtonGhost type="button" onClick={() => setStep((s) => s - 1)}>
                  Back
                </ButtonGhost>
              ) : (
                <span />
              )}
              <ButtonPrimary type="submit" loading={submitting}>
                {step < TOTAL_STEPS ? "Continue" : "Finish"}
              </ButtonPrimary>
            </div>
          </form>
        </Card>
      </div>
    </main>
  );
}
