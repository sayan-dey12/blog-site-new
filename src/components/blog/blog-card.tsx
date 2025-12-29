'use client';
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { BlogType  } from "@/types/blog";

type BlogCardProps = {
  blog: BlogType;
  index?: number;
  large?: boolean;
};

export function BlogCard({ blog, index = 0, large = false }: BlogCardProps) {
  // Correct date — BlogType uses createdAt
 const dateLabel = blog.createdAt
  ? new Date(blog.createdAt).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  : "Unknown";

  // Author initials (safe)
  const authorName = blog.author?.name || "Guest Author";
  const initials = authorName
    .split(" ")
    .map((p) => p[0])
    .join("")
    .toUpperCase();

  // Author avatar (from BlogType.author.image)
  const authorAvatar = blog.author?.image || null;

  // Category name (BlogType.category is an object)
  const categoryName = blog.category?.name || "General";

  // Reading time fallback
  const readTime = blog.readingTime && blog.readingTime > 0
    ? blog.readingTime
    : 1;

  return (
    <motion.article
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: index * 0.03 }}
    >
      <Card
        className={`h-full overflow-hidden border-muted bg-background/60 shadow-sm transition hover:-translate-y-1 hover:shadow-md`}
      >
        <Link href={`/blog/${blog.slug}`}>
          <div
            className={`relative overflow-hidden ${
              large ? "aspect-2/1" : "aspect-video"
            }`}
          >
            {blog.coverImage ? (
              <Image
                src={blog.coverImage}
                alt={blog.title}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted text-xs text-muted-foreground">
                No image
              </div>
            )}
          </div>
        </Link>

        <CardContent className="flex flex-col gap-3 p-3.5 md:p-4">
          {/* Top row: Category + Date + Reading time */}
          <div className="flex items-center justify-between gap-2">
            <Badge variant="outline" className="px-2 text-[10px]">
              {categoryName}
            </Badge>

            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {dateLabel}
              </span>

              <span className="inline-flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {readTime} min read
              </span>
            </div>
          </div>

          {/* Title */}
          <Link href={`/blog/${blog.slug}`}>
            <h3 className={`line-clamp-2 font-semibold ${large ? "text-lg" : "text-sm md:text-base"}`}>
              {blog.title}
            </h3>
          </Link>

          {/* Excerpt */}
          {blog.excerpt && (
            <p className="line-clamp-2 text-xs text-muted-foreground md:text-sm">
              {blog.excerpt}
            </p>
          )}

          {/* Author Info */}
          <div className="mt-1 flex items-center gap-2">
            <Avatar className="h-7 w-7">
              {authorAvatar && (
                <AvatarImage src={authorAvatar} alt={authorName} />
              )}
              <AvatarFallback className="text-[10px]">{initials}</AvatarFallback>
            </Avatar>

            <div className="flex flex-col leading-none">
              <span className="text-xs font-medium">{authorName}</span>
              <span className="text-[10px] text-muted-foreground">Writer</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.article>
  );
}
