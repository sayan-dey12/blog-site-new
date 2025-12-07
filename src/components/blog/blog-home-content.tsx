"use client";

import { useEffect, useMemo, useState } from "react";
import { BlogHomeType } from "@/types/home-blog";
import { BlogFeatured } from "./blog-featured";
import { BlogTrending } from "./blog-trending";
import { BlogLatestGrid } from "./blog-latest-grid";

type BlogHomeContentProps = {
  searchQuery: string;
};

export function BlogHomeContent({ searchQuery }: BlogHomeContentProps) {
  const [blogs, setBlogs] = useState<BlogHomeType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadBlogs() {
      setIsLoading(true);
      const res = await fetch("/api/blog/list");
      const data = await res.json();
      setBlogs(data.blogs || []);
      setIsLoading(false);
    }
    loadBlogs();
  }, []);

  // Apply search
  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return blogs;
    const q = searchQuery.toLowerCase();
    return blogs.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.excerpt?.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q)
    );
  }, [blogs, searchQuery]);

  // Section logic
  const featured = filtered[0] ?? null;
  const trending = filtered.slice(1, 4);   // ⭐ next 3 blogs
  const latest = filtered.slice(4);        // ⭐ rest

  return (
    <div className="mx-auto max-w-6xl px-4 pb-10 pt-4 md:px-6 md:pb-16 md:pt-6">
      <BlogFeatured blog={featured} />
      <BlogTrending blogs={trending} />   {/* ⭐ Trending section */}
      <BlogLatestGrid blogs={latest} isLoading={isLoading} />
    </div>
  );
}
