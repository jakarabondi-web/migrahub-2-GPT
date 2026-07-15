import { PageHeader } from "@/components/dashboard/PageHeader";
import { CommunityPostCard } from "@/components/community/CommunityPostCard";
import { COMMUNITY_POSTS } from "@/lib/mock-data";

export const metadata = { title: "My Community — MigraHub" };

export default function CommunityPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title="My Community"
        subtitle="Stories and advice from people on the same journey."
      />
      <div className="flex flex-col gap-4">
        {COMMUNITY_POSTS.map((post) => (
          <CommunityPostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
