"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import type { BlogType } from "@/types/blog";
import AuthorBlogs from "@/components/author/AuthorBlogs";
import Link from "next/link";

export default function MyBlogsPage() {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchBlogs() {
    try {
      const res = await fetch("/api/dashboard/blogs", {
        credentials: "include",
      });

      if (!res.ok) throw new Error();

      const data = await res.json();
      setBlogs(data);
    } catch {
      toast.error("Failed to load your blogs");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) {
    return <p className="p-4">Loading your blogs…</p>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Blogs</h1>
          <p className="text-sm text-muted-foreground">
            Manage your published and draft blogs
          </p>
        </div>

        <Link
          href="/blog/submit"
          className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm"
        >
          + New Blog
        </Link>
      </div>

      {/* Blog grid */}
      <AuthorBlogs blogs={blogs} />
    </div>
  );
}
