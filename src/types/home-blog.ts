export type BlogHomeType = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: string | null;
  readingTime: number;
  category: string;
  authorName: string;
  authorAvatar?: string | null;
  publishedAt: string;
  isTrending: boolean;
};
