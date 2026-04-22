"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Award, Clock, Wifi } from "lucide-react";

export function HeroTerminalMock() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.playsInline = true;
    const tryPlay = () => v.play().catch(() => {});
    tryPlay();
    const i = setInterval(tryPlay, 2000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(
        d.toLocaleTimeString("es-AR", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    };
    tick();
    const i = setInterval(tick, 30 * 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="relative">
      {/* soft backdrop glow */}
      <motion.div
        aria-hidden="true"
        className="absolute -inset-20 -z-10 rounded-[4rem]"
        style={{
          background:
            "radial-gradient(50% 45% at 50% 45%, rgba(36,224,140,0.25), transparent 70%)",
        }}
        animate={{ opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* tablet frame */}
      <motion.div
        initial={{ rotate: -1 }}
        animate={{ rotate: [0.5, -0.5, 0.5] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="relative aspect-[3/4] w-full overflow-hidden rounded-[2.25rem] border border-white/10 bg-ink-900 shadow-panel"
      >
        {/* bezel */}
        <div className="absolute inset-x-0 top-0 z-20 flex h-9 items-center justify-between px-5 text-[11px] font-medium text-white/80">
          <span className="tabular-nums">{time}</span>
          <span className="text-[10px] tracking-[0.25em] text-white/50">
            TERMINAL · CHECK-IN
          </span>
          <span className="inline-flex items-center gap-1">
            <Wifi className="h-3 w-3" />
            <span className="ml-1 inline-block h-2 w-4 rounded-sm border border-white/60">
              <span className="block h-full w-2/3 bg-white/80" />
            </span>
          </span>
        </div>

        {/* video */}
        <div className="absolute inset-0 top-9">
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/media/check-in.jpeg"
          >
            <source src="/media/terminal-check-in.mov" type="video/mp4" />
          </video>
          {/* subtle top vignette only */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-24 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, transparent 100%)",
            }}
          />
        </div>
      </motion.div>

      {/* floating context cards */}
      <FloatingCard className="absolute -right-3 top-16 hidden lg:flex" delay={0.6}>
        <div className="flex items-center gap-2.5 text-sm">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-amber-500/15 text-amber-500">
            <Award className="h-4 w-4" />
          </span>
          <div className="leading-tight">
            <div className="font-medium text-white">Recurrente · VIP</div>
            <div className="text-mist-400 text-[12px]">reconocido · 1.8 s</div>
          </div>
        </div>
      </FloatingCard>

      <FloatingCard
        className="absolute -left-5 bottom-24 hidden lg:flex"
        delay={1.1}
      >
        <div className="flex items-center gap-2.5 text-sm">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-neon-400/15 text-neon-300">
            <Clock className="h-4 w-4" />
          </span>
          <div className="leading-tight">
            <div className="font-medium text-white">En fila · #2</div>
            <div className="text-mist-400 text-[12px]">~ 6 min de espera</div>
          </div>
        </div>
      </FloatingCard>
    </div>
  );
}

function FloatingCard({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 5 + delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="glass-strong rounded-2xl px-3.5 py-2.5 shadow-panel"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
