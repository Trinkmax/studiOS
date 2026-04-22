"use client";

import { Section, SectionKicker, SectionTitle } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Carousel } from "@/components/ui/carousel";
import { Quote, Star } from "lucide-react";

type T = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
  metric?: { label: string; value: string };
};

const testimonials: T[] = [
  {
    quote:
      "Pasamos de 40 a 600 reseñas en Google en 4 meses. Dejé de ir al local y la barbería corre sola — desde el living veo todo.",
    name: "Tony Ramírez",
    role: "Dueño · Monaco Barber · Córdoba",
    avatar: "T",
    metric: { label: "Reseñas en Google", value: "×10" },
  },
  {
    quote:
      "El Face ID lo cambia todo. El cliente se escanea, yo ya veo qué le gusta. Corto con más foco y los tiempos muertos de entrada desaparecieron.",
    name: "Nico Maidana",
    role: "Barbero · Rondeau",
    avatar: "N",
    metric: { label: "Check-in", value: "2 s" },
  },
  {
    quote:
      "Antes calculaba comisiones con una calculadora a fin de mes. Hoy aprieto un botón y salen los sueldos. Se acabaron las discusiones.",
    name: "Mariana F.",
    role: "Manager · Paraná 419",
    avatar: "M",
    metric: { label: "Liquidación", value: "1 clic" },
  },
  {
    quote:
      "Los workflows del CRM me recuperaron clientes que ya daba por perdidos. 45 días sin venir → cupón automático → vuelven.",
    name: "Fabrizio G.",
    role: "Dueño · Estudio 45",
    avatar: "F",
    metric: { label: "Retención", value: "+23%" },
  },
];

export function TestimonialsSection() {
  return (
    <Section id="testimonios" className="py-24">
      <div className="max-w-3xl">
        <Reveal>
          <SectionKicker icon={<Quote className="h-3 w-3" />}>
            Lo que dicen los dueños
          </SectionKicker>
        </Reveal>
        <Reveal delay={0.05}>
          <SectionTitle className="mt-5">
            Barberías reales.{" "}
            <span className="gradient-text-neon">Resultados reales.</span>
          </SectionTitle>
        </Reveal>
      </div>

      <div className="mt-14">
        <Carousel
          autoPlayMs={6000}
          slides={testimonials.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        />
      </div>
    </Section>
  );
}

function TestimonialCard({ t }: { t: T }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] via-transparent to-neon-400/[0.06] p-6 sm:p-10 shadow-panel">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(36,224,140,0.22), transparent 70%)",
        }}
      />
      <div className="relative grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto] gap-8 items-start">
        <div>
          <Quote className="h-7 w-7 text-neon-300/80" />
          <blockquote className="mt-4 font-display text-balance text-2xl sm:text-[1.75rem] leading-snug tracking-tight text-white">
            “{t.quote}”
          </blockquote>
          <div className="mt-6 flex items-center gap-4">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-neon-400 to-violet-500 text-sm font-semibold text-ink-950">
              {t.avatar}
            </div>
            <div>
              <div className="text-sm font-semibold text-white">{t.name}</div>
              <div className="text-xs text-mist-400">{t.role}</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 md:items-end">
          <div className="flex items-center gap-0.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="h-4 w-4 text-amber-400" fill="currentColor" />
            ))}
          </div>
          {t.metric && (
            <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-right">
              <div className="text-[10px] uppercase tracking-[0.15em] text-mist-400">
                {t.metric.label}
              </div>
              <div className="mt-1 font-display text-2xl font-semibold text-white tabular-nums">
                {t.metric.value}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
