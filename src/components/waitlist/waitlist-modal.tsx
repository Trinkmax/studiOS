"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Loader2,
  X,
  Scissors,
  Users,
  Store,
  MapPin,
  Mail,
  MessageCircle,
  User,
  Zap,
  CreditCard,
  LineChart,
  Star,
  ScanFace,
  Building2,
  CalendarClock,
  SkipForward,
} from "lucide-react";
import { submitWaitlist, type WaitlistInput } from "@/lib/actions/waitlist";

type TeamSize = "solo" | "2_3" | "4_6" | "7_15" | "15_plus";
type Branches = "1" | "2_3" | "4_10" | "10_plus";
type Software = "ninguno" | "fresha" | "booksy" | "agendapro" | "planilla" | "otro";
type Interest =
  | "face_id"
  | "crm"
  | "panel"
  | "finanzas"
  | "estadisticas"
  | "reseñas";
type Timeline = "asap" | "1_mes" | "3_meses" | "explorando";

type FormState = {
  full_name: string;
  email: string;
  phone: string;
  barbershop_name: string;
  city: string;
  team_size: TeamSize | "";
  branches_count: Branches | "";
  current_software: Software | "";
  interests: Interest[];
  start_timeline: Timeline | "";
};

const DRAFT_KEY = "studios:waitlist:draft";
const WHATSAPP_URL = "https://wa.me/5493510000000";

const INITIAL: FormState = {
  full_name: "",
  email: "",
  phone: "",
  barbershop_name: "",
  city: "",
  team_size: "",
  branches_count: "",
  current_software: "",
  interests: [],
  start_timeline: "",
};

const TEAM_OPTIONS: { value: TeamSize; label: string; sub: string; emoji: string }[] = [
  { value: "solo", label: "Solo", sub: "yo corto, yo cobro", emoji: "🧑‍🦱" },
  { value: "2_3", label: "2 o 3", sub: "equipo chico", emoji: "👥" },
  { value: "4_6", label: "4 a 6", sub: "equipo mediano", emoji: "👨‍👨‍👦" },
  { value: "7_15", label: "7 a 15", sub: "ya es operación", emoji: "🧑‍🤝‍🧑" },
  { value: "15_plus", label: "15+", sub: "una maquinaria", emoji: "🏗️" },
];

const BRANCH_OPTIONS: { value: Branches; label: string; sub: string; emoji: string }[] = [
  { value: "1", label: "1 local", sub: "empezamos acá", emoji: "💈" },
  { value: "2_3", label: "2 o 3", sub: "expandiendo", emoji: "🏪" },
  { value: "4_10", label: "4 a 10", sub: "cadena regional", emoji: "🏬" },
  { value: "10_plus", label: "10+", sub: "franquicia", emoji: "🏙️" },
];

const SOFTWARE_OPTIONS: { value: Software; label: string; sub: string }[] = [
  { value: "ninguno", label: "Nada 😬", sub: "a pulmón" },
  { value: "fresha", label: "Fresha", sub: "" },
  { value: "booksy", label: "Booksy", sub: "" },
  { value: "agendapro", label: "AgendaPro", sub: "" },
  { value: "planilla", label: "Planilla / Excel", sub: "old school" },
  { value: "otro", label: "Otro", sub: "nos contás" },
];

const INTEREST_OPTIONS: {
  value: Interest;
  label: string;
  icon: typeof ScanFace;
  tone: "neon" | "violet" | "amber";
}[] = [
  { value: "face_id", label: "Face ID Check-in", icon: ScanFace, tone: "neon" },
  { value: "crm", label: "CRM de clientes", icon: Users, tone: "neon" },
  { value: "panel", label: "Panel del barbero", icon: Scissors, tone: "violet" },
  { value: "finanzas", label: "Finanzas + comisiones", icon: CreditCard, tone: "violet" },
  { value: "estadisticas", label: "Estadísticas en vivo", icon: LineChart, tone: "neon" },
  { value: "reseñas", label: "Reseñas automáticas", icon: Star, tone: "amber" },
];

