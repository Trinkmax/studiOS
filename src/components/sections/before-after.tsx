"use client";

import { Section, SectionKicker, SectionTitle } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { ArrowRight, Sparkles } from "lucide-react";

const rows: Array<{ before: string; after: string; highlight?: boolean }> = [
  { before: "Planilla de Excel con los turnos", after: "Fila y agenda en vivo con Face ID" },
  { before: "Cuaderno de clientes", after: "CRM con historial + preferencias + foto" },
  {
    before: "WhatsApp manual pidiendo reseñas",
    after: "Automatización post-servicio → Google Maps",
    highlight: true,
  },
  { before: "Ir al local a ver qué pasa", after: "Dashboard desde el celular" },
  { before: "Calcular comisiones con calculadora", after: "Liquidación de sueldos en 1 clic" },
  { before: "4 apps distintas", after: "Una sola plataforma" },
];

export function BeforeAfterSection() {
  return (
    <Section id="antes-despues" className="py-20 sm:py-24">
      <div className="max-w-3xl">
        <Reveal>
          <SectionKicker icon={<Sparkles className="h-3 w-3" />}>
            El cambio
          </SectionKicker>
        </Reveal>
        <Reveal delay={0.05}>
          <SectionTitle className="mt-5">
            Lo que{" "}
            <span className="line-through text-mist-500 decoration-red-400/60 decoration-[3px]">
              estás reemplazando.
            </span>
            <br />
            Lo que <span className="gradient-text-neon">vas a tener.</span>
          </SectionTitle>
        </Reveal>
      </div>

      <div className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-ink-850/50 shadow-panel">
        <div className="divide-y divide-white/5">
          {rows.map((r, i) => (
            <Reveal key={r.before} delay={i * 0.04}>
              <div
                className={`grid grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6 py-4 ${
                  r.highlight ? "bg-neon-400/[0.03]" : ""
                }`}
              >
                <div className="text-[13px] sm:text-[15px] text-mist-400 line-through decoration-red-400/40 decoration-[1.5px] underline-offset-4">
                  {r.before}
                </div>
                <div className="px-3">
                  <div
                    className={`grid h-7 w-7 place-items-center rounded-full ${
                      r.highlight
                        ? "bg-neon-400/15 text-neon-300 border border-neon-400/40"
                        : "bg-white/[0.03] text-mist-400 border border-white/10"
                    }`}
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
                <div
                  className={`text-right text-[13px] sm:text-[15px] font-medium ${
                    r.highlight ? "text-white" : "text-mist-100"
                  }`}
                >
                  {r.after}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
