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
  SelectItem
} from "@/components/ui/select";

// ✅ Markdown Editor
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });
import { commands as defaultCommands, ICommand } from "@uiw/react-md-editor";

export default function BlogSubmitPage() {
  const router = useRouter();
  const { loggedIn, mounted } = useAuth();
  const editorRef = useRef<HTMLDivElement | null>(null);

  const [hydrated, setHydrated] = useState(false);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // ✅ Prevent hydration mismatch
  useEffect(() => setHydrated(true), []);

  // ✅ Redirect if not logged in
  useEffect(() => {
    if (mounted && !loggedIn) {
      toast.error("Please log in to write a blog.");
      router.push("/login?callbackUrl=/blog/submit");
    }
  }, [mounted, loggedIn, router]);

  // ✅ Auto slug
  useEffect(() => {
    setSlug(slugify(title, { lower: true }));
  }, [title]);

  // ✅ Upload Inserted Image
  const handleImageUpload = async (file: File) => {
    const fd = new FormData();
    fd.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const { url } = await res.json();

      setContent((prev) => prev + `\n\n![image](${url})`);
      toast.success("Image uploaded");
    } catch {
      toast.error("Image upload failed");
    }
  };

  // ✅ Toolbar Image Button (No Emoji)
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

  // ✅ Submit Blog
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!title || !excerpt || !content || !category || !coverImage) {
      toast.error("All fields are required");
      return;
    }

    setSubmitting(true);

    try {
      // Upload cover
      const fd = new FormData();
      fd.append("file", coverImage);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: fd,
      });

      const { url } = await uploadRes.json();

      // Submit blog
      const res = await fetch("/api/blog/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          excerpt,
          content,
          category,
          coverImage: url,
          tags: tags.split(",").map((t) => t.trim()),
          published: true,
        }),
      });

      if (!res.ok) throw new Error();

      toast.success("Blog published successfully!");
      router.push(`/blog/${slug}`);
    } catch {
      toast.error("Failed to publish blog");
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

      <Label>Slug</Label>
      <Input value={slug} disabled />

      <Label>Excerpt</Label>
      <Textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />

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

      <Label>Tags</Label>
      <Input value={tags} onChange={(e) => setTags(e.target.value)} />

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