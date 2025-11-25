// FILE: src/app/api/blog/submit/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getUserFromToken } from "@/lib/getUserFromToken";

export async function POST(req: NextRequest) {
  try {
    const user: any = await getUserFromToken();
    if (!user) {
      return NextResponse.json({ message: "UNAUTHORIZED" }, { status: 401 });
    }

    const body = await req.json();
    const {
      title,
      slug,
      excerpt,
      content,
      category,
      coverImage,
      tags
    } = body;

    // ✅ Validate required fields
    if (!title || !slug || !content || !category || !coverImage) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // ✅ Clean tags array
    const tagArray = Array.isArray(tags)
      ? tags.map((t: string) => t.trim()).filter(Boolean)
      : [];

    // ✅ Create blog with correct relational fields
    const blog = await db.blog.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        coverImage,

        // ✅ Proper author relation
        author: {
          connect: { id: user.id },
        },

        // ✅ Category relation
        category: {
          connectOrCreate: {
            where: { name: category },
            create: { name: category },
          },
        },

        // ✅ Tags relation
        tags: {
          connectOrCreate: tagArray.map((tag: string) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        }
      },
      include: {
        category: true,
        tags: true,
      },
    });

    return NextResponse.json(
      { message: "Blog created", blog },
      { status: 201 }
    );
  } catch (error) {
    console.error("Blog Submit Error:", error);
    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}