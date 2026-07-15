"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { ButtonPrimary } from "@/components/ui/Button";
import { ChatBubble } from "@/components/assistant/ChatBubble";
import { SUGGESTED_QUESTIONS } from "@/lib/mock-data";

interface Message {
  role: "user" | "assistant";
  text: string;
}

const FALLBACK_ANSWER =
  "That's a great question — once the AI layer is connected, I'll pull the answer from your case history and current USCIS processing trends. For now, this is a UI preview.";

const CANNED_ANSWERS: Record<string, string> = {
  "What happens after my biometrics appointment?":
    "After biometrics, USCIS runs background and security checks, then schedules your interview once your file is current. Most applicants wait 2–4 months for scheduling.",
  "How long until my interview after biometrics?":
    "Based on similar I-485 cases at your field office, interviews are typically scheduled 10–14 weeks after biometrics.",
  "What documents should I bring to my interview?":
    "Bring your passport, original I-797 receipt notice, employment letter, and any documents referenced in your interview notice.",
};

export function AssistantChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hi Sarah — I'm your MigraHub assistant. Ask me anything about your case, timeline, or documents.",
    },
  ]);
  const [input, setInput] = useState("");

  function ask(question: string) {
    setMessages((prev) => [
      ...prev,
      { role: "user", text: question },
      { role: "assistant", text: CANNED_ANSWERS[question] ?? FALLBACK_ANSWER },
    ]);
    setInput("");
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!input.trim()) return;
    ask(input.trim());
  }

  return (
    <Card className="flex h-[560px] flex-col p-0">
      <div className="flex-1 space-y-4 overflow-y-auto p-6">
        {messages.map((message, i) => (
          <ChatBubble key={i} role={message.role} message={message.text} />
        ))}
      </div>

      <div className="border-t border-border p-4">
        <div className="mb-3 flex flex-wrap gap-2">
          {SUGGESTED_QUESTIONS.map((question) => (
            <button
              key={question}
              type="button"
              onClick={() => ask(question)}
              className="rounded-pill border border-border bg-background px-3 py-1.5 text-caption font-medium text-text-secondary transition-colors duration-150 hover:border-primary hover:text-primary"
            >
              {question}
            </button>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask a follow-up question…"
            aria-label="Message the AI assistant"
            className="h-12 flex-1 rounded-button border border-border bg-card px-4 text-body text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <ButtonPrimary type="submit" size="icon" aria-label="Send message">
            <Send className="h-4 w-4" aria-hidden="true" />
          </ButtonPrimary>
        </form>
      </div>
    </Card>
  );
}
