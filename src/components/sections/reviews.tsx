"use client";

import { Section, SectionKicker, SectionLead, SectionTitle } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Star, TrendingUp, MapPin } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function ReviewsSection() {
  return (
    <Section id="resenas" className="relative py-20 sm:py-24">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[500px] opacity-60"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 0%, rgba(36,224,140,0.15), transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div className="relative grid grid-cols-1 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-10 lg:gap-16 items-center">
        <div>
          <Reveal>
            <SectionKicker icon={<Star className="h-3 w-3" />}>
              Automatización de reseñas
            </SectionKicker>
          </Reveal>
          <Reveal delay={0.05}>
            <SectionTitle className="mt-5">
              Pasá de 40 a{" "}
              <span className="gradient-text-neon">600 reseñas</span> en Google.
            </SectionTitle>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionLead className="mt-5">
              Las buenas van a Maps. Las quejas quedan adentro — en tu CRM privado,
              antes de que escalen.
            </SectionLead>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-8 space-y-2.5">
              <Step step="1" title="Cierre de servicio" desc="El barbero marca el corte como finalizado." />
              <Connector />
              <Step step="2" title="WhatsApp automático" desc="“¿Cómo estuvo tu experiencia?”" tone="neon" />
              <Connector />
              <div className="grid grid-cols-2 gap-2">
                <Step
                  step="3a"
                  title={<>⭐⭐⭐⭐⭐</>}
                  desc="→ Google Maps"
                  tone="success"
                  small
                />
                <Step
                  step="3b"
                  title="⭐ a ⭐⭐⭐"
                  desc="→ CRM privado"
                  tone="warning"
                  small
                />
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <ReviewsStat />
        </Reveal>
      </div>
    </Section>
  );
}

function ReviewsStat() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [value, setValue] = useState(40);

  useEffect(() => {
    if (!inView) return;
    const start = 40;
    const target = 600;
    const duration = 1700;
    const startTime = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(start + (target - start) * eased));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  return (
    <div ref={ref} className="relative overflow-hidden rounded-3xl border border-white/10 bg-ink-850/70 p-6 sm:p-8 shadow-panel">
      <div
        aria-hidden="true"
        className="absolute -top-20 -right-20 h-60 w-60 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(36,224,140,0.35), transparent 60%)" }}
      />
      <div className="relative flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-mist-400">
        <MapPin className="h-3 w-3 text-neon-300" />
        Monaco Barber · Google
      </div>
      <div className="relative mt-5 flex items-end gap-4">
        <span className="font-display text-[84px] sm:text-[96px] leading-none font-semibold text-white tabular-nums tracking-tight">
          {value}
        </span>
        <div className="pb-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-neon-400/30 bg-neon-400/10 px-2.5 py-1 text-[11px] font-semibold text-neon-300">
            <TrendingUp className="h-3 w-3" /> +1400%
          </span>
          <div className="mt-2 text-xs text-mist-400">en 4 meses</div>
        </div>
      </div>
      <div className="relative mt-6">
        <div className="flex h-24 items-end gap-1.5">
          {[10, 12, 14, 18, 22, 26, 30, 34, 40, 48, 58, 70, 82, 95, 110, 130].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: inView ? `${h}%` : 0 }}
              transition={{ duration: 0.9, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 rounded-t bg-gradient-to-t from-neon-600/70 to-neon-300"
            />
          ))}
        </div>
      </div>
      <div className="relative mt-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-3">
        <div className="flex items-center gap-0.5 text-amber-500">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} className="h-3.5 w-3.5" fill="currentColor" />
          ))}
        </div>
        <span className="text-xs text-mist-400">4.96 promedio · 600+ reseñas</span>
      </div>
    </div>
  );
}

function Connector() {
  return (
    <div className="flex justify-start">
      <svg width="22" height="18" viewBox="0 0 22 18" aria-hidden="true" className="ml-4">
        <path
          d="M11 1v12M6 9l5 5 5-5"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  );
}

function Step({
  step,
  title,
  desc,
  tone = "neutral",
  small,
}: {
  step: string;
  title: React.ReactNode;
  desc: string;
  tone?: "neutral" | "neon" | "success" | "warning";
  small?: boolean;
}) {
  const tones = {
    neutral: "border-white/10 bg-white/[0.02]",
    neon: "border-neon-400/30 bg-neon-400/5",
    success: "border-neon-400/30 bg-gradient-to-br from-neon-400/10 to-transparent",
    warning: "border-amber-500/30 bg-amber-500/5",
  };
  const stepTones = {
    neutral: "bg-white/5 text-mist-300 border-white/10",
    neon: "bg-neon-400/15 text-neon-300 border-neon-400/30",
    success: "bg-neon-400 text-ink-950 border-neon-400",
    warning: "bg-amber-500 text-ink-950 border-amber-500",
  };
  return (
    <div className={`rounded-2xl border ${tones[tone]} ${small ? "p-3.5" : "p-4"}`}>
      <div className="flex items-start gap-3">
        <span
          className={`grid h-6 w-6 shrink-0 place-items-center rounded-md border text-[11px] font-semibold ${stepTones[tone]}`}
        >
          {step}
        </span>
        <div>
          <div className={`${small ? "text-[13px]" : "text-sm"} font-semibold text-white`}>
            {title}
          </div>
          <div className={`mt-0.5 ${small ? "text-[11px]" : "text-xs"} text-mist-400`}>
            {desc}
          </div>
        </div>
      </div>
    </div>
  );
}
