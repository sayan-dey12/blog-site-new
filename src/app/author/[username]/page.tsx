import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import AuthorAbout from "@/components/author/AuthorAbout";
import AuthorBlogs from "@/components/author/AuthorBlogs";
import AuthorHeader from "@/components/author/AuthorHeader";
import AuthorStats from "@/components/author/AuthorStats";
import type { PublicAuthorType } from "@/types/author";

type PageProps = {
  // 🔑 Next.js 16: params is async
  params: Promise<{ username: string }>;
};

export default async function AuthorPage({ params }: PageProps) {
  // ✅ unwrap params FIRST
  const { username } = await params;

  if (!username || username.trim().length === 0) {
    return notFound();
  }

  const author = await db.user.findUnique({
    where: { username },
    include: {
      blogs: {
        where: { published: true },
        orderBy: { createdAt: "desc" },
        include: {
          category: true,
          tags: true,
          author: {
            select: {
              id: true,
              name: true,
              image: true,
              username: true,
            },
          },
        },
      },
    },
  });

  if (!author) {
    return notFound();
  }

  const authorData: PublicAuthorType = {
    id: author.id,
    name: author.name,
    image: author.image,
    bio: author.bio ?? null,
    about: author.about ?? null,
    createdAt: author.createdAt.toISOString(),
    blogs: author.blogs.map((b) => ({
      ...b,
      createdAt: b.createdAt.toISOString(),
      updatedAt: b.updatedAt.toISOString(),
    })),
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 space-y-10">
      <AuthorHeader author={authorData} />
      <AuthorStats blogs={authorData.blogs} />
      {authorData.about && <AuthorAbout about={authorData.about} />}
      <AuthorBlogs blogs={authorData.blogs} />
    </main>
  );
}
