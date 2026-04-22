"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Marquee({
  children,
  className,
  speed = 40,
  pauseOnHover = true,
  reverse = false,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
  pauseOnHover?: boolean;
  reverse?: boolean;
}) {
  return (
    <div
      className={cn(
        "group relative flex w-full overflow-hidden mask-fade-r",
        className
      )}
      style={
        {
          "--gap": "2rem",
          "--duration": `${speed}s`,
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          "flex shrink-0 items-center gap-[var(--gap)] pr-[var(--gap)]",
          "animate-ticker",
          reverse && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        style={{ animationDuration: "var(--duration)" }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
