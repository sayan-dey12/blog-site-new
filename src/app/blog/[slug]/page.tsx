// src/app/blog/[slug]/page.tsx

import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { marked } from "marked";
import AuthorCard from "@/components/blog/AuthorCard";
import "@/styles/markdown.css"; // 👈 custom markdown styling
import Link from "next/link";

export const dynamic = "force-dynamic";

// --- SEO Meta ---
export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;

  const blog = await db.blog.findUnique({ where: { slug } });

  if (!blog) return {};

  return {
    title: blog.title,
    description: blog.excerpt || blog.title,
    openGraph: {
      title: blog.title,
      description: blog.excerpt || blog.title,
      images: [{ url: blog.coverImage || "" }],
      type: "article",
    },
  };
}

export default async function SingleBlogPage(props: {
  params: Promise<{ slug: string }>;
}) {
  // Turbopack: params is a Promise
  const { slug } = await props.params;

  if (!slug || slug.trim().length < 1) return notFound();

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

  // Markdown → HTML
  const htmlContent = await marked.parse(blog.content || "");

  // Increment views (non-blocking)
  db.blog
    .update({
      where: { id: blog.id },
      data: { views: (blog.views ?? 0) + 1 },
    })
    .catch(() => {});

  const readingTime = blog.readingTime ?? 1;
  const categoryName = blog.category?.name ?? "General";
  const publishedDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">

      {/* 🌟 Header Section */}
      <div className="relative mb-10 rounded-3xl overflow-hidden shadow-xl">
        {/* Blurred background */}
        <img
          src={blog.coverImage || "/images/fallback.png"}
          alt={blog.title}
          className="w-full h-[380px] object-cover blur-sm opacity-60 absolute inset-0"
        />

        {/* Main image */}
        <img
          src={blog.coverImage || "/images/fallback.png"}
          alt={blog.title}
          className="relative w-full h-[380px] object-contain z-10"
        />
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold mb-5 tracking-tight">
        {blog.title}
      </h1>

      <div className="mt-3 mb-6 text-sm text-gray-600 dark:text-gray-400">
        <Link href={`/author/${blog.author.username}`}
          className="font-medium text-gray-900 dark:text-gray-100 hover:underline">
          <AuthorCard author={blog.author} />
        </Link>
      </div>
      {/* Meta Info */}
      <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400 text-sm mb-8">

        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-700 dark:text-blue-300 font-medium">
          {categoryName}
        </span>

        <span>{publishedDate}</span>

        <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-700 dark:text-purple-300">
          {readingTime} min read
        </span>
      </div>

      {/* Tags */}
      {blog.tags?.length > 0 && (
        <div className="flex gap-2 flex-wrap mb-8">
          {blog.tags.map((tag) => (
            <span
              key={tag.id}
              className="px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-800 text-xs text-gray-700 dark:text-gray-300"
            >
              #{tag.name}
            </span>
          ))}
        </div>
      )}

      {/* 📝 Content (CUSTOM MARKDOWN CSS APPLIED) */}
      <div
        className="markdown text-base leading-relaxed dark:text-gray-200"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />


      {/* Views */}
      <p className="text-right text-xs mt-6 text-gray-400">
        {(blog.views ?? 0) + 1} views
      </p>

      <div className="mt-16 border-t pt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        • End of Article •
      </div>
    </article>
  );
}
