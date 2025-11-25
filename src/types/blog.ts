// src/types/blog.ts
export type Blog = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: string;
  category?: string;
  readingTime?: number; // ✅ FIXED
  publishedAt?: string;
  authorName?: string;
  authorAvatar?: string;
  isTrending?: boolean;
};
