"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type Profile = {
  name: string | null;
  username: string | null;
  bio: string | null;
  about: string | null;
  image: string | null;
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  /* ---------------- FETCH PROFILE ---------------- */

  async function fetchProfile() {
    try {
      const res = await fetch("/api/profile/me", {
        credentials: "include",
      });
      if (!res.ok) throw new Error();
      setProfile(await res.json());
    } catch {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  /* ---------------- HANDLERS ---------------- */

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    if (!profile) return;
    setProfile({ ...profile, [e.target.name]: e.target.value });
  }

  const uploadProfileImage = async () => {
    if (!imageFile) return profile?.image ?? null;

    setUploading(true);
    const fd = new FormData();
    fd.append("file", imageFile);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: fd,
      });
      if (!res.ok) throw new Error();

      const { url } = await res.json();
      toast.success("Profile image uploaded");
      return url;
    } catch {
      toast.error("Image upload failed");
      throw new Error();
    } finally {
      setUploading(false);
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!profile) return;

    setSaving(true);
    try {
      const imageUrl = await uploadProfileImage();

      const res = await fetch("/api/profile/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...profile, image: imageUrl }),
      });

      if (!res.ok) throw new Error();

      toast.success("Profile updated successfully");
      setPreviewImage(null);
      await fetchProfile();
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  }

  /* ---------------- RENDER ---------------- */

  if (loading) return <p className="p-4">Loading profile…</p>;
  if (!profile) return null;

  const avatarSrc =
    previewImage || profile.image || "/avatar.png";

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Edit Profile</h1>
        <p className="text-sm text-muted-foreground">
          Update your public information
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Avatar */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <img
            src={avatarSrc}
            alt="Profile"
            className="
              h-24 w-24
              rounded-full
              object-cover
              border
              shrink-0
            "
          />

          <div className="space-y-2">
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setImageFile(file);
                if (file) {
                  setPreviewImage(URL.createObjectURL(file));
                }
              }}
            />
            <p className="text-xs text-muted-foreground">
              JPG, PNG • Max 5MB
            </p>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label>Name</Label>
          <Input
            name="name"
            value={profile.name ?? ""}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-1.5">
          <Label>Username</Label>
          <Input
            value={profile.username ?? ""}
            disabled
            className="bg-muted cursor-not-allowed"
          />
        </div>

        <div className="space-y-1.5">
          <Label>Bio</Label>
          <Input
            name="bio"
            value={profile.bio ?? ""}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-1.5">
          <Label>About</Label>
          <Textarea
            name="about"
            rows={4}
            value={profile.about ?? ""}
            onChange={handleChange}
          />
        </div>

        <Button disabled={saving || uploading} className="w-full sm:w-auto">
          {saving
            ? "Saving..."
            : uploading
            ? "Uploading image..."
            : "Save Changes"}
        </Button>
      </form>
    </div>
  );
}
