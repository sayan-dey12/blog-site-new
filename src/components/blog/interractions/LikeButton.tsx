"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";

export default function LikeButton({ blogId }: { blogId: string }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  async function toggleLike() {
    if (!user) {
      toast.error("Login required");
      return;
    }

    setLoading(true);
    await fetch(`/api/blog/${blogId}/like`, { method: "POST" });
    setLoading(false);
  }

  return (
    <button
      onClick={toggleLike}
      disabled={loading}
      className="px-5 py-2 rounded-full border text-sm
        hover:bg-gray-100 dark:hover:bg-gray-800 transition"
    >
      ❤️ Like
    </button>
  );
}
