"use client";

import { ProductShell, ProductSection } from "@/components/product/product-shell";
import { SystemWindow, Chip, Tag } from "@/components/product/system-window";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import {
  BadgeDollarSign,
  Calculator,
  Coins,
  FileText,
  PieChart,
} from "lucide-react";

type Tab = "resumen" | "cuentas" | "sueldos" | "egresos" | "fijos";

export default function FinancePage() {
  const [tab, setTab] = useState<Tab>("sueldos");
  const [tony, setTony] = useState(55);
  const [nico, setNico] = useState(45);
  const [chipi, setChipi] = useState(50);

  const totalCommission = useMemo(() => {
    // rough calc
    const base = 340000;
    return Math.round(base * (tony / 100) + base * 0.7 * (nico / 100) + base * 0.5 * (chipi / 100));
  }, [tony, nico, chipi]);

  return (
    <ProductShell
      kicker="● Módulo · Finanzas"
      title={
        <>
          Tres clics.{" "}
          <span className="gradient-text-neon">Sin fórmulas.</span>
        </>
      }
      description={
        <>
          Ingresos en tiempo real por sucursal y servicio. Comisiones automáticas
          por barbero. Liquidación de sueldos en 1 clic. Punto de equilibrio con
          datos reales. Exportable para tu contador.
        </>
      }
      related={[
        { href: "/estadisticas", label: "Estadísticas" },
        { href: "/panel", label: "Panel del barbero" },
        { href: "/equipo", label: "Equipo · asistencia" },
      ]}
    >
      <ProductSection
        kicker="Demo interactivo"
        title={
          <>
            Movĕ los sliders.{" "}
            <span className="gradient-text-neon">Las comisiones se recalculan.</span>
          </>
        }
        lead={
          <>
            Jugá con los porcentajes por barbero y mirá cómo se ajustan los
            totales. En el sistema real, se guardan solo por barbero, por
            servicio, o híbrido con fijo.
          </>
        }
      >
        <SystemWindow
          url="monaco-smart-barber.vercel.app/finanzas"
          activeModule="finanzas"
          breadcrumb="Admin"
          title="Finanzas · Rondeau"
          subtitle="Resumen financiero · cuentas de cobro y sueldos"
          topActions={
            <>
              {(["resumen", "cuentas", "sueldos", "egresos", "fijos"] as const).map(
                (t) => (
                  <Chip key={t} active={tab === t} onClick={() => setTab(t)}>
                    {t === "resumen"
                      ? "Resumen"
                      : t === "cuentas"
                      ? "Cuentas de cobro"
                      : t === "sueldos"
                      ? "Sueldos"
                      : t === "egresos"
                      ? "Egresos"
                      : "Gastos fijos"}
                  </Chip>
                )
              )}
            </>
          }
        >
          <AnimatePresence mode="wait">
            {tab === "sueldos" && (
              <motion.div
                key="sueldos"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-4"
              >
                {/* Commission sliders */}
                <div className="rounded-2xl border border-white/10 bg-ink-950/40 p-5">
                  <div className="flex items-center gap-2">
                    <PieChart className="h-4 w-4 text-neon-300" />
                    <span className="text-[13px] font-semibold text-white">
                      Comisiones del período
                    </span>
                  </div>
                  <div className="mt-4 space-y-4">
                    <CommissionSlider
                      name="Tony Ramírez"
                      value={tony}
                      onChange={setTony}
                      base={340000}
                      color="neon"
                    />
                    <CommissionSlider
                      name="Nico Ulloque"
                      value={nico}
                      onChange={setNico}
                      base={238000}
                      color="violet"
                    />
                    <CommissionSlider
                      name="Chipi"
                      value={chipi}
                      onChange={setChipi}
                      base={170000}
                      color="amber"
                    />
                    <div className="mt-2 rounded-xl border border-white/5 bg-white/[0.02] p-3">
                      <div className="text-[10px] uppercase tracking-[0.15em] text-mist-500">
                        Total a pagar
                      </div>
                      <motion.div
                        key={totalCommission}
                        initial={{ y: -6, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="font-display text-3xl font-semibold text-white tabular-nums"
                      >
                        ${totalCommission.toLocaleString("es-AR")}
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Payments table */}
                <div className="rounded-2xl border border-white/10 bg-ink-950/40 p-5 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-amber-400" />
                      <span className="text-[13px] font-semibold text-white">
                        Reportes pendientes · Nico U.
                      </span>
                    </div>
                    <Tag tone="neon">registrado auto</Tag>
                  </div>
                  <div className="mt-3 overflow-hidden rounded-xl border border-white/5">
                    <table className="w-full text-[12px]">
                      <thead>
                        <tr className="text-left bg-black/30 border-b border-white/5 text-[10px] uppercase tracking-[0.15em] text-mist-500">
                          <th className="px-3 py-2">Fecha</th>
                          <th className="px-3 py-2">Tipo</th>
                          <th className="px-3 py-2">Motivo</th>
                          <th className="px-3 py-2 text-right">Monto</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {[
                          ["14 abr", "Comisión producto", "Venta Reuzel", "$6.000"],
                          ["14 abr", "Comisión", "Servicios", "$62.000"],
                          ["6 abr", "Comisión producto", "Retroactivo (fix)", "$6.000"],
                          ["5 abr", "Bono", "Sobre meta mensual", "$40.000"],
                          ["1 abr", "Fijo", "Semana 1", "$120.000"],
                        ].map(([d, t, m, $]) => (
                          <tr key={d + m} className="hover:bg-white/[0.02]">
                            <td className="px-3 py-2 text-mist-300 whitespace-nowrap">
                              {d}
                            </td>
                            <td className="px-3 py-2">
                              <Tag
                                tone={
                                  t.includes("producto")
                                    ? "sky"
                                    : t === "Bono"
                                    ? "amber"
                                    : "neon"
                                }
                              >
                                {t}
                              </Tag>
                            </td>
                            <td className="px-3 py-2 text-mist-400">{m}</td>
                            <td className="px-3 py-2 text-right tabular-nums font-semibold text-white">
                              {$}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <button className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-b from-neon-300 to-neon-500 px-3 py-2 text-[12px] font-semibold text-ink-950">
                      <Coins className="h-3.5 w-3.5" /> Liquidar período
                    </button>
                    <button className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-[12px] text-white">
                      Registrar sueldo
                    </button>
                    <button className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-[12px] text-white">
                      Generar comisiones
                    </button>
                    <button className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-[12px] text-white">
                      + Bono / Adelanto
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {tab === "resumen" && (
              <motion.div
                key="resumen"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-3"
              >
                {[
                  ["Ingresos del mes", "$27.169.000", "+18%", "neon"],
                  ["Gastos fijos", "$4.200.000", "estable", "default"],
                  ["Utilidad neta", "$12.840.000", "+22%", "neon"],
                  ["Cuentas por cobrar", "$380.000", "3 pendientes", "amber"],
                  ["Comisiones estimadas", "$6.400.000", "por barbero", "violet"],
                  ["Punto de equilibrio", "44 cortes/día", "≥ hoy: 52 ✓", "neon"],
                ].map(([l, v, s, t]) => (
                  <div
                    key={l}
                    className="rounded-2xl border border-white/10 bg-ink-950/40 p-5"
                  >
                    <div className="text-[10px] uppercase tracking-[0.15em] text-mist-500">
                      {l}
                    </div>
                    <div className="mt-1 font-display text-2xl font-semibold text-white tabular-nums">
                      {v}
                    </div>
                    <div className="mt-1 flex items-center gap-1 text-[11px]">
                      <Tag tone={t as "neon"}>{s as string}</Tag>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {tab === "cuentas" && <BreakEvenDemo />}
            {(tab === "egresos" || tab === "fijos") && (
              <motion.div
                key="egresos"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border border-white/10 bg-ink-950/40 p-5"
              >
                <div className="text-[13px] font-semibold text-white mb-3">
                  {tab === "egresos" ? "Egresos del período" : "Gastos fijos"}
                </div>
                <div className="overflow-hidden rounded-xl border border-white/5">
                  <table className="w-full text-[12px]">
                    <thead>
                      <tr className="text-left bg-black/30 border-b border-white/5 text-[10px] uppercase tracking-[0.15em] text-mist-500">
                        <th className="px-3 py-2">Categoría</th>
                        <th className="px-3 py-2">Detalle</th>
                        <th className="px-3 py-2 text-right">Monto</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {(tab === "fijos"
                        ? [
                            ["Alquiler", "Local Rondeau", "$820.000"],
                            ["Internet", "Movistar Fibra", "$28.000"],
                            ["Energía", "EPEC promedio", "$142.000"],
                            ["Software", "studiOS", "$45.000"],
                          ]
                        : [
                            ["Productos", "Reuzel x12", "$210.000"],
                            ["Mantenimiento", "Sillón 3", "$38.000"],
                            ["Marketing", "Campaña Meta", "$90.000"],
                            ["Insumos", "Toallas + cuchillas", "$64.000"],
                          ]
                      ).map(([c, d, $]) => (
                        <tr key={c + d}>
                          <td className="px-3 py-2">
                            <Tag tone="default">{c}</Tag>
                          </td>
                          <td className="px-3 py-2 text-mist-300">{d}</td>
                          <td className="px-3 py-2 text-right tabular-nums font-semibold text-white">
                            {$}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </SystemWindow>
      </ProductSection>

      <ProductSection
        kicker="Lo clave"
        title={
          <>
            Por qué tu contador{" "}
            <span className="gradient-text-neon">te va a agradecer.</span>
          </>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            [
              <Calculator key="1" className="h-4 w-4" />,
              "Comisiones automáticas",
              "% por barbero, por servicio o híbrido. Incluye propinas y productos.",
            ],
            [
              <PieChart key="2" className="h-4 w-4" />,
              "Punto de equilibrio real",
              "“Necesitás 44 cortes hoy.” Con tus números reales, no promedios.",
            ],
            [
              <Coins key="3" className="h-4 w-4" />,
              "Liquidación en 1 clic",
              "Apretás un botón y tenés el monto exacto para cada barbero.",
            ],
            [
              <FileText key="4" className="h-4 w-4" />,
              "Export para contador",
              "CSV, PDF, integraciones. Lo que tu estudio contable pida.",
            ],
            [
              <BadgeDollarSign key="5" className="h-4 w-4" />,
              "Cuentas de pago separadas",
              "Banco, efectivo, MP. Movimientos auditables por cuenta.",
            ],
            [
              <PieChart key="6" className="h-4 w-4" />,
              "Reportes mes a mes",
              "Y año a año. Tendencias claras, decisiones fundadas.",
            ],
          ].map(([icon, title, desc]) => (
            <div
              key={title as string}
              className="rounded-2xl border border-white/10 bg-ink-850/40 p-5"
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-400">
                {icon}
              </span>
              <h3 className="mt-3 text-[15px] font-semibold text-white">
                {title}
              </h3>
              <p className="mt-1 text-sm text-mist-400">{desc}</p>
            </div>
          ))}
        </div>
      </ProductSection>
    </ProductShell>
  );
}

function CommissionSlider({
  name,
  value,
  onChange,
  base,
  color,
}: {
  name: string;
  value: number;
  onChange: (v: number) => void;
  base: number;
  color: "neon" | "violet" | "amber";
}) {
  const colors = {
    neon: "from-neon-400 to-neon-600 accent-neon-400",
    violet: "from-violet-400 to-violet-600 accent-violet-500",
    amber: "from-amber-400 to-amber-600 accent-amber-400",
  } as const;
  const amount = Math.round(base * (value / 100));
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
      <div className="flex items-center justify-between text-[12px]">
        <span className="text-white font-medium">{name}</span>
        <span className="tabular-nums text-white">
          ${amount.toLocaleString("es-AR")}
        </span>
      </div>
      <div className="mt-2 flex items-center gap-3">
        <input
          type="range"
          min={30}
          max={70}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className={`w-full ${colors[color]}`}
        />
        <span className="w-10 shrink-0 rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-center text-[11px] font-mono text-white">
          {value}%
        </span>
      </div>
    </div>
  );
}

function BreakEvenDemo() {
  const [cuts, setCuts] = useState(52);
  const pct = Math.min(100, Math.round((cuts / 44) * 100));
  return (
    <motion.div
      key="be"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="rounded-2xl border border-white/10 bg-ink-950/40 p-5"
    >
      <div className="flex items-center gap-2">
        <Calculator className="h-4 w-4 text-violet-400" />
        <span className="text-[13px] font-semibold text-white">
          Punto de equilibrio · hoy
        </span>
      </div>
      <p className="mt-3 text-[13px] text-mist-400">
        Necesitás{" "}
        <span className="font-semibold text-white">44 cortes</span> para cubrir gastos fijos + variables.
      </p>
      <div className="mt-5 flex items-end gap-3">
        <span className="font-display text-5xl font-semibold text-white tabular-nums">
          {cuts}
        </span>
        <span className="pb-2 text-sm text-neon-300">
          {cuts >= 44 ? `+${cuts - 44} sobre el piso` : `faltan ${44 - cuts}`}
        </span>
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/5 relative">
        <motion.div
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6 }}
          className="h-full rounded-full bg-gradient-to-r from-neon-600 to-neon-300"
        />
        <div className="absolute left-[55%] top-0 h-full w-px bg-amber-500/60" />
      </div>
      <div className="mt-4">
        <input
          type="range"
          min={0}
          max={80}
          value={cuts}
          onChange={(e) => setCuts(Number(e.target.value))}
          className="w-full accent-neon-400"
        />
        <div className="mt-1 flex justify-between text-[10px] text-mist-400">
          <span>0</span>
          <span className="text-amber-400 ml-[55%]">44 · piso</span>
        </div>
      </div>
    </motion.div>
  );
}
