import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BlogType } from "@/types/blog";

type BlogFeaturedProps = {
  blog: BlogType | null;
};

export function BlogFeatured({ blog }: BlogFeaturedProps) {
  if (!blog) return null;

  const categoryName = blog.category?.name || "General";
  const publishedAt = new Date(blog.createdAt).toLocaleDateString();
  const readTime = blog.readingTime ?? 1;

  return (
    <section className="mt-10 mb-20">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid gap-10 lg:grid-cols-[6fr,4fr] items-start"
      >
        {/* LEFT — FEATURED BLOG */}
        <div className="rounded-2xl border bg-background shadow-sm flex flex-col">

          {/* FIXED IMAGE HEIGHT */}
          <div className="relative w-full aspect-video rounded-t-2xl overflow-hidden">
            {blog.coverImage ? (
              <Image
                src={blog.coverImage}
                alt={blog.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-muted text-xs text-muted-foreground">
                No Image
              </div>
            )}
          </div>

          {/* CONTENT */}
          <div className="p-6 md:p-8 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Badge variant="outline" className="px-2 py-0 text-[10px]">
                {categoryName}
              </Badge>
              <span>{publishedAt}</span>
              <span>• {readTime} min read</span>
            </div>

            <Link href={`/blog/${blog.slug}`}>
              <h1 className="text-2xl md:text-3xl font-semibold leading-snug">
                {blog.title}
              </h1>
            </Link>

            <p className="text-sm text-muted-foreground md:text-base">
              {blog.excerpt}
            </p>

            <Button asChild size="sm" className="rounded-full w-fit mt-2">
              <Link href={`/blog/${blog.slug}`}>
                Read featured article
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* RIGHT — SAYAN'S PICKS */}
        <div className="rounded-2xl border bg-muted/20 p-6 md:p-8 shadow-sm flex flex-col gap-6 w-full">

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-primary">
              Sayan’s Picks
            </h3>

            <h2 className="mt-2 text-xl md:text-2xl font-semibold leading-relaxed">
              Articles crafted for builders.
            </h2>

            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              System design, AI tooling, backend architecture, and practical insights
              learned from building production apps.
            </p>
          </div>

          <div className="grid gap-4">
            <MiniPick
              title="✨ Practical Engineering"
              subtitle="Hands-on lessons for real-world developers."
            />
            <MiniPick
              title="🧠 AI & System Thinking"
              subtitle="Mental models for modern engineering."
            />
            <MiniPick
              title="🚀 Scaling Systems"
              subtitle="Queues, caching, monitoring, and performance."
            />
          </div>

        </div>
      </motion.div>
    </section>
  );
}

function MiniPick({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="rounded-xl border bg-background p-4 hover:shadow-md transition shadow-sm">
      <p className="text-sm font-medium">{title}</p>
      <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
    </div>
  );
}
