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

      <div className="grid gap-4 md:grid-cols-3">
        {isLoading
          ? Array.from({ length: 6 }).map((_, idx) => (
              <BlogCardSkeleton key={idx} />
            ))
          : blogs.map((blog, idx) => (
              <BlogCard key={blog.id} blog={blog} index={idx} />
            ))}
      </div>
    </section>
  );
}
