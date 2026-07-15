import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { CommunityPostCard } from "@/components/community/CommunityPostCard";
import { NewPostForm } from "@/components/community/NewPostForm";
import { EmptyState } from "@/components/ui/EmptyState";
import { Users } from "lucide-react";

export const metadata = { title: "My Community — MigraHub" };
export const dynamic = "force-dynamic";

export default async function CommunityPage() {
  const posts = await prisma.communityPost.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      author: { select: { name: true, immigrationGoal: true } },
      _count: { select: { replies: true } },
    },
  });

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <PageHeader
        title="My Community"
        subtitle="Stories and advice from people on the same journey."
      />
      <NewPostForm />
      {posts.length === 0 ? (
        <EmptyState
          icon={<Users className="h-6 w-6" aria-hidden="true" />}
          title="No discussions yet."
          body="Be the first to share your story or ask a question."
        />
      ) : (
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <CommunityPostCard
              key={post.id}
              post={{
                id: post.id,
                title: post.title,
                group: post.group,
                replyCount: post._count.replies,
                authorName: post.author.name,
                authorPathway: post.author.immigrationGoal,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
