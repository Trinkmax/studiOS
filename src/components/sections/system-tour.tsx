"use client";

import { Section, SectionKicker, SectionLead, SectionTitle } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Carousel } from "@/components/ui/carousel";
import { Layers, ScanFace, Users, Scissors, MessageSquare, BarChart3, Workflow, Wallet } from "lucide-react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function SystemTourSection() {
  return (
    <Section id="sistema" className="py-20 sm:py-24">
      <div className="flex flex-wrap items-end justify-between gap-6 max-w-5xl">
        <div>
          <Reveal>
            <SectionKicker icon={<Layers className="h-3 w-3" />}>
              Un recorrido
            </SectionKicker>
          </Reveal>
          <Reveal delay={0.05}>
            <SectionTitle className="mt-5">
              Todo el sistema,{" "}
              <span className="gradient-text-neon">en una pasada.</span>
            </SectionTitle>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <SectionLead className="max-w-md text-base sm:text-lg">
            Check-in, fila, panel del barbero, CRM, workflows, estadísticas y
            finanzas — un solo ecosistema. Deslizá.
          </SectionLead>
        </Reveal>
      </div>

      <div className="mt-12">
        <Carousel
          slides={[
            <Slide key="1" icon={<ScanFace className="h-3.5 w-3.5" />} title="Check-in Face ID" tone="neon">
              <CheckInMock />
            </Slide>,
            <Slide key="2" icon={<Users className="h-3.5 w-3.5" />} title="Fila en vivo" tone="neon">
              <QueueMock />
            </Slide>,
            <Slide key="3" icon={<Scissors className="h-3.5 w-3.5" />} title="Panel del barbero" tone="violet">
              <BarberMock />
            </Slide>,
            <Slide key="4" icon={<MessageSquare className="h-3.5 w-3.5" />} title="Mensajería + CRM" tone="neon">
              <InboxMock />
            </Slide>,
            <Slide key="5" icon={<Workflow className="h-3.5 w-3.5" />} title="Workflows visuales" tone="violet">
              <WorkflowMock />
            </Slide>,
            <Slide key="6" icon={<BarChart3 className="h-3.5 w-3.5" />} title="Estadísticas" tone="neon">
              <StatsMock />
            </Slide>,
            <Slide key="7" icon={<Wallet className="h-3.5 w-3.5" />} title="Finanzas" tone="amber">
              <FinanceMock />
            </Slide>,
          ]}
        />
      </div>
    </Section>
  );
}

