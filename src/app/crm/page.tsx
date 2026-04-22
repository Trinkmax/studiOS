"use client";

import { ProductShell, ProductSection } from "@/components/product/product-shell";
import { SystemWindow, Tag, Chip } from "@/components/product/system-window";
import { WorkflowEditor } from "@/components/product/workflow-editor";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Bot,
  Clock,
  Instagram,
  MessageSquare,
  Send,
  Sparkles,
  Workflow,
  Filter,
  Star,
  Shield,
} from "lucide-react";

type Chat = {
  id: string;
  initials: string;
  name: string;
  channel: "wa" | "ig";
  preview: string;
  time: string;
  tag: "consulta" | "reclamo" | "venta" | "turno";
  thread: Array<{ side: "in" | "out"; text: string }>;
  suggestion: string;
};

const chats: Chat[] = [
  {
    id: "jm",
    initials: "JM",
    name: "Joaquín Moyano",
    channel: "ig",
    preview: "hola buenas, me pasan precio de corte?",
    time: "14h",
    tag: "consulta",
    suggestion:
      "¡Hola! Corte $16.000 · Barba $10.000 · Corte y Barba $20.000. Atendemos por orden de llegada, Lun–Sáb 10 a 21 hs.",
    thread: [
      { side: "in", text: "hola buenas, me pasan precio de corte?" },
    ],
  },
  {
    id: "bm",
    initials: "BM",
    name: "Bautista Moreno",
    channel: "wa",
    preview: "gracias por el corte maestro",
    time: "9h",
    tag: "venta",
    suggestion:
      "¡Gracias por venir, Bauti! Dejá tu reseña acá: g.page/monaco-barber · te esperamos en la próxima 🙌",
    thread: [
      { side: "out", text: "Hola Bauti, ¿cómo estuvo tu experiencia hoy?" },
      { side: "in", text: "gracias por el corte maestro" },
    ],
  },
  {
    id: "mj",
    initials: "MJ",
    name: "Juan Montanari",
    channel: "wa",
    preview: "necesito reservar turno viernes",
    time: "10h",
    tag: "turno",
    suggestion:
      "Te paso el link para reservar: monaco.app/reserva — elegí día, hora y barbero. Confirmación automática.",
    thread: [
      { side: "in", text: "necesito reservar turno viernes" },
    ],
  },
  {
    id: "fp",
    initials: "FP",
    name: "Franco Pinetti",
    channel: "wa",
    preview: "ayer me atendieron tarde",
    time: "10h",
    tag: "reclamo",
    suggestion:
      "Franco, lamento lo de ayer — te creo un caso y me ocupo personal. ¿Me confirmás la hora aproximada?",
    thread: [
      { side: "in", text: "ayer me atendieron tarde" },
    ],
  },
  {
    id: "lr",
    initials: "LR",
    name: "Lucas Rivero",
    channel: "ig",
    preview: "tienen productos Reuzel?",
    time: "1d",
    tag: "consulta",
    suggestion:
      "Sí, tenemos Pig · Grease · Extreme Hold. ¿Cuál necesitás?",
    thread: [{ side: "in", text: "tienen productos Reuzel?" }],
  },
];

