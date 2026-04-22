"use client";

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";
import { useState } from "react";
import {
  Bell,
  Bot,
  Clock,
  Copy,
  GitFork,
  LayoutGrid,
  MessageCircle,
  MessageSquare,
  Plus,
  Save,
  Trash2,
  Undo2,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

type NodeType =
  | "trigger"
  | "action"
  | "buttons"
  | "condition"
  | "wait"
  | "ai"
  | "alert";

type NodeData = {
  id: string;
  type: NodeType;
  title: string;
  body: string;
  x: number;
  y: number;
};

type Edge = {
  from: string;
  fromHandle?: "si" | "no" | "otro";
  to: string;
};

const NODE_W = 230;
const NODE_H = 88;
const CANVAS_W = 820;
const CANVAS_H = 1100;

const defaultNodes: NodeData[] = [
  {
    id: "trigger",
    type: "trigger",
    title: "Mensaje recibido",
    body: "Cuando se activa el workflow",
    x: 310,
    y: 40,
  },
  {
    id: "action-1",
    type: "action",
    title: "Enviar mensaje",
    body: "¡Hola! Gracias por elegir Monaco Barber Studio. 💈 Te pasamos la in...",
    x: 310,
    y: 200,
  },
  {
    id: "buttons",
    type: "buttons",
    title: "Enviar botones",
    body: "2 botones",
    x: 330,
    y: 360,
  },
  {
    id: "condition",
    type: "condition",
    title: "Condición",
    body: "2 rutas",
    x: 330,
    y: 510,
  },
  {
    id: "wait",
    type: "wait",
    title: "Esperar tiempo",
    body: "9s de espera",
    x: 80,
    y: 700,
  },
  {
    id: "ai",
    type: "ai",
    title: "Respuesta IA",
    body: "IA: gpt-4o-mini",
    x: 500,
    y: 790,
  },
  {
    id: "action-2",
    type: "action",
    title: "Enviar mensaje",
    body: "Que onda hermanoo, en qué te puedo ayudar?",
    x: 220,
    y: 880,
  },
  {
    id: "alert",
    type: "alert",
    title: "Alerta CRM",
    body: "warning: Responder Duda",
    x: 60,
    y: 1020,
  },
];

const defaultEdges: Edge[] = [
  { from: "trigger", to: "action-1" },
  { from: "action-1", to: "buttons" },
  { from: "buttons", to: "condition" },
  { from: "condition", fromHandle: "si", to: "wait" },
  { from: "condition", fromHandle: "no", to: "ai" },
  { from: "wait", to: "action-2" },
  { from: "action-2", to: "alert" },
];

const typeStyles: Record<
  NodeType,
  { icon: React.ElementType; iconClass: string; label: string }
> = {
  trigger: {
    icon: MessageCircle,
    iconClass:
      "bg-violet-500/15 text-violet-300 border-violet-500/40 shadow-[0_0_14px_-2px_rgba(139,92,246,0.5)]",
    label: "Trigger",
  },
  action: {
    icon: MessageSquare,
    iconClass:
      "bg-neon-400/15 text-neon-300 border-neon-400/40 shadow-[0_0_14px_-2px_rgba(36,224,140,0.45)]",
    label: "Acción",
  },
  buttons: {
    icon: LayoutGrid,
    iconClass:
      "bg-violet-500/15 text-violet-300 border-violet-500/40 shadow-[0_0_14px_-2px_rgba(139,92,246,0.5)]",
    label: "Botones",
  },
  condition: {
    icon: GitFork,
    iconClass:
      "bg-amber-500/15 text-amber-400 border-amber-500/40 shadow-[0_0_14px_-2px_rgba(245,158,11,0.45)]",
    label: "Condición",
  },
  wait: {
    icon: Clock,
    iconClass:
      "bg-neon-400/10 text-neon-300 border-neon-400/30 shadow-[0_0_14px_-2px_rgba(36,224,140,0.3)]",
    label: "Espera",
  },
  ai: {
    icon: Bot,
    iconClass:
      "bg-violet-500/15 text-violet-300 border-violet-500/40 shadow-[0_0_14px_-2px_rgba(139,92,246,0.5)]",
    label: "IA",
  },
  alert: {
    icon: Bell,
    iconClass:
      "bg-red-500/15 text-red-400 border-red-500/40 shadow-[0_0_14px_-2px_rgba(239,68,68,0.4)]",
    label: "Alerta",
  },
};

export function WorkflowEditor() {
  const [positions, setPositions] = useState(() => {
    const o: Record<string, { x: number; y: number }> = {};
    defaultNodes.forEach((n) => (o[n.id] = { x: n.x, y: n.y }));
    return o;
  });
  const [selected, setSelected] = useState<string>("ai");
  const [scale, setScale] = useState(1);

  const selectedNode = defaultNodes.find((n) => n.id === selected);
  const selectedMeta = selectedNode ? typeStyles[selectedNode.type] : null;

  return (
    <div className="relative rounded-3xl border border-white/10 bg-ink-950 overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 bg-black/50 px-3 py-2.5 sm:px-4">
        <div className="flex items-center gap-2 min-w-0">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/25 bg-violet-500/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-violet-300">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
            Workflow
          </span>
          <span className="truncate text-[13px] font-medium text-white">
            Responder consulta
          </span>
          <span className="hidden sm:inline text-mist-500">·</span>
          <span className="hidden sm:inline truncate text-[11px] text-mist-400">
            WhatsApp Business · activo
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button
            onClick={() => setScale((s) => Math.max(0.6, s - 0.1))}
            className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/[0.03] h-7 w-7 justify-center text-mist-300 hover:bg-white/[0.06]"
            aria-label="Alejar"
          >
            <ZoomOut className="h-3 w-3" />
          </button>
          <span className="rounded-md border border-white/10 bg-white/[0.02] px-2 py-1 text-[10px] tabular-nums text-mist-400">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={() => setScale((s) => Math.min(1.3, s + 0.1))}
            className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/[0.03] h-7 w-7 justify-center text-mist-300 hover:bg-white/[0.06]"
            aria-label="Acercar"
          >
            <ZoomIn className="h-3 w-3" />
          </button>
          <span className="mx-1 h-4 w-px bg-white/10" />
          <button className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 text-[11px] text-mist-200 hover:bg-white/[0.06]">
            <Plus className="h-3 w-3" /> Nodo
          </button>
          <button className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/[0.03] h-7 w-7 justify-center text-mist-300 hover:bg-white/[0.06]">
            <Undo2 className="h-3 w-3" />
          </button>
          <button className="inline-flex items-center gap-1 rounded-md bg-gradient-to-b from-neon-300 to-neon-500 px-2.5 py-1 text-[11px] font-semibold text-ink-950 hover:-translate-y-0.5 transition-transform">
            <Save className="h-3 w-3" /> Publicar
          </button>
        </div>
      </div>

      {/* Canvas + Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px]">
        {/* Canvas */}
        <div
          className="relative overflow-auto"
          style={{ height: 640 }}
          onPointerDown={(e) => {
            if (e.target === e.currentTarget) setSelected("");
          }}
        >
          <div
            className="relative bg-dotgrid origin-top-left"
            style={{
              width: CANVAS_W,
              height: CANVAS_H,
              transform: `scale(${scale})`,
              transformOrigin: "0 0",
            }}
          >
            {/* SVG edges */}
            <svg
              className="pointer-events-none absolute inset-0"
              width={CANVAS_W}
              height={CANVAS_H}
            >
              <defs>
                <marker
                  id="wf-arrow"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto"
                >
                  <path d="M0,0 L9,5 L0,10 z" fill="rgba(170,177,189,0.7)" />
                </marker>
              </defs>
              {defaultEdges.map((e, i) => (
                <EdgeLine
                  key={i}
                  edge={e}
                  positions={positions}
                  active={selected === e.from || selected === e.to}
                />
              ))}
            </svg>

            {/* Nodes */}
            {defaultNodes.map((n) => (
              <WfNode
                key={n.id}
                node={n}
                initialX={n.x}
                initialY={n.y}
                selected={selected === n.id}
                onSelect={() => setSelected(n.id)}
                onMove={(x, y) =>
                  setPositions((p) => ({ ...p, [n.id]: { x, y } }))
                }
              />
            ))}
          </div>

          {/* Helper hint */}
          <div className="pointer-events-none sticky bottom-3 left-3 mt-[-40px] ml-3 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/70 px-2.5 py-1 text-[10px] font-medium text-mist-300 backdrop-blur w-fit">
            <span className="h-1 w-1 rounded-full bg-neon-400" />
            arrastrá los nodos · tocá para seleccionar
          </div>
        </div>

        {/* Inspector */}
        <aside className="border-t lg:border-t-0 lg:border-l border-white/5 bg-ink-950/70 p-4 min-h-[180px]">
          {selectedNode && selectedMeta ? (
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "grid h-7 w-7 place-items-center rounded-md border",
                    selectedMeta.iconClass
                  )}
                >
                  <selectedMeta.icon className="h-3.5 w-3.5" />
                </span>
                <div className="min-w-0">
                  <div className="text-[10px] uppercase tracking-[0.12em] text-mist-400">
                    {selectedMeta.label}
                  </div>
                  <div className="truncate text-[13px] font-semibold text-white">
                    {selectedNode.title}
                  </div>
                </div>
              </div>
              <div className="mt-4 space-y-3">
                <Field label="Título">
                  <input
                    defaultValue={selectedNode.title}
                    className="w-full rounded-md border border-white/10 bg-white/[0.02] px-2.5 py-1.5 text-[12px] text-white placeholder:text-mist-500 focus:outline-none focus:border-white/30"
                  />
                </Field>
                <Field label="Contenido">
                  <textarea
                    defaultValue={selectedNode.body}
                    rows={3}
                    className="w-full rounded-md border border-white/10 bg-white/[0.02] px-2.5 py-1.5 text-[12px] text-white placeholder:text-mist-500 focus:outline-none focus:border-white/30 resize-none"
                  />
                </Field>
                <Field label="Canal">
                  <div className="grid grid-cols-2 gap-1.5">
                    <SmallChip active>WhatsApp</SmallChip>
                    <SmallChip>Instagram</SmallChip>
                  </div>
                </Field>
              </div>
              <div className="mt-4 flex items-center gap-1.5 border-t border-white/5 pt-3">
                <button className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.02] px-2.5 py-1 text-[11px] text-mist-200 hover:bg-white/[0.06]">
                  <Copy className="h-3 w-3" /> Duplicar
                </button>
                <button className="ml-auto inline-flex items-center gap-1.5 rounded-md border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-[11px] text-red-400 hover:bg-red-500/20">
                  <Trash2 className="h-3 w-3" /> Borrar
                </button>
              </div>
            </div>
          ) : (
            <div className="grid h-full place-items-center text-center">
              <div>
                <div className="mx-auto grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.02] text-mist-400">
                  <GitFork className="h-4 w-4" />
                </div>
                <p className="mt-3 text-[12px] text-mist-400 max-w-[180px]">
                  Seleccioná un nodo para ver sus propiedades y editarlo.
                </p>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1 block text-[10px] uppercase tracking-[0.12em] text-mist-500">
        {label}
      </label>
      {children}
    </div>
  );
}

