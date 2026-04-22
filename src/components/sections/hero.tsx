"use client";

import { AuroraBackground, GridBackground } from "@/components/ui/background";
import { CTAButton } from "@/components/ui/button";
import { motion, useReducedMotion } from "framer-motion";
import { Play, Sparkles } from "lucide-react";
import Link from "next/link";
import { HeroTerminalMock } from "./hero-terminal-mock";
import { useWaitlist } from "@/components/waitlist/waitlist-provider";
import { useLocale } from "@/lib/i18n/locale-context";

export function Hero() {
  const reduced = useReducedMotion();
  const waitlist = useWaitlist();
  const { t, locale } = useLocale();

  return (
    <section
      id="top"
      className="relative isolate min-h-[100vh] overflow-hidden pt-28 pb-12 sm:pt-32 lg:pt-36"
    >
      <AuroraBackground />
      <GridBackground />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-center">
          <div className="max-w-2xl">
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-2"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-neon-400/20 bg-neon-400/10 px-3 py-1 text-xs font-medium text-neon-300">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-neon-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-neon-400" />
                </span>
                {locale === "en"
                  ? "Live at Monaco Barber · Córdoba"
                  : "En vivo en Monaco Barber · Córdoba"}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-mist-300">
                <Sparkles className="h-3 w-3 text-neon-300" />
                {t.hero.kicker}
              </span>
            </motion.div>

            <motion.h1
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 font-display text-balance text-[clamp(2.6rem,7vw,5.25rem)] font-semibold leading-[0.98] tracking-tight text-white"
            >
              {t.hero.titleTop}
              <br />
              <span className="gradient-text-neon">{t.hero.titleBottom}</span>
            </motion.h1>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-mist-300 sm:text-xl"
            >
              {t.hero.body}
            </motion.p>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <CTAButton onClick={waitlist.open} size="lg" variant="primary">
                {t.hero.ctaPrimary}
              </CTAButton>
              <Link
                href="https://youtu.be/VTb9aPFzyZw"
                target="_blank"
                className="group inline-flex h-14 items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 text-[15px] font-medium text-white transition-all duration-200 hover:border-white/20 hover:bg-white/[0.06]"
              >
                <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white text-ink-950">
                  <Play className="h-3.5 w-3.5 translate-x-[1px]" fill="currentColor" />
                </span>
                {t.hero.ctaVideo}
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto w-full max-w-lg lg:max-w-none"
          >
            <HeroTerminalMock />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
