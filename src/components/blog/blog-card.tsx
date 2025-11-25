// src/components/blog/blog-card.tsx
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Blog } from "@/types/blog";

type BlogCardProps = {
  blog: Blog;
  index?: number;
};

export function BlogCard({ blog, index = 0 }: BlogCardProps) {
  const dateLabel = blog.publishedAt
    ? new Date(blog.publishedAt).toLocaleDateString()
    : "Soon";

  const initials =
    blog.authorName
      ?.split(" ")
      .map((p) => p[0])
      .join("") ?? "AU";

  return (
    <motion.article
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: index * 0.03 }}
    >
      <Card className="h-full overflow-hidden border-muted bg-background/60 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
        <Link href={`/blog/${blog.slug}`}>
          <div className="relative aspect-video w-full overflow-hidden">
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
          <div className="flex items-center justify-between gap-2">
            <Badge variant="outline" className="px-2 text-[10px]">
              {blog.category ?? "General"}
            </Badge>
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {dateLabel}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {blog.readingTime ?? "5 min"}
              </span>
            </div>
          </div>

          <Link href={`/blog/${blog.slug}`}>
            <h3 className="line-clamp-2 text-sm font-semibold md:text-base">
              {blog.title}
            </h3>
          </Link>

          <p className="line-clamp-2 text-xs text-muted-foreground md:text-sm">
            {blog.excerpt}
          </p>

          <div className="mt-1 flex items-center gap-2">
            <Avatar className="h-7 w-7">
              {blog.authorAvatar && (
                <AvatarImage src={blog.authorAvatar} alt={blog.authorName} />
              )}
              <AvatarFallback className="text-[10px]">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-xs font-medium">
                {blog.authorName ?? "Guest Author"}
              </span>
              <span className="text-[10px] text-muted-foreground">
                Writer
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.article>
  );
}