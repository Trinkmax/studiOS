"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Tone = "neon" | "violet" | "amber";

export function Cinematic({
  id,
  src,
  alt,
  kicker,
  title,
  body,
  chips,
  align = "left",
  eyebrowTone = "neon",
  priority = false,
}: {
  id?: string;
  src: string;
  alt: string;
  kicker: string;
  title: ReactNode;
  body: ReactNode;
  chips?: string[];
  align?: "left" | "right";
  eyebrowTone?: Tone;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);

  const tones: Record<Tone, string> = {
    neon: "text-neon-300 border-neon-400/30 bg-neon-400/10",
    violet: "text-violet-400 border-violet-500/30 bg-violet-500/10",
    amber: "text-amber-400 border-amber-500/30 bg-amber-500/10",
  };

  return (
    <section
      id={id}
      ref={ref}
      className="relative w-full overflow-hidden px-5 sm:px-8 lg:px-12 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div
          className={cn(
            "grid grid-cols-1 gap-8 md:gap-12 lg:grid-cols-[1.15fr_0.85fr] items-center",
            align === "right" && "lg:grid-cols-[0.85fr_1.15fr]"
          )}
        >
          {/* Photo (always order-1 on mobile; direction flips on lg) */}
          <motion.div
            className={cn(
              "relative order-1",
              align === "right" && "lg:order-2"
            )}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/10 aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] shadow-panel">
              <motion.div style={{ y, scale }} className="absolute inset-0">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  priority={priority}
                  sizes="(min-width: 1024px) 640px, 100vw"
                  className="object-cover"
                />
              </motion.div>
              {/* soft gradient bottom */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.55) 100%)",
                }}
              />
              {/* chip overlay top-left */}
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className={cn(
                  "absolute left-4 top-4 rounded-full border px-3 py-1 text-[11px] font-medium tracking-[0.12em] uppercase backdrop-blur",
                  tones[eyebrowTone]
                )}
              >
                <span className="relative mr-2 inline-flex h-1.5 w-1.5 align-middle">
                  <span className="absolute inset-0 animate-ping rounded-full bg-current opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
                </span>
                {kicker}
              </motion.span>
            </div>

            {/* soft aura */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-8 -z-10"
              style={{
                background:
                  "radial-gradient(50% 40% at 50% 60%, rgba(36,224,140,0.22), transparent 70%)",
              }}
            />
          </motion.div>

          {/* Copy */}
          <div className={cn(align === "right" && "lg:order-1")}>
            <Reveal>
              <h2 className="font-display text-balance text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.02] tracking-tight text-white">
                {title}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-mist-300">
                {body}
              </div>
            </Reveal>
            {chips && chips.length > 0 && (
              <Reveal delay={0.2}>
                <div className="mt-8 flex flex-wrap gap-2">
                  {chips.map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-mist-200"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
