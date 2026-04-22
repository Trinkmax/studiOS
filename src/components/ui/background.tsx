"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function AuroraBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <motion.div
        className="absolute -left-1/3 top-[-30%] h-[70vh] w-[70vh] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(36,224,140,0.28) 0%, rgba(36,224,140,0) 60%)",
        }}
        animate={{
          x: [0, 60, -40, 0],
          y: [0, 30, -20, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-20%] top-[10%] h-[60vh] w-[60vh] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.18) 0%, rgba(139,92,246,0) 60%)",
        }}
        animate={{
          x: [0, -40, 30, 0],
          y: [0, -20, 20, 0],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-30%] left-[10%] h-[60vh] w-[60vh] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(15,201,120,0.18) 0%, rgba(15,201,120,0) 60%)",
        }}
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -20, 30, 0],
        }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

export function GridBackground({
  className,
  fade = "b",
}: {
  className?: string;
  fade?: "b" | "none";
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 bg-grid-dim [background-size:44px_44px]",
        fade === "b" && "mask-fade-b",
        className
      )}
    />
  );
}

export function DotGridBackground({
  className,
  fade = "b",
}: {
  className?: string;
  fade?: "b" | "none";
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 bg-dotgrid",
        fade === "b" && "mask-fade-b",
        className
      )}
    />
  );
}

export function NoiseOverlay({ opacity = 0.04 }: { opacity?: number }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] noise mix-blend-overlay"
      style={{ opacity }}
    />
  );
}
