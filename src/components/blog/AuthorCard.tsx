// src/components/blog/AuthorCard.tsx

type Props = {
  author?: {
    id: string;
    name?: string | null;
    username?: string | null;
    image?: string | null;
    email?: string | null;
  } | null;
};

export default function AuthorCard({ author }: Props) {
  const name = author?.name || "Unknown Author";
  const avatar = author?.image || "/images/avatar-fallback.png";

  return (
    <div className="flex items-center gap-4 mt-10 border-t pt-6">
      <img
        src={avatar}
        alt={name}
        className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-400/20"
      />

      <div>
        <p className="text-sm font-semibold">{name}</p>
        {author?.username && (
          <p className="text-xs text-gray-500">{author.username}</p>
        )}
      </div>
    </div>
  );
}
