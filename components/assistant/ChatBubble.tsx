import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function ChatBubble({
  role,
  message,
}: {
  role: "user" | "assistant";
  message: string;
}) {
  const isAssistant = role === "assistant";
  return (
    <div className={cn("flex gap-3", !isAssistant && "flex-row-reverse")}>
      {isAssistant && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-pill bg-primary text-white">
          <Sparkles className="h-4 w-4" aria-hidden="true" />
        </div>
      )}
      <div
        className={cn(
          "max-w-md rounded-card px-4 py-3 text-small",
          isAssistant
            ? "bg-card border border-border text-text-primary"
            : "bg-primary text-white",
        )}
      >
        {message}
      </div>
    </div>
  );
}
