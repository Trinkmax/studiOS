"use client";

import { Section, SectionKicker, SectionTitle } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Scroller } from "@/components/ui/carousel";
import {
  MessageSquare,
  Wallet,
  Users,
  Network,
  Bot,
  Shield,
  Clock,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    tone: "neon",
    title: "CRM + WhatsApp e Instagram",
    desc: "Un inbox con todos los canales · historial por cliente · tags automáticos con IA.",
  },
  {
    icon: Bot,
    tone: "violet",
    title: "Workflows visuales",
    desc: "Drag & drop para recuperar clientes, avisar promos y automatizar reclamos.",
  },
  {
    icon: Wallet,
    tone: "amber",
    title: "Finanzas en vivo",
    desc: "Ingresos · comisiones · punto de equilibrio y sueldos en 1 clic.",
  },
  {
    icon: Users,
    tone: "neon",
    title: "Asistencia con Face ID",
    desc: "Fichaje por rostro o PIN. Disciplina automática y descuentos configurables.",
  },
  {
    icon: Network,
    tone: "violet",
    title: "Multi-sucursal nativo",
    desc: "Clientes unificados. Barberos que rotan con comisión correcta. Una sola vista.",
  },
  {
    icon: Shield,
    tone: "neon",
    title: "Roles y permisos",
    desc: "Dueño, manager, barbero, recepción — granulares por sucursal.",
  },
  {
    icon: Clock,
    tone: "amber",
    title: "Agenda + link público",
    desc: "Drag-and-drop. Clientes reservan solos. Tracking automático de no-shows.",
  },
  {
    icon: Sparkles,
    tone: "violet",
    title: "Reseñas → Google Maps",
    desc: "Buenas van a Maps, quejas a CRM privado. +1400% promedio en 4 meses.",
  },
];

const toneClasses = {
  neon: "text-neon-300 border-neon-400/20 bg-neon-400/[0.06]",
  violet: "text-violet-400 border-violet-500/20 bg-violet-500/[0.06]",
  amber: "text-amber-400 border-amber-500/20 bg-amber-500/[0.06]",
} as const;

export function FeaturesScrollerSection() {
  return (
    <Section id="features" className="py-20 sm:py-24">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-xl">
          <Reveal>
            <SectionKicker>Todo lo demás</SectionKicker>
          </Reveal>
          <Reveal delay={0.05}>
            <SectionTitle className="mt-5">
              Un sistema.{" "}
              <span className="gradient-text-neon">Cien cosas que ya no tenés que hacer.</span>
            </SectionTitle>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <div className="text-sm text-mist-400 max-w-sm">
            Dejá que se deslice. O pasá el mouse para explorar.
          </div>
        </Reveal>
      </div>
      <div className="mt-12 -mx-5 sm:-mx-8 lg:-mx-12">
        <Scroller speed={60}>
          {features.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </Scroller>
        <div className="mt-4 -mx-0">
          <Scroller speed={80} reverse>
            {features.slice().reverse().map((f) => (
              <FeatureCard key={f.title + "r"} {...f} />
            ))}
          </Scroller>
        </div>
      </div>
    </Section>
  );
}

function FeatureCard({
  icon: Icon,
  tone,
  title,
  desc,
}: {
  icon: React.ElementType;
  tone: keyof typeof toneClasses;
  title: string;
  desc: string;
}) {
  return (
    <div className="group relative h-[180px] w-[320px] sm:w-[360px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-ink-850/60 p-5 transition-all hover:border-white/20 hover:bg-ink-850/90">
      <div className="flex items-center gap-2.5">
        <span
          className={`grid h-8 w-8 place-items-center rounded-lg border ${toneClasses[tone]}`}
        >
          <Icon className="h-4 w-4" />
        </span>
        <h3 className="text-[15px] font-semibold text-white">{title}</h3>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-mist-400">{desc}</p>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(36,224,140,0.4), transparent)",
        }}
      />
    </div>
  );
}
