"use client";

import { ProductShell, ProductSection } from "@/components/product/product-shell";
import { SystemWindow, Tag } from "@/components/product/system-window";
import { Reveal } from "@/components/ui/reveal";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Camera,
  CheckCircle2,
  RotateCcw,
  ScanFace,
  UserPlus,
  Users,
  Zap,
} from "lucide-react";

type State = "idle" | "scanning" | "matching" | "recognized" | "new";

export default function CheckInPage() {
  const [state, setState] = useState<State>("idle");
  const [mode, setMode] = useState<"recurrent" | "new">("recurrent");

  useEffect(() => {
    if (state === "scanning") {
      const t = setTimeout(() => setState("matching"), 1400);
      return () => clearTimeout(t);
    }
    if (state === "matching") {
      const t = setTimeout(
        () => setState(mode === "recurrent" ? "recognized" : "new"),
        900
      );
      return () => clearTimeout(t);
    }
  }, [state, mode]);

  const start = () => setState("scanning");
  const reset = () => setState("idle");

  return (
    <ProductShell
      kicker="● Módulo · Check-in"
      title={
        <>
          Face ID.
          <br />
          <span className="gradient-text-neon">El primer contacto, sin fricción.</span>
        </>
      }
      description={
        <>
          La tablet de la entrada. Autónoma, sin atención humana. El cliente se
          escanea, elige servicio y entra a la fila. Detecta a recurrentes en 2
          segundos y registra nuevos con una foto.
        </>
      }
      related={[
        { href: "/panel", label: "Panel del barbero" },
        { href: "/crm", label: "CRM + Mensajería" },
        { href: "/estadisticas", label: "Estadísticas" },
      ]}
    >
      <ProductSection
        kicker="Demo en vivo"
        title={
          <>
            Tocá el botón.{" "}
            <span className="gradient-text-neon">
              Viví el check-in como tu cliente.
            </span>
          </>
        }
        lead={
          <>
            Esta es una simulación real del flujo. Elegí si querés ver el caso
            de un cliente recurrente o uno nuevo, y toca “Iniciar escaneo”.
          </>
        }
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 items-stretch">
          <SystemWindow
            url="monaco-smart-barber.vercel.app/checkin"
            activeModule="fila"
            breadcrumb="Terminal"
            title="Check-in · Rondeau"
            subtitle="Acercate a la tablet y mirá a la cámara"
            topActions={
              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    setMode("recurrent");
                    setState("idle");
                  }}
                  className={`rounded-md border px-2.5 py-1 text-[11px] transition-all ${
                    mode === "recurrent"
                      ? "border-neon-400/40 bg-neon-400/10 text-neon-300"
                      : "border-white/10 bg-white/[0.02] text-mist-300"
                  }`}
                >
                  Recurrente
                </button>
                <button
                  onClick={() => {
                    setMode("new");
                    setState("idle");
                  }}
                  className={`rounded-md border px-2.5 py-1 text-[11px] transition-all ${
                    mode === "new"
                      ? "border-neon-400/40 bg-neon-400/10 text-neon-300"
                      : "border-white/10 bg-white/[0.02] text-mist-300"
                  }`}
                >
                  Cliente nuevo
                </button>
              </div>
            }
          >
            <div className="relative mx-auto w-full max-w-md">
              <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-white/10 bg-ink-950">
                <AnimatePresence mode="wait">
                  {state === "idle" && (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 grid place-items-center"
                    >
                      <div className="text-center">
                        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-white/[0.03] border border-white/10">
                          <Camera className="h-8 w-8 text-mist-400" />
                        </div>
                        <p className="mt-4 text-[13px] text-mist-400">
                          La tablet está esperando
                        </p>
                      </div>
                    </motion.div>
                  )}
                  {(state === "scanning" || state === "matching") && (
                    <motion.div
                      key="scan"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0"
                    >
                      <div className="absolute inset-4 grid grid-cols-16 gap-1 opacity-50">
                        {Array.from({ length: 160 }).map((_, i) => (
                          <motion.span
                            key={i}
                            className="h-0.5 w-0.5 rounded-full bg-neon-400"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 0.9, 0] }}
                            transition={{
                              duration: 1.6,
                              delay: (i % 30) * 0.04,
                              repeat: Infinity,
                            }}
                          />
                        ))}
                      </div>
                      <motion.div
                        className="absolute inset-x-4 h-[3px] rounded-full"
                        style={{
                          background:
                            "linear-gradient(90deg, transparent, rgba(94,236,170,0.9), transparent)",
                          boxShadow: "0 0 16px rgba(36,224,140,0.7)",
                        }}
                        initial={{ top: "8%" }}
                        animate={{ top: ["8%", "92%", "8%"] }}
                        transition={{
                          duration: 1.4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      <div className="absolute inset-x-0 bottom-5 text-center">
                        <span className="rounded-full border border-neon-400/30 bg-black/60 px-3 py-1 text-[11px] font-medium text-neon-300 backdrop-blur">
                          {state === "scanning"
                            ? "escaneando rostro..."
                            : "buscando en el sistema..."}
                        </span>
                      </div>
                    </motion.div>
                  )}
                  {state === "recognized" && (
                    <motion.div
                      key="rec"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 grid place-items-center"
                    >
                      <div className="text-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 16,
                          }}
                          className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-neon-400/20 border border-neon-400/40 text-neon-300"
                        >
                          <CheckCircle2 className="h-10 w-10" />
                        </motion.div>
                        <div className="mt-4 text-lg font-semibold text-white">
                          Hola, Joaquín 👋
                        </div>
                        <div className="text-[13px] text-mist-400">
                          Reconocido en 1.8 s
                        </div>
                        <div className="mt-5 space-y-1.5 text-[12px]">
                          <Row label="Último corte" value="Fade · con Tony · hace 21 días" />
                          <Row label="Barbero preferido" value="Tony" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                  {state === "new" && (
                    <motion.div
                      key="new"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 grid place-items-center px-6"
                    >
                      <div className="text-center">
                        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-300">
                          <UserPlus className="h-9 w-9" />
                        </div>
                        <div className="mt-4 text-lg font-semibold text-white">
                          Primera vez
                        </div>
                        <div className="text-[13px] text-mist-400">
                          Te registramos en 20 segundos
                        </div>
                        <div className="mt-5 space-y-2 text-left">
                          <input
                            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-[13px] text-white placeholder:text-mist-500 focus:outline-none focus:border-white/30"
                            placeholder="Nombre y apellido"
                            defaultValue=""
                          />
                          <input
                            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-[13px] text-white placeholder:text-mist-500 focus:outline-none focus:border-white/30"
                            placeholder="+54 9 351..."
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-5 flex items-center gap-2">
                {state === "idle" || state === "recognized" || state === "new" ? (
                  <button
                    onClick={state === "idle" ? start : reset}
                    className="flex-1 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-neon-300 to-neon-500 px-4 text-sm font-semibold text-ink-950 transition-transform hover:-translate-y-0.5"
                  >
                    {state === "idle" ? (
                      <>
                        <ScanFace className="h-4 w-4" />
                        Iniciar escaneo
                      </>
                    ) : (
                      <>
                        <RotateCcw className="h-4 w-4" />
                        Probar de nuevo
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    disabled
                    className="flex-1 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10 px-4 text-sm font-medium text-mist-400"
                  >
                    Escaneando...
                  </button>
                )}
                <button className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white">
                  <UserPlus className="h-4 w-4" /> Soy nuevo
                </button>
              </div>
            </div>
          </SystemWindow>

          {/* Side context */}
          <div className="flex flex-col gap-3">
            <ContextCard
              label="Estado"
              value={
                state === "idle"
                  ? "Listo"
                  : state === "scanning"
                  ? "Capturando rostro"
                  : state === "matching"
                  ? "Consultando base"
                  : state === "recognized"
                  ? "Reconocido"
                  : "Registro nuevo"
              }
              tone={
                state === "recognized" || state === "new" ? "neon" : "default"
              }
            />
            <ContextCard label="Puntos faciales" value="68" hint="mapeo dense mesh" />
            <ContextCard
              label="Tiempo promedio"
              value="1.8 s"
              hint="recurrentes"
            />
            <ContextCard
              label="Privacidad"
              value="On-device"
              hint="no se almacenan imágenes crudas"
            />
            <div className="rounded-2xl border border-neon-400/20 bg-neon-400/[0.04] p-4">
              <div className="flex items-center gap-2">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-neon-400/10 border border-neon-400/20 text-neon-300">
                  <Zap className="h-3.5 w-3.5" />
                </span>
                <span className="text-[13px] font-semibold text-white">
                  Tip de producto
                </span>
              </div>
              <p className="mt-2 text-[12px] leading-relaxed text-mist-300">
                La detección funciona con poca luz y ángulos distintos. Si la
                cara no se reconoce en 3 intentos, ofrece registrarse como
                nuevo.
              </p>
            </div>
          </div>
        </div>
      </ProductSection>

      <ProductSection
        kicker="Flujo completo"
        title={
          <>
            Tres pantallas.{" "}
            <span className="gradient-text-neon">Cero fricción.</span>
          </>
        }
        lead="Cliente entra, el sistema lo reconoce, elige cómo atenderse y entra a la fila. Sin atención humana, sin colas en la puerta."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <FlowCard
            num="01"
            title="Reconocimiento"
            desc="Escanea rostro y cruza con 68 puntos contra la base. Reconoce al cliente incluso con barba nueva o sombrero."
            tone="neon"
          />
          <FlowCard
            num="02"
            title="¿Cómo querés atenderte?"
            desc="Menor espera con IA (asigna al barbero con menos fila) o elegir barbero preferido. Dos opciones, cero confusión."
            tone="violet"
          />
          <FlowCard
            num="03"
            title="Entra a la fila"
            desc="Ticket en pantalla con número de turno y tiempo estimado. El barbero ya lo ve aparecer en su panel."
            tone="amber"
          />
        </div>
      </ProductSection>

      <ProductSection
        kicker="Capacidades"
        title={
          <>
            Todo lo que <span className="gradient-text-neon">hace</span> el
            terminal.
          </>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FeatureRow
            icon={<ScanFace className="h-4 w-4" />}
            title="Detección facial en tiempo real"
            desc="Mesh denso de 68 puntos. Tolerante a sombras, lentes, barbas."
          />
          <FeatureRow
            icon={<UserPlus className="h-4 w-4" />}
            title="Alta de cliente sin fricción"
            desc="Nombre, teléfono y foto. De ahí en más queda reconocido para siempre."
          />
          <FeatureRow
            icon={<Users className="h-4 w-4" />}
            title="Asignación por menor espera"
            desc="El sistema evalúa todas las filas y ofrece el barbero más rápido."
          />
          <FeatureRow
            icon={<Zap className="h-4 w-4" />}
            title="Ticket con tiempo real"
            desc="El cliente ve su número y los minutos estimados. Sin pizarra."
          />
        </div>
      </ProductSection>
    </ProductShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-md bg-white/[0.02] border border-white/5 px-3 py-1.5">
      <span className="text-[10px] uppercase tracking-[0.12em] text-mist-500">
        {label}
      </span>
      <span className="text-[11px] text-white">{value}</span>
    </div>
  );
}

function ContextCard({
  label,
  value,
  hint,
  tone = "default",
}: {
  label: string;
  value: string;
  hint?: string;
  tone?: "default" | "neon";
}) {
  return (
    <div
      className={`rounded-2xl border ${
        tone === "neon"
          ? "border-neon-400/20 bg-neon-400/[0.04]"
          : "border-white/10 bg-white/[0.02]"
      } p-4`}
    >
      <div className="text-[10px] uppercase tracking-[0.15em] text-mist-500">
        {label}
      </div>
      <div
        className={`mt-1 text-xl font-semibold ${
          tone === "neon" ? "text-neon-300" : "text-white"
        }`}
      >
        {value}
      </div>
      {hint && <div className="mt-1 text-[11px] text-mist-400">{hint}</div>}
    </div>
  );
}

function FlowCard({
  num,
  title,
  desc,
  tone,
}: {
  num: string;
  title: string;
  desc: string;
  tone: "neon" | "violet" | "amber";
}) {
  const tones = {
    neon: "text-neon-300 border-neon-400/20 bg-neon-400/5",
    violet: "text-violet-400 border-violet-500/20 bg-violet-500/5",
    amber: "text-amber-400 border-amber-500/20 bg-amber-500/5",
  };
  return (
    <Reveal>
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-ink-850/40 p-5">
        <div
          className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[11px] font-mono ${tones[tone]}`}
        >
          {num}
        </div>
        <h3 className="mt-4 text-[17px] font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm text-mist-400">{desc}</p>
        <ArrowRight
          className={`absolute right-5 top-5 h-4 w-4 opacity-50 ${
            tone === "neon"
              ? "text-neon-300"
              : tone === "violet"
              ? "text-violet-400"
              : "text-amber-400"
          }`}
        />
      </div>
    </Reveal>
  );
}

function FeatureRow({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-ink-850/40 p-4 sm:p-5">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-neon-400/20 bg-neon-400/10 text-neon-300">
        {icon}
      </span>
      <div>
        <div className="text-[15px] font-semibold text-white">{title}</div>
        <p className="mt-1 text-sm text-mist-400">{desc}</p>
      </div>
    </div>
  );
}