function SmallChip({
  children,
  active,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center rounded-md border px-2 py-1 text-[11px]",
        active
          ? "border-neon-400/40 bg-neon-400/10 text-neon-300"
          : "border-white/10 bg-white/[0.02] text-mist-300"
      )}
    >
      {children}
    </button>
  );
}

function EdgeLine({
  edge,
  positions,
  active,
}: {
  edge: Edge;
  positions: Record<string, { x: number; y: number }>;
  active: boolean;
}) {
  const fromNode = defaultNodes.find((n) => n.id === edge.from)!;
  const toNode = defaultNodes.find((n) => n.id === edge.to)!;
  const from = positions[edge.from] || { x: fromNode.x, y: fromNode.y };
  const to = positions[edge.to] || { x: toNode.x, y: toNode.y };

  let startX = from.x + NODE_W / 2;
  const startY = from.y + NODE_H;

  if (fromNode.type === "condition" && edge.fromHandle) {
    const off =
      edge.fromHandle === "si"
        ? 0.25
        : edge.fromHandle === "no"
        ? 0.5
        : 0.75;
    startX = from.x + NODE_W * off;
  }

  const endX = to.x + NODE_W / 2;
  const endY = to.y;

  const dy = Math.max(40, Math.abs(endY - startY));
  const cp1Y = startY + dy * 0.5;
  const cp2Y = endY - dy * 0.5;

  const path = `M ${startX} ${startY} C ${startX} ${cp1Y}, ${endX} ${cp2Y}, ${endX} ${endY}`;

  return (
    <g>
      <path
        d={path}
        stroke={
          active ? "rgba(94,236,170,0.85)" : "rgba(170,177,189,0.55)"
        }
        strokeWidth={active ? 1.75 : 1.3}
        fill="none"
        markerEnd="url(#wf-arrow)"
        strokeLinecap="round"
      />
      {/* flowing particle for active edge */}
      {active && (
        <circle r="2.5" fill="#5eecaa">
          <animateMotion dur="1.4s" repeatCount="indefinite" path={path} />
        </circle>
      )}
      <circle
        cx={startX}
        cy={startY}
        r={3}
        fill={active ? "#5eecaa" : "rgba(170,177,189,0.6)"}
      />
      <circle
        cx={endX}
        cy={endY}
        r={3}
        fill={active ? "#5eecaa" : "rgba(170,177,189,0.4)"}
      />
      {fromNode.type === "condition" && edge.fromHandle && (
        <text
          x={startX}
          y={startY + 18}
          textAnchor="middle"
          fontSize="10"
          fill="rgba(170,177,189,0.75)"
          fontWeight="500"
        >
          {edge.fromHandle === "si"
            ? "Sí"
            : edge.fromHandle === "no"
            ? "No"
            : "Otro"}
        </text>
      )}
    </g>
  );
}

