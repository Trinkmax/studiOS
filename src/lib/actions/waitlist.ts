"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { getWaitlistClient } from "@/lib/supabase/waitlist-client";

const TEAM_SIZES = ["solo", "2_3", "4_6", "7_15", "15_plus"] as const;
const BRANCHES = ["1", "2_3", "4_10", "10_plus"] as const;
const SOFTWARES = [
  "ninguno",
  "fresha",
  "booksy",
  "agendapro",
  "planilla",
  "otro",
] as const;
const INTERESTS = [
  "face_id",
  "crm",
  "panel",
  "finanzas",
  "estadisticas",
  "reseñas",
] as const;
const TIMELINES = ["asap", "1_mes", "3_meses", "explorando"] as const;

const WaitlistSchema = z.object({
  full_name: z.string().trim().min(2, "Contanos tu nombre").max(80),
  email: z.string().trim().toLowerCase().email("Email inválido").max(160),
  phone: z
    .string()
    .trim()
    .max(40)
    .optional()
    .transform((v) => (v ? v : undefined)),
  barbershop_name: z
    .string()
    .trim()
    .max(120)
    .optional()
    .transform((v) => (v ? v : undefined)),
  city: z
    .string()
    .trim()
    .max(80)
    .optional()
    .transform((v) => (v ? v : undefined)),
  team_size: z.enum(TEAM_SIZES),
  branches_count: z.enum(BRANCHES),
  current_software: z.enum(SOFTWARES).optional(),
  interests: z.array(z.enum(INTERESTS)).min(1, "Elegí al menos uno"),
  start_timeline: z.enum(TIMELINES),
  notes: z
    .string()
    .trim()
    .max(600)
    .optional()
    .transform((v) => (v ? v : undefined)),
  utm: z
    .object({
      utm_source: z.string().max(80).optional(),
      utm_medium: z.string().max(80).optional(),
      utm_campaign: z.string().max(120).optional(),
      utm_term: z.string().max(120).optional(),
      utm_content: z.string().max(120).optional(),
    })
    .partial()
    .optional(),
});

export type WaitlistInput = z.input<typeof WaitlistSchema>;

export type WaitlistResult =
  | { ok: true; alreadyRegistered?: boolean }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

export async function submitWaitlist(
  input: WaitlistInput
): Promise<WaitlistResult> {
  const parsed = WaitlistSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Revisá los campos marcados.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<
        string,
        string[]
      >,
    };
  }

  const data = parsed.data;
  const h = await headers();
  const userAgent = h.get("user-agent") ?? undefined;
  const referrer = h.get("referer") ?? undefined;

  const supabase = getWaitlistClient();
  const { error } = await supabase.from("landing_waitlist").insert({
    full_name: data.full_name,
    email: data.email,
    phone: data.phone,
    barbershop_name: data.barbershop_name,
    city: data.city,
    team_size: data.team_size,
    branches_count: data.branches_count,
    current_software: data.current_software,
    interests: data.interests,
    start_timeline: data.start_timeline,
    notes: data.notes,
    source: "landing",
    utm_source: data.utm?.utm_source,
    utm_medium: data.utm?.utm_medium,
    utm_campaign: data.utm?.utm_campaign,
    utm_term: data.utm?.utm_term,
    utm_content: data.utm?.utm_content,
    user_agent: userAgent,
    referrer,
  });

  if (error) {
    // Duplicate email -> treat as success idempotently.
    if (error.code === "23505") {
      return { ok: true, alreadyRegistered: true };
    }
    console.error("[waitlist] insert failed:", error);
    return {
      ok: false,
      error: "No pudimos guardarte. Probá de nuevo en un momento.",
    };
  }

  return { ok: true };
}
