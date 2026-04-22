"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Command, Menu, X } from "lucide-react";
import { Magnetic } from "@/components/ui/magnetic";
import { useWaitlist } from "@/components/waitlist/waitlist-provider";

const links = [
  { href: "/check-in", label: "Check-in" },
  { href: "/panel", label: "Panel" },
  { href: "/crm", label: "CRM" },
  { href: "/estadisticas", label: "Estadísticas" },
  { href: "/finanzas", label: "Finanzas" },
  { href: "/equipo", label: "Equipo" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mac, setMac] = useState(true);
  const pathname = usePathname();
  const waitlist = useWaitlist();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setMac(/Mac|iPhone|iPad/.test(navigator.platform));
    }
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const openCmd = () => {
    const ev = new KeyboardEvent("keydown", {
      key: "k",
      metaKey: true,
      bubbles: true,
    });
    window.dispatchEvent(ev);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 px-3",
        scrolled ? "py-2" : "py-3 sm:py-4"
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full px-3 sm:px-4 transition-all duration-300",
          scrolled
            ? "glass-strong h-12 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]"
            : "bg-transparent h-12 sm:h-14"
        )}
      >
        <Link href="/" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-0.5">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "relative rounded-full px-3 py-1.5 text-sm transition-colors",
                  active ? "text-white" : "text-mist-300 hover:text-white"
                )}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/[0.06] border border-white/10"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                )}
                <span className="relative z-[1]">{l.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openCmd}
            aria-label="Buscar"
            className="hidden lg:inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-[11px] text-mist-400 transition-colors hover:text-white hover:bg-white/[0.06]"
          >
            <span>Buscar</span>
            <kbd className="inline-flex items-center gap-0.5 rounded border border-white/10 bg-white/[0.02] px-1 text-[10px]">
              {mac ? "⌘" : "Ctrl"}K
            </kbd>
          </button>
          <Magnetic strength={0.2}>
            <button
              type="button"
              onClick={waitlist.open}
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-white text-ink-950 h-9 px-4 text-sm font-medium hover:bg-neon-200 transition-colors"
            >
              Pedí una demo
            </button>
          </Magnetic>
          <button
            type="button"
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.04] border border-white/10 text-white"
            onClick={() => setOpen((s) => !s)}
            aria-label="Menú"
            aria-expanded={open}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-2 max-w-6xl md:hidden"
          >
            <div className="glass-strong rounded-3xl p-3">
              <div className="flex flex-col">
                {links.map((l) => {
                  const active = pathname === l.href;
                  return (
                    <Link
                      key={l.href}
                      href={l.href}
                      className={cn(
                        "flex items-center justify-between rounded-2xl px-4 py-3 text-sm transition-colors",
                        active
                          ? "bg-white/[0.06] text-white"
                          : "text-mist-200 hover:bg-white/[0.04]"
                      )}
                    >
                      <span>{l.label}</span>
                      {active && (
                        <span className="h-1.5 w-1.5 rounded-full bg-neon-400" />
                      )}
                    </Link>
                  );
                })}
                <button
                  onClick={openCmd}
                  className="mt-1 inline-flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-mist-200"
                >
                  <span className="inline-flex items-center gap-2">
                    <Command className="h-3 w-3" />
                    Buscar módulos
                  </span>
                  <span className="text-[10px] text-mist-500">⌘K</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    waitlist.open();
                  }}
                  className="mt-2 rounded-2xl bg-gradient-to-b from-neon-300 to-neon-500 text-ink-950 px-4 py-3 text-sm font-semibold text-center"
                >
                  Pedí una demo · 15 min
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
