"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Compass,
  Briefcase,
  FolderLock,
  Brain,
  Users,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LibertyMark } from "@/components/ui/LibertyMark";

const baseItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/journey", label: "My Journey", icon: Compass },
  { href: "/dashboard/career", label: "My Career", icon: Briefcase },
  { href: "/dashboard/documents", label: "My Documents", icon: FolderLock },
  { href: "/dashboard/assistant", label: "My Assistant", icon: Brain },
];

const communityItem = { href: "/dashboard/community", label: "My Community", icon: Users };

export function SidebarNav({ communityEnabled = true }: { communityEnabled?: boolean }) {
  const pathname = usePathname();
  const items = communityEnabled ? [...baseItems, communityItem] : baseItems;

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-card md:flex">
      <Link href="/" className="flex items-center gap-2 px-6 py-5">
        <LibertyMark />
        <span className="text-h4 font-bold text-text-primary">
          Migra<span className="text-primary">Hub</span>
        </span>
      </Link>

      <nav className="flex flex-1 flex-col gap-1 px-3" aria-label="Main">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-button px-3 py-2.5 text-small font-medium transition-colors duration-150",
                active
                  ? "bg-primary/10 text-primary"
                  : "text-text-secondary hover:bg-background hover:text-text-primary",
              )}
            >
              <Icon className="h-4.5 w-4.5" aria-hidden="true" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border px-3 py-3">
        <Link
          href="/dashboard/settings"
          className={cn(
            "flex items-center gap-3 rounded-button px-3 py-2.5 text-small font-medium transition-colors duration-150",
            pathname === "/dashboard/settings"
              ? "bg-primary/10 text-primary"
              : "text-text-secondary hover:bg-background hover:text-text-primary",
          )}
        >
          <Settings className="h-4.5 w-4.5" aria-hidden="true" />
          Settings
        </Link>
      </div>
    </aside>
  );
}
