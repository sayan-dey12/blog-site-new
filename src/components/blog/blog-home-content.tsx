"use client";

import { BlogType } from "@/types/blog";
import { BlogTrending } from "./blog-trending";
import { BlogLatestGrid } from "./blog-latest-grid";
import { BlogPopularGrid } from "./blog-popular-grid";
import { HeroSection } from "./HeroSection";

type BlogHomeContentProps = {
  trending: BlogType[];
  latest: BlogType[];
  popular: BlogType[];
};

export function BlogHomeContent({
  trending,
  latest,
  popular,
}: BlogHomeContentProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-8 md:px-8">
      <section className="mb-20">
        <HeroSection />
      </section>
      {/* 🔥 Trending */}
      <section className="mb-20">
        <BlogTrending blogs={trending} />
      </section>

      {/* 🆕 Latest */}
      <section className="mb-20">
        <BlogLatestGrid blogs={latest} isLoading={false} />
      </section>

      {/* ⭐ Most Popular */}
      <section>
        <BlogPopularGrid blogs={popular} />
      </section>
    </div>
  );
}
