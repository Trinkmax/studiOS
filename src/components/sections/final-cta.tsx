"use client";

import { Section } from "@/components/ui/section";
import { CTAButton } from "@/components/ui/button";
import { AuroraBackground, GridBackground } from "@/components/ui/background";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { useWaitlist } from "@/components/waitlist/waitlist-provider";
import { useLocale } from "@/lib/i18n/locale-context";

export function FinalCtaSection() {
  const waitlist = useWaitlist();
  const { t } = useLocale();
  return (
    <Section id="demo" className="relative overflow-hidden py-24 sm:py-28">
      <AuroraBackground className="opacity-80" />
      <GridBackground />
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-mist-300">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-neon-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-neon-400" />
            </span>
            {t.finalCta.kicker}
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-6 font-display text-balance text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1] tracking-tight text-white">
            {t.finalCta.titleTop}
            <br />
            <span className="gradient-text-neon">{t.finalCta.titleBottom}</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-8 text-lg text-mist-300 max-w-2xl mx-auto">
            {t.finalCta.body}
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <CTAButton onClick={waitlist.open} size="lg" variant="primary">
              {t.finalCta.ctaPrimary}
            </CTAButton>
            <Link
              href="https://wa.me/5493510000000"
              target="_blank"
              className="group inline-flex h-14 items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-6 text-[15px] font-medium text-white transition-all duration-200 hover:border-white/20 hover:bg-white/[0.06]"
            >
              <MessageCircle className="h-4 w-4 text-neon-300" />
              {t.finalCta.ctaWhatsapp}
            </Link>
          </div>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-mist-400">
            <span>{t.finalCta.check1}</span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span>{t.finalCta.check2}</span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span>{t.finalCta.check3}</span>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
