import { AdminSidebarNav } from "@/components/navigation/AdminSidebarNav";
import { TopNavigation } from "@/components/navigation/TopNavigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebarNav />
      <div className="flex flex-1 flex-col">
        <TopNavigation />
        <main className="flex-1 px-6 py-8">{children}</main>
      </div>
    </div>
  );
}
