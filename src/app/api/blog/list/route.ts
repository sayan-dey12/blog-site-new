import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const blogs = await db.blog.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      coverImage: true,
      readingTime: true,
      excerpt: true,
      category: {
        select: { name: true }
      }
    }
  });

  const formatted = blogs.map((b) => ({
    ...b,
    category: b.category?.name || "General",
  }));

  return NextResponse.json({ blogs: formatted });
}