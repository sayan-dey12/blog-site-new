// src/lib/readTime.ts
export function estimateReadTime(text?: string) {
  if (!text) return 1;
  // Count words: split on whitespace; ignore multiple spaces/newlines.
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const wordsPerMinute = 200; // sensible average
  const minutes = Math.max(1, Math.round(words / wordsPerMinute));
  return minutes;
}
