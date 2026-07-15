"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { ButtonPrimary } from "@/components/ui/Button";

export interface CompanyProfileData {
  name: string;
  industry: string;
  website: string;
  description: string;
}

export function CompanyProfileForm({ company }: { company: CompanyProfileData }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSaved(false);
    setLoading(true);

    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/company", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        industry: form.get("industry"),
        website: form.get("website"),
        description: form.get("description"),
      }),
    });
    const result = await response.json();

    setLoading(false);

    if (!result.success) {
      setError(result.error.message);
      return;
    }

    setSaved(true);
    router.refresh();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Profile</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <p role="alert" className="rounded-button bg-danger/10 px-4 py-3 text-small text-danger">
            {error}
          </p>
        )}
        {saved && (
          <p className="rounded-button bg-success/10 px-4 py-3 text-small text-success">
            Your company profile has been updated.
          </p>
        )}
        <Input label="Company name" name="name" defaultValue={company.name} required />
        <Input label="Industry" name="industry" defaultValue={company.industry} />
        <Input label="Website" name="website" type="url" defaultValue={company.website} placeholder="https://" />
        <div className="flex flex-col gap-1.5">
          <label htmlFor="description" className="text-small font-medium text-text-secondary">
            About
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            defaultValue={company.description}
            className="rounded-button border border-border bg-card px-4 py-3 text-body text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>
        <div>
          <ButtonPrimary type="submit" loading={loading}>
            Save Changes
          </ButtonPrimary>
        </div>
      </form>
    </Card>
  );
}
