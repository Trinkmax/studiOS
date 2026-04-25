"use client";

import { AuroraBackground, GridBackground } from "@/components/ui/background";
import { CTAButton } from "@/components/ui/button";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { useWaitlist } from "@/components/waitlist/waitlist-provider";
import { useLocale } from "@/lib/i18n/locale-context";

export function HomeConversion() {
  const reduced = useReducedMotion();
  const waitlist = useWaitlist();
  const { t, locale } = useLocale();
  const tourHref = locale === "en" ? "/en/tour" : "/tour";

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-36"
    >
      <AuroraBackground />
      <GridBackground />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-2"
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
            {t.homeConversion.kicker}
          </span>
        </motion.div>

        <motion.h1
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-center font-display text-balance text-[clamp(2.2rem,6.2vw,4.5rem)] font-semibold leading-[1.02] tracking-tight text-white"
        >
          {t.homeConversion.titleTop}{" "}
          <span className="gradient-text-neon">
            {t.homeConversion.titleBottom}
          </span>
        </motion.h1>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-5 max-w-2xl text-center text-pretty text-base leading-relaxed text-mist-300 sm:text-lg"
        >
          {t.homeConversion.body}
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 22, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto mt-10 aspect-video w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-ink-900 shadow-panel"
        >
          <iframe
            src="https://www.youtube-nocookie.com/embed/VTb9aPFzyZw?rel=0&modestbranding=1"
            title="Video de Tony — studiOS"
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        </motion.div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col items-center gap-4"
        >
          <CTAButton onClick={waitlist.open} size="lg" variant="primary">
            {t.homeConversion.ctaPrimary}
          </CTAButton>
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs text-mist-400">
            <li>{t.homeConversion.perk1}</li>
            <li className="h-1 w-1 rounded-full bg-mist-600" aria-hidden />
            <li>{t.homeConversion.perk2}</li>
            <li className="h-1 w-1 rounded-full bg-mist-600" aria-hidden />
            <li>{t.homeConversion.perk3}</li>
          </ul>
          <Link
            href={tourHref}
            className="mt-2 text-sm text-mist-400 underline-offset-4 transition-colors hover:text-white hover:underline"
          >
            {t.homeConversion.tourLink}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
