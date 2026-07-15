import { cn } from "@/lib/utils";

// The torch-and-path mark from logo direction 01 (Torch Ascent) / 02 (Pathway Torch).
// One shared SVG so every surface (nav, favicon, auth) draws the same mark.
export function LibertyMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 88 88"
      className={cn("h-8 w-8", className)}
      role="img"
      aria-label="MigraHub"
    >
      <path
        d="M20 62 Q 34 62 40 48 Q 46 34 44 22"
        fill="none"
        stroke="var(--color-primary)"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M44 22 C 38 22 35 16 44 9 C 53 16 50 22 44 22 Z"
        fill="var(--color-torch)"
      />
    </svg>
  );
}