function WfNode({
  node,
  initialX,
  initialY,
  selected,
  onSelect,
  onMove,
}: {
  node: NodeData;
  initialX: number;
  initialY: number;
  selected: boolean;
  onSelect: () => void;
  onMove: (x: number, y: number) => void;
}) {
  const x = useMotionValue(initialX);
  const y = useMotionValue(initialY);

  useMotionValueEvent(x, "change", (v) => onMove(v, y.get()));
  useMotionValueEvent(y, "change", (v) => onMove(x.get(), v));

  const { icon: Icon, iconClass } = typeStyles[node.type];

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragConstraints={{
        left: 0,
        top: 0,
        right: CANVAS_W - NODE_W,
        bottom: CANVAS_H - NODE_H,
      }}
      onPointerDown={onSelect}
      style={{ x, y, position: "absolute", width: NODE_W }}
      whileDrag={{ zIndex: 30, scale: 1.03 }}
      transition={{ duration: 0 }}
      className={cn(
        "select-none rounded-xl border bg-gradient-to-b from-ink-850 to-ink-900 shadow-panel cursor-grab active:cursor-grabbing transition-colors",
        selected
          ? "border-neon-400 shadow-[0_0_0_1px_rgba(36,224,140,0.65),0_0_40px_-6px_rgba(36,224,140,0.55)]"
          : "border-white/10 hover:border-white/25"
      )}
    >
      {/* input handle */}
      {node.type !== "trigger" && (
        <span
          aria-hidden="true"
          className={cn(
            "absolute -top-[5px] left-1/2 -translate-x-1/2 h-2.5 w-2.5 rounded-full border bg-ink-950 transition-colors",
            selected ? "border-neon-400" : "border-white/40"
          )}
        />
      )}

      {/* Header */}
      <div className="flex items-center gap-2 px-2.5 py-2 border-b border-white/5">
        <span className={cn("grid h-6 w-6 place-items-center rounded-md border", iconClass)}>
          <Icon className="h-3.5 w-3.5" />
        </span>
        <span className="text-[13px] font-medium text-white truncate flex-1">
          {node.title}
        </span>
        <button
          type="button"
          onClick={(e) => e.stopPropagation()}
          className="text-mist-500 hover:text-red-400 transition-colors"
          aria-label="Borrar nodo"
        >
          <Trash2 className="h-3 w-3" />
        </button>
      </div>

      {/* Body */}
      <div className="px-2.5 py-2 text-[11px] text-mist-400 leading-snug overflow-hidden">
        <span className="line-clamp-2">{node.body}</span>
      </div>

      {/* output handle(s) */}
      {node.type === "condition" ? (
        ["si", "no", "otro"].map((h, i) => {
          const offs = [0.25, 0.5, 0.75];
          return (
            <span
              key={h}
              aria-hidden="true"
              className={cn(
                "absolute -bottom-[5px] h-2.5 w-2.5 rounded-full border bg-ink-950 transition-colors",
                selected ? "border-neon-400" : "border-white/40"
              )}
              style={{ left: `calc(${offs[i] * 100}% - 5px)` }}
            />
          );
        })
      ) : (
        <span
          aria-hidden="true"
          className={cn(
            "absolute -bottom-[5px] left-1/2 -translate-x-1/2 h-2.5 w-2.5 rounded-full border bg-ink-950 transition-colors",
            selected ? "border-neon-400" : "border-white/40"
          )}
        />
      )}
    </motion.div>
  );
}
