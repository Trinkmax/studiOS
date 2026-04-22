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
import { useLocale } from "@/lib/i18n/locale-context";
import type { Dictionary } from "@/lib/i18n/dictionaries";

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

const TEAM_META: { value: TeamSize; emoji: string }[] = [
  { value: "solo", emoji: "🧑‍🦱" },
  { value: "2_3", emoji: "👥" },
  { value: "4_6", emoji: "👨‍👨‍👦" },
  { value: "7_15", emoji: "🧑‍🤝‍🧑" },
  { value: "15_plus", emoji: "🏗️" },
];

const BRANCH_META: { value: Branches; emoji: string }[] = [
  { value: "1", emoji: "💈" },
  { value: "2_3", emoji: "🏪" },
  { value: "4_10", emoji: "🏬" },
  { value: "10_plus", emoji: "🏙️" },
];

const SOFTWARE_META: { value: Software }[] = [
  { value: "ninguno" },
  { value: "fresha" },
  { value: "booksy" },
  { value: "agendapro" },
  { value: "planilla" },
  { value: "otro" },
];

const INTEREST_META: {
  value: Interest;
  icon: typeof ScanFace;
  tone: "neon" | "violet" | "amber";
}[] = [
  { value: "face_id", icon: ScanFace, tone: "neon" },
  { value: "crm", icon: Users, tone: "neon" },
  { value: "panel", icon: Scissors, tone: "violet" },
  { value: "finanzas", icon: CreditCard, tone: "violet" },
  { value: "estadisticas", icon: LineChart, tone: "neon" },
  { value: "reseñas", icon: Star, tone: "amber" },
];

