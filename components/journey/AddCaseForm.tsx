"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { ButtonPrimary } from "@/components/ui/Button";

export function AddCaseForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/cases", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        visaType: form.get("visaType"),
        receiptNumber: form.get("receiptNumber"),
      }),
    });
    const result = await response.json();

    setLoading(false);

    if (!result.success) {
      setError(result.error.message);
      return;
    }

    router.refresh();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add your first case</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <p role="alert" className="rounded-button bg-danger/10 px-4 py-3 text-small text-danger">
            {error}
          </p>
        )}
        <Select label="Visa category" name="visaType" required defaultValue="">
          <option value="" disabled>
            Select a category
          </option>
          <option value="H-1B">H-1B</option>
          <option value="F-1">F-1</option>
          <option value="OPT">OPT</option>
          <option value="STEM OPT">STEM OPT</option>
          <option value="I-130">I-130</option>
          <option value="I-485">I-485</option>
        </Select>
        <Input label="Receipt number (optional)" name="receiptNumber" placeholder="e.g. MSC2190012345" />
        <div>
          <ButtonPrimary type="submit" loading={loading}>
            Add Case
          </ButtonPrimary>
        </div>
      </form>
    </Card>
  );
}
