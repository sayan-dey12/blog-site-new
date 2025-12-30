// CommentList.tsx
import CommentItem from "./CommentItem";

export default function CommentList({ comments }: { comments: any[] }) {
  if (!comments.length) {
    return <p className="text-sm text-gray-500">No comments yet</p>;
  }

  return (
    <div className="space-y-4">
      {comments.map(c => (
        <CommentItem key={c.id} comment={c} />
      ))}
    </div>
  );
}
