import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BlogHomeType } from "@/types/home-blog";

type BlogFeaturedProps = {
  blog: BlogHomeType | null;
};

export function BlogFeatured({ blog }: BlogFeaturedProps) {
  if (!blog) return null;

  return (
    <section className="mb-8 mt-4 md:mb-12 md:mt-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-6 md:grid-cols-[3fr,2fr]"
      >
        <div className="relative overflow-hidden rounded-2xl border bg-background/80 shadow-sm">
          <div className="relative aspect-16/10 w-full overflow-hidden">
            {blog.coverImage ? (
              <Image
                src={blog.coverImage}
                alt={blog.title}
                fill
                priority
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted text-xs text-muted-foreground">
                Featured image
              </div>
            )}
          </div>

          <div className="p-4 md:p-6">
            <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
              <Badge variant="outline" className="px-2 py-0 text-[10px]">
                Featured
              </Badge>

              <span>
                {new Date(blog.publishedAt).toLocaleDateString()}
              </span>

              <span>• {blog.readingTime} min read</span>
            </div>

            <Link href={`/blog/${blog.slug}`}>
              <h1 className="mb-2 text-xl font-semibold leading-tight md:text-2xl lg:text-3xl">
                {blog.title}
              </h1>
            </Link>

            <p className="mb-4 text-sm text-muted-foreground md:text-base">
              {blog.excerpt}
            </p>

            <Button asChild size="sm" className="rounded-full">
              <Link href={`/blog/${blog.slug}`}>
                Read featured article
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 rounded-2xl border bg-muted/40 p-4 md:p-5">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-primary">
              Sayan's Picks
            </p>
            <h2 className="mt-2 text-lg font-semibold md:text-xl">
              Deep dives into systems, AI and dev journey.
            </h2>
            <p className="mt-2 text-xs text-muted-foreground md:text-sm">
              Long-form posts, project breakdowns, and logs from building real apps.
            </p>
          </div>

          <div className="grid gap-2 text-sm text-muted-foreground">
            <p>✨ No fluff, only practical learnings.</p>
            <p>🧠 Systems, backend, infra, and AI tooling.</p>
            <p>🚀 Written from the perspective of a builder.</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
