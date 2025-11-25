// src/components/shared/section-header.tsx
import { ReactNode } from "react";

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  actionSlot?: ReactNode;
};

export function SectionHeader({
  title,
  subtitle,
  actionSlot,
}: SectionHeaderProps) {
  return (
    <div className="mb-4 flex flex-col gap-2 md:mb-6 md:flex-row md:items-end md:justify-between">
      <div>
        <h2 className="text-lg font-semibold tracking-tight md:text-xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-xs text-muted-foreground md:text-sm">
            {subtitle}
          </p>
        )}
      </div>
      {actionSlot && <div>{actionSlot}</div>}
    </div>
  );
}