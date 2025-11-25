"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import slugify from "slugify";
import { useAuth } from "@/context/AuthContext";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });
import { commands as defaultCommands, ICommand } from "@uiw/react-md-editor";

export default function BlogSubmitPage() {
  const router = useRouter();
  const { loggedIn, mounted } = useAuth();

  const [hydrated, setHydrated] = useState(false);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);

  const [submitting, setSubmitting] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => setHydrated(true), []);

  // Redirect if not logged in
  useEffect(() => {
    if (mounted && !loggedIn) {
      toast.error("Please log in to write a blog.");
      router.push("/login?callbackUrl=/blog/submit");
    }
  }, [mounted, loggedIn, router]);

  // Auto slug generation
  useEffect(() => {
    const newSlug = slugify(title, { lower: true, strict: true });
    setSlug(newSlug);
  }, [title]);

  // Image upload inside markdown editor
  const handleImageUpload = async (file: File) => {
    const fd = new FormData();
    fd.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (!res.ok) throw new Error("Upload failed");

      const { url } = await res.json();

      setContent((prev) => prev + `\n\n![image](${url})`);
      toast.success("Image uploaded");
    } catch (err) {
      toast.error("Image upload failed");
    }
  };

  const imageCommand: ICommand = {
    name: "image-upload",
    keyCommand: "image",
    buttonProps: { "aria-label": "Insert Image" },
    icon: <span>Image</span>,
    execute: () => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.click();
      input.onchange = () => {
        const file = input.files?.[0];
        if (file) handleImageUpload(file);
      };
    },
  };

  const commands: ICommand[] = [...defaultCommands.getCommands(), imageCommand];

  // Submit blog
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Client-side validation
    if (!title.trim()) return toast.error("Title is required");
    if (!category.trim()) return toast.error("Select a category");
    if (!excerpt.trim()) return toast.error("Excerpt is required");
    if (!content.trim()) return toast.error("Content is required");
    if (!coverImage) return toast.error("Cover image is required");

    if (!slug || slug.length < 3) {
      return toast.error("Invalid slug generated. Enter a longer title.");
    }

    setSubmitting(true);

    try {
      // 1. Upload cover image
      const fd = new FormData();
      fd.append("file", coverImage);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: fd,
      });

      if (!uploadRes.ok) throw new Error("Image upload failed");
      const { url: coverUrl } = await uploadRes.json();

      // 2. Submit blog
      const res = await fetch("/api/blog/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          excerpt,
          content,
          category,
          coverImage: coverUrl,
          tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
          published: true,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to publish blog");
        throw new Error();
      }

      // Use the slug returned from backend (unique guaranteed)
      const finalSlug = data.blog.slug;
      toast.success("Blog published successfully!");

      router.push(`/blog/${finalSlug}`);
    } catch (err: any) {
      toast.error(err.message || "Failed to publish blog");
    } finally {
      setSubmitting(false);
    }
  };

  if (!hydrated) return <p className="text-center py-8">Loading editor...</p>;

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 space-y-5">
      <h1 className="text-2xl font-bold">Write a Blog</h1>

      <Label>Title</Label>
      <Input value={title} onChange={(e) => setTitle(e.target.value)} />

      <Label>Slug (auto-generated)</Label>
      <Input value={slug} disabled />

      <Label>Excerpt</Label>
      <Textarea
        value={excerpt}
        onChange={(e) => setExcerpt(e.target.value)}
        maxLength={250}
      />

      <Label>Category</Label>
      <Select onValueChange={setCategory}>
        <SelectTrigger>
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="technology">Technology</SelectItem>
          <SelectItem value="ai">AI</SelectItem>
          <SelectItem value="webdev">Web Development</SelectItem>
        </SelectContent>
      </Select>

      <Label>Tags (comma separated)</Label>
      <Input
        placeholder="ai, nextjs, coding"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      <Label>Content</Label>
      <div className="border rounded-md p-2">
        <MDEditor
          value={content}
          onChange={(val) => setContent(val || "")}
          preview="edit"
          height={500}
          commands={commands}
        />
      </div>

      <Label>Cover Image</Label>
      <Input
        type="file"
        accept="image/*"
        onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
      />

      <Button disabled={submitting} className="w-full rounded-full">
        {submitting ? "Publishing..." : "Publish Blog"}
      </Button>
    </form>
  );
}
