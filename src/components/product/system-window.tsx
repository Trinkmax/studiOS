"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  BadgeDollarSign,
  BarChart3,
  ChevronRight,
  Cog,
  Headphones,
  LayoutGrid,
  Lock,
  MessageSquare,
  Scissors,
  Smartphone,
  Store,
  UserCog,
  Users,
} from "lucide-react";
import type { ReactNode } from "react";
import { Logo } from "@/components/ui/logo";

type NavItem = {
  href?: string; // undefined = no demo page built yet
  label: string;
  icon: React.ElementType;
  module: string;
};

const nav: NavItem[] = [
  { href: "/check-in", label: "Fila", icon: LayoutGrid, module: "fila" },
  { label: "Sucursales", icon: Store, module: "sucursales" },
  { href: "/equipo", label: "Equipo", icon: Users, module: "equipo" },
  { label: "Servicios", icon: Scissors, module: "servicios" },
  { href: "/crm", label: "Clientes", icon: UserCog, module: "clientes" },
  { href: "/crm", label: "Mensajería", icon: MessageSquare, module: "mensajeria" },
  { label: "App Móvil", icon: Smartphone, module: "app" },
  { href: "/estadisticas", label: "Estadísticas", icon: BarChart3, module: "estadisticas" },
  { href: "/finanzas", label: "Finanzas", icon: BadgeDollarSign, module: "finanzas" },
  { label: "Configuración", icon: Cog, module: "config" },
];

type Props = {
  url: string;
  activeModule: string;
  breadcrumb: string;
  title: string;
  subtitle?: string;
  topActions?: ReactNode;
  children: ReactNode;
  className?: string;
  fullHeight?: boolean;
};

export function SystemWindow({
  url,
  activeModule,
  breadcrumb,
  title,
  subtitle,
  topActions,
  children,
  className,
  fullHeight = false,
}: Props) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[1.5rem] sm:rounded-3xl border border-white/10 bg-ink-900 shadow-panel",
        className
      )}
    >
      {/* Window chrome */}
      <div className="flex items-center gap-3 border-b border-white/5 bg-black/40 px-3 sm:px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-neon-400/70" />
        </div>
        <div className="mx-auto flex min-w-0 max-w-md flex-1 items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] text-mist-400">
          <span className="h-2 w-2 rounded-full bg-neon-400/80" />
          <span className="truncate">{url}</span>
        </div>
        <div className="hidden sm:flex items-center gap-1 text-mist-500 text-[10px]">
          <Headphones className="h-3 w-3" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] lg:grid-cols-[200px_1fr]">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col gap-1 border-r border-white/5 bg-ink-950/60 p-3">
          <div className="flex items-center justify-between px-1 py-2">
            <Logo className="h-4 w-auto sm:h-4 opacity-90" />
            <span
              className="inline-flex items-center gap-1 rounded-full border border-neon-400/20 bg-neon-400/[0.06] px-1.5 py-0.5 text-[9px] text-neon-300"
              title="Solo los módulos resaltados son clickeables en esta demo"
            >
              <span className="h-1 w-1 rounded-full bg-neon-400" />
              {nav.filter((n) => n.href).length} demos
            </span>
          </div>
          <div className="px-1 pb-2 text-[9px] uppercase tracking-[0.2em] text-mist-600">
            workspace · Rondeau
          </div>
          <div className="flex flex-col gap-0.5">
            {nav.map((n) => {
              const active = n.module === activeModule;
              return (
                <SidebarItem
                  key={n.label + n.module}
                  item={n}
                  active={active}
                />
              );
            })}
          </div>
          <div className="mt-3 rounded-lg border border-white/5 bg-white/[0.02] px-2 py-2 text-[10px] text-mist-500 leading-snug">
            <span className="text-mist-400">
              Los módulos con <span className="text-neon-300">●</span> tienen
              demo interactiva
            </span>
            <span className="block text-mist-600">
              · Los demás se ven en la demo completa
            </span>
          </div>
          <div className="mt-auto flex items-center gap-2 border-t border-white/5 pt-3">
            <div className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-neon-400 to-violet-500 text-[10px] font-semibold text-ink-950">
              T
            </div>
            <div className="text-[11px] leading-tight">
              <div className="text-white">Tony</div>
              <div className="text-mist-500">Admin</div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main
          className={cn(
            "min-w-0 bg-ink-900 p-3 sm:p-5 lg:p-6",
            fullHeight && "min-h-[520px]"
          )}
        >
          <header className="mb-4 sm:mb-5">
            <div className="flex items-center gap-1.5 text-[11px] text-mist-500">
              <span>{breadcrumb}</span>
              <ChevronRight className="h-3 w-3" />
              <span className="text-mist-300 truncate">{title}</span>
            </div>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between">
              <div className="min-w-0">
                <h3 className="font-display text-lg sm:text-2xl font-semibold text-white">
                  {title}
                </h3>
                {subtitle && (
                  <p className="mt-1 text-[12px] sm:text-[13px] text-mist-400">{subtitle}</p>
                )}
              </div>
              {topActions && (
                <div className="-mx-4 sm:mx-0 flex items-center gap-1.5 overflow-x-auto hide-scrollbar px-4 sm:flex-wrap sm:px-0 sm:overflow-visible [&>*]:shrink-0">
                  {topActions}
                </div>
              )}
            </div>
          </header>
          {children}
        </main>
      </div>
    </div>
  );
}

