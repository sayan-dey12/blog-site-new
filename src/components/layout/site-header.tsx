"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { useAuth } from "@/context/AuthContext";
import { SearchBar } from "@/components/search/search-bar";
import { toast } from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blogs", label: "Blogs" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const { loggedIn, setLoggedIn } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  // ✅ login redirect preserving current page
  const loginHref = `/login?callbackUrl=${encodeURIComponent(pathname)}`;

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "GET" });
      setLoggedIn(false);
      toast.success("✅ Logged out successfully");

      // refresh + go home
      router.replace("/");
      router.refresh();
    } catch {
      toast.error("❌ Logout failed");
    }
  };

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: 0, opacity: 1 }}
        className={`sticky top-0 z-40 border-b bg-background/80 backdrop-blur ${
          isScrolled ? "shadow-sm" : ""
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 lg:px-10">

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-lg font-bold text-primary-foreground shadow">
              S
            </span>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold md:text-base">
                Sayan&apos;s Blog
              </span>
              <span className="text-[10px] text-muted-foreground md:text-xs">
                Code • Systems • AI
              </span>
            </div>
          </Link>

          {/* DESKTOP */}
          <div className="hidden lg:flex items-center gap-6 flex-1 justify-end ml-auto">
            <div className="flex-1 max-w-3xl">
              <SearchBar />
            </div>

            <nav className="flex items-center gap-4 text-sm">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full px-3 py-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <ThemeToggle />

            {!loggedIn ? (
              <Button asChild size="sm" variant="outline" className="rounded-full">
                <Link href={loginHref}>Login</Link>
              </Button>
            ) : (
              <Button
                size="sm"
                variant="destructive"
                className="rounded-full"
                onClick={handleLogout}
              >
                Logout
              </Button>
            )}

            <Button asChild size="sm" className="rounded-full">
              <Link
                href={
                  loggedIn
                    ? "/blog/submit"
                    : "/login?callbackUrl=/blog/submit"
                }
              >
                Write
              </Link>
            </Button>
          </div>

          {/* TABLET */}
          <div className="hidden md:flex lg:hidden items-center gap-3 flex-1 justify-end ml-auto">
            <Button
              size="icon"
              variant="outline"
              className="rounded-full"
              onClick={() => setShowSearch((p) => !p)}
            >
              <Search className="h-5 w-5" />
            </Button>

            <ThemeToggle />

            {!loggedIn ? (
              <Button asChild size="sm" variant="outline" className="rounded-full">
                <Link href={loginHref}>Login</Link>
              </Button>
            ) : (
              <Button
                size="sm"
                variant="destructive"
                className="rounded-full"
                onClick={handleLogout}
              >
                Logout
              </Button>
            )}

            <Button asChild size="sm" className="rounded-full">
              <Link
                href={
                  loggedIn
                    ? "/blog/submit"
                    : "/login?callbackUrl=/blog/submit"
                }
              >
                Write
              </Link>
            </Button>
          </div>

          {/* MOBILE */}
          <div className="flex md:hidden items-center gap-2 ml-auto">
            <Button
              size="icon"
              variant="outline"
              className="rounded-full"
              onClick={() => setShowSearch((p) => !p)}
            >
              <Search className="h-5 w-5" />
            </Button>

            <ThemeToggle />

            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="rounded-full">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent side="top" className="flex flex-col gap-4 pb-6">
                <SheetHeader>
                  <SheetTitle className="text-left text-sm font-semibold">
                    Menu
                  </SheetTitle>
                </SheetHeader>

                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        className="rounded-lg px-2 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>

                <div className="flex items-center gap-2 mt-2">
                  {!loggedIn ? (
                    <Button asChild size="sm" variant="outline" className="rounded-full">
                      <Link href={loginHref}>Login</Link>
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="destructive"
                      className="rounded-full"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  )}

                  <Button asChild size="sm" className="rounded-full">
                    <Link
                      href={
                        loggedIn
                          ? "/blog/submit"
                          : "/login?callbackUrl=/blog/submit"
                      }
                    >
                      Write
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.header>

      {/* MOBILE SEARCH BAR */}
      {showSearch && (
        <div className="block lg:hidden w-full border-b bg-background px-4 py-3">
          <div className="mx-auto max-w-3xl">
            <SearchBar />
          </div>
        </div>
      )}
    </>
  );
}
