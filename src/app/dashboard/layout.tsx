"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Menu } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loggedIn, mounted } = useAuth();
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false); // ✅ FIX

  useEffect(() => {
    if (mounted && !loggedIn) {
      router.replace("/login");
    }
  }, [mounted, loggedIn, router]);

  // ⏳ Wait until auth is checked
  if (!mounted) {
    return <div className="p-4">Checking authentication…</div>;
  }

  // 🚫 Not logged in → nothing renders (redirect happens)
  if (!loggedIn) {
    return null;
  }

  return (
    <div className="h-screen overflow-hidden flex bg-muted">
      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile top bar */}
        <header className="md:hidden h-14 bg-background border-b flex items-center px-4">
          <button
            onClick={() => setSidebarOpen(true)} // ✅ FIX
            className="p-2 rounded hover:bg-muted"
          >
            <Menu size={22} />
          </button>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
