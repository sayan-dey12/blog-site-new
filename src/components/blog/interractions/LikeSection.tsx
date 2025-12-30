// LikeSection.tsx
import { db } from "@/lib/db";
import LikeButton from "./LikeButton";

export default async function LikeSection({ blogId }: { blogId: string }) {
  const count = await db.like.count({
    where: { blogId },
  });

  return (
    <div className="flex items-center justify-between flex-wrap gap-4">
      <span className="text-sm text-gray-600 dark:text-gray-400">
        {count} likes
      </span>

      <LikeButton blogId={blogId} />
    </div>
  );
}
