"use client";

import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { NoiseOverlay } from "@/components/ui/background";
import { CTAButton } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { MobileFloatingCta } from "@/components/mobile-floating-cta";
import { useWaitlist } from "@/components/waitlist/waitlist-provider";

type Related = { href: string; label: string };

export function ProductShell({
  kicker,
  title,
  description,
  related,
  children,
}: {
  kicker: string;
  title: ReactNode;
  description: ReactNode;
  related?: Related[];
  children: ReactNode;
}) {
  return (
    <>
      <NoiseOverlay opacity={0.035} />
      <Nav />
      <main className="relative pt-24 sm:pt-28">
        <Hero kicker={kicker} title={title} description={description} />
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
          {children}
        </div>
        {related && related.length > 0 && (
          <RelatedModules items={related} />
        )}
        <FinalCta />
      </main>
      <Footer />
      <MobileFloatingCta />
    </>
  );
}

function Hero({
  kicker,
  title,
  description,
}: {
  kicker: string;
  title: ReactNode;
  description: ReactNode;
}) {
  return (
    <section className="relative px-5 sm:px-8 lg:px-12 pb-12 sm:pb-16 lg:pb-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[400px] opacity-60"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 0%, rgba(36,224,140,0.14), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-5xl">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-mist-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-3 w-3" />
          Volver al inicio
        </Link>
        <Reveal>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium uppercase tracking-[0.12em] text-mist-300">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-neon-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-neon-400" />
            </span>
            {kicker}
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-5 font-display text-balance text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.02] tracking-tight text-white">
            {title}
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-mist-300">
            {description}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function RelatedModules({ items }: { items: Related[] }) {
  return (
    <section className="relative px-5 sm:px-8 lg:px-12 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-7xl">
        <Reveal>
          <div className="flex items-end justify-between">
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-white">
              Seguir explorando
            </h2>
            <Link
              href="/"
              className="text-sm text-mist-300 underline-offset-4 hover:text-white hover:underline"
            >
              Ver todos
            </Link>
          </div>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((r, i) => (
            <Reveal key={r.href} delay={i * 0.05}>
              <Link
                href={r.href}
                className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-ink-850/50 p-5 transition-all hover:border-white/20 hover:bg-ink-850/80 hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[15px] font-semibold text-white">
                    {r.label}
                  </span>
                  <ArrowRight className="h-4 w-4 text-mist-400 transition-all group-hover:text-neon-300 group-hover:translate-x-0.5" />
                </div>
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(36,224,140,0.4), transparent)",
                  }}
                />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  const waitlist = useWaitlist();
  return (
    <section className="relative px-5 sm:px-8 lg:px-12 pt-8 pb-24 sm:pb-28">
      <div className="relative mx-auto max-w-3xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-white"
        >
          ¿Querés ver esto funcionando en tu barbería?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-3 text-mist-400"
        >
          15 minutos · te mostramos todo el módulo en vivo.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-7 flex flex-wrap justify-center gap-3"
        >
          <CTAButton onClick={waitlist.open} variant="primary" size="lg">
            Agendar demo
          </CTAButton>
          <Link
            href="/"
            className="inline-flex h-14 items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 text-[15px] font-medium text-white transition-all hover:border-white/20 hover:bg-white/[0.06]"
          >
            Volver al inicio
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export function ProductSection({
  kicker,
  title,
  lead,
  children,
  className,
}: {
  kicker?: string;
  title: ReactNode;
  lead?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("py-16 sm:py-20", className)}>
      <Reveal>
        <div className="max-w-3xl">
          {kicker && (
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium uppercase tracking-[0.12em] text-mist-300">
              {kicker}
            </div>
          )}
          <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.04] tracking-tight text-white">
            {title}
          </h2>
          {lead && (
            <p className="mt-4 text-lg leading-relaxed text-mist-300">{lead}</p>
          )}
        </div>
      </Reveal>
      <div className="mt-8 sm:mt-12">{children}</div>
    </section>
  );
}
