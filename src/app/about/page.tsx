// app/about/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "About • Sayan’s Blog",
  description: "Learn more about Sayan and the purpose behind this blog.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 md:py-24">
      {/* HERO */}
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Building. Learning. Sharing.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground">
          This blog is a public notebook of ideas, systems, and real-world
          engineering experiences.
        </p>
      </section>

      {/* CONTENT GRID */}
      <section className="mt-20 grid gap-6 md:grid-cols-2">
        <Card className="rounded-2xl">
          <CardContent className="p-6 md:p-8 space-y-3">
            <h2 className="text-xl font-semibold">👋 Who I am</h2>
            <p className="text-muted-foreground leading-relaxed">
              I’m <strong>Sayan</strong>, a developer passionate about building
              scalable systems, understanding architecture, and experimenting
              with AI-driven tools.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-6 md:p-8 space-y-3">
            <h2 className="text-xl font-semibold">✍️ Why this blog</h2>
            <p className="text-muted-foreground leading-relaxed">
              I wanted a space where I could document what I learn while
              building real products — not just theory, but practical insights.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-6 md:p-8 space-y-3">
            <h2 className="text-xl font-semibold">🧠 What you’ll find</h2>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>System design & backend engineering</li>
              <li>AI tools & experimentation</li>
              <li>Project breakdowns</li>
              <li>Lessons from failures & wins</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-6 md:p-8 space-y-3">
            <h2 className="text-xl font-semibold">🚀 Long-term goal</h2>
            <p className="text-muted-foreground leading-relaxed">
              To build in public, think deeply, and help others grow by sharing
              authentic experiences from the journey.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* CTA */}
      <section className="mt-24 text-center">
        <h3 className="text-2xl md:text-3xl font-semibold">
          Want to explore or connect?
        </h3>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/blogs">Read the blogs</Link>
          </Button>

          <Button asChild size="lg" variant="outline">
            <Link href="/connect">Connect with me</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
