// src/components/layout/site-footer.tsx
import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t bg-background/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between md:px-6">
        <div className="space-y-1">
          <p className="font-medium text-foreground">
            Sayan&apos;s Blog Platform
          </p>
          <p>
            Built with Next.js, TypeScript, shadcn/ui, Framer Motion & Prisma.
          </p>
          <p className="text-[11px]">
            © {new Date().getFullYear()} Sayan Dey. All rights reserved.
          </p>
        </div>

        <div className="flex flex-col items-start gap-3 md:items-end">
          <div className="flex items-center gap-3">
            <Link
              href="mailto:example@example.com"
              className="inline-flex items-center gap-1 hover:text-foreground"
            >
              <Mail className="h-4 w-4" />
              <span>Reach out</span>
            </Link>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Link
              href="https://github.com/"
              className="inline-flex items-center gap-1 hover:text-foreground"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </Link>
            <Link
              href="https://linkedin.com/"
              className="inline-flex items-center gap-1 hover:text-foreground"
            >
              <Linkedin className="h-4 w-4" />
              <span>LinkedIn</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}