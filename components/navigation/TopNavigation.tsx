"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Bell, Search, LogOut, Settings } from "lucide-react";

export function TopNavigation() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const userName = session?.user?.name ?? "";
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

      <div className="relative">
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center rounded-pill bg-primary text-small font-semibold text-white"
          aria-label={`${userName || "Account"} menu`}
          aria-expanded={menuOpen}
        >
          {initials || "?"}
        </button>

        {menuOpen && (
          <div
            role="menu"
            className="absolute right-0 top-12 w-56 rounded-card border border-border bg-card p-2 shadow-md"
          >
            <p className="truncate px-3 py-2 text-small font-medium text-text-primary">
              {userName}
            </p>
            <p className="truncate px-3 pb-2 text-caption text-text-muted">
              {session?.user?.email}
            </p>
            <div className="my-1 h-px bg-border" />
            <Link
              href="/dashboard/settings"
              role="menuitem"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 rounded-button px-3 py-2 text-small text-text-secondary hover:bg-background hover:text-text-primary"
            >
              <Settings className="h-4 w-4" aria-hidden="true" />
              Settings
            </Link>
            <button
              type="button"
              role="menuitem"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex w-full items-center gap-2 rounded-button px-3 py-2 text-left text-small text-danger hover:bg-danger/10"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Sign out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
