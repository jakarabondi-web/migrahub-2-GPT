import { Bell, Search } from "lucide-react";

export function TopNavigation({ userName }: { userName: string }) {
  const initials = userName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="flex h-16 shrink-0 items-center gap-4 border-b border-border bg-card px-6">
      <div className="relative flex-1 max-w-md">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
          aria-hidden="true"
        />
        <input
          type="search"
          placeholder="Search cases, jobs, documents…"
          aria-label="Global search"
          className="h-10 w-full rounded-button border border-border bg-background pl-9 pr-4 text-small text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <button
        type="button"
        aria-label="Notifications"
        className="relative flex h-10 w-10 items-center justify-center rounded-pill text-text-secondary hover:bg-background"
      >
        <Bell className="h-5 w-5" aria-hidden="true" />
        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-torch" aria-hidden="true" />
      </button>

      <button
        type="button"
        className="flex h-10 w-10 items-center justify-center rounded-pill bg-primary text-small font-semibold text-white"
        aria-label={`${userName} profile menu`}
      >
        {initials}
      </button>
    </header>
  );
}