function SidebarItem({
  item,
  active,
}: {
  item: NavItem;
  active: boolean;
}) {
  const Icon = item.icon;
  const disabled = !item.href;

  // Disabled: muted, not clickable, small lock
  if (disabled) {
    return (
      <span
        aria-disabled="true"
        title="Sin demo interactiva · se ve en la demo completa"
        className="group flex items-center gap-2 rounded-lg px-2 py-1.5 text-[12px] opacity-40 cursor-not-allowed select-none"
      >
        <Icon className="h-3.5 w-3.5 text-mist-600" />
        <span className="truncate text-mist-500 line-through decoration-mist-700 decoration-[0.5px] underline-offset-2">
          {item.label}
        </span>
        <Lock className="ml-auto h-2.5 w-2.5 text-mist-600" />
      </span>
    );
  }

  const inner = (
    <span
      className={cn(
        "group relative flex items-center gap-2 rounded-lg px-2 py-1.5 text-[12px] transition-colors",
        active
          ? "bg-white/[0.06] text-white"
          : "text-mist-300 hover:text-white hover:bg-white/[0.04]"
      )}
    >
      <Icon
        className={cn(
          "h-3.5 w-3.5 transition-colors",
          active
            ? "text-neon-300"
            : "text-mist-400 group-hover:text-neon-300"
        )}
      />
      <span className="truncate">{item.label}</span>
      {active ? (
        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-neon-400 shadow-[0_0_8px_rgba(36,224,140,0.7)]" />
      ) : (
        <span className="ml-auto h-1 w-1 rounded-full bg-neon-400/70 opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </span>
  );
  return (
    <Link href={item.href!} prefetch={false}>
      {inner}
    </Link>
  );
}

export function Tag({
  children,
  tone = "default",
  className,
}: {
  children: ReactNode;
  tone?: "default" | "neon" | "violet" | "amber" | "red" | "sky";
  className?: string;
}) {
  const tones = {
    default: "bg-white/[0.04] text-mist-300 border-white/10",
    neon: "bg-neon-400/10 text-neon-300 border-neon-400/25",
    violet: "bg-violet-500/10 text-violet-300 border-violet-500/25",
    amber: "bg-amber-500/10 text-amber-400 border-amber-500/25",
    red: "bg-red-500/10 text-red-400 border-red-500/25",
    sky: "bg-sky-500/10 text-sky-400 border-sky-500/25",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.08em]",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

export function Chip({
  active,
  children,
  onClick,
  className,
}: {
  active?: boolean;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[11px] font-medium transition-all",
        active
          ? "border-neon-400/40 bg-neon-400/10 text-neon-300"
          : "border-white/10 bg-white/[0.02] text-mist-300 hover:text-white hover:bg-white/[0.05]",
        className
      )}
    >
      {children}
    </button>
  );
}
