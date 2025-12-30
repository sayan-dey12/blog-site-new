// app/dashboard/page.tsx
import ActionButton from "@/components/dashboard/ActionButton";
import StatCard from "@/components/dashboard/StatsCard";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Welcome back! Here’s a quick overview.
        </p>
      </div>

      {/* User summary */}
      <section className="flex items-center gap-4 p-4 rounded-lg border bg-background">
        <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center text-lg font-semibold">
          U
        </div>
        <div>
          <p className="font-medium">Your Name</p>
          <p className="text-sm text-muted-foreground">
            Writer • Member since 2024
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Total Blogs" value={0} />
        <StatCard title="Total Views" value={0} />
        <StatCard title="Likes" value={0} />
        <StatCard title="Comments" value={0} />
      </section>

      {/* Recent activity (placeholder) */}
      <section className="p-4 rounded-lg border bg-background">
        <h2 className="font-semibold mb-2">Recent Activity</h2>
        <p className="text-sm text-muted-foreground">
          No recent activity yet.
        </p>
      </section>

      {/* Quick actions */}
      <section className="p-4 rounded-lg border bg-background">
        <h2 className="font-semibold mb-3">Quick Actions</h2>
        <div className="flex flex-wrap gap-2">
          <ActionButton label="Edit Profile" />
          <ActionButton label="Write New Blog" />
          <ActionButton label="View Public Profile" />
        </div>
      </section>
      <section className="p-4 rounded-lg border bg-background">
        <h2 className="font-semibold mb-3">Quick Actions</h2>
        <div className="flex flex-wrap gap-2">
          <ActionButton label="Edit Profile" />
          <ActionButton label="Write New Blog" />
          <ActionButton label="View Public Profile" />
        </div>
      </section>
      <section className="p-4 rounded-lg border bg-background">
        <h2 className="font-semibold mb-3">Quick Actions</h2>
        <div className="flex flex-wrap gap-2">
          <ActionButton label="Edit Profile" />
          <ActionButton label="Write New Blog" />
          <ActionButton label="View Public Profile" />
        </div>
      </section>
      <section className="p-4 rounded-lg border bg-background">
        <h2 className="font-semibold mb-3">Quick Actions</h2>
        <div className="flex flex-wrap gap-2">
          <ActionButton label="Edit Profile" />
          <ActionButton label="Write New Blog" />
          <ActionButton label="View Public Profile" />
        </div>
      </section>
      <section className="p-4 rounded-lg border bg-background">
        <h2 className="font-semibold mb-3">Quick Actions</h2>
        <div className="flex flex-wrap gap-2">
          <ActionButton label="Edit Profile" />
          <ActionButton label="Write New Blog" />
          <ActionButton label="View Public Profile" />
        </div>
      </section>

      v
      <section className="p-4 rounded-lg border bg-background">
        <h2 className="font-semibold mb-3">Quick Actions</h2>
        <div className="flex flex-wrap gap-2">
          <ActionButton label="Edit Profile" />
          <ActionButton label="Write New Blog" />
          <ActionButton label="View Public Profile" />
        </div>
      </section>
      <section className="p-4 rounded-lg border bg-background">
        <h2 className="font-semibold mb-3">Quick Actions</h2>
        <div className="flex flex-wrap gap-2">
          <ActionButton label="Edit Profile" />
          <ActionButton label="Write New Blog" />
          <ActionButton label="View Public Profile" />
        </div>
      </section>
      <section className="p-4 rounded-lg border bg-background">
        <h2 className="font-semibold mb-3">Quick Actions</h2>
        <div className="flex flex-wrap gap-2">
          <ActionButton label="Edit Profile" />
          <ActionButton label="Write New Blog" />
          <ActionButton label="View Public Profile" />
        </div>
      </section>
      <section className="p-4 rounded-lg border bg-background">
        <h2 className="font-semibold mb-3">Quick Actions</h2>
        <div className="flex flex-wrap gap-2">
          <ActionButton label="Edit Profile" />
          <ActionButton label="Write New Blog" />
          <ActionButton label="View Public Profile" />
        </div>
      </section>
      <section className="p-4 rounded-lg border bg-background">
        <h2 className="font-semibold mb-3">Quick Actions</h2>
        <div className="flex flex-wrap gap-2">
          <ActionButton label="Edit Profile" />
          <ActionButton label="Write New Blog" />
          <ActionButton label="View Public Profile" />
        </div>
      </section>

      <section className="p-4 rounded-lg border bg-background">
        <h2 className="font-semibold mb-3">Quick Actions</h2>
        <div className="flex flex-wrap gap-2">
          <ActionButton label="Edit Profile" />
          <ActionButton label="Write New Blog" />
          <ActionButton label="View Public Profile" />
        </div>
      </section>
    </div>
  );
}
