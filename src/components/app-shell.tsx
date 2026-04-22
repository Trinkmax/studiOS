"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";
import { LocaleProvider } from "@/lib/i18n/locale-context";
import { WaitlistProvider } from "@/components/waitlist/waitlist-provider";
import { CommandPalette } from "@/components/command-palette";

/**
 * Derives locale from the current URL so that moving between /en and / works
 * without remounting provider trees. Anything under /en is English; the rest
 * defaults to Spanish.
 */
function localeFromPath(pathname: string | null | undefined): Locale {
  if (!pathname) return "es";
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "es";
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const locale = localeFromPath(pathname);

  // Keep <html lang> in sync with the active locale for SEO + assistive tech.
  useEffect(() => {
    document.documentElement.lang = locale === "en" ? "en" : "es-AR";
  }, [locale]);

  return (
    <LocaleProvider locale={locale}>
      <WaitlistProvider>
        {children}
        <CommandPalette />
      </WaitlistProvider>
    </LocaleProvider>
  );
}
