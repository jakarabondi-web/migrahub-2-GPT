"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Switch } from "@/components/ui/Switch";
import { ButtonPrimary } from "@/components/ui/Button";

export function NewJobForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [sponsorship, setSponsorship] = useState(true);
  const [remote, setRemote] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/employer/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: form.get("title"),
        location: form.get("location"),
        industry: form.get("industry"),
        salaryMin: form.get("salaryMin"),
        salaryMax: form.get("salaryMax"),
        sponsorship,
        remote,
      }),
    });
    const result = await response.json();

    setLoading(false);

    if (!result.success) {
      setError(result.error.message);
      return;
    }

    setOpen(false);
    router.refresh();
  }

  if (!open) {
    return (
      <ButtonPrimary type="button" onClick={() => setOpen(true)} className="self-start">
        Post a job
      </ButtonPrimary>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Post a job</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <p role="alert" className="rounded-button bg-danger/10 px-4 py-3 text-small text-danger">
            {error}
          </p>
        )}
        <Input label="Job title" name="title" required />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Location" name="location" placeholder="e.g. Remote (US)" required />
          <Input label="Industry" name="industry" placeholder="e.g. Technology" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Salary min" name="salaryMin" type="number" min={0} required />
          <Input label="Salary max" name="salaryMax" type="number" min={0} required />
        </div>
        <div className="divide-y divide-border">
          <Switch label="Sponsors visas" checked={sponsorship} onCheckedChange={setSponsorship} />
          <Switch label="Remote" checked={remote} onCheckedChange={setRemote} />
        </div>
        <div className="flex gap-3">
          <ButtonPrimary type="submit" loading={loading}>
            Post Job
          </ButtonPrimary>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-small font-medium text-text-secondary hover:text-text-primary"
          >
            Cancel
          </button>
        </div>
      </form>
    </Card>
  );
}
