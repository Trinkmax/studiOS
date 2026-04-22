"use client";

import { ProductShell, ProductSection } from "@/components/product/product-shell";
import { SystemWindow, Chip, Tag } from "@/components/product/system-window";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  BarChart3,
  Calendar,
  Download,
  Eye,
  TrendingUp,
  Users,
} from "lucide-react";

type Range = "hoy" | "semana" | "mes";
type Tab = "tendencias" | "ocupacion" | "barberos" | "clientes";

const baseBars = [
  1400, 1900, 1700, 1900, 2100, 1800, 1600, 2100, 2200, 2400, 2200, 2300, 2500,
  2400, 2600, 2700, 2500, 2800, 2900, 2700, 3000,
];

const barberBars = [
  { name: "Tony", v: 98 },
  { name: "Nico M.", v: 74 },
  { name: "Chipi", v: 62 },
  { name: "Fabrizio", v: 58 },
  { name: "Simón", v: 42 },
];

const occupancyHeat = [
  [10, 12, 18, 30, 45, 60, 72, 85, 78, 70, 62, 48],
  [8, 10, 14, 25, 38, 55, 68, 80, 92, 85, 74, 52],
  [12, 15, 20, 32, 50, 65, 78, 92, 88, 80, 70, 55],
  [10, 14, 18, 28, 44, 58, 72, 84, 80, 72, 60, 45],
  [14, 18, 24, 38, 55, 70, 82, 95, 88, 78, 65, 48],
  [20, 25, 35, 52, 70, 82, 92, 100, 98, 90, 78, 62],
];

