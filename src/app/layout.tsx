// app/layout.tsx
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Sayan Blog",
  description: "Premium blog platform built with Next.js",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased flex flex-col">

        {/* ✅ Auth + Theme at top level */}
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* ✅ Global Header */}
            <SiteHeader />

            {/* ✅ Page Content */}
            <main className="flex-1 pt-2">{children}</main>

            {/* ✅ Footer */}
            <SiteFooter />

            {/* ✅ Global Toasts */}
            <Toaster position="top-center" />
          </ThemeProvider>
        </AuthProvider>

      </body>
    </html>
  );
}