import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const blogs = await db.blog.findMany({
    where: { published: true },
    include: {
      author: { select: { name: true, image: true } },
      category: { select: { name: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  // Convert Prisma blog into lightweight BlogHome format
  const formatted = blogs.map((b) => ({
    id: b.id,
    title: b.title,
    slug: b.slug,
    excerpt: b.excerpt,
    coverImage: b.coverImage,
    readingTime: b.readingTime || 1,

    // Convert category object to string
    category: b.category?.name || "General",

    // Convert author object to string
    authorName: b.author?.name || "Guest Author",
    authorAvatar: b.author?.image || null,

    // Convert date format
    publishedAt: b.createdAt,

    // Trending logic → use views
    isTrending: b.views > 50, // adjust threshold as needed
  }));

  return NextResponse.json({ blogs: formatted });
}
