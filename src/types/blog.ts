// src/types/blog.ts
export type TagType = {
  id: string;
  name: string;
};

export type CategoryType = {
  id: string;
  name: string;
};

export type AuthorType = {
  id: string;
  name?: string | null;
  username?: string | null;
  email?: string;
  image?: string | null;
};

export type BlogType = {
  id: string;
  title: string;
  slug: string;
  content: string;
  coverImage?: string | null;
  excerpt?: string | null;
  readingTime?: number | null;
  published: boolean;
  authorId: string;
  author?: AuthorType | null;
  categoryId?: string | null;
  category?: CategoryType | null;
  tags?: TagType[];
  views: number;
  createdAt: string;
  updatedAt: string;
};
