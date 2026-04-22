"use client";

import { Section } from "@/components/ui/section";
import { AuroraBackground } from "@/components/ui/background";
import { Reveal } from "@/components/ui/reveal";

export function TonyVideoSection() {
  return (
    <Section
      id="video-tony"
      className="relative overflow-hidden py-20 sm:py-24"
    >
      <AuroraBackground className="opacity-40" />
      <div className="relative z-10 mx-auto max-w-5xl">
        <Reveal>
          <div className="mb-10 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-mist-300">
              ● La historia de Tony
            </span>
            <h2 className="mt-6 font-display text-balance text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight text-white">
              Así lo contó{" "}
              <span className="gradient-text-neon">un barbero real.</span>
            </h2>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-white/10 bg-ink-900 shadow-panel">
            <iframe
              src="https://www.youtube-nocookie.com/embed/VTb9aPFzyZw?rel=0&modestbranding=1"
              title="Video de Tony — studiOS"
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
