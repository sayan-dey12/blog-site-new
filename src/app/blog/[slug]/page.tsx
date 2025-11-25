// src/app/blog/[slug]/page.tsx

import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { marked } from "marked";

export const dynamic = "force-dynamic";

export default async function SingleBlogPage(props: {
  params: Promise<{ slug: string }>;
}) {
  // 🔥 Turbopack passes params as a Promise — must await it
  const { slug } = await props.params;

  if (!slug || slug.trim().length < 1) {
    return notFound();
  }

  // Fetch blog
  const blog = await db.blog.findUnique({
    where: { slug },
    include: {
      author: true,
      category: true,
      tags: true,
    },
  });

  if (!blog) return notFound();

  // Convert markdown
  const htmlContent = await marked.parse(blog.content || "");

  // Increment views (non-blocking)
  db.blog
    .update({
      where: { id: blog.id },
      data: { views: blog.views + 1 },
    })
    .catch(() => {});

  const authorName = blog.author?.name ?? "Unknown Author";
  const authorAvatar =
    blog.author?.image ?? "/images/avatar-placeholder.png";
  const categoryName = blog.category?.name ?? "General";

  const publishedDate = new Date(blog.createdAt).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );

  return (
    <article className="max-w-3xl mx-auto px-4 py-10">

      <div className="overflow-hidden rounded-2xl mb-6">
        <img
          src={blog.coverImage || "/images/fallback.png"}
          alt={blog.title}
          className="w-full max-h-[600px] object-cover rounded-2xl"
        />
      </div>

      <h1 className="text-4xl font-bold mb-3">{blog.title}</h1>

      <div className="flex justify-between text-sm text-gray-500 mb-6">
        <p>
          {publishedDate} • {blog.readingTime} min read • {categoryName}
        </p>

        <div className="flex gap-2 flex-wrap">
          {blog.tags?.map((t) => (
            <span
              key={t.id}
              className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs"
            >
              #{t.name}
            </span>
          ))}
        </div>
      </div>

      <div
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      <div className="mt-10 flex items-center justify-end gap-3">
        <img
          src={authorAvatar}
          alt={authorName}
          className="w-8 h-8 rounded-full"
        />
        <p className="text-sm text-gray-500 italic">
          Written by {authorName}
        </p>
      </div>

      <p className="text-right text-xs mt-4 text-gray-400">
        {(blog.views ?? 0) + 1} views
      </p>
    </article>
  );
}