export default function CRMPage() {
  const [activeId, setActiveId] = useState(chats[0].id);
  const [channel, setChannel] = useState<"all" | "wa" | "ig">("all");
  const [typed, setTyped] = useState("");
  const [input, setInput] = useState("");
  const active = chats.find((c) => c.id === activeId)!;

  // Simulate IA typing with requestAnimationFrame (smoother, frame-synced)
  useEffect(() => {
    setTyped("");
    const text = active.suggestion;
    const startTime = performance.now();
    const charsPerMs = 1 / 14;
    let rafId = 0;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const i = Math.min(text.length, Math.floor(elapsed * charsPerMs));
      setTyped(text.slice(0, i));
      if (i < text.length) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [activeId, active.suggestion]);

  const filtered = chats.filter((c) => channel === "all" || c.channel === channel);

  return (
    <ProductShell
      kicker="● Módulo · CRM"
      title={
        <>
          Un inbox.{" "}
          <span className="gradient-text-neon">Todos los canales.</span>
          <br />
          Tu equipo en un solo lado.
        </>
      }
      description={
        <>
          WhatsApp Business API + Instagram oficial. Auto-tagging con IA,
          sugerencias de respuesta, segmentación y workflows con drag-and-drop.
        </>
      }
      related={[
        { href: "/check-in", label: "Check-in Face ID" },
        { href: "/estadisticas", label: "Estadísticas" },
        { href: "/equipo", label: "Equipo" },
      ]}
    >
      <ProductSection
        kicker="Inbox en vivo"
        title={
          <>
            Tocá cualquier chat.{" "}
            <span className="gradient-text-neon">Mirá la IA sugerir.</span>
          </>
        }
        lead="Cambiá el filtro de canal, abrí un chat, y observá la respuesta generada por IA mientras tipea."
      >
        <SystemWindow
          url="monaco-smart-barber.vercel.app/mensajeria"
          activeModule="mensajeria"
          breadcrumb="CRM"
          title="Mensajería"
          subtitle="127 conversaciones activas · 3 sin responder"
          topActions={
            <>
              <Chip active={channel === "all"} onClick={() => setChannel("all")}>
                <Filter className="h-3 w-3" /> Todos
              </Chip>
              <Chip active={channel === "wa"} onClick={() => setChannel("wa")}>
                WhatsApp
              </Chip>
              <Chip active={channel === "ig"} onClick={() => setChannel("ig")}>
                <Instagram className="h-3 w-3" /> Instagram
              </Chip>
            </>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] rounded-2xl border border-white/10 overflow-hidden bg-ink-950/40">
            {/* Chat list */}
            <div className="border-b md:border-b-0 md:border-r border-white/5 md:min-h-[480px] overflow-hidden">
              <div className="px-3 py-2 text-[10px] uppercase tracking-[0.15em] text-mist-500 border-b border-white/5 sticky top-0 bg-ink-950/80 backdrop-blur z-10">
                Inbox · {filtered.length}
              </div>
              <div className="flex md:block md:divide-y md:divide-white/5 overflow-x-auto md:overflow-x-visible md:overflow-y-auto md:max-h-[440px] snap-x md:snap-none">
                {filtered.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setActiveId(c.id)}
                    className={`flex shrink-0 w-[180px] md:w-full items-start gap-2.5 px-3 py-2.5 text-left snap-start transition-colors border-r md:border-r-0 border-white/5 ${
                      c.id === activeId ? "bg-white/[0.04] md:bg-white/[0.04]" : "hover:bg-white/[0.02]"
                    }`}
                  >
                    <div className="relative">
                      <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-neon-400 text-[10px] font-semibold text-ink-950">
                        {c.initials}
                      </span>
                      <span
                        className={`absolute -bottom-1 -right-1 grid h-4 w-4 place-items-center rounded-full border-2 border-ink-950 ${
                          c.channel === "wa"
                            ? "bg-[#25D366]"
                            : "bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#515bd4]"
                        }`}
                      >
                        <span className="text-[7px] font-bold text-white">
                          {c.channel === "wa" ? "W" : "@"}
                        </span>
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[12px] font-medium text-white truncate">
                          {c.name}
                        </span>
                        <span className="shrink-0 text-[10px] text-mist-500">
                          {c.time}
                        </span>
                      </div>
                      <div className="text-[11px] text-mist-400 truncate">
                        {c.preview}
                      </div>
                      <Tag
                        tone={
                          c.tag === "reclamo"
                            ? "red"
                            : c.tag === "venta"
                            ? "neon"
                            : c.tag === "turno"
                            ? "violet"
                            : "sky"
                        }
                        className="mt-1"
                      >
                        {c.tag}
                      </Tag>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Thread */}
            <div className="flex min-h-[420px] flex-col md:min-h-[480px]">
              <div className="flex items-center gap-2 border-b border-white/5 bg-black/30 px-3 sm:px-4 py-2.5">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-neon-400 text-[10px] font-semibold text-ink-950">
                  {active.initials}
                </span>
                <div className="min-w-0 text-[13px]">
                  <span className="font-medium text-white truncate">{active.name}</span>{" "}
                  <span className="text-mist-500">·</span>{" "}
                  <span className="text-mist-400">
                    {active.channel === "wa" ? "WhatsApp" : "Instagram"}
                  </span>
                </div>
                <Tag tone="amber" className="ml-auto shrink-0 hidden sm:inline-flex">
                  Cliente recurrente
                </Tag>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-1 flex-col gap-2 p-3 sm:p-4"
                >
                  {active.thread.map((m, i) => (
                    <div
                      key={i}
                      className={`flex ${
                        m.side === "out" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-[13px] leading-relaxed ${
                          m.side === "out"
                            ? "border border-neon-400/30 bg-neon-600/20 text-mist-100"
                            : "border border-white/10 bg-white/5 text-mist-200"
                        }`}
                      >
                        {m.text}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* IA suggestion composer */}
              <div className="p-3 sm:p-4 pt-0">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                  <div className="flex items-center gap-2 pb-2 border-b border-white/5">
                    <Sparkles className="h-3.5 w-3.5 text-neon-300 shrink-0" />
                    <span className="text-[11px] uppercase tracking-[0.12em] text-neon-300">
                      IA · sugerencia
                    </span>
                    <span className="ml-auto hidden sm:inline text-[10px] text-mist-500">
                      Anthropic · Claude
                    </span>
                  </div>
                  <div className="pt-2.5 text-[13px] leading-relaxed text-mist-100 min-h-[56px]">
                    {typed}
                    {typed.length < active.suggestion.length && (
                      <span className="ml-0.5 inline-block h-3 w-1.5 -mb-0.5 animate-pulse bg-neon-400" />
                    )}
                  </div>
                  <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="O escribí una respuesta manual..."
                      className="flex-1 rounded-lg border border-white/10 bg-ink-950 px-3 py-2 text-[13px] text-white placeholder:text-mist-500 focus:outline-none focus:border-white/30"
                    />
                    <div className="flex items-center gap-2">
                      <button className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1 rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-2 text-[11px] text-mist-200 hover:bg-white/[0.06]">
                        Editar IA
                      </button>
                      <button
                        onClick={() => {
                          setInput("");
                        }}
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1 rounded-lg bg-gradient-to-b from-neon-300 to-neon-500 px-3 py-2 text-[11px] font-semibold text-ink-950"
                      >
                        <Send className="h-3 w-3" /> Enviar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SystemWindow>
      </ProductSection>

      <ProductSection
        kicker="Workflows visuales · drag & drop"
        title={
          <>
            Armá la lógica de tu CRM{" "}
            <span className="gradient-text-neon">arrastrando nodos.</span>
          </>
        }
        lead={
          <>
            Editor real. Arrastrá los nodos, tocá para seleccionar y ver
            propiedades. Conexiones se actualizan solas. El nodo seleccionado
            muestra su partícula viajando por el flujo.
          </>
        }
      >
        <WorkflowEditor />
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
          <InfoCard
            icon={<Bot className="h-4 w-4" />}
            title="IA integrada"
            desc="OpenAI · Anthropic · OpenRouter. Auto-tagging, sugerencias, respuestas fuera de horario."
            tone="violet"
          />
          <InfoCard
            icon={<Shield className="h-4 w-4" />}
            title="Alertas automáticas"
            desc="Cliente deja feedback negativo → alerta urgente al manager. Antes de que escale."
            tone="amber"
          />
          <InfoCard
            icon={<Clock className="h-4 w-4" />}
            title="Broadcasts segmentados"
            desc="Nuevos, regulares, VIP, en riesgo. El sistema los clasifica solo."
            tone="neon"
          />
        </div>
      </ProductSection>

      <ProductSection
        kicker="Automatización de reseñas"
        title={
          <>
            El flujo que pasó Monaco de{" "}
            <span className="gradient-text-neon">40 a 600 reseñas</span> en 4 meses.
          </>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <FlowStep
            num="1"
            title="Cierre de servicio"
            desc="El barbero marca el corte como finalizado."
          />
          <FlowStep
            num="2"
            title="WhatsApp automático"
            desc="“¿Cómo estuvo tu experiencia?” con 5 estrellas."
            tone="neon"
          />
          <div className="grid grid-cols-2 gap-3 md:col-span-1 md:grid-cols-1">
            <FlowStep
              num="3a"
              title="5 estrellas"
              desc="→ Google Maps directo"
              tone="success"
              small
            />
            <FlowStep
              num="3b"
              title="≤3 estrellas"
              desc="→ CRM privado · caso abierto"
              tone="warning"
              small
            />
          </div>
        </div>
      </ProductSection>
    </ProductShell>
  );
}

function WorkflowNode({
  title,
  sub,
  tone,
  className,
}: {
  title: string;
  sub: string;
  tone: "violet" | "neon" | "amber";
  className?: string;
}) {
  const tones = {
    violet: "border-violet-500/30 bg-violet-500/10 text-violet-300",
    neon: "border-neon-400/30 bg-neon-400/10 text-neon-300",
    amber: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  } as const;
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`relative inline-flex items-center gap-3 rounded-xl border px-3 py-2.5 max-w-xs ${tones[tone]} ${className || ""}`}
    >
      <Workflow className="h-3.5 w-3.5" />
      <div>
        <div className="text-[10px] uppercase tracking-[0.15em] opacity-80">
          {title}
        </div>
        <div className="text-[13px] font-medium text-white">{sub}</div>
      </div>
    </motion.div>
  );
}

function InfoCard({
  icon,
  title,
  desc,
  tone,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  tone: "violet" | "neon" | "amber";
}) {
  const tones = {
    violet:
      "border-violet-500/20 bg-violet-500/[0.04] text-violet-300",
    neon: "border-neon-400/20 bg-neon-400/[0.04] text-neon-300",
    amber: "border-amber-500/20 bg-amber-500/[0.04] text-amber-400",
  } as const;
  return (
    <div className={`rounded-2xl border p-4 ${tones[tone]}`}>
      <div className="flex items-center gap-2">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-white/[0.03] border border-white/10 text-current">
          {icon}
        </span>
        <span className="text-[13px] font-semibold text-white">{title}</span>
      </div>
      <p className="mt-2 text-[12px] leading-relaxed text-mist-300">{desc}</p>
    </div>
  );
}

function FlowStep({
  num,
  title,
  desc,
  tone = "neutral",
  small,
}: {
  num: string;
  title: React.ReactNode;
  desc: string;
  tone?: "neutral" | "neon" | "success" | "warning";
  small?: boolean;
}) {
  const bgs = {
    neutral: "border-white/10 bg-white/[0.02]",
    neon: "border-neon-400/30 bg-neon-400/[0.06]",
    success:
      "border-neon-400/30 bg-gradient-to-br from-neon-400/10 to-transparent",
    warning: "border-amber-500/30 bg-amber-500/[0.06]",
  };
  const pills = {
    neutral: "bg-white/5 text-mist-300 border-white/10",
    neon: "bg-neon-400/15 text-neon-300 border-neon-400/30",
    success: "bg-neon-400 text-ink-950 border-neon-400",
    warning: "bg-amber-500 text-ink-950 border-amber-500",
  };
  return (
    <div className={`rounded-2xl border ${bgs[tone]} ${small ? "p-3.5" : "p-5"}`}>
      <div
        className={`inline-flex items-center gap-1.5 rounded-md border px-1.5 py-0.5 text-[10px] font-mono ${pills[tone]}`}
      >
        {num}
      </div>
      <div className="mt-2.5 text-[15px] font-semibold text-white">{title}</div>
      <div className="mt-1 text-[13px] text-mist-400">{desc}</div>
    </div>
  );
}
