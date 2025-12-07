"use client";

import { useEffect, useMemo, useState } from "react";
import { BlogType } from "@/types/blog";
import { BlogFeatured } from "./blog-featured";
import { BlogTrending } from "./blog-trending";
import { BlogLatestGrid } from "./blog-latest-grid";

type BlogHomeContentProps = {
  searchQuery: string;
};

export function BlogHomeContent({ searchQuery }: BlogHomeContentProps) {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
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

  // SEARCH FILTER
  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return blogs;
    const q = searchQuery.toLowerCase();

    return blogs.filter((b) => {
      const title = b.title?.toLowerCase() || "";
      const excerpt = b.excerpt?.toLowerCase() || "";
      const categoryName = b.category?.name?.toLowerCase() || "";
      const authorName = b.author?.name?.toLowerCase() || "";

      return (
        title.includes(q) ||
        excerpt.includes(q) ||
        categoryName.includes(q) ||
        authorName.includes(q)
      );
    });
  }, [blogs, searchQuery]);

  // SECTION SPLITTING
  const featured: BlogType | null = filtered.length > 0 ? filtered[0] : null;
  const trending: BlogType[] = filtered.slice(1, 4);
  const latest: BlogType[] = filtered.slice(4);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-10 pt-4 md:px-6 md:pb-16 md:pt-6">
      <BlogFeatured blog={featured} />
      <BlogTrending blogs={trending} />
      <BlogLatestGrid blogs={latest} isLoading={isLoading} />
    </div>
  );
}
