"use client";

import Link from "next/link";
import Image from "next/image";
import { Blog } from "@/types/blog";
import { motion } from "framer-motion";

type SearchDropdownProps = {
  results: Blog[];
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
        <p className="px-3 py-2 text-sm text-muted-foreground">No results found</p>
      ) : (
        <>
          {results.map((blog, idx) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.slug}`}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2 text-sm hover:bg-muted transition ${
                idx === highlightIndex ? "bg-muted" : ""
              }`}
            >
              {blog.coverImage && (
                <Image
                  src={blog.coverImage}
                  alt={blog.title}
                  width={40}
                  height={40}
                  className="rounded-md object-cover"
                />
              )}

              <div className="flex flex-col">
                <span className="font-medium">{blog.title}</span>
                <span className="text-xs text-muted-foreground">
                  {blog.category} • {blog.readingTime ?? "5 min read"}
                </span>
              </div>
            </Link>
          ))}

          <Link
            href={`/search?query=${searchValue}`}
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