export default function StatsPage() {
  const [range, setRange] = useState<Range>("mes");
  const [tab, setTab] = useState<Tab>("tendencias");

  const multiplier = range === "hoy" ? 0.18 : range === "semana" ? 0.4 : 1;
  const bars = baseBars.slice(0, range === "hoy" ? 8 : range === "semana" ? 14 : 21);

  return (
    <ProductShell
      kicker="● Módulo · Estadísticas"
      title={
        <>
          Tu barbería en números.{" "}
          <span className="gradient-text-neon">En tiempo real.</span>
        </>
      }
      description={
        <>
          Ingresos, cortes, ticket promedio, ocupación por hora, ranking de
          barberos y retención de clientes. Desde el celular, la compu o donde
          estés.
        </>
      }
      related={[
        { href: "/finanzas", label: "Finanzas" },
        { href: "/panel", label: "Panel del barbero" },
        { href: "/equipo", label: "Equipo" },
      ]}
    >
      <ProductSection
        kicker="Dashboard en vivo"
        title={
          <>
            Cambiá el rango.{" "}
            <span className="gradient-text-neon">Los gráficos se adaptan solos.</span>
          </>
        }
        lead={
          <>
            Elegí período, alterná entre tendencias, ocupación, barberos y
            clientes. Mismo sistema que usa Tony desde su living.
          </>
        }
      >
        <SystemWindow
          url="monaco-smart-barber.vercel.app/estadisticas"
          activeModule="estadisticas"
          breadcrumb="Admin"
          title="Estadísticas · Caseros"
          subtitle="01 abr – 21 abr"
          topActions={
            <>
              <Chip active={range === "hoy"} onClick={() => setRange("hoy")}>
                Hoy
              </Chip>
              <Chip active={range === "semana"} onClick={() => setRange("semana")}>
                Semana
              </Chip>
              <Chip active={range === "mes"} onClick={() => setRange("mes")}>
                Mes
              </Chip>
              <Chip>
                <Download className="h-3 w-3" /> CSV
              </Chip>
            </>
          }
        >
          {/* KPI cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <Kpi
              label="Ingresos"
              value={`$${Math.round(27.169 * multiplier)}M`}
              delta="+18%"
              active={tab === "tendencias"}
            />
            <Kpi
              label="Cortes"
              value={Math.round(1774 * multiplier).toLocaleString("es-AR")}
              delta="+7%"
            />
            <Kpi
              label="Ticket promedio"
              value="$15.315"
              delta="+9%"
            />
            <Kpi
              label="Clientes únicos"
              value={Math.round(1637 * multiplier).toLocaleString("es-AR")}
              delta="+12%"
            />
          </div>

          {/* Tabs */}
          <div className="mt-5 flex items-center gap-1 border-b border-white/10 pb-1 overflow-x-auto hide-scrollbar">
            <TabBtn active={tab === "tendencias"} onClick={() => setTab("tendencias")}>
              <TrendingUp className="h-3.5 w-3.5" /> Tendencias
            </TabBtn>
            <TabBtn active={tab === "ocupacion"} onClick={() => setTab("ocupacion")}>
              <Calendar className="h-3.5 w-3.5" /> Ocupación
            </TabBtn>
            <TabBtn active={tab === "barberos"} onClick={() => setTab("barberos")}>
              <Users className="h-3.5 w-3.5" /> Barberos
            </TabBtn>
            <TabBtn active={tab === "clientes"} onClick={() => setTab("clientes")}>
              <Eye className="h-3.5 w-3.5" /> Clientes
            </TabBtn>
          </div>

          <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <AnimatePresence mode="wait">
              {tab === "tendencias" && (
                <motion.div
                  key="t1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl border border-white/10 bg-ink-950/40 p-5"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-[12px] text-white">Ingresos diarios</div>
                    <Tag tone="neon">línea</Tag>
                  </div>
                  <div className="mt-3">
                    <LineChart data={bars} />
                  </div>
                </motion.div>
              )}
              {tab === "ocupacion" && (
                <motion.div
                  key="t2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl border border-white/10 bg-ink-950/40 p-5"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-[12px] text-white">Heatmap semana</div>
                    <Tag tone="violet">ocupación</Tag>
                  </div>
                  <div className="mt-4 grid grid-cols-[auto_1fr] gap-2">
                    <div className="flex flex-col gap-1 text-[10px] text-mist-400 pt-4">
                      {["L", "M", "X", "J", "V", "S"].map((d) => (
                        <span key={d} className="h-5">{d}</span>
                      ))}
                    </div>
                    <div>
                      <div className="grid grid-cols-12 gap-1 text-[9px] text-mist-500 mb-1">
                        {[10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21].map((h) => (
                          <span key={h} className="text-center">{h}</span>
                        ))}
                      </div>
                      <div className="grid grid-rows-6 gap-1">
                        {occupancyHeat.map((row, r) => (
                          <div key={r} className="grid grid-cols-12 gap-1">
                            {row.map((v, c) => (
                              <motion.div
                                key={c}
                                initial={{ opacity: 0, scale: 0.6 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: (r * 12 + c) * 0.005 }}
                                className="aspect-square rounded-sm"
                                style={{
                                  background: `rgba(36, 224, 140, ${v / 120})`,
                                  boxShadow:
                                    v > 80
                                      ? "0 0 6px rgba(36,224,140,0.45)"
                                      : undefined,
                                }}
                                title={`${v}%`}
                              />
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              {tab === "barberos" && (
                <motion.div
                  key="t3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl border border-white/10 bg-ink-950/40 p-5"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-[12px] text-white">Ranking del mes</div>
                    <Tag tone="amber">cortes</Tag>
                  </div>
                  <div className="mt-4 space-y-2">
                    {barberBars.map((b, i) => (
                      <div key={b.name} className="flex items-center gap-3 text-[12px]">
                        <span className="w-16 text-mist-200">{b.name}</span>
                        <div className="relative h-6 flex-1 overflow-hidden rounded-full bg-white/5">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${b.v}%` }}
                            transition={{ duration: 0.9, delay: i * 0.08 }}
                            className={`h-full ${
                              i === 0
                                ? "bg-gradient-to-r from-amber-400 to-amber-600"
                                : "bg-gradient-to-r from-neon-600 to-neon-400"
                            }`}
                          />
                        </div>
                        <span className="w-12 text-right tabular-nums text-white">
                          {Math.round(b.v * 5.6)}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
              {tab === "clientes" && (
                <motion.div
                  key="t4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl border border-white/10 bg-ink-950/40 p-5"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-[12px] text-white">Segmentación</div>
                    <Tag tone="sky">auto-clasificado</Tag>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {[
                      ["VIP", 127, "neon"],
                      ["Regulares", 482, "violet"],
                      ["Nuevos", 218, "amber"],
                      ["En riesgo", 94, "red"],
                    ].map(([l, v, tone]) => (
                      <div
                        key={l as string}
                        className="rounded-xl border border-white/10 bg-white/[0.02] p-3"
                      >
                        <Tag tone={tone as "neon"}>{l as string}</Tag>
                        <div className="mt-2 font-display text-2xl font-semibold text-white tabular-nums">
                          {v}
                        </div>
                        <div className="text-[11px] text-mist-400">clientes</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Second column */}
            <div className="rounded-2xl border border-white/10 bg-ink-950/40 p-5">
              <div className="flex items-center justify-between">
                <div className="text-[12px] text-white">Cortes diarios</div>
                <Tag tone="neon">barras</Tag>
              </div>
              <div className="mt-3 flex h-40 items-end gap-1">
                {bars.map((h, i) => (
                  <motion.div
                    key={`${range}-${i}`}
                    className={`flex-1 rounded-t ${
                      i === bars.length - 1
                        ? "bg-gradient-to-t from-neon-600 to-neon-300"
                        : "bg-gradient-to-t from-white/10 to-white/20"
                    }`}
                    initial={{ height: 0 }}
                    animate={{ height: `${(h / 3000) * 100}%` }}
                    transition={{ duration: 0.7, delay: i * 0.02 }}
                  />
                ))}
              </div>
              <div className="mt-2 flex justify-between text-[10px] text-mist-500">
                <span>día 1</span>
                <span>día {bars.length}</span>
              </div>
            </div>
          </div>
        </SystemWindow>
      </ProductSection>

      <ProductSection
        kicker="Reports automáticos"
        title={
          <>
            Lo que pasa{" "}
            <span className="gradient-text-neon">sin que lo pidas.</span>
          </>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            ["Reporte semanal al Lunes", "Resumen de la semana en tu WhatsApp."],
            ["Alertas de caída", "Si bajan ingresos vs misma semana anterior."],
            ["Picos de ocupación", "Detecta horas saturadas y sugiere sumar barbero."],
            ["Clientes VIP en riesgo", "Aviso cuando un habitual deja de venir."],
            ["Benchmark sucursales", "Comparativa en vivo entre tus locales."],
            ["Export CSV / PDF", "Para el contador, para el banco, para vos."],
          ].map(([t, d]) => (
            <div
              key={t}
              className="rounded-2xl border border-white/10 bg-ink-850/40 p-4"
            >
              <BarChart3 className="h-4 w-4 text-neon-300" />
              <div className="mt-3 text-[14px] font-semibold text-white">{t}</div>
              <p className="mt-1 text-[12px] text-mist-400">{d}</p>
            </div>
          ))}
        </div>
      </ProductSection>
    </ProductShell>
  );
}

function Kpi({
  label,
  value,
  delta,
  active,
}: {
  label: string;
  value: string;
  delta: string;
  active?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`rounded-2xl border p-4 transition-all ${
        active
          ? "border-neon-400/25 bg-neon-400/[0.04]"
          : "border-white/10 bg-ink-950/40"
      }`}
    >
      <div className="text-[10px] uppercase tracking-[0.15em] text-mist-500">
        {label}
      </div>
      <div className="mt-1 font-display text-[22px] font-semibold text-white tabular-nums">
        {value}
      </div>
      <div className="text-[11px] text-neon-300">{delta}</div>
    </motion.div>
  );
}

function TabBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative inline-flex items-center gap-1.5 px-3 py-2 text-[12px] font-medium transition-colors ${
        active ? "text-white" : "text-mist-400 hover:text-white"
      }`}
    >
      {children}
      {active && (
        <motion.span
          layoutId="stats-tab"
          className="absolute inset-x-2 -bottom-1 h-0.5 rounded-full bg-neon-400"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
    </button>
  );
}

function LineChart({ data }: { data: number[] }) {
  const w = 100;
  const h = 40;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const span = max - min || 1;
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / span) * h;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg
      viewBox={`0 0 ${w} ${h + 4}`}
      preserveAspectRatio="none"
      className="h-36 w-full"
    >
      <defs>
        <linearGradient id="ln" x1="0" y1="0" x2="0" y2={h} gradientUnits="userSpaceOnUse">
          <stop stopColor="rgba(36,224,140,0.35)" />
          <stop offset="1" stopColor="rgba(36,224,140,0)" />
        </linearGradient>
      </defs>
      <motion.polyline
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        points={points}
        fill="none"
        stroke="rgba(94,236,170,0.95)"
        strokeWidth="0.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <polyline points={`0,${h} ${points} ${w},${h}`} fill="url(#ln)" />
    </svg>
  );
}
