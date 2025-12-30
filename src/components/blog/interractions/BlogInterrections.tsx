// BlogInteractions.tsx
import LikeSection from "./LikeSection";
import CommentSection from "./CommentSection";

export default function BlogInteractions({ blogId }: { blogId: string }) {
  return (
    <section className="mt-16 space-y-12">
      <LikeSection blogId={blogId} />
      <CommentSection blogId={blogId} />
    </section>
  );
}
