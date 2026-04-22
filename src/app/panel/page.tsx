"use client";

import { ProductShell, ProductSection } from "@/components/product/product-shell";
import { SystemWindow, Tag } from "@/components/product/system-window";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { useState } from "react";
import {
  BellRing,
  Check,
  Clock,
  GripVertical,
  Pause,
  Scissors,
  Sparkles,
  UserCheck,
  Wallet,
} from "lucide-react";

type Client = {
  id: string;
  name: string;
  service: string;
  waited: string;
  tone?: "neon" | "amber" | "violet";
  note?: string;
  points?: number;
};

const initialQueue: Client[] = [
  { id: "a", name: "Jaimito", service: "corte", waited: "2m 10s", tone: "amber", note: "menor espera" },
  { id: "b", name: "Horacio", service: "corte + barba", waited: "4m 05s" },
  { id: "c", name: "Raúl", service: "corte", waited: "6m 40s" },
  { id: "d", name: "Gastón", service: "corte", waited: "9m 12s" },
  { id: "e", name: "Pablo", service: "barba", waited: "11m" },
];

export default function PanelPage() {
  const [queue, setQueue] = useState<Client[]>(initialQueue);
  const [current, setCurrent] = useState<Client | null>({
    id: "x",
    name: "Ignacio Baldovino",
    service: "corte",
    waited: "3m 49s",
    note: "No le gusta la máquina 0 · barba al ras",
    points: 640,
    tone: "neon",
  });
  const [status, setStatus] = useState<"working" | "break">("working");

  const next = () => {
    if (queue.length === 0) return;
    const [first, ...rest] = queue;
    setCurrent({ ...first, waited: "en atención" });
    setQueue(rest);
  };

  const finish = () => {
    setCurrent(null);
  };

  return (
    <ProductShell
      kicker="● Módulo · Panel del barbero"
      title={
        <>
          El barbero corta.
          <br />
          <span className="gradient-text-neon">El sistema piensa por él.</span>
        </>
      }
      description={
        <>
          Cola en tiempo real, ficha completa del cliente con foto y notas
          privadas, cierre en 3 toques y rendimiento personal. Optimizado para
          tablet en modo oscuro y jornadas de 10 horas.
        </>
      }
      related={[
        { href: "/check-in", label: "Check-in Face ID" },
        { href: "/finanzas", label: "Finanzas · comisiones" },
        { href: "/equipo", label: "Equipo · asistencia" },
      ]}
    >
      <ProductSection
        kicker="Demo interactivo"
        title={
          <>
            Reordená la fila.{" "}
            <span className="gradient-text-neon">Atendé al próximo.</span>{" "}
            Cerrá el servicio.
          </>
        }
        lead={
          <>
            Arrastrá los clientes para reordenar la fila. Tocá “Próximo” para
            pasar al siguiente. Cerrá el corte en 3 toques.
          </>
        }
      >
        <SystemWindow
          url="monaco-smart-barber.vercel.app/barberos"
          activeModule="fila"
          breadcrumb="Barberos"
          title="Tony · Mi panel"
          subtitle="Modo barbero · tablet en vivo"
          topActions={
            <>
              <button
                onClick={() => setStatus("working")}
                className={`rounded-md border px-2.5 py-1 text-[11px] transition-all ${
                  status === "working"
                    ? "border-neon-400/40 bg-neon-400/10 text-neon-300"
                    : "border-white/10 bg-white/[0.02] text-mist-300"
                }`}
              >
                En turno
              </button>
              <button
                onClick={() => setStatus("break")}
                className={`rounded-md border px-2.5 py-1 text-[11px] transition-all ${
                  status === "break"
                    ? "border-amber-500/40 bg-amber-500/10 text-amber-400"
                    : "border-white/10 bg-white/[0.02] text-mist-300"
                }`}
              >
                <Pause className="mr-1 inline h-3 w-3" /> Descanso
              </button>
            </>
          }
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-4">
            {/* Queue */}
            <div className="rounded-2xl border border-white/10 bg-ink-950/40 p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs">
                  <Tag tone="neon">Mi fila · {queue.length}</Tag>
                  <Tag>Fila general · {queue.length + 1}</Tag>
                </div>
                <button
                  onClick={next}
                  disabled={queue.length === 0 || current !== null || status === "break"}
                  className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium text-white transition-all hover:bg-white/[0.06] disabled:opacity-40"
                >
                  Llamar siguiente
                </button>
              </div>

              <Reorder.Group
                axis="y"
                values={queue}
                onReorder={setQueue}
                className="space-y-1.5"
              >
                {queue.map((c, i) => (
                  <Reorder.Item
                    key={c.id}
                    value={c}
                    whileDrag={{
                      scale: 1.02,
                      boxShadow: "0 15px 40px -10px rgba(0,0,0,0.6)",
                      zIndex: 10,
                    }}
                    className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 cursor-grab active:cursor-grabbing ${
                      c.tone === "amber"
                        ? "border-amber-500/25 bg-amber-500/5"
                        : "border-white/10 bg-white/[0.02]"
                    }`}
                  >
                    <GripVertical className="h-3.5 w-3.5 text-mist-500" />
                    <span className="font-mono text-[11px] text-mist-400 w-8">
                      #{i + 2}
                    </span>
                    <span className="h-7 w-7 rounded-full bg-gradient-to-br from-neon-400 to-violet-500 grid place-items-center text-[10px] font-semibold text-ink-950">
                      {c.name
                        .split(" ")
                        .map((p) => p[0])
                        .join("")
                        .slice(0, 2)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[13px] text-white truncate">
                          {c.name}
                        </span>
                        {c.note && (
                          <Tag tone={c.tone || "default"}>{c.note}</Tag>
                        )}
                      </div>
                      <div className="text-[11px] text-mist-400">{c.service}</div>
                    </div>
                    <span className="text-[11px] tabular-nums text-mist-300">
                      {c.waited}
                    </span>
                  </Reorder.Item>
                ))}
              </Reorder.Group>

              <div className="mt-4 flex items-center gap-2 rounded-xl border border-white/5 bg-black/20 px-3 py-2.5 text-[11px] text-mist-400">
                <Sparkles className="h-3 w-3 text-neon-300" />
                Arrastrá para reordenar · WebSocket en vivo · sin refrescar
              </div>
            </div>

            {/* Current client */}
            <div className="rounded-2xl border border-white/10 bg-ink-950/40 p-4">
              <div className="mb-3 text-[11px] uppercase tracking-[0.15em] text-mist-500">
                Cliente actual
              </div>
              <AnimatePresence mode="wait">
                {current ? (
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-neon-400 to-neon-600 grid place-items-center text-ink-950 font-semibold">
                        {current.name
                          .split(" ")
                          .map((p) => p[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                      <div>
                        <div className="text-[15px] font-semibold text-white">
                          {current.name}
                        </div>
                        <div className="text-[11px] text-mist-400">
                          {current.service} · $12.000
                        </div>
                      </div>
                      {current.points && (
                        <div className="ml-auto rounded-lg border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-[10px] font-semibold text-amber-400">
                          🎁 canjea
                        </div>
                      )}
                    </div>

                    <div className="mt-4 rounded-xl border border-white/5 bg-white/[0.02] p-3 text-[12px]">
                      <div className="text-mist-400">Último corte</div>
                      <div className="mt-0.5 text-white">
                        Fade mid · Tony · hace 21 días
                      </div>
                    </div>

                    {current.note && (
                      <div className="mt-3 rounded-xl border border-violet-500/20 bg-violet-500/5 p-3 text-[12px] text-mist-200">
                        <span className="text-violet-400">Nota CRM · </span>
                        {current.note}
                      </div>
                    )}

                    <div className="mt-5 grid grid-cols-[auto_1fr] gap-2.5">
                      <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-[11px]">
                        <Clock className="h-3 w-3" /> 3m 49s
                      </div>
                      <button
                        onClick={finish}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-neon-300 to-neon-500 px-4 py-2 text-sm font-semibold text-ink-950"
                      >
                        <Check className="h-4 w-4" /> Finalizar · $12.000
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid min-h-[220px] place-items-center text-center"
                  >
                    <div>
                      <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-white/10 bg-white/[0.02] text-mist-400">
                        <Scissors className="h-6 w-6" />
                      </div>
                      <div className="mt-3 text-[13px] text-mist-300">
                        Sin cliente en atención
                      </div>
                      <button
                        onClick={next}
                        disabled={queue.length === 0 || status === "break"}
                        className="mt-3 inline-flex items-center gap-2 rounded-xl bg-gradient-to-b from-neon-300 to-neon-500 px-4 py-2 text-sm font-semibold text-ink-950 disabled:opacity-40"
                      >
                        <UserCheck className="h-4 w-4" /> Atender próximo
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-5 grid grid-cols-3 gap-2">
                <MiniStat label="Hoy" value="$186k" />
                <MiniStat label="Cortes" value="14" />
                <MiniStat label="Comisión" value="$74k" />
              </div>
            </div>
          </div>
        </SystemWindow>
      </ProductSection>

      <ProductSection
        kicker="Capacidades"
        title={
          <>
            Lo que hay{" "}
            <span className="gradient-text-neon">detrás del botón</span> de
            atender.
          </>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <Capability
            icon={<Scissors className="h-4 w-4" />}
            title="Cierre en 3 toques"
            desc="Monto sugerido, método de pago, propina. Listo."
          />
          <Capability
            icon={<Wallet className="h-4 w-4" />}
            title="Comisión automática"
            desc="% por barbero, por servicio, o híbrido con fijo. Sin planilla."
          />
          <Capability
            icon={<BellRing className="h-4 w-4" />}
            title="Wake-lock activo"
            desc="La tablet no se apaga durante el turno. Cero pantallas muertas."
          />
          <Capability
            icon={<Clock className="h-4 w-4" />}
            title="Tiempo real · WebSocket"
            desc="La fila cambia sola. Sin refrescar, sin perder turno."
          />
          <Capability
            icon={<Sparkles className="h-4 w-4" />}
            title="Login con PIN"
            desc="4 dígitos, sin passwords. Cada barbero su perfil."
          />
          <Capability
            icon={<UserCheck className="h-4 w-4" />}
            title="Rendimiento en vivo"
            desc="Facturación del día, ticket promedio y comisión del barbero."
          />
        </div>
      </ProductSection>
    </ProductShell>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-2.5">
      <div className="text-[9px] uppercase tracking-[0.15em] text-mist-500">
        {label}
      </div>
      <div className="mt-0.5 text-[13px] font-semibold text-white tabular-nums">
        {value}
      </div>
    </div>
  );
}

function Capability({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-ink-850/40 p-5 transition-all hover:border-white/20 hover:bg-ink-850/80">
      <span className="grid h-9 w-9 place-items-center rounded-xl border border-neon-400/20 bg-neon-400/10 text-neon-300">
        {icon}
      </span>
      <h3 className="mt-3 text-[15px] font-semibold text-white">{title}</h3>
      <p className="mt-1 text-sm text-mist-400">{desc}</p>
    </div>
  );
}
