import { type ReactNode } from "react";

export function EmptyState({
  icon,
  title,
  body,
  action,
}: {
  icon: ReactNode;
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-card border border-dashed border-border px-6 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-pill bg-primary/10 text-primary">
        {icon}
      </div>
      <p className="text-h4 text-text-primary">{title}</p>
      <p className="max-w-sm text-small text-text-secondary">{body}</p>
      {action}
    </div>
  );
}
