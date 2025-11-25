// src/components/blog/blog-home-content.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { Blog } from "@/types/blog";
import { BlogFeatured } from "./blog-featured";
import { BlogTrending } from "./blog-trending";
import { BlogLatestGrid } from "./blog-latest-grid";

type BlogHomeContentProps = {
  searchQuery: string;
};

export function BlogHomeContent({ searchQuery }: BlogHomeContentProps) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // TODO: Replace with real API call to /api/blogs
    const timer = setTimeout(() => {
      const mockBlogs: Blog[] = [
        {
          id: "1",
          title: "Designing a scalable chat system with Redis & WebSockets",
          slug: "scalable-chat-system-redis-websockets",
          excerpt:
            "A breakdown of architecture decisions, trade-offs, and real-world pitfalls while building a production-ready chat.",
          category: "Systems",
          readingTime: 12,
          publishedAt: new Date().toISOString(),
          authorName: "Sayan Dey",
          isTrending: true,
        },
        {
          id: "2",
          title: "From idea to deployed: Building an AI tool platform",
          slug: "building-ai-tool-platform",
          excerpt:
            "How to combine multiple models, orchestrate them, and ship something actually useful.",
          category: "AI & ML",
          readingTime: 10,
          publishedAt: new Date().toISOString(),
          authorName: "Sayan Dey",
          isTrending: true,
        },
        {
          id: "3",
          title: "Becoming a 100x dev: Systems, product, and brutal focus",
          slug: "becoming-100x-dev",
          excerpt:
            "Not just leetcode. A roadmap combining backend, DevOps, AI, and product thinking.",
          category: "Career",
          readingTime: 8,
          publishedAt: new Date().toISOString(),
          authorName: "Sayan Dey",
          isTrending: true,
        },
        {
          id: "4",
          title: "Next.js + Prisma + Auth.js: Clean auth architecture",
          slug: "nextjs-prisma-auth-clean-architecture",
          excerpt:
            "Structuring your auth flow, securing routes, and avoiding common anti-patterns.",
          category: "Fullstack",
          readingTime: 9,
          publishedAt: new Date().toISOString(),
          authorName: "Sayan Dey",
        },
        {
          id: "5",
          title: "Production Docker & DevOps basics for solo devs",
          slug: "production-docker-devops-basics",
          excerpt:
            "The minimal DevOps stack you actually need to deploy and monitor your app.",
          category: "DevOps",
          readingTime: 11,
          publishedAt: new Date().toISOString(),
          authorName: "Sayan Dey",
        },
        {
          id: "6",
          title: "When to use queues, caches, and background workers",
          slug: "queues-caches-workers",
          excerpt:
            "Patterns for scaling your backend without overengineering things.",
          category: "Backend",
          readingTime: 7,
          publishedAt: new Date().toISOString(),
          authorName: "Sayan Dey",
        },
      ];
      setBlogs(mockBlogs);
      setIsLoading(false);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  const filteredBlogs = useMemo(() => {
    if (!searchQuery.trim()) return blogs;
    const q = searchQuery.toLowerCase();
    return blogs.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        (b.excerpt?.toLowerCase().includes(q) ?? false) ||
        (b.category?.toLowerCase().includes(q) ?? false)
    );
  }, [blogs, searchQuery]);

  const featured = filteredBlogs[0] ?? null;
  const trending = filteredBlogs.filter((b) => b.isTrending).slice(0, 3);
  const latest = filteredBlogs.slice(1); // rest after featured

  return (
    <div className="mx-auto max-w-6xl px-4 pb-10 pt-4 md:px-6 md:pb-16 md:pt-6">
      <BlogFeatured blog={featured} />
      <BlogTrending blogs={trending} />
      <BlogLatestGrid blogs={latest} isLoading={isLoading} />
    </div>
  );
}