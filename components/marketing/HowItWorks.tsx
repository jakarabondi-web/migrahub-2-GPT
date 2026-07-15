import { Card } from "@/components/ui/Card";
import { Compass, Handshake, Rocket } from "lucide-react";

const steps = [
  {
    icon: Compass,
    title: "Track",
    body: "Monitor USCIS and immigration progress in real time.",
  },
  {
    icon: Handshake,
    title: "Connect",
    body: "Discover sponsorship-friendly employers matched to you.",
  },
  {
    icon: Rocket,
    title: "Thrive",
    body: "Receive AI guidance and personalized next steps.",
  },
];

export function HowItWorks() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-24">
      <div className="mx-auto mb-12 max-w-xl text-center">
        <h2 className="text-h2 text-text-primary">How it works</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {steps.map(({ icon: Icon, title, body }) => (
          <Card key={title} className="flex flex-col gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-button bg-primary/10">
              <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
            </div>
            <h3 className="text-h4 text-text-primary">{title}</h3>
            <p className="text-body text-text-secondary">{body}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
