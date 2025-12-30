import { BlogType } from "@/types/blog";
import { SectionHeader } from "@/components/shared/section-header";
import { BlogCard } from "./blog-card";
import { BlogCardSkeleton } from "./blog-card-skeleton";

type BlogLatestGridProps = {
  blogs: BlogType[];
  isLoading: boolean;
};

export function BlogLatestGrid({ blogs, isLoading }: BlogLatestGridProps) {
  return (
    <section className="mb-10 md:mb-14">
      <SectionHeader
        title="Latest articles"
        subtitle="Fresh from the keyboard."
      />

      <div
        className="
          flex gap-4 overflow-x-auto pb-2
          snap-x snap-mandatory
          md:grid md:grid-cols-3 md:gap-6 md:overflow-visible
        "
      >
        {isLoading
          ? Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="min-w-[85%] snap-start md:min-w-0"
              >
                <BlogCardSkeleton />
              </div>
            ))
          : blogs.map((blog, idx) => (
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
