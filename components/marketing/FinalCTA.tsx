import Link from "next/link";
import { ButtonPrimary } from "@/components/ui/Button";

export function FinalCTA() {
  return (
    <section className="bg-primary py-24">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 text-center">
        <h2 className="text-h2 text-white text-balance">Ready to begin your journey?</h2>
        <p className="text-body text-white/80">
          Start tracking your immigration journey today.
        </p>
        <Link href="/register">
          <ButtonPrimary
            size="md"
            className="bg-white text-primary hover:bg-white/90"
          >
            Create Free Account
          </ButtonPrimary>
        </Link>
      </div>
    </section>
  );
}
