"use client";

import Link from "next/link";
import { Section, SectionKicker, SectionTitle } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { TiltCard } from "@/components/ui/magnetic";
import {
  ArrowUpRight,
  BadgeDollarSign,
  BarChart3,
  MessageSquare,
  ScanFace,
  Scissors,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Product = {
  href: string;
  icon: React.ElementType;
  title: string;
  kicker: string;
  desc: string;
  accent: "neon" | "violet" | "amber";
  preview: ReactNode;
};

const products: Product[] = [
  {
    href: "/check-in",
    icon: ScanFace,
    title: "Check-in Face ID",
    kicker: "Entrada",
    desc: "Reconoce al cliente en 2 segundos. Sin apps, sin fricción.",
    accent: "neon",
    preview: <CheckInPreview />,
  },
  {
    href: "/panel",
    icon: Scissors,
    title: "Panel del barbero",
    kicker: "Operación",
    desc: "Ficha completa del cliente + cola en vivo + cierre en 3 toques.",
    accent: "violet",
    preview: <PanelPreview />,
  },
  {
    href: "/crm",
    icon: MessageSquare,
    title: "CRM + Mensajería",
    kicker: "Relación",
    desc: "Inbox unificado WhatsApp + Instagram con IA y workflows.",
    accent: "neon",
    preview: <CrmPreview />,
  },
  {
    href: "/estadisticas",
    icon: BarChart3,
    title: "Estadísticas",
    kicker: "Control",
    desc: "Ingresos, cortes, retención y ocupación — en tiempo real.",
    accent: "neon",
    preview: <StatsPreview />,
  },
  {
    href: "/finanzas",
    icon: BadgeDollarSign,
    title: "Finanzas",
    kicker: "Plata",
    desc: "Comisiones, sueldos, punto de equilibrio — sin planilla.",
    accent: "amber",
    preview: <FinancePreview />,
  },
  {
    href: "/equipo",
    icon: Users,
    title: "Equipo",
    kicker: "Gente",
    desc: "Asistencia con Face ID, roles granulares, disciplina auto.",
    accent: "violet",
    preview: <TeamPreview />,
  },
];

export function ProductGridSection() {
  return (
    <Section id="productos" className="py-20 sm:py-24">
      <div className="max-w-3xl">
        <Reveal>
          <SectionKicker>Los módulos del sistema</SectionKicker>
        </Reveal>
        <Reveal delay={0.05}>
          <SectionTitle className="mt-5">
            Entrá a explorar{" "}
            <span className="gradient-text-neon">cada parte.</span>
          </SectionTitle>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 text-lg text-mist-300">
            Seis módulos conectados. Cada uno con su página dedicada — con demos
            interactivos, capturas del sistema real y todo lo que hace.
          </p>
        </Reveal>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {products.map((p, i) => (
          <Reveal key={p.href} delay={i * 0.06}>
            <ProductCard p={p} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function ProductCard({ p }: { p: Product }) {
  const Icon = p.icon;
  const tones = {
    neon: "text-neon-300 border-neon-400/20 bg-neon-400/10",
    violet: "text-violet-400 border-violet-500/20 bg-violet-500/10",
    amber: "text-amber-400 border-amber-500/20 bg-amber-500/10",
  }[p.accent];

  return (
    <TiltCard className="h-full">
      <Link
        href={p.href}
        className="group relative flex h-full min-h-[360px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-ink-850/40 p-5 transition-all duration-300 hover:border-white/25 hover:bg-ink-850/80"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(400px circle at 50% 0%, rgba(36,224,140,0.08), transparent 60%)",
          }}
        />
        {/* Preview */}
        <div className="relative flex-1 overflow-hidden rounded-2xl border border-white/5 bg-ink-900">
          {p.preview}
        </div>
        {/* Footer */}
        <div className="relative mt-4 flex items-center gap-3">
          <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl border ${tones}`}>
            <Icon className="h-4 w-4" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.15em] text-mist-500">
                {p.kicker}
              </span>
              <span className="h-0.5 w-0.5 rounded-full bg-mist-500" />
              <span className="text-[10px] uppercase tracking-[0.15em] text-mist-500">
                Ver más
              </span>
            </div>
            <div className="text-[15px] font-semibold text-white">{p.title}</div>
          </div>
          <ArrowUpRight className="h-4 w-4 text-mist-400 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neon-300" />
        </div>
        <p className="relative mt-3 text-[13px] leading-relaxed text-mist-400">
          {p.desc}
        </p>
      </Link>
    </TiltCard>
  );
}

/* ----------------- Mini live previews ----------------- */

function CheckInPreview() {
  return (
    <div className="relative h-full min-h-[180px] bg-gradient-to-br from-ink-900 to-ink-950">
      <div className="absolute inset-0 grid place-items-center p-5">
        <div className="relative aspect-square w-32 rounded-xl border border-white/10 bg-ink-900">
          <motion.div
            aria-hidden="true"
            className="absolute inset-x-2 h-[2px] rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(94,236,170,0.9), transparent)",
              boxShadow: "0 0 12px rgba(36,224,140,0.7)",
            }}
            initial={{ top: "10%" }}
            animate={{ top: ["10%", "90%", "10%"] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute inset-2 grid grid-cols-10 gap-0.5 opacity-40">
            {Array.from({ length: 60 }).map((_, i) => (
              <motion.span
                key={i}
                className="h-0.5 w-0.5 rounded-full bg-neon-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.8, 0] }}
                transition={{
                  duration: 2,
                  delay: (i % 15) * 0.05,
                  repeat: Infinity,
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <span className="absolute left-3 top-3 rounded-full border border-neon-400/30 bg-black/50 px-2 py-0.5 text-[10px] font-medium text-neon-300 backdrop-blur">
        ● Face ID
      </span>
    </div>
  );
}

function PanelPreview() {
  return (
    <div className="relative h-full min-h-[180px] p-4">
      <div className="flex items-center gap-2 text-[10px] text-mist-400">
        <span className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5">
          Mi fila · 1
        </span>
        <span className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5">
          Fila general · 4
        </span>
      </div>
      <div className="mt-3 space-y-1.5">
        {[
          { n: "Ignacio B.", s: "corte", t: "1m 20s", active: true },
          { n: "Horacio", s: "corte + barba", t: "3m" },
          { n: "Raúl", s: "corte", t: "5m" },
        ].map((r, i) => (
          <motion.div
            key={r.n}
            initial={{ x: -10, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className={`flex items-center gap-2 rounded-lg border px-2 py-1.5 text-[11px] ${
              r.active
                ? "border-neon-400/30 bg-neon-400/5"
                : "border-white/5 bg-white/[0.02]"
            }`}
          >
            <span
              className={`font-mono w-6 ${
                r.active ? "text-neon-300" : "text-mist-500"
              }`}
            >
              #{i + 2}
            </span>
            <span className="h-5 w-5 rounded-full bg-gradient-to-br from-neon-400 to-violet-500 text-[8px] grid place-items-center font-semibold text-ink-950">
              {r.n.split(" ").map((p) => p[0]).join("")}
            </span>
            <span className="flex-1 text-white truncate">{r.n}</span>
            <span className="text-mist-500">{r.t}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function CrmPreview() {
  return (
    <div className="relative h-full min-h-[180px] p-4">
      <div className="space-y-1.5">
        <div className="max-w-[70%] rounded-xl border border-white/10 bg-white/5 px-2.5 py-1.5 text-[11px] text-mist-200">
          precio de corte?
        </div>
        <div className="ml-auto max-w-[75%] rounded-xl border border-neon-400/30 bg-neon-600/15 px-2.5 py-1.5 text-[11px] text-mist-100">
          Corte $16.000 · Barba $10.000
        </div>
        <div className="max-w-[70%] rounded-xl border border-white/10 bg-white/5 px-2.5 py-1.5 text-[11px] text-mist-200">
          horarios?
        </div>
      </div>
      <div className="absolute inset-x-3 bottom-3 flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
        <span className="text-[10px] text-neon-300">IA</span>
        <span className="text-[10px] text-mist-400 truncate">Sugerencia...</span>
      </div>
    </div>
  );
}

function StatsPreview() {
  const bars = [30, 45, 40, 55, 70, 60, 78, 90, 82];
  return (
    <div className="relative h-full min-h-[180px] p-4">
      <div className="grid grid-cols-2 gap-1.5">
        {[
          ["Ingresos", "$27.1M"],
          ["Cortes", "1.774"],
        ].map(([l, v]) => (
          <div key={l} className="rounded-md border border-white/5 bg-white/[0.02] px-2 py-1.5">
            <div className="text-[9px] uppercase text-mist-500">{l}</div>
            <div className="text-[13px] font-semibold text-white tabular-nums">{v}</div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex h-20 items-end gap-1">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className={`flex-1 rounded-t ${
              i === bars.length - 1
                ? "bg-gradient-to-t from-neon-600 to-neon-300"
                : "bg-white/15"
            }`}
            initial={{ height: 0 }}
            whileInView={{ height: `${h}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.05 }}
          />
        ))}
      </div>
    </div>
  );
}

