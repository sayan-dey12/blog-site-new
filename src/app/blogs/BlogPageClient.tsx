"use client";

import { useState, useMemo } from "react";
import type { BlogType } from "@/types/blog";
import { BlogCard } from "@/components/blog/blog-card";
import { BlogCardSkeleton } from "@/components/blog/blog-card-skeleton";
import  BlogFilters  from "./components/blog-filters";

export function BlogPageClient({ blogs }: { blogs: BlogType[] }) {
  const [category, setCategory] = useState("all");
  const [mode, setMode] = useState<"grid" | "list">("grid");

  // ✅ Extract unique category names
  const categories = useMemo(() => {
    const names = blogs.map(
      (b) => b.category?.name ?? "General"
    );
    return Array.from(new Set(names));
  }, [blogs]);

  // ✅ Filter blogs by category name
  const filteredBlogs = useMemo(() => {
    if (category === "all") return blogs;

    return blogs.filter(
      (b) => (b.category?.name ?? "General") === category
    );
  }, [blogs, category]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">All Blogs</h1>

      <BlogFilters
        categories={categories}
        selected={category}
        onCategoryChange={setCategory}
        mode={mode}
        onModeChange={setMode}
      />

      <div
        className={`mt-6 grid gap-5 ${
          mode === "grid"
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1"
        }`}
      >
        {blogs.length === 0 ? (
          Array.from({ length: 6 }).map((_, i) => (
            <BlogCardSkeleton key={i} />
          ))
        ) : (
          filteredBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))
        )}
      </div>
    </div>
  );
}
