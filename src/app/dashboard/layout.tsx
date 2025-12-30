"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Menu } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    // 🔴 Important: h-screen + overflow-hidden
    <div className="h-screen overflow-hidden flex bg-muted">
      {/* Sidebar */}
      <Sidebar open={open} onClose={() => setOpen(false)} />

      {/* Right side */}
      <div className="flex-1 flex flex-col">
        {/* Mobile top bar */}
        <header className="md:hidden h-14 bg-background border-b flex items-center px-4">
          <button
            onClick={() => setOpen(true)}
            className="p-2 rounded hover:bg-muted"
          >
            <Menu size={22} />
          </button>
        </header>

        {/* ✅ Scrollable content ONLY */}
        <main className="flex-1 overflow-y-auto p-4 md:pt-4 pt-16">
          {children}
        </main>
      </div>
    </div>
  );
}
