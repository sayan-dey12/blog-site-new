// src/components/blog/blog-trending.tsx
import { Blog } from "@/types/blog";
import { SectionHeader } from "@/components/shared/section-header";
import { BlogCard } from "./blog-card";

type BlogTrendingProps = {
  blogs: Blog[];
};

export function BlogTrending({ blogs }: BlogTrendingProps) {
  if (!blogs.length) return null;

  return (
    <section className="mb-8 md:mb-10">
      <SectionHeader
        title="Trending now"
        subtitle="Most read and shared this week."
      />
      <div className="grid gap-4 md:grid-cols-3">
        {blogs.map((blog, idx) => (
          <BlogCard key={blog.id} blog={blog} index={idx} />
        ))}
      </div>
    </section>
  );
}