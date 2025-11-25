// src/components/blog/blog-card-skeleton.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function BlogCardSkeleton() {
  return (
    <Card className="h-full overflow-hidden border-muted bg-background/60">
      <div className="aspect-video w-full">
        <Skeleton className="h-full w-full" />
      </div>
      <CardContent className="flex flex-col gap-3 p-3.5 md:p-4">
        <div className="flex items-center justify-between gap-2">
          <Skeleton className="h-4 w-14" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        <div className="mt-1 flex items-center gap-2">
          <Skeleton className="h-7 w-7 rounded-full" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-2 w-16" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}