"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { ButtonPrimary } from "@/components/ui/Button";

const GROUPS = [
  "Green Card Journeys",
  "H-1B Professionals",
  "Students",
  "Families",
  "General",
];

export function NewPostForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/community", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: form.get("title"),
        body: form.get("body"),
        group: form.get("group"),
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
        Start a discussion
      </ButtonPrimary>
    );
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <p role="alert" className="rounded-button bg-danger/10 px-4 py-3 text-small text-danger">
            {error}
          </p>
        )}
        <Select label="Group" name="group" defaultValue={GROUPS[GROUPS.length - 1]}>
          {GROUPS.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </Select>
        <Input label="Title" name="title" required />
        <div className="flex flex-col gap-1.5">
          <label htmlFor="body" className="text-small font-medium text-text-secondary">
            Details
          </label>
          <textarea
            id="body"
            name="body"
            rows={4}
            required
            className="rounded-button border border-border bg-card px-4 py-3 text-body text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>
        <div className="flex gap-3">
          <ButtonPrimary type="submit" loading={loading}>
            Post
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
