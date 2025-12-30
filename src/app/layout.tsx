// app/layout.tsx
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";
import { LayoutShell } from "@/components/layout/LayoutShell";

export const metadata = {
  title: "Sayan Blog",
  description: "Premium blog platform built with Next.js",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased flex flex-col">
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <LayoutShell>
              <main className="flex-1 pt-2">{children}</main>
            </LayoutShell>

            <Toaster position="top-center" />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
