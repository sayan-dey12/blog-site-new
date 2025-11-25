// src/components/blog/AuthorCard.tsx
import React from "react";

type Props = {
  author?: {
    id: string;
    name?: string | null;
    image?: string | null;
    email?: string | null;
  } | null;
};

export default function AuthorCard({ author }: Props) {
  const displayName = author?.name || "Unknown Author";
  const avatar = author?.image || "/images/avatar-fallback.png";

  return (
    <div className="flex items-center gap-3 mt-8">
      <img
        src={avatar}
        alt={displayName}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div>
        <div className="text-sm font-medium">{displayName}</div>
        {author?.email && (
          <div className="text-xs text-muted-foreground">{author.email}</div>
        )}
      </div>
    </div>
  );
}
