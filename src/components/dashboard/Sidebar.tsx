"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  FileText,
  Home,
  X,
} from "lucide-react";

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay — MOBILE ONLY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static top-0 left-0 z-50
          h-screen w-64
          bg-background border-r
          flex flex-col
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* ─── Top (Title) ─── */}
        <div className="h-14 flex items-center justify-between px-4 border-b">
          <span className="font-semibold text-lg">Dashboard</span>

          {/* Close (mobile only) */}
          <button onClick={onClose} className="md:hidden">
            <X size={20} />
          </button>
        </div>

        {/* ─── Middle (Navigation) ─── */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          <SidebarItem
            href="/"
            label="Home"
            icon={<Home size={18} />}
            active={pathname === "/"}
            onClick={onClose}
          />

          <SidebarItem
            href="/dashboard"
            label="Overview"
            icon={<LayoutDashboard size={18} />}
            active={pathname === "/dashboard"}
            onClick={onClose}
          />

          <SidebarItem
            href="/dashboard/profile"
            label="Profile"
            icon={<User size={18} />}
            active={pathname.startsWith("/dashboard/profile")}
            onClick={onClose}
          />

          <SidebarItem
            href="/dashboard/blogs"
            label="Blogs"
            icon={<FileText size={18} />}
            active={pathname.startsWith("/dashboard/blogs")}
            onClick={onClose}
          />
        </nav>

        {/* ─── Bottom (Footer) ─── */}
        <div className="p-4 border-t text-xs text-muted-foreground">
          © {new Date().getFullYear()} Sayan Blog
        </div>
      </aside>
    </>
  );
}

function SidebarItem({
  href,
  label,
  icon,
  active,
  onClick,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium
        transition-colors
        ${
          active
            ? "bg-muted text-foreground"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        }
      `}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
