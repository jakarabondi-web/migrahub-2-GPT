import Link from "next/link";
import { LibertyMark } from "@/components/ui/LibertyMark";

const columns = [
  {
    heading: "Product",
    links: [
      { href: "/#features", label: "Features" },
      { href: "/#pricing", label: "Pricing" },
      { href: "/case-tracker", label: "Case Tracker" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
      { href: "/security", label: "Security" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-4">
        <div className="flex items-center gap-2">
          <LibertyMark />
          <span className="text-h4 font-bold text-text-primary">
            Migra<span className="text-primary">Hub</span>
          </span>
        </div>
        {columns.map((col) => (
          <div key={col.heading} className="flex flex-col gap-3">
            <p className="text-caption font-semibold uppercase tracking-wide text-text-muted">
              {col.heading}
            </p>
            {col.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-small text-text-secondary hover:text-text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="border-t border-border px-6 py-6 text-center text-caption text-text-muted">
        © {new Date().getFullYear()} MigraHub. Your Journey. Your Future.
      </div>
    </footer>
  );
}
