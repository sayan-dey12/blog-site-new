"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Blog } from "@/types/blog";
import { SearchDropdown } from "./search-dropdown";

export function SearchBar() {
  const [value, setValue] = useState("");
  const [results, setResults] = useState<Blog[]>([]);
  const [visible, setVisible] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    async function fetchBlogs() {
      const res = await fetch("/api/blog/list");
      const data = await res.json();
      setBlogs(data.blogs || []);
    }
    fetchBlogs();
  }, []);

  const handleSearch = (text: string) => {
    setValue(text);

    if (!text.trim()) {
      setVisible(false);
      return;
    }

    const lower = text.toLowerCase();

    const filtered = blogs.filter((b) => {
      const title = b.title?.toLowerCase() || "";
      const excerpt = b.excerpt?.toLowerCase() || "";
      return title.includes(lower) || excerpt.includes(lower);
    });

    setResults(filtered.slice(0, 8));
    setVisible(true);
    setHighlightIndex(0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!visible || results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) => Math.min(prev + 1, results.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) => Math.max(prev - 1, 0));
    }
    if (e.key === "Enter") {
      const blog = results[highlightIndex];
      if (blog) window.location.href = `/blog/${blog.slug}`;
    }
  };

  return (
    <div className="relative w-full">
      <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

      <Input
        value={value}
        onChange={(e) => handleSearch(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search blogs..."
        className="pl-8 text-sm w-full"
      />

      <SearchDropdown
        results={results}
        visible={visible}
        highlightIndex={highlightIndex}
        onClose={() => setVisible(false)}
        searchValue={value}
      />
    </div>
  );
}