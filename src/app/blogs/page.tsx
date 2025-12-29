// app/blogs/page.tsx
import { db } from "@/lib/db";
import { BlogPageClient } from "./BlogPageClient";
import type { BlogType } from "@/types/blog";

export const dynamic = "force-dynamic"; // optional, keeps data fresh

async function getBlogs(): Promise<BlogType[]> {
  const blogs = await db.blog.findMany({
    where: {
      published: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: true,
      tags: true,
      author: {
        select: {
          id: true,
          name: true,
          username: true,
          image: true,
        },
      },
    },
  });

  // ✅ Convert Date → string for client safety
  return blogs.map((b) => ({
    ...b,
    createdAt: b.createdAt.toISOString(),
    updatedAt: b.updatedAt.toISOString(),
  }));
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  return <BlogPageClient blogs={blogs} />;
}
