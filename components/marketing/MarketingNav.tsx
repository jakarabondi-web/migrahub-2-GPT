import Link from "next/link";
import { LibertyMark } from "@/components/ui/LibertyMark";
import { ButtonGhost, ButtonPrimary } from "@/components/ui/Button";

const links = [
  { href: "/#features", label: "Features" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#resources", label: "Resources" },
];

export function MarketingNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <LibertyMark />
          <span className="text-h4 font-bold text-text-primary">
            Migra<span className="text-primary">Hub</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-small font-medium text-text-secondary transition-colors hover:text-text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/login">
            <ButtonGhost size="sm">Sign In</ButtonGhost>
          </Link>
          <Link href="/register">
            <ButtonPrimary size="sm">Get Started</ButtonPrimary>
          </Link>
        </div>
      </div>
    </header>
  );
}