const TIMELINE_OPTIONS: { value: Timeline; label: string; sub: string; emoji: string }[] = [
  { value: "asap", label: "Ya, esta semana", sub: "no aguanto más", emoji: "🔥" },
  { value: "1_mes", label: "En un mes", sub: "tranqui", emoji: "⚡" },
  { value: "3_meses", label: "En 3 meses", sub: "planificando", emoji: "🗓️" },
  { value: "explorando", label: "Explorando", sub: "curiosidad primero", emoji: "👀" },
];

type StepId =
  | "name"
  | "email"
  | "phone"
  | "barbershop"
  | "city"
  | "team"
  | "branches"
  | "software"
  | "interests"
  | "timeline"
  | "success";

const STEP_ORDER: StepId[] = [
  "name",
  "email",
  "phone",
  "barbershop",
  "city",
  "team",
  "branches",
  "software",
  "interests",
  "timeline",
];

export function WaitlistModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<StepId>("name");
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);

  const utmRef = useRef<WaitlistInput["utm"]>({});

  // Hydrate draft + capture UTMs once
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(DRAFT_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as FormState;
        setForm((f) => ({ ...f, ...parsed }));
      }
    } catch {}

    try {
      const sp = new URLSearchParams(window.location.search);
      const utm: WaitlistInput["utm"] = {};
      const keys = [
        "utm_source",
        "utm_medium",
        "utm_campaign",
        "utm_term",
        "utm_content",
      ] as const;
      for (const k of keys) {
        const v = sp.get(k);
        if (v) utm[k] = v.slice(0, 120);
      }
      utmRef.current = utm;
    } catch {}
  }, []);

  // Persist draft
  useEffect(() => {
    try {
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify(form));
    } catch {}
  }, [form]);

  // Lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const stepIndex = step === "success" ? STEP_ORDER.length : STEP_ORDER.indexOf(step);
  const progress = useMemo(
    () => (step === "success" ? 1 : stepIndex / STEP_ORDER.length),
    [step, stepIndex]
  );

  const set = useCallback(<K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }, []);

  const goNext = useCallback(() => {
    const idx = STEP_ORDER.indexOf(step);
    if (idx < 0) return;
    const next = STEP_ORDER[idx + 1];
    if (next) setStep(next);
  }, [step]);

  const goBack = useCallback(() => {
    const idx = STEP_ORDER.indexOf(step);
    if (idx > 0) setStep(STEP_ORDER[idx - 1]);
  }, [step]);

  const validateCurrent = useCallback((): boolean => {
    const e: Partial<Record<keyof FormState, string>> = {};
    switch (step) {
      case "name":
        if (form.full_name.trim().length < 2) e.full_name = "Contanos tu nombre";
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
          e.email = "Dejame un email válido";
        break;
      case "team":
        if (!form.team_size) e.team_size = "Elegí una opción";
        break;
      case "branches":
        if (!form.branches_count) e.branches_count = "Elegí una opción";
        break;
      case "interests":
        if (form.interests.length === 0) e.interests = "Tocá al menos una";
        break;
      case "timeline":
        if (!form.start_timeline) e.start_timeline = "Elegí una opción";
        break;
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }, [step, form]);

  const handleSubmit = useCallback(async () => {
    setSubmitting(true);
    setServerError(null);
    const payload: WaitlistInput = {
      full_name: form.full_name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || undefined,
      barbershop_name: form.barbershop_name.trim() || undefined,
      city: form.city.trim() || undefined,
      team_size: form.team_size as TeamSize,
      branches_count: form.branches_count as Branches,
      current_software: form.current_software || undefined,
      interests: form.interests,
      start_timeline: form.start_timeline as Timeline,
      utm: utmRef.current,
    };
    const res = await submitWaitlist(payload);
    setSubmitting(false);
    if (!res.ok) {
      setServerError(res.error);
      return;
    }
    setAlreadyRegistered(Boolean(res.alreadyRegistered));
    try {
      sessionStorage.removeItem(DRAFT_KEY);
    } catch {}
    setStep("success");
  }, [form]);

  const advance = useCallback(() => {
    if (!validateCurrent()) return;
    if (step === "timeline") {
      void handleSubmit();
      return;
    }
    goNext();
  }, [step, validateCurrent, goNext, handleSubmit]);

  const handleKey = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" && !e.shiftKey && step !== "success") {
        e.preventDefault();
        advance();
      }
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    },
    [advance, onClose, step]
  );

  return (
    <AnimatePresence>
      <motion.div
        key="waitlist-root"
        role="dialog"
        aria-modal="true"
        aria-label="Cuestionario de waitlist"
        className="fixed inset-0 z-[100] flex flex-col"
        onKeyDown={handleKey}
        tabIndex={-1}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 bg-ink-950/90"
          style={{
            background:
              "radial-gradient(800px 500px at 20% 0%, rgba(36,224,140,0.12), transparent 60%), radial-gradient(900px 600px at 100% 100%, rgba(139,92,246,0.10), transparent 60%), rgba(5,7,10,0.95)",
          }}
          onClick={onClose}
        />

        {/* Top bar (progress + close) */}
        <div className="relative z-10 flex items-center gap-4 px-5 py-4 sm:px-8">
          <button
            type="button"
            onClick={goBack}
            disabled={step === "name" || step === "success" || submitting}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-mist-300 transition-colors hover:border-white/20 hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Atrás"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, #5eecaa 0%, #24e08c 50%, #8b5cf6 100%)",
              }}
              animate={{ width: `${Math.round(progress * 100)}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            />
          </div>

          <div className="hidden min-w-[64px] text-right text-xs tabular-nums text-mist-400 sm:block">
            {step === "success"
              ? "100%"
              : `${Math.min(stepIndex + 1, STEP_ORDER.length)} / ${STEP_ORDER.length}`}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-mist-300 transition-colors hover:border-white/20 hover:bg-white/[0.06]"
            aria-label="Cerrar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-1 items-center justify-center overflow-y-auto px-5 pb-10 sm:px-8">
          <div className="w-full max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24, filter: "blur(4px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -24, filter: "blur(4px)" }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {step === "name" && (
                  <StepShell
                    kicker="Paso 1 de 10"
                    title={
                      <>
                        Hola, ¿<span className="gradient-text-neon">cómo te llamás?</span>
                      </>
                    }
                    subtitle="Vamos a tardar menos de 60 segundos."
                  >
                    <BigInput
                      icon={<User className="h-5 w-5" />}
                      value={form.full_name}
                      onChange={(v) => set("full_name", v)}
                      placeholder="Tu nombre"
                      autoFocus
                      error={errors.full_name}
                      maxLength={80}
                    />
                  </StepShell>
                )}

                {step === "email" && (
                  <StepShell
                    kicker="Paso 2 de 10"
                    title={
                      <>
                        Un email para <span className="gradient-text-neon">mantenerte al tanto</span>
                      </>
                    }
                    subtitle="Te vamos a avisar del lanzamiento y mandarte la demo."
                  >
                    <BigInput
                      icon={<Mail className="h-5 w-5" />}
                      value={form.email}
                      onChange={(v) => set("email", v)}
                      placeholder="tu@barberia.com"
                      type="email"
                      autoFocus
                      error={errors.email}
                      maxLength={160}
                    />
                  </StepShell>
                )}

                {step === "phone" && (
                  <StepShell
                    kicker="Paso 3 de 10"
                    title={
                      <>
                        Tu <span className="gradient-text-neon">WhatsApp</span> (opcional)
                      </>
                    }
                    subtitle="Si preferís, te escribimos por acá. No molestamos, prometido."
                  >
                    <BigInput
                      icon={<MessageCircle className="h-5 w-5" />}
                      value={form.phone}
                      onChange={(v) => set("phone", v)}
                      placeholder="+54 9 351 000 0000"
                      type="tel"
                      autoFocus
                      maxLength={40}
                    />
                    <SkipHint onSkip={advance} />
                  </StepShell>
                )}

                {step === "barbershop" && (
                  <StepShell
                    kicker="Paso 4 de 10"
                    title={
                      <>
                        ¿Cómo se llama <span className="gradient-text-neon">tu barbería?</span>
                      </>
                    }
                    subtitle="Para ver tu marca en el panel cuando te invitemos."
                  >
                    <BigInput
                      icon={<Store className="h-5 w-5" />}
                      value={form.barbershop_name}
                      onChange={(v) => set("barbershop_name", v)}
                      placeholder="Ej: Monaco Smart Barber"
                      autoFocus
                      maxLength={120}
                    />
                    <SkipHint onSkip={advance} />
                  </StepShell>
                )}

                {step === "city" && (
                  <StepShell
                    kicker="Paso 5 de 10"
                    title={
                      <>
                        ¿De qué <span className="gradient-text-neon">ciudad sos?</span>
                      </>
                    }
                    subtitle="Nos ayuda a priorizar qué zonas lanzamos primero."
                  >
                    <BigInput
                      icon={<MapPin className="h-5 w-5" />}
                      value={form.city}
                      onChange={(v) => set("city", v)}
                      placeholder="Ej: Córdoba, AR"
                      autoFocus
                      maxLength={80}
                    />
                    <SkipHint onSkip={advance} />
                  </StepShell>
                )}

                {step === "team" && (
                  <StepShell
                    kicker="Paso 6 de 10"
                    title={
                      <>
                        ¿Cuántos <span className="gradient-text-neon">barberos</span> son?
                      </>
                    }
                    subtitle="Incluite a vos si cortás."
                    error={errors.team_size}
                  >
                    <CardGrid
                      options={TEAM_OPTIONS}
                      value={form.team_size}
                      onChange={(v) => {
                        set("team_size", v);
                        setTimeout(() => goNext(), 320);
                      }}
                      columns={2}
                    />
                  </StepShell>
                )}

                {step === "branches" && (
                  <StepShell
                    kicker="Paso 7 de 10"
                    title={
                      <>
                        ¿Cuántas <span className="gradient-text-neon">sucursales</span> tenés?
                      </>
                    }
                    subtitle="studiOS escala a franquicia, pero empezamos donde estés."
                    error={errors.branches_count}
                  >
                    <CardGrid
                      options={BRANCH_OPTIONS}
                      value={form.branches_count}
                      onChange={(v) => {
                        set("branches_count", v);
                        setTimeout(() => goNext(), 320);
                      }}
                      columns={2}
                    />
                  </StepShell>
                )}

                {step === "software" && (
                  <StepShell
                    kicker="Paso 8 de 10"
                    title={
                      <>
                        ¿Qué usás <span className="gradient-text-neon">hoy?</span>
                      </>
                    }
                    subtitle="Si ya tenés algo, migramos todo en 48 hs."
                  >
                    <CardGrid
                      options={SOFTWARE_OPTIONS}
                      value={form.current_software}
                      onChange={(v) => {
                        set("current_software", v);
                        setTimeout(() => goNext(), 320);
                      }}
                      columns={2}
                      compact
                    />
                    <SkipHint onSkip={advance} />
                  </StepShell>
                )}

                {step === "interests" && (
                  <StepShell
                    kicker="Paso 9 de 10"
                    title={
                      <>
                        ¿Qué módulos te <span className="gradient-text-neon">vuelan la cabeza?</span>
                      </>
                    }
                    subtitle="Elegí todos los que te interesen."
                    error={errors.interests}
                  >
                    <InterestsGrid
                      value={form.interests}
                      onToggle={(v) => {
                        const exists = form.interests.includes(v);
                        set(
                          "interests",
                          exists
                            ? form.interests.filter((x) => x !== v)
                            : [...form.interests, v]
                        );
                      }}
                    />
                  </StepShell>
                )}

                {step === "timeline" && (
                  <StepShell
                    kicker="Paso 10 de 10"
                    title={
                      <>
                        ¿<span className="gradient-text-neon">Cuándo</span> arrancás?
                      </>
                    }
                    subtitle="Para ordenarnos con la implementación."
                    error={errors.start_timeline}
                  >
                    <CardGrid
                      options={TIMELINE_OPTIONS}
                      value={form.start_timeline}
                      onChange={(v) => set("start_timeline", v)}
                      columns={2}
                    />
                    {serverError ? (
                      <p className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">
                        {serverError}
                      </p>
                    ) : null}
                  </StepShell>
                )}

                {step === "success" && (
                  <SuccessScreen
                    alreadyRegistered={alreadyRegistered}
                    name={form.full_name}
                    onClose={onClose}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Footer CTA */}
        {step !== "success" && (
          <div className="safe-bottom relative z-10 flex items-center justify-between gap-3 border-t border-white/5 bg-ink-950/60 px-5 py-4 backdrop-blur-xl sm:px-8">
            <div className="hidden items-center gap-2 text-xs text-mist-500 sm:flex">
              <kbd className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono">
                Enter
              </kbd>
              <span>para continuar</span>
            </div>
            <button
              type="button"
              onClick={advance}
              disabled={submitting}
              className="group relative inline-flex h-12 items-center gap-2 rounded-full bg-gradient-to-r from-[#5eecaa] to-[#24e08c] px-6 text-sm font-semibold text-ink-950 shadow-[0_8px_28px_-8px_rgba(36,224,140,0.6)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_12px_40px_-8px_rgba(36,224,140,0.8)] active:scale-[0.98] disabled:cursor-wait disabled:opacity-70 sm:ml-auto"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Enviando…
                </>
              ) : step === "timeline" ? (
                <>
                  Sumarme a la waitlist
                  <Zap className="h-4 w-4" />
                </>
              ) : (
                <>
                  Siguiente
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

/* ---------- Building blocks ---------- */

function StepShell({
  kicker,
  title,
  subtitle,
  children,
  error,
}: {
  kicker: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  error?: string;
}) {
  return (
    <div className="flex flex-col">
      <span className="text-xs font-medium uppercase tracking-[0.18em] text-mist-400">
        {kicker}
      </span>
      <h2 className="mt-3 font-display text-balance text-3xl font-semibold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 max-w-xl text-base text-mist-300 sm:text-lg">
          {subtitle}
        </p>
      ) : null}
      <div className="mt-10">{children}</div>
      {error ? (
        <p className="mt-3 text-sm text-red-300">{error}</p>
      ) : null}
    </div>
  );
}

function BigInput({
  value,
  onChange,
  placeholder,
  type = "text",
  autoFocus,
  error,
  icon,
  maxLength,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: "text" | "email" | "tel";
  autoFocus?: boolean;
  error?: string;
  icon?: ReactNode;
  maxLength?: number;
}) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (autoFocus) {
      const t = setTimeout(() => ref.current?.focus(), 60);
      return () => clearTimeout(t);
    }
  }, [autoFocus]);
  return (
    <div>
      <label
        className={`group flex items-center gap-3 rounded-2xl border bg-white/[0.03] px-4 py-3 transition-all duration-200 ${
          error
            ? "border-red-500/50 ring-1 ring-red-500/30"
            : "border-white/10 focus-within:border-[#24e08c]/60 focus-within:ring-2 focus-within:ring-[#24e08c]/25 hover:border-white/20"
        }`}
      >
        {icon ? (
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/[0.05] text-mist-300 transition-colors group-focus-within:text-[#5eecaa]">
            {icon}
          </span>
        ) : null}
        <input
          ref={ref}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          autoComplete={
            type === "email"
              ? "email"
              : type === "tel"
                ? "tel"
                : "off"
          }
          className="flex-1 bg-transparent py-2 text-xl font-medium text-white outline-none placeholder:text-mist-500 sm:text-2xl"
          spellCheck={false}
        />
      </label>
      {error ? (
        <p className="mt-2 text-sm text-red-300">{error}</p>
      ) : null}
    </div>
  );
}

type CardOption<T extends string> = {
  value: T;
  label: string;
  sub?: string;
  emoji?: string;
};

function CardGrid<T extends string>({
  options,
  value,
  onChange,
  columns = 2,
  compact = false,
}: {
  options: CardOption<T>[];
  value: T | "";
  onChange: (v: T) => void;
  columns?: 2 | 3;
  compact?: boolean;
}) {
  return (
    <div
      className={`grid gap-3 ${
        columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"
      }`}
      role="radiogroup"
    >
      {options.map((opt, i) => {
        const selected = value === opt.value;
        return (
          <motion.button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(opt.value)}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={`group relative flex items-center gap-3 overflow-hidden rounded-2xl border px-4 text-left transition-colors ${
              compact ? "py-3" : "py-4"
            } ${
              selected
                ? "border-[#24e08c]/70 bg-[#24e08c]/[0.08]"
                : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]"
            }`}
          >
            {opt.emoji ? (
              <span className="text-2xl leading-none" aria-hidden>
                {opt.emoji}
              </span>
            ) : null}
            <div className="flex flex-1 flex-col">
              <span className={`font-semibold text-white ${compact ? "text-base" : "text-lg"}`}>
                {opt.label}
              </span>
              {opt.sub ? (
                <span className="text-xs text-mist-400">{opt.sub}</span>
              ) : null}
            </div>
            <span
              className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-all ${
                selected
                  ? "border-[#24e08c] bg-[#24e08c] text-ink-950"
                  : "border-white/15 bg-transparent text-transparent group-hover:border-white/30"
              }`}
              aria-hidden
            >
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

