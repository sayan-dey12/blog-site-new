"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";

export default function CommentForm({ blogId }: { blogId: string }) {
  const { user } = useAuth();
  const [content, setContent] = useState("");

  async function submit() {
    if (!user) {
      toast.error("Login required");
      return;
    }

    if (!content.trim()) return;

    await fetch(`/api/blog/${blogId}/comments`, {
      method: "POST",
      body: JSON.stringify({ content }),
    });

    setContent("");
    location.reload(); // ISR refresh (simple & safe)
  }

  return (
    <div className="mb-8">
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        className="w-full rounded-xl border p-3 text-sm
        dark:bg-gray-900 resize-none"
        placeholder="Write a comment…"
      />
      <button
        onClick={submit}
        className="mt-3 px-4 py-2 bg-blue-600 text-gray-200 rounded-lg"
      >
        Post Comment
      </button>
    </div>
  );
}
