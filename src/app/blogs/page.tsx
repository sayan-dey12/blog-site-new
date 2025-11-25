import { Blog } from "@/types/blog";
import { BlogCard } from "@/components/blog/blog-card";
import { BlogCardSkeleton } from "@/components/blog/blog-card-skeleton";
import { BlogFilters } from "./components/blog-filters";
import { BlogPageClient } from "./BlogPageClient";

async function getBlogs(): Promise<Blog[]> {
  // TODO: Replace with DB fetch
  return [];
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <BlogPageClient blogs={blogs} />
  );
}