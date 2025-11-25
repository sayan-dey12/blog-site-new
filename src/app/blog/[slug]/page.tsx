// src/app/blog/[slug]/page.tsx

import { notFound } from "next/navigation";
import { marked } from "marked";
import { db } from "@/lib/db";
import AuthorCard from "@/components/blog/AuthorCard";

export default async function SingleBlogPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;

  // Guard for invalid slugs
  if (!slug || typeof slug !== "string" || slug.trim().length < 3) {
    return notFound();
  }

  // Fetch blog with relations (SSR-safe)
  const blog = await db.blog.findUnique({
    where: { slug },
    include: {
      author: true,
      category: true,
      tags: true,
    },
  });

  if (!blog) return notFound();

  // Convert markdown to HTML
  const htmlContent = await marked.parse(blog.content ?? "");

  // Safe view increment (no blocking)
  db.blog
    .update({
      where: { id: blog.id },
      data: { views: (blog.views ?? 0) + 1 },
    })
    .catch((err) => console.warn("Views update failed:", err));

  // Read-time fallback if somehow missing
  const readingTime =
    blog.readingTime ??
    Math.max(
      1,
      Math.round(
        (blog.content?.split(/\s+/).filter(Boolean).length ?? 0) / 200
      )
    );

  return (
    <article className="max-w-3xl mx-auto px-4 py-10">

      {/* Cover Image */}
      <div className="overflow-hidden rounded-2xl mb-6">
        <img
          src={blog.coverImage || "/images/fallback.png"}
          alt={blog.title}
          className="w-full h-auto max-h-[600px] object-contain rounded-2xl"
        />
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold mb-3">{blog.title}</h1>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
        <span>{new Date(blog.createdAt).toDateString()}</span>
        <span>•</span>
        <span>{readingTime} min read</span>

        {blog.category && (
          <>
            <span>•</span>
            <span className="text-blue-600 font-medium">
              {blog.category.name}
            </span>
          </>
        )}
      </div>

      {/* Tags */}
      {blog.tags && blog.tags.length > 0 && (
        <div className="flex gap-2 flex-wrap mb-6">
          {blog.tags.map((tag) => (
            <span
              key={tag.id}
              className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs"
            >
              #{tag.name}
            </span>
          ))}
        </div>
      )}

      {/* Markdown Content */}
      <div
        className="
          prose dark:prose-invert max-w-none
          prose-img:mx-auto prose-img:max-w-[700px] prose-img:rounded-xl
          prose-pre:overflow-x-auto prose-pre:p-4 prose-pre:rounded-md
          prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800
        "
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {/* Author Card */}
      <AuthorCard author={blog.author} />

      {/* Views */}
      <p className="text-right text-xs mt-4 text-gray-400">
        {(blog.views ?? 0) + 1} views
      </p>
    </article>
  );
}