function FinancePreview() {
  return (
    <div className="relative h-full min-h-[180px] p-4">
      <div className="space-y-1.5 text-[11px]">
        {[
          ["Tony", "$186k", "neon"],
          ["Nico", "$152k", "violet"],
          ["Chipi", "$128k", "amber"],
          ["Simón", "$98k", "default"],
        ].map(([n, v, c]) => (
          <div key={n as string} className="flex items-center gap-2">
            <span className="w-10 text-mist-300">{n}</span>
            <div className="relative h-3 flex-1 overflow-hidden rounded-full bg-white/5">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{
                  width: `${{ Tony: 90, Nico: 75, Chipi: 62, Simón: 48 }[n as string]}%`,
                }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.1 }}
                className={`h-full ${
                  c === "neon"
                    ? "bg-gradient-to-r from-neon-400 to-neon-600"
                    : c === "violet"
                    ? "bg-gradient-to-r from-violet-400 to-violet-600"
                    : c === "amber"
                    ? "bg-gradient-to-r from-amber-400 to-amber-600"
                    : "bg-white/30"
                }`}
              />
            </div>
            <span className="w-12 text-right tabular-nums text-white">{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TeamPreview() {
  const data = [
    { n: "Tony", s: "Presente" },
    { n: "Nico", s: "Presente" },
    { n: "Chipi", s: "Tarde", tone: "amber" },
    { n: "Simón", s: "Ausente", tone: "red" },
  ];
  return (
    <div className="relative h-full min-h-[180px] p-4">
      <div className="space-y-1.5">
        {data.map((r, i) => (
          <motion.div
            key={r.n}
            initial={{ x: -8, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.02] px-2.5 py-1.5 text-[11px]"
          >
            <span className="h-5 w-5 rounded-full bg-gradient-to-br from-neon-400 to-violet-500 text-[9px] grid place-items-center font-semibold text-ink-950">
              {r.n[0]}
            </span>
            <span className="flex-1 text-white">{r.n}</span>
            <span
              className={`rounded-full border px-1.5 py-0.5 text-[9px] ${
                r.tone === "amber"
                  ? "border-amber-500/30 bg-amber-500/10 text-amber-400"
                  : r.tone === "red"
                  ? "border-red-500/30 bg-red-500/10 text-red-400"
                  : "border-neon-400/30 bg-neon-400/10 text-neon-300"
              }`}
            >
              {r.s}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
