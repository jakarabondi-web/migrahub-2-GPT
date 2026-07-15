"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { LibertyMark } from "@/components/ui/LibertyMark";

const items = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/companies", label: "Companies", icon: Building2 },
];

export function AdminSidebarNav() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-card md:flex">
      <Link href="/" className="flex items-center gap-2 px-6 py-5">
        <LibertyMark />
        <span className="text-h4 font-bold text-text-primary">
          Migra<span className="text-primary">Hub</span>
        </span>
      </Link>
      <p className="px-6 pb-3 text-caption font-semibold uppercase tracking-wide text-text-muted">
        Admin
      </p>

      <nav className="flex flex-1 flex-col gap-1 px-3" aria-label="Admin">
        {items.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
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
    </aside>
  );
}
