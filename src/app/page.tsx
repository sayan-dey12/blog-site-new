// app/page.tsx (SERVER)

import { db } from "@/lib/db";
import { BlogHomeContent } from "@/components/blog/blog-home-content";

export const revalidate = 300; // cache homepage 5 min

export default async function HomePage() {
  // 🔥 Trending (decay algorithm)
  const allBlogs = await db.blog.findMany({
    where: { published: true },
    include: {
      category: true,
      author: true,
      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },
    },
  });

  const now = Date.now();

  const trendingBlogs = allBlogs
    .map((blog) => {
      const hours =
        (now - new Date(blog.createdAt).getTime()) / 36e5;

      const score =
        (blog.views +
          blog._count.likes * 5 +
          blog._count.comments * 10) /
        Math.pow(hours + 2, 1.4);

      return { ...blog, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  // 🆕 Latest
  const latestBlogs = await db.blog.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 4,
    include: {
      category: true,
      author: true,
    },
  });

  // ⭐ Most Popular
  const popularBlogs = await db.blog.findMany({
    where: { published: true },
    orderBy: { views: "desc" },
    take: 4,
    include: {
      category: true,
      author: true,
    },
  });

  return (
    <main className="flex-1">
      <BlogHomeContent
        trending={trendingBlogs}
        latest={latestBlogs}
        popular={popularBlogs}
      />
    </main>
  );
}
