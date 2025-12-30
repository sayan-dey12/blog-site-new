import { BlogType } from "@/types/blog";
import { SectionHeader } from "@/components/shared/section-header";
import { BlogCard } from "./blog-card";

export function BlogPopularGrid({ blogs }: { blogs: BlogType[] }) {
  if (!blogs.length) return null;

  return (
    <section className="mb-10 md:mb-14">
      <SectionHeader
        title="Most popular"
        subtitle="All-time reader favorites."
      />

      <div
        className="
          flex gap-4 overflow-x-auto pb-2
          snap-x snap-mandatory
          md:grid md:grid-cols-3 md:gap-6 md:overflow-visible
        "
      >
        {blogs.map((blog, idx) => (
          <div
            key={blog.id}
            className="min-w-[85%] snap-start md:min-w-0"
          >
            <BlogCard blog={blog} index={idx} />
          </div>
        ))}
      </div>
    </section>
  );
}
