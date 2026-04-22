"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionValue, animate, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type CarouselProps = {
  slides: ReactNode[];
  autoPlayMs?: number;
  className?: string;
  slideClassName?: string;
  aspect?: string;
  showDots?: boolean;
  showArrows?: boolean;
  peek?: boolean;
};

export function Carousel({
  slides,
  autoPlayMs = 4200,
  className,
  slideClassName,
  aspect,
  showDots = true,
  showArrows = true,
  peek = false,
}: CarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;

  const go = useCallback(
    (n: number) => {
      setIndex(((n % count) + count) % count);
    },
    [count]
  );

  useEffect(() => {
    if (paused) return;
    const i = setInterval(() => setIndex((p) => (p + 1) % count), autoPlayMs);
    return () => clearInterval(i);
  }, [paused, autoPlayMs, count]);

  const drag = useMotionValue(0);
  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div className={cn("relative overflow-hidden", peek && "mx-auto")}>
        <motion.div
          className="flex"
          animate={{ x: `-${index * 100}%` }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          style={{ x: drag }}
          onDragEnd={(_, info) => {
            const v = info.velocity.x;
            const o = info.offset.x;
            if (o < -80 || v < -400) go(index + 1);
            else if (o > 80 || v > 400) go(index - 1);
          }}
        >
          {slides.map((s, i) => (
            <div
              key={i}
              className={cn(
                "w-full shrink-0 px-1 sm:px-2",
                slideClassName,
                aspect
              )}
              aria-hidden={i !== index}
            >
              {s}
            </div>
          ))}
        </motion.div>
      </div>

      {showArrows && (
        <div className="pointer-events-none absolute inset-0 hidden sm:flex items-center justify-between px-1">
          <button
            type="button"
            aria-label="Anterior"
            onClick={() => go(index - 1)}
            className="pointer-events-auto grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-black/50 text-white backdrop-blur transition-all hover:bg-black/80 hover:-translate-x-0.5"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Siguiente"
            onClick={() => go(index + 1)}
            className="pointer-events-auto grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-black/50 text-white backdrop-blur transition-all hover:bg-black/80 hover:translate-x-0.5"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {showDots && (
        <div className="mt-6 flex items-center justify-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Ir a ${i + 1}`}
              onClick={() => go(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                i === index ? "w-8 bg-neon-400" : "w-1.5 bg-white/20"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/** Continuous horizontal scroller (no snap) */
export function Scroller({
  children,
  className,
  speed = 32,
  reverse = false,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
  reverse?: boolean;
}) {
  return (
    <div
      className={cn(
        "group relative flex w-full overflow-hidden mask-fade-r",
        className
      )}
      style={
        { "--gap": "1rem", "--duration": `${speed}s` } as React.CSSProperties
      }
    >
      <div
        className={cn(
          "flex shrink-0 items-stretch gap-[var(--gap)] pr-[var(--gap)] animate-ticker group-hover:[animation-play-state:paused]",
          reverse && "[animation-direction:reverse]"
        )}
        style={{ animationDuration: "var(--duration)" }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