function InterestsGrid({
  value,
  onToggle,
}: {
  value: Interest[];
  onToggle: (v: Interest) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {INTEREST_OPTIONS.map((opt, i) => {
        const Icon = opt.icon;
        const selected = value.includes(opt.value);
        const toneBg =
          opt.tone === "violet"
            ? "bg-violet-500/15 text-violet-300"
            : opt.tone === "amber"
              ? "bg-amber-500/15 text-amber-300"
              : "bg-[#24e08c]/15 text-[#5eecaa]";
        return (
          <motion.button
            key={opt.value}
            type="button"
            aria-pressed={selected}
            onClick={() => onToggle(opt.value)}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className={`group relative flex items-center gap-3 overflow-hidden rounded-2xl border px-4 py-4 text-left transition-colors ${
              selected
                ? "border-[#24e08c]/70 bg-[#24e08c]/[0.08]"
                : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]"
            }`}
          >
            <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${toneBg}`}>
              <Icon className="h-5 w-5" />
            </span>
            <span className="flex-1 text-base font-semibold text-white">
              {opt.label}
            </span>
            <motion.span
              className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-all ${
                selected
                  ? "border-[#24e08c] bg-[#24e08c] text-ink-950"
                  : "border-white/15 bg-transparent text-transparent"
              }`}
              animate={{ scale: selected ? [1, 1.15, 1] : 1 }}
              transition={{ duration: 0.3 }}
              aria-hidden
            >
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
            </motion.span>
          </motion.button>
        );
      })}
    </div>
  );
}

