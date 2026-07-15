import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { MessageCircle } from "lucide-react";
import type { CommunityPost } from "@/lib/mock-data";

export function CommunityPostCard({ post }: { post: CommunityPost }) {
  const initial = post.author[0];
  return (
    <Card className="flex items-start gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-pill bg-secondary/15 text-small font-semibold text-secondary">
        {initial}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-body font-semibold text-text-primary">{post.title}</p>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-caption text-text-muted">
          <span className="font-medium text-text-secondary">{post.author}</span>
          <Badge tone="neutral">{post.pathway}</Badge>
          <span>{post.group}</span>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-1.5 text-caption text-text-muted">
        <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
        {post.replies}
      </div>
    </Card>
  );
}