function Slide({
  icon,
  title,
  tone,
  children,
}: {
  icon: ReactNode;
  title: string;
  tone: "neon" | "violet" | "amber";
  children: ReactNode;
}) {
  const tones = {
    neon: "text-neon-300 border-neon-400/30 bg-neon-400/10",
    violet: "text-violet-400 border-violet-500/30 bg-violet-500/10",
    amber: "text-amber-400 border-amber-500/30 bg-amber-500/10",
  } as const;
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-ink-850/60 shadow-panel">
      <div className="flex items-center justify-between border-b border-white/5 bg-black/30 px-5 py-3">
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.15em] ${tones[tone]}`}
          >
            {icon}
            <span>{title}</span>
          </span>
        </div>
        <div className="flex items-center gap-1 text-white/30">
          <span className="h-2 w-2 rounded-full bg-red-500/70" />
          <span className="h-2 w-2 rounded-full bg-amber-500/70" />
          <span className="h-2 w-2 rounded-full bg-neon-400/70" />
        </div>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

/* -------------------- Mocks -------------------- */

function CheckInMock() {
  return (
    <div className="relative grid grid-cols-1 gap-0 p-6 sm:p-8 min-h-[420px]">
      <div className="mx-auto w-full max-w-xs">
        <div className="text-center">
          <div className="text-[11px] uppercase tracking-[0.2em] text-mist-400">
            Check-in
          </div>
          <div className="mt-1 text-sm text-mist-500">Rondeau</div>
        </div>
        <div className="relative mt-5 aspect-square overflow-hidden rounded-3xl border border-white/10 bg-ink-900">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-4 grid grid-cols-12 gap-1 opacity-40"
          >
            {Array.from({ length: 120 }).map((_, i) => (
              <motion.span
                key={i}
                className="h-0.5 w-0.5 rounded-full bg-neon-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.8, 0] }}
                transition={{
                  duration: 2,
                  delay: (i % 20) * 0.05,
                  repeat: Infinity,
                }}
              />
            ))}
          </motion.div>
          <motion.div
            aria-hidden="true"
            className="absolute inset-x-4 h-[2px] rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(94,236,170,0.9), transparent)",
              boxShadow: "0 0 16px rgba(36,224,140,0.6)",
            }}
            initial={{ top: "10%" }}
            animate={{ top: ["10%", "90%", "10%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute inset-x-0 bottom-3 text-center">
            <span className="rounded-full border border-neon-400/30 bg-black/60 px-3 py-1 text-[10px] font-medium text-neon-300 backdrop-blur">
              buscando en el sistema...
            </span>
          </div>
        </div>
        <button className="mt-4 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white hover:bg-white/[0.06]">
          Soy nuevo
        </button>
      </div>
    </div>
  );
}

function QueueMock() {
  const rows = [
    { pos: "#2", name: "Antonio Ramírez", service: "corte", time: "3m 49s", active: true },
    { pos: "#4", name: "Jaimito", service: "corte", time: "2m 10s" },
    { pos: "#5", name: "Horacio", service: "corte + barba", time: "4m 05s" },
    { pos: "#6", name: "Raúl", service: "corte", time: "6m 40s" },
    { pos: "#7", name: "Gastón", service: "corte", time: "9m 12s", dim: true },
  ];
  return (
    <div className="p-5 sm:p-6 min-h-[420px]">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[13px] font-semibold text-white">Fila en vivo · Rondeau</div>
          <div className="text-[11px] text-mist-400">
            En atención · 3 · Esperando · 5
          </div>
        </div>
        <div className="flex items-center gap-1">
          <span className="rounded-md border border-neon-400/40 bg-neon-400/10 px-2 py-1 text-[10px] text-neon-300">
            Menor espera
          </span>
          <span className="rounded-md border border-white/10 bg-white/[0.02] px-2 py-1 text-[10px] text-mist-400">
            Elegir barbero
          </span>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        {rows.map((r, i) => (
          <motion.div
            key={r.pos}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 text-xs ${
              r.active
                ? "border-neon-400/30 bg-neon-400/5"
                : "border-white/5 bg-white/[0.02]"
            } ${r.dim ? "opacity-60" : ""}`}
          >
            <span
              className={`font-mono text-[11px] w-8 ${
                r.active ? "text-neon-300" : "text-mist-400"
              }`}
            >
              {r.pos}
            </span>
            <span className="h-7 w-7 rounded-full bg-gradient-to-br from-neon-400 to-violet-500 grid place-items-center text-[10px] font-semibold text-ink-950">
              {r.name.split(" ").map((p) => p[0]).join("").slice(0, 2)}
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-[13px] text-white truncate">{r.name}</div>
              <div className="text-[11px] text-mist-400">{r.service}</div>
            </div>
            <span className="text-[11px] tabular-nums text-mist-300">{r.time}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function BarberMock() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] min-h-[420px]">
      <div className="p-5 sm:p-6 md:border-r md:border-white/5">
        <div className="text-[11px] uppercase tracking-[0.15em] text-mist-400">
          Cliente actual
        </div>
        <div className="mt-3 flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-neon-400 to-neon-600 grid place-items-center text-ink-950 font-semibold">
            IB
          </div>
          <div>
            <div className="text-[15px] font-semibold text-white">Ignacio Baldovino</div>
            <div className="text-[11px] text-mist-400">+54 9 351 446-1129</div>
          </div>
        </div>
        <div className="mt-4 rounded-xl border border-white/5 bg-black/30 p-3 text-[11px]">
          <div className="text-mist-400">Último corte</div>
          <div className="mt-0.5 text-white">Fade mid · con Tony · hace 21 días</div>
        </div>
        <div className="mt-3 rounded-xl border border-violet-500/20 bg-violet-500/5 p-3 text-[11px] text-mist-200">
          <span className="text-violet-400">Nota CRM · </span>
          No le gusta la máquina 0 · barba al ras
        </div>
        <button className="mt-5 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-neon-300 to-neon-500 px-4 text-[13px] font-semibold text-ink-950">
          <Scissors className="h-3.5 w-3.5" /> Finalizar servicio
        </button>
      </div>
      <div className="p-5 sm:p-6">
        <div className="text-[11px] uppercase tracking-[0.15em] text-mist-400">
          Rendimiento · hoy
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          <BarStat label="Hoy" value="$186k" />
          <BarStat label="Cortes" value="14" />
          <BarStat label="Comisión" value="$74k" />
        </div>
        <div className="mt-5 space-y-1.5">
          <div className="text-[11px] uppercase tracking-[0.15em] text-mist-400">
            Próximos 3
          </div>
          {[
            ["Horacio", "corte + barba"],
            ["Raúl", "corte"],
            ["Gastón", "corte"],
          ].map(([n, s]) => (
            <div
              key={n}
              className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.02] px-2.5 py-1.5 text-[12px]"
            >
              <span className="text-white">{n}</span>
              <span className="ml-auto text-mist-400 text-[11px]">{s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BarStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/5 bg-white/[0.02] p-2">
      <div className="text-[9px] uppercase tracking-[0.15em] text-mist-400">
        {label}
      </div>
      <div className="mt-0.5 text-[13px] font-semibold text-white tabular-nums">
        {value}
      </div>
    </div>
  );
}

function InboxMock() {
  return (
    <div className="grid grid-cols-[150px_1fr] min-h-[420px]">
      <div className="border-r border-white/5">
        {[
          ["JM", "Joaquín M.", "14h"],
          ["BM", "Bautista M.", "9h"],
          ["MJ", "Juan M.", "10h"],
          ["FP", "Franco P.", "10h"],
          ["LR", "Lucas R.", "10h"],
        ].map(([i, n, t], idx) => (
          <div
            key={i}
            className={`flex items-center gap-2 border-b border-white/5 px-2.5 py-2.5 ${
              idx === 0 ? "bg-white/[0.03]" : ""
            }`}
          >
            <span className="h-6 w-6 rounded-full bg-gradient-to-br from-violet-500 to-neon-400 grid place-items-center text-[9px] font-semibold text-ink-950">
              {i}
            </span>
            <div className="min-w-0">
              <div className="truncate text-[11px] font-medium text-white">
                {n}
              </div>
              <div className="text-[9px] text-mist-500">{t}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-5 sm:p-6">
        <div className="text-[11px] text-mist-400">Joaquín Moyano · Instagram</div>
        <div className="mt-4 space-y-2">
          <div className="max-w-[80%] rounded-2xl border border-white/10 bg-white/5 px-3 py-1.5 text-[12px] text-mist-200">
            precio de corte?
          </div>
          <div className="ml-auto max-w-[80%] rounded-2xl border border-neon-400/30 bg-neon-600/20 px-3 py-1.5 text-[12px] text-mist-100">
            Corte $16.000 · Barba $10.000 · Combo $20.000
          </div>
          <div className="max-w-[80%] rounded-2xl border border-white/10 bg-white/5 px-3 py-1.5 text-[12px] text-mist-200">
            y horarios?
          </div>
        </div>
        <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-2.5 text-[11px] text-mist-400">
          <span className="text-neon-300 font-medium">sugerencia IA · </span>
          Lun–Sáb 10 a 21 hs
        </div>
      </div>
    </div>
  );
}

function WorkflowMock() {
  return (
    <div className="relative min-h-[420px] p-6 sm:p-8">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M 20 18 L 20 38 L 55 38 L 55 58 L 30 58 L 30 78"
          stroke="rgba(139,92,246,0.5)"
          strokeWidth="0.25"
          strokeDasharray="1 1"
          fill="none"
        />
      </svg>
      <div className="relative space-y-3">
        <WorkflowNode title="Disparador" sub="Sin visita · 45 días" tone="violet" />
        <div className="ml-5 h-5 w-px bg-white/15" />
        <WorkflowNode title="Condición" sub="Puntos > 200" tone="neon" />
        <div className="ml-5 h-5 w-px bg-white/15" />
        <WorkflowNode title="Acción" sub="WhatsApp · cupón 20%" tone="amber" />
        <div className="ml-5 h-5 w-px bg-white/15" />
        <WorkflowNode title="Meta" sub="Vuelve en 7 días" tone="neon" />
      </div>
    </div>
  );
}

function WorkflowNode({
  title,
  sub,
  tone,
}: {
  title: string;
  sub: string;
  tone: "violet" | "neon" | "amber";
}) {
  const tones = {
    violet: "border-violet-500/30 bg-violet-500/10 text-violet-300",
    neon: "border-neon-400/30 bg-neon-400/10 text-neon-300",
    amber: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className={`inline-flex flex-col rounded-xl border px-3 py-2 ${tones[tone]} max-w-xs`}
    >
      <span className="text-[10px] uppercase tracking-[0.15em] opacity-80">{title}</span>
      <span className="mt-0.5 text-[13px] font-medium text-white">{sub}</span>
    </motion.div>
  );
}

function StatsMock() {
  const bars = [40, 62, 55, 70, 82, 68, 78, 90, 74, 88, 96, 110, 104, 120];
  return (
    <div className="p-5 sm:p-6 min-h-[420px]">
      <div className="flex items-center gap-2">
        <span className="text-[11px] uppercase tracking-[0.15em] text-mist-400">
          Estadísticas · Abril
        </span>
        <span className="ml-auto rounded-md border border-neon-400/30 bg-neon-400/10 px-2 py-0.5 text-[10px] text-neon-300">
          Mes
        </span>
      </div>
      <div className="mt-4 grid grid-cols-4 gap-2">
        {[
          ["Ingresos", "$27.1M"],
          ["Cortes", "1.774"],
          ["Ticket", "$15.315"],
          ["Únicos", "1.637"],
        ].map(([l, v]) => (
          <div
            key={l}
            className="rounded-xl border border-white/5 bg-black/30 p-2.5"
          >
            <div className="text-[9px] uppercase tracking-[0.15em] text-mist-400">
              {l}
            </div>
            <div className="mt-0.5 text-[13px] font-semibold text-white tabular-nums">
              {v}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <div className="text-[10px] uppercase tracking-[0.15em] text-mist-400">
          Ingresos diarios
        </div>
        <div className="mt-3 flex h-28 items-end gap-1">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              className={`flex-1 rounded-t ${
                i === bars.length - 1
                  ? "bg-gradient-to-t from-neon-600 to-neon-300"
                  : "bg-gradient-to-t from-white/10 to-white/20"
              }`}
              initial={{ height: 0 }}
              whileInView={{ height: `${(h / 130) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.03 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function FinanceMock() {
  return (
    <div className="p-5 sm:p-6 min-h-[420px]">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[13px] font-semibold text-white">Finanzas</div>
          <div className="text-[11px] text-mist-400">
            Resumen · cuentas · sueldos
          </div>
        </div>
        <span className="rounded-full border border-neon-400/30 bg-neon-400/10 px-2.5 py-1 text-[10px] text-neon-300">
          Liquidar · 1 clic
        </span>
      </div>
      <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full text-[12px]">
          <thead>
            <tr className="text-left bg-black/30 border-b border-white/10 text-[10px] uppercase tracking-[0.15em] text-mist-400">
              <th className="px-3 py-2">Barbero</th>
              <th className="px-3 py-2">Tipo</th>
              <th className="px-3 py-2 text-right">Monto</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {[
              ["Nico Ulloque", "Comisión", "$62.000"],
              ["Chipi", "Comisión prod.", "$18.000"],
              ["Tony", "Bono", "$40.000"],
              ["Simón", "Retro", "$6.000"],
              ["Maidana", "Fijo", "$120.000"],
            ].map(([n, t, m]) => (
              <tr key={n}>
                <td className="px-3 py-2 text-white">{n}</td>
                <td className="px-3 py-2">
                  <span className="rounded-full border border-white/10 bg-white/[0.02] px-2 py-0.5 text-[10px] text-mist-300">
                    {t}
                  </span>
                </td>
                <td className="px-3 py-2 text-right tabular-nums font-semibold text-white">
                  {m}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
