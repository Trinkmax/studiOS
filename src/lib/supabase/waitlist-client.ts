import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null = null;

export function getWaitlistClient(): SupabaseClient {
  if (cached) return cached;

  const url = process.env.SUPABASE_MSB_URL;
  const key =
    process.env.SUPABASE_MSB_PUBLISHABLE_KEY ??
    process.env.SUPABASE_MSB_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing SUPABASE_MSB_URL or SUPABASE_MSB_PUBLISHABLE_KEY env vars."
    );
  }

  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { "x-client-info": "studios-landing" } },
  });

  return cached;
}
