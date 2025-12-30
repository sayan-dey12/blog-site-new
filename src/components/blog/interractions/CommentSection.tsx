// CommentSection.tsx
import { db } from "@/lib/db";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

export default async function CommentSection({ blogId }: { blogId: string }) {
  const comments = await db.comment.findMany({
    where: { blogId },
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: {
          username: true,
          image: true,
        },
      },
    },
  });

  return (
    <section>
      <h3 className="text-xl font-semibold mb-6">
        Comments ({comments.length})
      </h3>

      <CommentForm blogId={blogId} />
      <CommentList comments={comments} />
    </section>
  );
}