function SkipHint({ onSkip }: { onSkip: () => void }) {
  return (
    <button
      type="button"
      onClick={onSkip}
      className="mt-4 inline-flex items-center gap-1.5 text-sm text-mist-400 transition-colors hover:text-mist-200"
    >
      <SkipForward className="h-3.5 w-3.5" />
      Saltar este paso
    </button>
  );
}

/* ---------- Success ---------- */

function SuccessScreen({
  alreadyRegistered,
  name,
  onClose,
}: {
  alreadyRegistered: boolean;
  name: string;
  onClose: () => void;
}) {
  const firstName = name.trim().split(" ")[0] || "";
  return (
    <div className="relative flex flex-col items-center text-center">
      <Confetti />
      <motion.div
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.1 }}
        className="relative grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-[#5eecaa] to-[#24e08c] shadow-[0_20px_60px_-10px_rgba(36,224,140,0.6)]"
      >
        <Check className="h-12 w-12 text-ink-950" strokeWidth={3.5} />
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ boxShadow: "0 0 0 0 rgba(36,224,140,0.5)" }}
          animate={{ boxShadow: ["0 0 0 0 rgba(36,224,140,0.5)", "0 0 0 40px rgba(36,224,140,0)"] }}
          transition={{ duration: 1.4, repeat: Infinity }}
          aria-hidden
        />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-8 font-display text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl"
      >
        {alreadyRegistered ? (
          <>
            Ya estás <span className="gradient-text-neon">dentro</span>
            {firstName ? `, ${firstName}` : ""}.
          </>
        ) : (
          <>
            Listo{firstName ? `, ${firstName}` : ""}.
            <br />
            <span className="gradient-text-neon">Estás en la waitlist.</span>
          </>
        )}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-5 max-w-xl text-base text-mist-300 sm:text-lg"
      >
        Te escribimos en menos de 24 hs para coordinar la demo de 15 minutos. Si
        querés adelantar el turno, dale play al WhatsApp.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.5 }}
        className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
      >
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex h-12 items-center gap-2 rounded-full bg-gradient-to-r from-[#5eecaa] to-[#24e08c] px-6 text-sm font-semibold text-ink-950 shadow-[0_8px_28px_-8px_rgba(36,224,140,0.6)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_12px_40px_-8px_rgba(36,224,140,0.8)] active:scale-[0.98]"
        >
          <MessageCircle className="h-4 w-4" />
          Hablar por WhatsApp
        </a>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-12 items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 text-sm font-semibold text-white transition-colors hover:border-white/20 hover:bg-white/[0.06]"
        >
          Volver al landing
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-mist-500"
      >
        <span className="inline-flex items-center gap-1.5">
          <Building2 className="h-3.5 w-3.5" /> Sin tarjeta
        </span>
        <span className="h-1 w-1 rounded-full bg-white/20" />
        <span className="inline-flex items-center gap-1.5">
          <CalendarClock className="h-3.5 w-3.5" /> Respuesta en 24 hs
        </span>
        <span className="h-1 w-1 rounded-full bg-white/20" />
        <span className="inline-flex items-center gap-1.5">
          <Zap className="h-3.5 w-3.5" /> Implementación en 48 hs
        </span>
      </motion.div>
    </div>
  );
}

function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.6,
        dur: 2.5 + Math.random() * 1.5,
        rot: Math.random() * 360,
        emoji: ["💈", "✂️", "🪒", "✨", "🎉", "⚡"][i % 6],
      })),
    []
  );
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -top-20 left-0 right-0 h-[120%] overflow-hidden"
    >
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute text-2xl"
          style={{ left: `${p.x}%`, top: "0%" }}
          initial={{ y: -40, opacity: 0, rotate: 0 }}
          animate={{ y: "100vh", opacity: [0, 1, 1, 0], rotate: p.rot }}
          transition={{
            delay: p.delay,
            duration: p.dur,
            ease: "easeIn",
            times: [0, 0.1, 0.85, 1],
          }}
        >
          {p.emoji}
        </motion.span>
      ))}
    </div>
  );
}
