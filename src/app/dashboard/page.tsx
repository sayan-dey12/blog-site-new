"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import ActionButton from "@/components/dashboard/ActionButton";
import StatCard from "@/components/dashboard/StatsCard";

type Stats = {
  blogs: number;
  views: number;
  likes: number;
  comments: number;
};

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    async function fetchStats() {
      const res = await fetch("/api/dashboard/stats", {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    }

    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Welcome back{user?.name ? `, ${user.name}` : ""}!
        </p>
      </div>

      {/* User summary */}
      <section className="flex items-center gap-4 p-4 rounded-lg border bg-background">
        <img
          src={user?.image ?? "/avatar.png"}
          className="h-14 w-14 rounded-full object-cover"
        />
        <div>
          <p className="font-medium">{user?.name}</p>
          <p className="text-sm text-muted-foreground">
            @{user?.username}
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Total Blogs" value={stats?.blogs ?? 0} />
        <StatCard title="Total Views" value={stats?.views ?? 0} />
        <StatCard title="Likes" value={stats?.likes ?? 0} />
        <StatCard title="Comments" value={stats?.comments ?? 0} />
      </section>

      {/* Quick actions */}
      <section className="p-4 rounded-lg border bg-background">
        <h2 className="font-semibold mb-3">Quick Actions</h2>
        <div className="flex flex-wrap gap-2">
          <ActionButton label="Edit Profile" href="/dashboard/profile" />
          <ActionButton label="Write New Blog" href="/blog/submit" />
          <ActionButton
            label="View Public Profile"
            href={`/author/${user?.username}`}
          />
        </div>
      </section>
    </div>
  );
}
