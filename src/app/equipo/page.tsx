"use client";

import { ProductShell, ProductSection } from "@/components/product/product-shell";
import { SystemWindow, Chip, Tag } from "@/components/product/system-window";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Calendar,
  CheckCircle2,
  Clock3,
  LayoutList,
  ScanFace,
  Shield,
  Square,
  Users,
  XCircle,
} from "lucide-react";

type View = "asistencia" | "perfiles" | "stats";

const members = [
  {
    id: "tony",
    name: "Tony Ramírez",
    role: "Co-founder · Dueño",
    branch: "Rondeau",
    checkIn: "09:42",
    status: "present",
    cuts: 140,
    revenue: 1860,
    commission: 1023,
    clients: 128,
  },
  {
    id: "nico",
    name: "Nico Maidana",
    role: "Barbero senior",
    branch: "Rondeau",
    checkIn: "10:01",
    status: "present",
    cuts: 112,
    revenue: 1520,
    commission: 836,
    clients: 98,
  },
  {
    id: "chipi",
    name: "Chipi",
    role: "Barbero",
    branch: "Paraná 419",
    checkIn: "10:18",
    status: "late",
    cuts: 88,
    revenue: 1240,
    commission: 620,
    clients: 82,
  },
  {
    id: "fab",
    name: "Fabrizio Galeassi",
    role: "Barbero",
    branch: "Caseros 344",
    checkIn: "10:05",
    status: "present",
    cuts: 96,
    revenue: 1340,
    commission: 670,
    clients: 88,
  },
  {
    id: "simon",
    name: "Simón Bongeovanni",
    role: "Barbero",
    branch: "Rondeau",
    checkIn: "—",
    status: "absent",
    cuts: 0,
    revenue: 0,
    commission: 0,
    clients: 0,
  },
];

