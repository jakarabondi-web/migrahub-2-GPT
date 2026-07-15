"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Switch } from "@/components/ui/Switch";

export interface FlagData {
  key: string;
  name: string;
  description: string;
  enabled: boolean;
}

export function FlagToggle({ flag }: { flag: FlagData }) {
  const router = useRouter();
  const [enabled, setEnabled] = useState(flag.enabled);
  const [pending, setPending] = useState(false);

  async function handleChange(next: boolean) {
    const previous = enabled;
    setEnabled(next);
    setPending(true);

    const response = await fetch(`/api/admin/flags/${flag.key}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enabled: next }),
    });

    setPending(false);

    if (!response.ok) {
      setEnabled(previous);
      return;
    }

    router.refresh();
  }

  return (
    <Card className="flex items-center justify-between gap-4">
      <div>
        <p className="text-body font-semibold text-text-primary">{flag.name}</p>
        <p className="text-small text-text-secondary">{flag.description}</p>
      </div>
      <div className={pending ? "opacity-60" : ""}>
        <Switch
          label=""
          ariaLabel={`Toggle ${flag.name}`}
          checked={enabled}
          onCheckedChange={handleChange}
        />
      </div>
    </Card>
  );
}
