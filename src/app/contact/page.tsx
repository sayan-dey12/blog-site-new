// app/connect/page.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Connect • Sayan’s Blog",
  description: "Get in touch with Sayan.",
};

export default function ConnectPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 md:py-24">
      {/* HEADER */}
      <section className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Let’s Connect
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground">
          Questions, ideas, feedback — I’d love to hear from you.
        </p>
      </section>

      {/* FORM */}
      <section className="mt-16 max-w-2xl mx-auto">
        <Card className="rounded-2xl">
          <CardContent className="p-6 md:p-8 space-y-6">
            <div>
              <label className="text-sm font-medium mb-1 block">
                Your Email
              </label>
              <Input
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">
                Message
              </label>
              <Textarea
                rows={5}
                placeholder="Write your message..."
                required
              />
            </div>

            <Button size="lg" className="w-full">
              Send Message
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* EXTRA INFO */}
      <section className="mt-20 text-center max-w-xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">
          Other ways to reach me
        </h2>

        <p className="text-muted-foreground mb-6">
          You can also connect through email or social platforms.
        </p>

        <div className="flex flex-col gap-2 text-sm">
          <span>📧 youremail@example.com</span>
          <span>💼 LinkedIn</span>
          <span>🐙 GitHub</span>
          <span>🐦 Twitter / X</span>
        </div>
      </section>
    </main>
  );
}
