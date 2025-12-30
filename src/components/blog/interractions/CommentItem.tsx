// CommentItem.tsx
export default function CommentItem({ comment }: { comment: any }) {
  return (
    <div className="p-4 rounded-xl border
      bg-white dark:bg-gray-900">

      <div className="flex items-center gap-3 mb-2">
        <img
          src={comment.user.image || "/avatar.png"}
          className="w-8 h-8 rounded-full"
        />
        <span className="text-sm font-medium">
          {comment.user.username}
        </span>
      </div>

      <p className="text-sm text-gray-700 dark:text-gray-300">
        {comment.content}
      </p>
    </div>
  );
}
