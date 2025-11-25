"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BlogType } from "@/types/blog";

type SearchDropdownProps = {
  results: BlogType[];
  visible: boolean;
  highlightIndex: number;
  onClose: () => void;
  searchValue: string;
};

export function SearchDropdown({
  results,
  visible,
  highlightIndex,
  onClose,
  searchValue,
}: SearchDropdownProps) {
  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="absolute left-0 top-full mt-2 w-full rounded-lg border bg-popover shadow-lg z-50 max-h-72 overflow-y-auto"
    >
      {results.length === 0 ? (
        <p className="px-3 py-2 text-sm text-muted-foreground">
          No results found
        </p>
      ) : (
        <>
          {results.map((blog, idx) => {
            const categoryName = blog.category?.name ?? "General";
            const readTime =
              blog.readingTime && blog.readingTime > 0
                ? `${blog.readingTime} min read`
                : "1 min read";

            return (
              <Link
                key={blog.id}
                href={`/blog/${blog.slug}`}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2 text-sm hover:bg-muted transition ${
                  idx === highlightIndex ? "bg-muted" : ""
                }`}
              >
                {/* Cover Image */}
                {blog.coverImage && (
                  <Image
                    src={blog.coverImage}
                    alt={blog.title}
                    width={40}
                    height={40}
                    className="rounded-md object-cover shrink-0"
                  />
                )}

                {/* Blog Info */}
                <div className="flex flex-col">
                  <span className="font-medium line-clamp-1">
                    {blog.title}
                  </span>

                  <span className="text-xs text-muted-foreground">
                    {categoryName} • {readTime}
                  </span>
                </div>
              </Link>
            );
          })}

          {/* View All Results */}
          <Link
            href={`/search?query=${encodeURIComponent(searchValue)}`}
            onClick={onClose}
            className="block w-full text-center text-sm py-2 border-t hover:bg-muted transition"
          >
            View all results →
          </Link>
        </>
      )}
    </motion.div>
  );
}
