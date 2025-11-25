// FILE: src/app/api/blog/submit/route.ts

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getUserFromToken } from "@/lib/getUserFromToken";
import { estimateReadTime } from "@/lib/readTime";
import slugify from "slugify";

export async function POST(req: NextRequest) {
  try {
    // Authenticate user
    const user: any = await getUserFromToken();
    if (!user) {
      return NextResponse.json({ message: "UNAUTHORIZED" }, { status: 401 });
    }

    const body = await req.json();
    const {
      title,
      slug: incomingSlug,
      excerpt,
      content,
      category,
      coverImage,
      tags,
      published = true,
    } = body;

    // ---------------------- VALIDATION ----------------------

    if (!title || !content || !excerpt) {
      return NextResponse.json(
        { message: "Title, excerpt & content are required" },
        { status: 400 }
      );
    }

    if (!category) {
      return NextResponse.json(
        { message: "Category is required" },
        { status: 400 }
      );
    }

    if (!coverImage) {
      return NextResponse.json(
        { message: "Cover image upload failed" },
        { status: 400 }
      );
    }

    // ---------------------- SLUG HANDLING ----------------------

    // Prefer frontend slug, fallback to slugify(title)
    const rawSlug =
      incomingSlug ||
      slugify(title, { lower: true, strict: true }) ||
      title.toLowerCase().replace(/\s+/g, "-");

    const cleanSlug = rawSlug.trim();

    if (!cleanSlug || cleanSlug.length < 3) {
      return NextResponse.json(
        { message: "Invalid slug generated. Title too short?" },
        { status: 400 }
      );
    }

    // Check slug uniqueness → if exists, append suffix
    let finalSlug = cleanSlug;

    const slugExists = await db.blog.findUnique({
      where: { slug: finalSlug },
      select: { id: true },
    });

    if (slugExists) {
      const suffix = Math.random().toString(36).slice(2, 6);
      finalSlug = `${cleanSlug}-${suffix}`;
    }

    // ---------------------- TAGS CLEANING ----------------------

    const tagArray = Array.isArray(tags)
      ? tags.map((t: string) => t.trim()).filter(Boolean)
      : typeof tags === "string"
      ? tags.split(",").map((t) => t.trim()).filter(Boolean)
      : [];

    // ---------------------- READ TIME ----------------------

    const readingTime = estimateReadTime(content);

    // ---------------------- BLOG CREATION ----------------------

    const blog = await db.blog.create({
      data: {
        title,
        slug: finalSlug,
        excerpt,
        content,
        coverImage,
        readingTime,
        published: Boolean(published),

        // Author relation
        author: {
          connect: { id: user.id },
        },

        // Category relation
        category: {
          connectOrCreate: {
            where: { name: category },
            create: { name: category },
          },
        },

        // Tags relation
        tags: {
          connectOrCreate: tagArray.map((tag: string) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
      },

      include: {
        author: true,
        category: true,
        tags: true,
      },
    });

    // ---------------------- RESPONSE ----------------------

    return NextResponse.json(
      {
        message: "Blog created successfully",
        blog,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Blog Submit Error:", error);

    return NextResponse.json(
      {
        message:
          error?.message?.includes("Unique constraint")
            ? "Slug already exists. Try again."
            : "Server Error",
      },
      { status: 500 }
    );
  }
}