const TIMELINE_META: { value: Timeline; emoji: string }[] = [
  { value: "asap", emoji: "🔥" },
  { value: "1_mes", emoji: "⚡" },
  { value: "3_meses", emoji: "🗓️" },
  { value: "explorando", emoji: "👀" },
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
  const { t: dict } = useLocale();
  const t = dict.waitlist;
  const [step, setStep] = useState<StepId>("name");
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);

  const teamOptions = TEAM_META.map((m) => ({
    value: m.value,
    emoji: m.emoji,
    label: t.steps.team.options[m.value].label,
    sub: t.steps.team.options[m.value].sub,
  }));
  const branchOptions = BRANCH_META.map((m) => ({
    value: m.value,
    emoji: m.emoji,
    label: t.steps.branches.options[m.value].label,
    sub: t.steps.branches.options[m.value].sub,
  }));
  const softwareOptions = SOFTWARE_META.map((m) => ({
    value: m.value,
    label: t.steps.software.options[m.value].label,
    sub: t.steps.software.options[m.value].sub,
  }));
  const interestOptions = INTEREST_META.map((m) => ({
    value: m.value,
    icon: m.icon,
    tone: m.tone,
    label: t.steps.interests.options[m.value],
  }));
  const timelineOptions = TIMELINE_META.map((m) => ({
    value: m.value,
    emoji: m.emoji,
    label: t.steps.timeline.options[m.value].label,
    sub: t.steps.timeline.options[m.value].sub,
  }));

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
        if (form.full_name.trim().length < 2) e.full_name = t.steps.name.error;
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
          e.email = t.steps.email.error;
        break;
      case "team":
        if (!form.team_size) e.team_size = t.steps.team.error;
        break;
      case "branches":
        if (!form.branches_count) e.branches_count = t.steps.branches.error;
        break;
      case "interests":
        if (form.interests.length === 0) e.interests = t.steps.interests.error;
        break;
      case "timeline":
        if (!form.start_timeline) e.start_timeline = t.steps.timeline.error;
        break;
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }, [step, form, t]);

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
        aria-label="Waitlist form"
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
            aria-label={t.back}
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
            aria-label={t.close}
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
                    kicker={t.steps.name.step}
                    title={
                      <>
                        {t.steps.name.titleA}
                        <span className="gradient-text-neon">{t.steps.name.titleAccent}</span>
                        {t.steps.name.titleB}
                      </>
                    }
                    subtitle={t.steps.name.sub}
                  >
                    <BigInput
                      icon={<User className="h-5 w-5" />}
                      value={form.full_name}
                      onChange={(v) => set("full_name", v)}
                      placeholder={t.steps.name.placeholder}
                      autoFocus
                      error={errors.full_name}
                      maxLength={80}
                    />
                  </StepShell>
                )}

                {step === "email" && (
                  <StepShell
                    kicker={t.steps.email.step}
                    title={
                      <>
                        {t.steps.email.titleA}
                        <span className="gradient-text-neon">{t.steps.email.titleAccent}</span>
                        {t.steps.email.titleB}
                      </>
                    }
                    subtitle={t.steps.email.sub}
                  >
                    <BigInput
                      icon={<Mail className="h-5 w-5" />}
                      value={form.email}
                      onChange={(v) => set("email", v)}
                      placeholder={t.steps.email.placeholder}
                      type="email"
                      autoFocus
                      error={errors.email}
                      maxLength={160}
                    />
                  </StepShell>
                )}

                {step === "phone" && (
                  <StepShell
                    kicker={t.steps.phone.step}
                    title={
                      <>
                        {t.steps.phone.titleA}
                        <span className="gradient-text-neon">{t.steps.phone.titleAccent}</span>
                        {t.steps.phone.titleB}
                      </>
                    }
                    subtitle={t.steps.phone.sub}
                  >
                    <BigInput
                      icon={<MessageCircle className="h-5 w-5" />}
                      value={form.phone}
                      onChange={(v) => set("phone", v)}
                      placeholder={t.steps.phone.placeholder}
                      type="tel"
                      autoFocus
                      maxLength={40}
                    />
                    <SkipHint label={t.skip} onSkip={advance} />
                  </StepShell>
                )}

                {step === "barbershop" && (
                  <StepShell
                    kicker={t.steps.barbershop.step}
                    title={
                      <>
                        {t.steps.barbershop.titleA}
                        <span className="gradient-text-neon">{t.steps.barbershop.titleAccent}</span>
                        {t.steps.barbershop.titleB}
                      </>
                    }
                    subtitle={t.steps.barbershop.sub}
                  >
                    <BigInput
                      icon={<Store className="h-5 w-5" />}
                      value={form.barbershop_name}
                      onChange={(v) => set("barbershop_name", v)}
                      placeholder={t.steps.barbershop.placeholder}
                      autoFocus
                      maxLength={120}
                    />
                    <SkipHint label={t.skip} onSkip={advance} />
                  </StepShell>
                )}

                {step === "city" && (
                  <StepShell
                    kicker={t.steps.city.step}
                    title={
                      <>
                        {t.steps.city.titleA}
                        <span className="gradient-text-neon">{t.steps.city.titleAccent}</span>
                        {t.steps.city.titleB}
                      </>
                    }
                    subtitle={t.steps.city.sub}
                  >
                    <BigInput
                      icon={<MapPin className="h-5 w-5" />}
                      value={form.city}
                      onChange={(v) => set("city", v)}
                      placeholder={t.steps.city.placeholder}
                      autoFocus
                      maxLength={80}
                    />
                    <SkipHint label={t.skip} onSkip={advance} />
                  </StepShell>
                )}

                {step === "team" && (
                  <StepShell
                    kicker={t.steps.team.step}
                    title={
                      <>
                        {t.steps.team.titleA}
                        <span className="gradient-text-neon">{t.steps.team.titleAccent}</span>
                        {t.steps.team.titleB}
                      </>
                    }
                    subtitle={t.steps.team.sub}
                    error={errors.team_size}
                  >
                    <CardGrid
                      options={teamOptions}
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
                    kicker={t.steps.branches.step}
                    title={
                      <>
                        {t.steps.branches.titleA}
                        <span className="gradient-text-neon">{t.steps.branches.titleAccent}</span>
                        {t.steps.branches.titleB}
                      </>
                    }
                    subtitle={t.steps.branches.sub}
                    error={errors.branches_count}
                  >
                    <CardGrid
                      options={branchOptions}
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
                    kicker={t.steps.software.step}
                    title={
                      <>
                        {t.steps.software.titleA}
                        <span className="gradient-text-neon">{t.steps.software.titleAccent}</span>
                        {t.steps.software.titleB}
                      </>
                    }
                    subtitle={t.steps.software.sub}
                  >
                    <CardGrid
                      options={softwareOptions}
                      value={form.current_software}
                      onChange={(v) => {
                        set("current_software", v);
                        setTimeout(() => goNext(), 320);
                      }}
                      columns={2}
                      compact
                    />
                    <SkipHint label={t.skip} onSkip={advance} />
                  </StepShell>
                )}

                {step === "interests" && (
                  <StepShell
                    kicker={t.steps.interests.step}
                    title={
                      <>
                        {t.steps.interests.titleA}
                        <span className="gradient-text-neon">{t.steps.interests.titleAccent}</span>
                        {t.steps.interests.titleB}
                      </>
                    }
                    subtitle={t.steps.interests.sub}
                    error={errors.interests}
                  >
                    <InterestsGrid
                      options={interestOptions}
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
                    kicker={t.steps.timeline.step}
                    title={
                      <>
                        {t.steps.timeline.titleA}
                        <span className="gradient-text-neon">{t.steps.timeline.titleAccent}</span>
                        {t.steps.timeline.titleB}
                      </>
                    }
                    subtitle={t.steps.timeline.sub}
                    error={errors.start_timeline}
                  >
                    <CardGrid
                      options={timelineOptions}
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
                    t={t.success}
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
              <span>{t.kbdHint}</span>
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
                  {t.sending}
                </>
              ) : step === "timeline" ? (
                <>
                  {t.submit}
                  <Zap className="h-4 w-4" />
                </>
              ) : (
                <>
                  {t.next}
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
  options,
  value,
  onToggle,
}: {
  options: {
    value: Interest;
    icon: typeof ScanFace;
    tone: "neon" | "violet" | "amber";
    label: string;
  }[];
  value: Interest[];
  onToggle: (v: Interest) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {options.map((opt, i) => {
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

function SkipHint({ label, onSkip }: { label: string; onSkip: () => void }) {
  return (
    <button
      type="button"
      onClick={onSkip}
      className="mt-4 inline-flex items-center gap-1.5 text-sm text-mist-400 transition-colors hover:text-mist-200"
    >
      <SkipForward className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}

/* ---------- Success ---------- */

function SuccessScreen({
  t,
  alreadyRegistered,
  name,
  onClose,
}: {
  t: Dictionary["waitlist"]["success"];
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
            {t.titleExisting}
            {firstName ? `, ${firstName}` : ""}.
          </>
        ) : (
          <>
            {t.titleNew.replace("{name}", firstName || "").replace(/, \./, ".")}
            <br />
            <span className="gradient-text-neon">{t.titleNewAccent}</span>
          </>
        )}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-5 max-w-xl text-base text-mist-300 sm:text-lg"
      >
        {t.body}
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
          {t.ctaWhatsapp}
        </a>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-12 items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 text-sm font-semibold text-white transition-colors hover:border-white/20 hover:bg-white/[0.06]"
        >
          {t.ctaClose}
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-mist-500"
      >
        <span className="inline-flex items-center gap-1.5">
          <Building2 className="h-3.5 w-3.5" /> {t.perk1}
        </span>
        <span className="h-1 w-1 rounded-full bg-white/20" />
        <span className="inline-flex items-center gap-1.5">
          <CalendarClock className="h-3.5 w-3.5" /> {t.perk2}
        </span>
        <span className="h-1 w-1 rounded-full bg-white/20" />
        <span className="inline-flex items-center gap-1.5">
          <Zap className="h-3.5 w-3.5" /> {t.perk3}
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
