import { EmployerSidebarNav } from "@/components/navigation/EmployerSidebarNav";
import { TopNavigation } from "@/components/navigation/TopNavigation";

export default function EmployerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <EmployerSidebarNav />
      <div className="flex flex-1 flex-col">
        <TopNavigation />
        <main className="flex-1 px-6 py-8">{children}</main>
      </div>
    </div>
  );
}
