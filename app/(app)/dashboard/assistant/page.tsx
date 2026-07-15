import { PageHeader } from "@/components/dashboard/PageHeader";
import { AssistantChat } from "@/components/assistant/AssistantChat";

export const metadata = { title: "My Assistant — MigraHub" };

export default function AssistantPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title="My Assistant"
        subtitle="Your personal immigration guide — ask anything about your case."
      />
      <AssistantChat />
    </div>
  );
}
