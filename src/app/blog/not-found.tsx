import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-center">
      <h2 className="text-2xl font-semibold text-red-500 mb-4">Blog not found</h2>
      <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist.</p>
      <Link href="/blogs" className="text-purple-600 hover:underline">
        ← Back to Blogs
      </Link>
    </div>
  );
}