import { SidebarNav } from "@/components/navigation/SidebarNav";
import { TopNavigation } from "@/components/navigation/TopNavigation";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNav />
      <div className="flex flex-1 flex-col">
        <TopNavigation userName="Sarah Johnson" />
        <main className="flex-1 px-6 py-8">{children}</main>
      </div>
    </div>
  );
}
