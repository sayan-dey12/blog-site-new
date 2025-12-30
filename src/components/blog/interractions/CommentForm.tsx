"use client";

import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";
import { useState } from "react";

export default function CommentForm({ blogId }: { blogId: string }) {
  const { loggedIn, mounted } = useAuth();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  if (!mounted) return null;

  async function submit() {
    if (!loggedIn) {
      toast.error("Login required to comment");
      return;
    }

    if (!content.trim()) return;

    setLoading(true);
    await fetch(`/api/blog/${blogId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    setLoading(false);
    setContent("");

    location.reload();
  }

  return (
    <div className="mb-6">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border rounded-lg p-3"
        placeholder="Write a comment..."
      />
      <button
        onClick={submit}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Post Comment
      </button>
    </div>
  );
}
