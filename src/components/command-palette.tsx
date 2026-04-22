"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  BadgeDollarSign,
  BarChart3,
  Home,
  MessageSquare,
  ScanFace,
  Scissors,
  Search,
  SquareArrowOutUpRight,
  Users,
  Command,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useWaitlist } from "@/components/waitlist/waitlist-provider";

type Item = {
  href?: string;
  action?: "waitlist";
  label: string;
  icon: React.ElementType;
  hint: string;
};

const items: Item[] = [
  { href: "/", label: "Inicio", icon: Home, hint: "ir al home" },
  { href: "/check-in", label: "Check-in · Face ID", icon: ScanFace, hint: "terminal de entrada" },
  { href: "/panel", label: "Panel del barbero", icon: Scissors, hint: "cola + ficha cliente" },
  { href: "/crm", label: "CRM + Mensajería", icon: MessageSquare, hint: "inbox unificado" },
  { href: "/estadisticas", label: "Estadísticas", icon: BarChart3, hint: "KPIs y tendencias" },
  { href: "/finanzas", label: "Finanzas", icon: BadgeDollarSign, hint: "sueldos, comisiones" },
  { href: "/equipo", label: "Equipo", icon: Users, hint: "asistencia con Face ID" },
  { action: "waitlist", label: "Agendar demo", icon: SquareArrowOutUpRight, hint: "15 min" },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const waitlist = useWaitlist();

  const activate = (it: Item) => {
    setOpen(false);
    if (it.action === "waitlist") {
      setTimeout(() => waitlist.open(), 100);
    } else if (it.href) {
      window.location.href = it.href;
    }
  };

  const filtered = items.filter((it) => {
    if (!q.trim()) return true;
    const h = q.toLowerCase();
    return (
      it.label.toLowerCase().includes(h) || it.hint.toLowerCase().includes(h)
    );
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
      } else if (open) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setSel((s) => Math.min(s + 1, filtered.length - 1));
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setSel((s) => Math.max(s - 1, 0));
        } else if (e.key === "Enter" && filtered[sel]) {
          e.preventDefault();
          activate(filtered[sel]);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, sel]);

  useEffect(() => {
    if (open) {
      setSel(0);
      setQ("");
      setTimeout(() => inputRef.current?.focus(), 40);
    }
  }, [open]);

  useEffect(() => {
    setSel(0);
  }, [q]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh] sm:pt-[18vh]"
          onClick={() => setOpen(false)}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: -12, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: -8, scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-ink-900/95 shadow-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
              <Search className="h-4 w-4 text-mist-400" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscar módulos, páginas, acciones…"
                className="flex-1 bg-transparent text-sm text-white placeholder:text-mist-500 focus:outline-none"
              />
              <kbd className="rounded border border-white/10 bg-white/[0.03] px-1.5 py-0.5 text-[10px] text-mist-400">
                esc
              </kbd>
            </div>
            <div className="max-h-[50vh] overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <div className="px-4 py-6 text-center text-sm text-mist-400">
                  No hay resultados.
                </div>
              ) : (
                filtered.map((it, i) => {
                  const Icon = it.icon;
                  const rowClass = cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                    i === sel ? "bg-white/[0.06]" : "hover:bg-white/[0.03]"
                  );
                  const body = (
                    <>
                      <span
                        className={cn(
                          "grid h-8 w-8 place-items-center rounded-md border",
                          i === sel
                            ? "border-neon-400/30 bg-neon-400/10 text-neon-300"
                            : "border-white/10 bg-white/[0.02] text-mist-300"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="text-[13px] font-medium text-white">
                          {it.label}
                        </div>
                        <div className="text-[11px] text-mist-400">{it.hint}</div>
                      </div>
                      {i === sel && (
                        <kbd className="rounded border border-white/10 bg-white/[0.03] px-1.5 py-0.5 text-[10px] text-mist-400">
                          ↵
                        </kbd>
                      )}
                    </>
                  );
                  if (it.action) {
                    return (
                      <button
                        key={it.label}
                        type="button"
                        onClick={() => activate(it)}
                        onMouseEnter={() => setSel(i)}
                        className={rowClass}
                      >
                        {body}
                      </button>
                    );
                  }
                  return (
                    <Link
                      key={(it.href ?? "") + it.label}
                      href={it.href ?? "/"}
                      onClick={() => setOpen(false)}
                      className={rowClass}
                      onMouseEnter={() => setSel(i)}
                    >
                      {body}
                    </Link>
                  );
                })
              )}
            </div>
            <div className="flex items-center justify-between border-t border-white/5 px-4 py-2 text-[10px] text-mist-500">
              <span>↑↓ navegar · ↵ ir</span>
              <span className="inline-flex items-center gap-1">
                <Command className="h-3 w-3" />K
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function CommandTrigger({
  className,
}: {
  className?: string;
}) {
  const [mac, setMac] = useState(true);
  useEffect(() => {
    setMac(/Mac|iPhone|iPad/.test(navigator.platform));
  }, []);
  return (
    <button
      type="button"
      onClick={() => {
        const ev = new KeyboardEvent("keydown", {
          key: "k",
          metaKey: true,
          bubbles: true,
        });
        window.dispatchEvent(ev);
      }}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] text-mist-400 transition-colors hover:text-white hover:bg-white/[0.06]",
        className
      )}
    >
      <Search className="h-3 w-3" />
      <span>Buscar</span>
      <kbd className="rounded border border-white/10 bg-white/[0.02] px-1 text-[10px]">
        {mac ? "⌘" : "Ctrl"} K
      </kbd>
    </button>
  );
}
