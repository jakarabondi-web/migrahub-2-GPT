"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

export function Switch({
  label,
  defaultChecked = false,
  checked,
  onCheckedChange,
}: {
  label: string;
  defaultChecked?: boolean;
  /** Pass for controlled usage; omit to let the switch manage its own state. */
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isControlled = checked !== undefined;
  const value = isControlled ? checked : internalChecked;
  const id = useId();

  function toggle() {
    const next = !value;
    if (!isControlled) setInternalChecked(next);
    onCheckedChange?.(next);
  }

  return (
    <label htmlFor={id} className="flex cursor-pointer items-center justify-between gap-4 py-3">
      <span className="text-small font-medium text-text-primary">{label}</span>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={value}
        onClick={toggle}
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-pill transition-colors duration-150",
          value ? "bg-primary" : "bg-border",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-5 w-5 rounded-pill bg-white shadow-sm transition-transform duration-150",
            value ? "translate-x-[22px]" : "translate-x-0.5",
          )}
        />
      </button>
    </label>
  );
}
