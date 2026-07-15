import { SidebarNav } from "@/components/navigation/SidebarNav";
import { TopNavigation } from "@/components/navigation/TopNavigation";
import { isFlagEnabled } from "@/lib/feature-flags";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const communityEnabled = await isFlagEnabled("community");

  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNav communityEnabled={communityEnabled} />
      <div className="flex flex-1 flex-col">
        <TopNavigation />
        <main className="flex-1 px-6 py-8">{children}</main>
      </div>
    </div>
  );
}
