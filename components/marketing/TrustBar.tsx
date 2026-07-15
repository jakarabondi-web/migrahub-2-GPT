import { FileCheck, Lock, Briefcase, Brain } from "lucide-react";

const items = [
  { icon: FileCheck, label: "USCIS Tracking" },
  { icon: Lock, label: "Secure Documents" },
  { icon: Briefcase, label: "H-1B Jobs" },
  { icon: Brain, label: "AI Guidance" },
];

export function TrustBar() {
  return (
    <section className="border-y border-border bg-card py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 text-center">
        <p className="text-small text-text-secondary">
          Trusted by thousands of immigrants and growing employers
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {items.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-text-secondary">
              <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
              <span className="text-small font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
