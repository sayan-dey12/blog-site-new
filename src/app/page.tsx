"use client";

import { useState } from "react";
import { BlogHomeContent } from "@/components/blog/blog-home-content";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex min-h-screen flex-col bg-linear-to-b from-background to-muted/40">
      <main className="flex-1">
        <BlogHomeContent searchQuery={searchQuery} />
      </main>
    </div>
  );
}
