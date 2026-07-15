import { MarketingNav } from "@/components/marketing/MarketingNav";
import { Hero } from "@/components/marketing/Hero";
import { TrustBar } from "@/components/marketing/TrustBar";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { FinalCTA } from "@/components/marketing/FinalCTA";
import { Footer } from "@/components/marketing/Footer";

export default function HomePage() {
  return (
    <main>
      <MarketingNav />
      <Hero />
      <TrustBar />
      <HowItWorks />
      <FinalCTA />
      <Footer />
    </main>
  );
}
