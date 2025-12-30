"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const HERO_MESSAGES = [
  {
    title: "Write. Share. Inspire.",
    subtitle: "Publish your ideas and reach curious minds across the world.",
  },
  {
    title: "Your Knowledge Matters",
    subtitle: "Tech, systems, AI, and real-world engineering insights.",
  },
  {
    title: "Build Your Writing Habit",
    subtitle: "Turn thoughts into impact, one blog at a time.",
  },
];

export function HeroSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % HERO_MESSAGES.length);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  const message = HERO_MESSAGES[active];

  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/hero-bg.jpg"
          alt="Writing and creativity"
          fill
          priority
          className="object-cover"
        />

        {/* ✅ FIXED gradient overlay */}
        <div
          className="
            absolute inset-0
            bg-linear-to-b
            from-background/90
            via-background/70
            to-background
          "
        />
      </div>

      {/* ✅ Content ABOVE background */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 md:py-28">
        <div className="flex flex-col items-center text-center gap-6">

          <h1
            key={message.title}
            className="
              text-3xl sm:text-4xl md:text-6xl
              font-bold tracking-tight
              max-w-4xl text-white
            "
          >
            {message.title}
          </h1>

          <p
            key={message.subtitle}
            className="
              text-base sm:text-lg md:text-xl
              text-muted-foreground
              max-w-2xl
            "
          >
            {message.subtitle}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <Link href="/blog/submit">Write a blog</Link>
            </Button>

            <Button size="lg" variant="outline" asChild>
              <Link href="#trending">Explore blogs</Link>
            </Button>
          </div>

          {/* Indicators */}
          <div className="mt-6 flex gap-2">
            {HERO_MESSAGES.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 w-6 rounded-full transition-all ${
                  i === active ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
