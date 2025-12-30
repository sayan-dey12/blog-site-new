"use client";

import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";
import { useState } from "react";

export default function LikeButton({ blogId }: { blogId: string }) {
  const { loggedIn, mounted } = useAuth();
  const [loading, setLoading] = useState(false);

  if (!mounted) {
    return null; // or skeleton
  }

  async function toggleLike() {
    if (!loggedIn) {
      toast.error("Login required to like");
      return;
    }

    setLoading(true);
    await fetch(`/api/blog/${blogId}/like`, { method: "POST" });
    setLoading(false);

    location.reload();
  }

  return (
    <button
      onClick={toggleLike}
      disabled={loading}
      className="px-4 py-2 rounded-full border"
    >
      ❤️ Like
    </button>
  );
}