export default function TeamPage() {
  const [view, setView] = useState<View>("asistencia");
  const [selected, setSelected] = useState(members[0].id);
  const sel = members.find((m) => m.id === selected)!;

  return (
    <ProductShell
      kicker="● Módulo · Equipo"
      title={
        <>
          Los barberos trabajan.{" "}
          <span className="gradient-text-neon">Vos medís.</span>
        </>
      }
      description={
        <>
          Fichaje con Face ID o PIN. Disciplina automática. Agenda visual con
          drag-and-drop. Roles granulares por sucursal. Multi-sucursal nativo.
        </>
      }
      related={[
        { href: "/finanzas", label: "Finanzas · sueldos" },
        { href: "/panel", label: "Panel del barbero" },
        { href: "/estadisticas", label: "Estadísticas" },
      ]}
    >
      <ProductSection
        kicker="Vista del equipo"
        title={
          <>
            Tocá un barbero.{" "}
            <span className="gradient-text-neon">Ve todo su perfil.</span>
          </>
        }
        lead="Alterná entre asistencia del día, perfiles completos y estadísticas por barbero."
      >
        <SystemWindow
          url="monaco-smart-barber.vercel.app/equipo"
          activeModule="equipo"
          breadcrumb="Admin"
          title="Equipo · Monaco Barber"
          subtitle={`${members.filter((m) => m.status !== "absent").length} en turno · ${members.length} total`}
          topActions={
            <>
              <Chip active={view === "asistencia"} onClick={() => setView("asistencia")}>
                <Clock3 className="h-3 w-3" /> Asistencia
              </Chip>
              <Chip active={view === "perfiles"} onClick={() => setView("perfiles")}>
                <LayoutList className="h-3 w-3" /> Perfiles
              </Chip>
              <Chip active={view === "stats"} onClick={() => setView("stats")}>
                <Users className="h-3 w-3" /> Stats
              </Chip>
            </>
          }
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-4">
            {/* Left column: list */}
            <div className="rounded-2xl border border-white/10 bg-ink-950/40 overflow-hidden">
              <div className="border-b border-white/5 px-4 py-2.5 text-[10px] uppercase tracking-[0.15em] text-mist-500 flex items-center gap-2">
                {view === "asistencia" && "Hoy · lun 21 abr"}
                {view === "perfiles" && "Perfiles"}
                {view === "stats" && "Rendimiento del mes"}
                <span className="ml-auto text-[10px] text-mist-500">
                  {members.length} miembros
                </span>
              </div>
              <div className="divide-y divide-white/5 max-h-[420px] overflow-y-auto">
                {members.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelected(m.id)}
                    className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${
                      selected === m.id ? "bg-white/[0.04]" : "hover:bg-white/[0.02]"
                    }`}
                  >
                    <div
                      className={`h-8 w-8 rounded-full grid place-items-center text-[11px] font-semibold ${
                        m.status === "absent"
                          ? "bg-white/5 border border-white/10 text-mist-500"
                          : "bg-gradient-to-br from-neon-400 to-violet-500 text-ink-950"
                      }`}
                    >
                      {m.name
                        .split(" ")
                        .map((p) => p[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[13px] font-medium text-white">
                        {m.name}
                      </div>
                      <div className="text-[11px] text-mist-400">
                        {view === "stats"
                          ? `${m.cuts} cortes · $${m.revenue}k`
                          : `${m.role} · ${m.branch}`}
                      </div>
                    </div>
                    {view === "asistencia" && <StatusBadge s={m.status} />}
                    {view === "perfiles" && (
                      <Tag>{m.branch.split(" ")[0]}</Tag>
                    )}
                    {view === "stats" && (
                      <span className="text-[11px] font-semibold tabular-nums text-white">
                        {m.cuts}
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <div className="border-t border-white/5 bg-black/20 p-3">
                <div className="flex items-center gap-2 text-[11px] text-mist-400">
                  <ScanFace className="h-3 w-3 text-neon-300" />
                  Fichaje con Face ID o PIN de 4 dígitos
                </div>
              </div>
            </div>

            {/* Right column: detail */}
            <AnimatePresence mode="wait">
              <motion.div
                key={sel.id + view}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border border-white/10 bg-ink-950/40 p-5"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`h-14 w-14 rounded-2xl grid place-items-center text-lg font-semibold ${
                      sel.status === "absent"
                        ? "bg-white/5 border border-white/10 text-mist-500"
                        : "bg-gradient-to-br from-neon-400 to-violet-500 text-ink-950"
                    }`}
                  >
                    {sel.name
                      .split(" ")
                      .map((p) => p[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-lg font-semibold text-white">
                      {sel.name}
                    </div>
                    <div className="text-[12px] text-mist-400">
                      {sel.role} · {sel.branch}
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <StatusBadge s={sel.status} />
                      {sel.status !== "absent" && (
                        <span className="text-[11px] text-mist-400">
                          Ingreso · {sel.checkIn}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-2">
                  <StatBox label="Cortes mes" value={sel.cuts.toLocaleString()} />
                  <StatBox label="Facturación" value={`$${sel.revenue}k`} />
                  <StatBox label="Comisión" value={`$${sel.commission}k`} />
                  <StatBox label="Clientes" value={sel.clients.toLocaleString()} />
                </div>

                <div className="mt-5 rounded-xl border border-violet-500/20 bg-violet-500/5 p-3.5 text-[12px] text-mist-200">
                  <div className="flex items-center gap-2 text-violet-300 font-medium">
                    <Shield className="h-3.5 w-3.5" />
                    Permisos del rol
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {(sel.role.includes("Dueño")
                      ? ["Global", "Finanzas", "Equipo", "Config"]
                      : sel.role.includes("senior")
                      ? ["Fila", "Caja", "CRM"]
                      : ["Fila", "Caja"]
                    ).map((p) => (
                      <Tag key={p}>{p}</Tag>
                    ))}
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2">
                  <button className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-b from-neon-300 to-neon-500 px-3 py-2 text-[12px] font-semibold text-ink-950">
                    <Clock3 className="h-3.5 w-3.5" /> Registrar fichaje
                  </button>
                  <button className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-[12px] text-white">
                    <Calendar className="h-3.5 w-3.5" /> Ver agenda
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </SystemWindow>
      </ProductSection>

      <ProductSection
        kicker="Lo que viene detrás"
        title={
          <>
            Control del equipo{" "}
            <span className="gradient-text-neon">sin drama.</span>
          </>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            [
              <ScanFace key="1" className="h-4 w-4" />,
              "Fichaje con Face ID",
              "Nadie marca por otro. Fin de la discusión.",
            ],
            [
              <Clock3 key="2" className="h-4 w-4" />,
              "Asistencia automática",
              "Presente, tarde, ausente. Registrado con fecha y hora.",
            ],
            [
              <Square key="3" className="h-4 w-4" />,
              "Disciplina configurable",
              "Faltas y tardanzas: warning, descuento, pérdida de incentivo.",
            ],
            [
              <Calendar key="4" className="h-4 w-4" />,
              "Descansos y turnos",
              "Aprobación rápida desde el celular.",
            ],
            [
              <Shield key="5" className="h-4 w-4" />,
              "Roles granulares",
              "Dueño, manager, barbero, recepción. Por sucursal.",
            ],
            [
              <Users key="6" className="h-4 w-4" />,
              "Multi-sucursal nativo",
              "Barberos que rotan: comisión correcta sin planilla.",
            ],
          ].map(([icon, t, d]) => (
            <div
              key={t as string}
              className="rounded-2xl border border-white/10 bg-ink-850/40 p-5"
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl border border-violet-500/20 bg-violet-500/10 text-violet-300">
                {icon}
              </span>
              <h3 className="mt-3 text-[15px] font-semibold text-white">
                {t}
              </h3>
              <p className="mt-1 text-sm text-mist-400">{d}</p>
            </div>
          ))}
        </div>
      </ProductSection>
    </ProductShell>
  );
}

function StatusBadge({ s }: { s: string }) {
  if (s === "present")
    return (
      <Tag tone="neon">
        <CheckCircle2 className="h-3 w-3" /> Presente
      </Tag>
    );
  if (s === "late")
    return (
      <Tag tone="amber">
        <Clock3 className="h-3 w-3" /> Tarde
      </Tag>
    );
  return (
    <Tag tone="red">
      <XCircle className="h-3 w-3" /> Ausente
    </Tag>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
      <div className="text-[10px] uppercase tracking-[0.15em] text-mist-500">
        {label}
      </div>
      <div className="mt-1 text-[15px] font-semibold text-white tabular-nums">
        {value}
      </div>
    </div>
  );
}
