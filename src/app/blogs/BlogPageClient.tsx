"use client";

import { useState, useMemo } from "react";
import { Blog } from "@/types/blog";
import { BlogCard } from "@/components/blog/blog-card";
import { BlogCardSkeleton } from "@/components/blog/blog-card-skeleton";
import { BlogFilters } from "./components/blog-filters";

export function BlogPageClient({ blogs }: { blogs: Blog[] }) {
  const [category, setCategory] = useState("all");
  const [mode, setMode] = useState<"grid" | "list">("grid");

  // ✅ Extract unique categories
  const categories = useMemo(
    () => [...new Set(blogs.map((b) => b.category ?? "General"))],
    [blogs]
  );

  // ✅ Filter blogs
  const filteredBlogs = useMemo(() => {
    if (category === "all") return blogs;
    return blogs.filter((b) => b.category === category);
  }, [blogs, category]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">

      {/* ✅ Title */}
      <h1 className="text-2xl font-bold mb-4">All Blogs</h1>

      {/* ✅ Filters */}
      <BlogFilters
        categories={categories}
        selected={category}
        onCategoryChange={setCategory}
        mode={mode}
        onModeChange={setMode}
      />

      {/* ✅ Blog Layout */}
      <div
        className={`mt-6 grid gap-5 ${
          mode === "grid"
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1"
        }`}
      >
        {blogs.length === 0 ? (
          Array.from({ length: 6 }).map((_, i) => <BlogCardSkeleton key={i} />)
        ) : (
          filteredBlogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
        )}
      </div>
    </div>
  );
}