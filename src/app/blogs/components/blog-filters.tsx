"use client";

import { LayoutGrid, List } from "lucide-react";

type BlogFiltersProps = {
  categories?: string[]; // optional at runtime
  selected: string;
  onCategoryChange: (c: string) => void;
  mode: "grid" | "list";
  onModeChange: (m: "grid" | "list") => void;
};

export default function BlogFilters({
  categories = [],
  selected,
  onCategoryChange,
  mode,
  onModeChange,
}: BlogFiltersProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto">
        <button
          onClick={() => onCategoryChange("all")}
          className={`px-3 py-1 rounded-full text-sm border whitespace-nowrap ${
            selected === "all"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground"
          }`}
        >
          All
        </button>

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`px-3 py-1 rounded-full text-sm border whitespace-nowrap ${
              selected === cat
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Layout toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => onModeChange("grid")}
          className={`p-2 rounded-md border ${
            mode === "grid"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground"
          }`}
        >
          <LayoutGrid className="h-4 w-4" />
        </button>

        <button
          onClick={() => onModeChange("list")}
          className={`p-2 rounded-md border ${
            mode === "list"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground"
          }`}
        >
          <List className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
